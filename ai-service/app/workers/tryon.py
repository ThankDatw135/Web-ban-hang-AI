"""
Virtual Try-on Worker using Gemini Vision

This module uses Gemini's vision capabilities to:
1. Analyze user's body from photo
2. Analyze garment characteristics
3. Predict how the garment will fit
4. Generate detailed fit description
"""

import structlog
import json
import base64
import tempfile
import os
from typing import Optional
from PIL import Image
import io

from google import genai
from google.genai import types

from app.config import get_settings

settings = get_settings()
logger = structlog.get_logger()

# Initialize Gemini client
client = None
if settings.gemini_api_key:
    client = genai.Client(api_key=settings.gemini_api_key)


# ==================== Prompts ====================

BODY_ANALYSIS_PROMPT = """
Bạn là chuyên gia phân tích vóc dáng thời trang. Hãy phân tích ảnh người trong hình và trả về JSON với các thông tin sau:

{
    "body_type": "slim" | "average" | "athletic" | "curvy" | "plus_size",
    "estimated_height_range": "short (< 160cm)" | "average (160-175cm)" | "tall (> 175cm)",
    "shoulder_width": "narrow" | "medium" | "broad",
    "body_proportions": {
        "upper_body": "shorter" | "proportional" | "longer",
        "waist_definition": "defined" | "moderate" | "straight"
    },
    "notes": "Mô tả ngắn gọn về vóc dáng bằng tiếng Việt"
}

CHỈ trả về JSON, không có text khác.
"""

FIT_PREDICTION_PROMPT = """
Dựa trên phân tích vóc dáng người dùng và thông tin sản phẩm, hãy dự đoán cách sản phẩm sẽ fit.

Thông tin vóc dáng:
{body_analysis}

Thông tin sản phẩm:
- Loại: {product_type}
- Tên: {product_name}
- Size có sẵn: {available_sizes}
- Chất liệu: {material}

Trả về JSON:
{
    "recommended_size": "S" | "M" | "L" | "XL" | etc,
    "fit_confidence": 0.0-1.0,
    "fit_style": "ôm body" | "vừa vặn" | "rộng rãi",
    "description": "Mô tả chi tiết 2-3 câu về cách sản phẩm sẽ fit trên người dùng bằng tiếng Việt",
    "fit_areas": {
        "shoulder": "vừa" | "hơi chật" | "hơi rộng",
        "chest": "vừa" | "hơi chật" | "hơi rộng",
        "length": "vừa" | "hơi ngắn" | "hơi dài"
    },
    "styling_tips": ["tip 1", "tip 2", "tip 3"],
    "warnings": ["cảnh báo nếu có"]
}

CHỈ trả về JSON, không có text khác.
"""

GARMENT_ANALYSIS_PROMPT = """
Phân tích hình ảnh sản phẩm quần áo này và trả về JSON:

{
    "garment_type": "áo thun" | "áo sơ mi" | "áo khoác" | "quần" | "váy" | etc,
    "style": "casual" | "formal" | "sporty" | "streetwear",
    "fit_type": "slim fit" | "regular fit" | "relaxed fit" | "oversized",
    "notable_features": ["feature 1", "feature 2"],
    "recommended_body_types": ["body type 1", "body type 2"],
    "colors": ["màu chính", "màu phụ"]
}

CHỈ trả về JSON, không có text khác.
"""


# ==================== Core Functions ====================


async def analyze_body_from_image(image_data: bytes) -> dict:
    """
    Use Gemini Vision to analyze body type from user photo.
    
    Args:
        image_data: Raw image bytes
        
    Returns:
        dict with body analysis
    """
    if not client:
        return {"error": "Gemini client not configured"}
    
    try:
        # Convert to base64
        image_base64 = base64.b64encode(image_data).decode('utf-8')
        
        response = await client.aio.models.generate_content(
            model=settings.gemini_vision_model,
            contents=[
                types.Content(
                    parts=[
                        types.Part(text=BODY_ANALYSIS_PROMPT),
                        types.Part(
                            inline_data=types.Blob(
                                mime_type="image/jpeg",
                                data=image_data
                            )
                        )
                    ]
                )
            ],
            config=types.GenerateContentConfig(
                temperature=0.3,
                max_output_tokens=1024,
            )
        )
        
        result_text = response.text.strip()
        
        # Clean JSON from markdown code blocks if present
        if result_text.startswith("```"):
            result_text = result_text.split("```")[1]
            if result_text.startswith("json"):
                result_text = result_text[4:]
        result_text = result_text.strip()
        
        return json.loads(result_text)
        
    except json.JSONDecodeError as e:
        logger.error("Failed to parse body analysis JSON", error=str(e))
        return {
            "body_type": "average",
            "estimated_height_range": "average (160-175cm)",
            "shoulder_width": "medium",
            "notes": "Không thể phân tích chi tiết, sử dụng giá trị mặc định"
        }
    except Exception as e:
        logger.error("Body analysis failed", error=str(e))
        return {"error": str(e)}


async def analyze_garment(image_data: bytes) -> dict:
    """
    Use Gemini Vision to analyze garment characteristics.
    """
    if not client:
        return {"error": "Gemini client not configured"}
    
    try:
        response = await client.aio.models.generate_content(
            model=settings.gemini_vision_model,
            contents=[
                types.Content(
                    parts=[
                        types.Part(text=GARMENT_ANALYSIS_PROMPT),
                        types.Part(
                            inline_data=types.Blob(
                                mime_type="image/jpeg",
                                data=image_data
                            )
                        )
                    ]
                )
            ],
            config=types.GenerateContentConfig(
                temperature=0.3,
                max_output_tokens=1024,
            )
        )
        
        result_text = response.text.strip()
        if result_text.startswith("```"):
            result_text = result_text.split("```")[1]
            if result_text.startswith("json"):
                result_text = result_text[4:]
        result_text = result_text.strip()
        
        return json.loads(result_text)
        
    except Exception as e:
        logger.error("Garment analysis failed", error=str(e))
        return {"error": str(e)}


