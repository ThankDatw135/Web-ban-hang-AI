"""
Size Recommendation Service
AI-powered size recommendation using measurements and Gemini
"""

import structlog
from google import genai
from google.genai import types
from app.config import get_settings

settings = get_settings()
logger = structlog.get_logger()

# Initialize Gemini client
client = None
if settings.gemini_api_key:
    client = genai.Client(api_key=settings.gemini_api_key)


# Size charts for different product types
SIZE_CHARTS = {
    "ao_thun": {
        "S": {"chest": (86, 92), "waist": (70, 76), "height": (160, 167)},
        "M": {"chest": (92, 98), "waist": (76, 82), "height": (167, 173)},
        "L": {"chest": (98, 104), "waist": (82, 88), "height": (173, 180)},
        "XL": {"chest": (104, 110), "waist": (88, 94), "height": (180, 187)},
        "XXL": {"chest": (110, 116), "waist": (94, 100), "height": (187, 194)},
    },
    "quan": {
        "S": {"waist": (70, 76), "hips": (86, 92), "height": (160, 167)},
        "M": {"waist": (76, 82), "hips": (92, 98), "height": (167, 173)},
        "L": {"waist": (82, 88), "hips": (98, 104), "height": (173, 180)},
        "XL": {"waist": (88, 94), "hips": (104, 110), "height": (180, 187)},
        "XXL": {"waist": (94, 100), "hips": (110, 116), "height": (187, 194)},
    },
    "ao_khoac": {
        "S": {"chest": (88, 94), "shoulder": (42, 44), "height": (160, 167)},
        "M": {"chest": (94, 100), "shoulder": (44, 46), "height": (167, 173)},
        "L": {"chest": (100, 106), "shoulder": (46, 48), "height": (173, 180)},
        "XL": {"chest": (106, 112), "shoulder": (48, 50), "height": (180, 187)},
        "XXL": {"chest": (112, 118), "shoulder": (50, 52), "height": (187, 194)},
    },
}


async def recommend_size(
    product_id: str,
    product_type: str = "ao_thun",
    height: float | None = None,
    weight: float | None = None,
    chest: float | None = None,
    waist: float | None = None,
    hips: float | None = None,
    shoulder: float | None = None,
    fit_preference: str = "regular",  # slim, regular, loose
) -> dict:
    """
    Recommend a size based on user measurements.

    Args:
        product_id: Product ID for lookup
        product_type: Type of product (ao_thun, quan, ao_khoac)
        height: Height in cm
        weight: Weight in kg
        chest: Chest circumference in cm
        waist: Waist circumference in cm
        hips: Hip circumference in cm
        shoulder: Shoulder width in cm
        fit_preference: Preferred fit style

    Returns:
        Size recommendation with confidence and alternatives
    """
    logger.info(
        "Processing size recommendation",
        product_id=product_id,
        product_type=product_type,
    )

    try:
        # Get size chart for product type
        size_chart = SIZE_CHARTS.get(product_type, SIZE_CHARTS["ao_thun"])
        
        # Calculate fit scores for each size
        measurements = {
            "height": height,
            "weight": weight,
            "chest": chest,
            "waist": waist,
            "hips": hips,
            "shoulder": shoulder,
        }
        
        scores = calculate_size_scores(size_chart, measurements)
        
        # Sort by score
        sorted_sizes = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        
        if not sorted_sizes or sorted_sizes[0][1] == 0:
            # Not enough measurements, use basic estimation
            recommended = estimate_from_basic(height, weight)
            confidence = 0.5
        else:
            recommended = sorted_sizes[0][0]
            confidence = min(sorted_sizes[0][1] / 100, 0.95)
        
        # Adjust for fit preference
        if fit_preference == "slim" and recommended in ["M", "L", "XL"]:
            # Could suggest going down a size
            pass
        elif fit_preference == "loose" and recommended in ["S", "M", "L"]:
            # Could suggest going up a size
            pass

        # Generate alternatives
        alternatives = []
        for size, score in sorted_sizes[1:3]:
            alt_confidence = min(score / 100, 0.90)
            note = get_size_note(size, recommended)
            alternatives.append({
                "size": size,
                "confidence": round(alt_confidence, 2),
                "note": note,
            })

        # Generate tips using Gemini
        tips = await generate_size_tips(
            recommended_size=recommended,
            measurements=measurements,
            product_type=product_type,
            fit_preference=fit_preference,
        )

        logger.info(
            "Size recommendation completed",
            product_id=product_id,
            recommended_size=recommended,
            confidence=confidence,
        )

        return {
            "recommended_size": recommended,
            "confidence": round(confidence, 2),
            "alternatives": alternatives,
            "tips": tips,
            "measurements_used": {k: v for k, v in measurements.items() if v is not None},
        }

    except Exception as e:
        logger.error("Size recommendation failed", product_id=product_id, error=str(e))
        raise