async def predict_fit(
    body_analysis: dict,
    product_info: dict,
) -> dict:
    """
    Use Gemini to predict how a garment will fit based on body analysis.
    """
    if not client:
        return {"error": "Gemini client not configured"}
    
    try:
        prompt = FIT_PREDICTION_PROMPT.format(
            body_analysis=json.dumps(body_analysis, ensure_ascii=False),
            product_type=product_info.get("type", "áo"),
            product_name=product_info.get("name", "Sản phẩm"),
            available_sizes=", ".join(product_info.get("sizes", ["S", "M", "L", "XL"])),
            material=product_info.get("material", "cotton"),
        )
        
        response = await client.aio.models.generate_content(
            model=settings.gemini_model,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.3,
                max_output_tokens=1024,
            )
        )
        
        result_text = response.text.strip()
        if result_text.startswith("```"):
            result_text = result_text.split("```")[1]
            if result_text.startswith("json"):
                result_text = result_text[4:]
        result_text = result_text.strip()
        
        return json.loads(result_text)
        
    except Exception as e:
        logger.error("Fit prediction failed", error=str(e))
        return {
            "recommended_size": "M",
            "fit_confidence": 0.5,
            "description": "Không thể dự đoán chính xác, recommend size M",
            "error": str(e)
        }


async def create_simple_overlay(
    user_image_data: bytes,
    product_image_data: bytes,
    body_analysis: dict,
) -> Optional[bytes]:
    """
    Create a simple visual overlay of the product on the user.
    This is NOT AI-generated, just basic image composition.
    """
    try:
        # Open images
        user_img = Image.open(io.BytesIO(user_image_data)).convert("RGBA")
        product_img = Image.open(io.BytesIO(product_image_data)).convert("RGBA")
        
        # Get dimensions
        user_w, user_h = user_img.size
        prod_w, prod_h = product_img.size
        
        # Calculate product placement (center-top of user image)
        # Scale product to ~40% of user image width
        scale = (user_w * 0.4) / prod_w
        new_prod_w = int(prod_w * scale)
        new_prod_h = int(prod_h * scale)
        
        product_resized = product_img.resize(
            (new_prod_w, new_prod_h),
            Image.Resampling.LANCZOS
        )
        
        # Position: centered horizontally, ~20% from top
        x = (user_w - new_prod_w) // 2
        y = int(user_h * 0.2)
        
        # Create composite
        result = user_img.copy()
        
        # Add semi-transparent product overlay
        product_resized.putalpha(
            product_resized.getchannel('A').point(lambda x: int(x * 0.7))
        )
        result.paste(product_resized, (x, y), product_resized)
        
        # Convert to bytes
        output = io.BytesIO()
        result.convert("RGB").save(output, format="JPEG", quality=85)
        return output.getvalue()
        
    except Exception as e:
        logger.error("Overlay creation failed", error=str(e))
        return None


# ==================== Main Process Function ====================


async def process_tryon(
    job_id: str,
    user_image_data: bytes,
    product_image_data: bytes,
    product_info: dict,
) -> dict:
    """
    Process a virtual try-on request using Gemini Vision.
    
    Args:
        job_id: Unique job identifier
        user_image_data: Raw bytes of user photo
        product_image_data: Raw bytes of product image
        product_info: Product metadata (name, type, sizes, etc.)
        
    Returns:
        dict with analysis results and predictions
    """
    logger.info("Processing try-on with Gemini Vision", job_id=job_id)
    
    try:
        # Step 1: Analyze user's body
        logger.info("Analyzing body...", job_id=job_id)
        body_analysis = await analyze_body_from_image(user_image_data)
        
        if "error" in body_analysis:
            return {
                "status": "failed",
                "error": body_analysis["error"],
            }
        
        # Step 2: Analyze garment (optional, for better prediction)
        logger.info("Analyzing garment...", job_id=job_id)
        garment_analysis = await analyze_garment(product_image_data)
        
        # Step 3: Predict fit
        logger.info("Predicting fit...", job_id=job_id)
        fit_prediction = await predict_fit(body_analysis, product_info)
        
        # Step 4: Create simple visual overlay (optional)
        # overlay_data = await create_simple_overlay(
        #     user_image_data, product_image_data, body_analysis
        # )
        
        logger.info("Try-on analysis completed", job_id=job_id)
        
        return {
            "status": "completed",
            "body_analysis": body_analysis,
            "garment_analysis": garment_analysis if "error" not in garment_analysis else None,
            "fit_prediction": fit_prediction,
            # "overlay_url": f"/ai/try-on/{job_id}/preview" if overlay_data else None,
        }
        
    except Exception as e:
        logger.error("Try-on processing failed", job_id=job_id, error=str(e))
        return {
            "status": "failed",
            "error": str(e),
        }


# ==================== Legacy function (for compatibility) ====================


async def process_tryon_legacy(job_id: str, user_image_url: str, product_image_url: str):
    """
    Legacy process_tryon function for backward compatibility.
    """
    logger.info("Processing try-on (legacy)", job_id=job_id)
    
    return {
        "status": "completed",
        "message": "Please use the new try-on API with image data",
        "result_url": f"https://storage.example.com/results/{job_id}.jpg",
    }