def calculate_size_scores(size_chart: dict, measurements: dict) -> dict:
    """Calculate fit score for each size based on measurements."""
    scores = {}
    
    for size, ranges in size_chart.items():
        score = 0
        matches = 0
        
        for metric, (min_val, max_val) in ranges.items():
            if measurements.get(metric) is not None:
                value = measurements[metric]
                
                if min_val <= value <= max_val:
                    # Perfect fit
                    center = (min_val + max_val) / 2
                    distance_from_center = abs(value - center) / (max_val - min_val)
                    score += 100 * (1 - distance_from_center * 0.5)
                elif value < min_val:
                    # Too small
                    distance = (min_val - value) / min_val
                    score += max(0, 60 - distance * 100)
                else:
                    # Too big
                    distance = (value - max_val) / max_val
                    score += max(0, 60 - distance * 100)
                
                matches += 1
        
        if matches > 0:
            scores[size] = score / matches
        else:
            scores[size] = 0
    
    return scores


def estimate_from_basic(height: float | None, weight: float | None) -> str:
    """Estimate size from just height and weight."""
    if height is None and weight is None:
        return "M"  # Default
    
    # BMI-based estimation if both available
    if height and weight:
        bmi = weight / ((height / 100) ** 2)
        
        if height < 165:
            base_size = "S"
        elif height < 173:
            base_size = "M"
        elif height < 180:
            base_size = "L"
        else:
            base_size = "XL"
        
        # Adjust for BMI
        if bmi > 28:
            sizes = ["S", "M", "L", "XL", "XXL"]
            idx = sizes.index(base_size)
            return sizes[min(idx + 1, len(sizes) - 1)]
        elif bmi < 20:
            sizes = ["S", "M", "L", "XL", "XXL"]
            idx = sizes.index(base_size)
            return sizes[max(idx - 1, 0)]
        
        return base_size
    
    # Height only
    if height:
        if height < 165:
            return "S"
        elif height < 173:
            return "M"
        elif height < 180:
            return "L"
        else:
            return "XL"
    
    # Weight only
    if weight:
        if weight < 55:
            return "S"
        elif weight < 70:
            return "M"
        elif weight < 85:
            return "L"
        else:
            return "XL"
    
    return "M"


def get_size_note(size: str, recommended: str) -> str:
    """Get note for alternative size."""
    sizes = ["XS", "S", "M", "L", "XL", "XXL"]
    
    try:
        rec_idx = sizes.index(recommended)
        alt_idx = sizes.index(size)
        
        if alt_idx < rec_idx:
            return "Có thể hơi ôm, phù hợp nếu thích fit body"
        else:
            return "Có thể hơi rộng, phù hợp nếu thích mặc thoải mái"
    except ValueError:
        return ""


async def generate_size_tips(
    recommended_size: str,
    measurements: dict,
    product_type: str,
    fit_preference: str,
) -> list[str]:
    """Generate personalized tips using Gemini."""
    if not client:
        return [
            f"Size {recommended_size} được gợi ý dựa trên số đo của bạn",
            "Nếu bạn thích mặc rộng hơn, hãy chọn size lớn hơn 1 bậc",
        ]

    try:
        prompt = f"""Dựa vào thông tin sau, hãy đưa ra 2-3 lời khuyên ngắn gọn về việc chọn size:

- Size được gợi ý: {recommended_size}
- Loại sản phẩm: {product_type}
- Sở thích fit: {fit_preference}
- Chiều cao: {measurements.get('height', 'N/A')} cm
- Cân nặng: {measurements.get('weight', 'N/A')} kg

Trả lời bằng tiếng Việt, mỗi lời khuyên 1 dòng, không đánh số."""

        response = await client.aio.models.generate_content(
            model=settings.gemini_model,
            contents=[types.Content(role="user", parts=[types.Part(text=prompt)])],
            config=types.GenerateContentConfig(
                temperature=0.5,
                max_output_tokens=256,
            ),
        )

        if response.text:
            tips = [tip.strip() for tip in response.text.strip().split("\n") if tip.strip()]
            return tips[:3]  # Max 3 tips

    except Exception as e:
        logger.warning("Failed to generate tips", error=str(e))

    return [
        f"Size {recommended_size} được gợi ý dựa trên số đo của bạn",
        "Nếu bạn thích mặc rộng hơn, hãy chọn size lớn hơn 1 bậc",
    ]
