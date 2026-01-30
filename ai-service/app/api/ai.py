"""
AI API Endpoints
FastAPI routes for AI features
"""

import uuid
import structlog
from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks, File, UploadFile, Form
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import Optional
import json
import redis.asyncio as redis

from app.config import get_settings
from app.workers.chat import process_chat, process_chat_stream
from app.workers.size_rec import recommend_size
from app.workers.tryon import process_tryon

settings = get_settings()
logger = structlog.get_logger()
router = APIRouter()

# Redis client for session management
redis_client = None


async def get_redis():
    global redis_client
    if redis_client is None:
        redis_client = redis.from_url(settings.redis_url)
    return redis_client


# ==================== Models ====================


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    session_id: Optional[str] = None
    stream: bool = False
    context: Optional[dict] = None


class ChatResponse(BaseModel):
    success: bool = True
    data: dict


class SizeRecommendRequest(BaseModel):
    product_id: str
    product_type: str = "ao_thun"  # ao_thun, quan, ao_khoac
    height: Optional[float] = Field(None, ge=100, le=250)
    weight: Optional[float] = Field(None, ge=30, le=200)
    chest: Optional[float] = Field(None, ge=60, le=150)
    waist: Optional[float] = Field(None, ge=50, le=130)
    hips: Optional[float] = Field(None, ge=60, le=150)
    shoulder: Optional[float] = Field(None, ge=30, le=60)
    fit_preference: str = Field("regular", pattern="^(slim|regular|loose)$")


class SizeRecommendResponse(BaseModel):
    success: bool = True
    data: dict


class JobStatusResponse(BaseModel):
    success: bool = True
    data: dict


class TryOnResponse(BaseModel):
    success: bool = True
    data: dict



# ==================== Chat Endpoints ====================


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, r: redis.Redis = Depends(get_redis)):
    """
    Send a message to Fashion AI chatbot.
    
    - Supports session-based conversation history
    - Optional streaming response
    - Context injection (cart, browsing history, etc.)
    """
    # Generate or validate session ID
    session_id = request.session_id or str(uuid.uuid4())
    
    # Get conversation history from Redis
    history = await get_chat_history(r, session_id)
    
    if request.stream:
        # Return streaming response
        async def generate():
            full_response = ""
            async for chunk in process_chat_stream(
                session_id=session_id,
                message=request.message,
                history=history,
                context=request.context,
            ):
                if chunk.get("error"):
                    yield f"data: {json.dumps({'error': chunk['error']})}\n\n"
                    return
                
                if chunk.get("chunk"):
                    full_response += chunk["chunk"]
                    yield f"data: {json.dumps({'chunk': chunk['chunk'], 'done': chunk.get('done', False)})}\n\n"
                
                if chunk.get("done"):
                    # Save to history
                    await save_chat_message(r, session_id, "user", request.message)
                    await save_chat_message(r, session_id, "model", full_response)
                    yield f"data: {json.dumps({'done': True, 'session_id': session_id})}\n\n"
        
        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
        )
    
    # Non-streaming response
    result = await process_chat(
        session_id=session_id,
        message=request.message,
        history=history,
        context=request.context,
    )
    
    if result.get("error") and "GEMINI_NOT_CONFIGURED" in str(result.get("error", "")):
        raise HTTPException(status_code=503, detail="AI service not available")
    
    # Save to history
    await save_chat_message(r, session_id, "user", request.message)
    await save_chat_message(r, session_id, "model", result.get("response", ""))
    
    return ChatResponse(data={
        "session_id": session_id,
        "response": result.get("response", ""),
        "tokens_used": result.get("tokens_used", 0),
    })


@router.get("/chat/sessions/{session_id}")
async def get_session_history(session_id: str, r: redis.Redis = Depends(get_redis)):
    """Get chat history for a session."""
    history = await get_chat_history(r, session_id)
    return {
        "success": True,
        "data": {
            "session_id": session_id,
            "messages": history,
        }
    }


@router.delete("/chat/sessions/{session_id}")
async def delete_session(session_id: str, r: redis.Redis = Depends(get_redis)):
    """Delete a chat session."""
    key = f"chat:session:{session_id}"
    await r.delete(key)
    return {"success": True, "message": "Session deleted"}


# ==================== Size Recommendation Endpoints ====================


@router.post("/size-recommend", response_model=SizeRecommendResponse)
async def size_recommendation(request: SizeRecommendRequest):
    """
    Get AI-powered size recommendation based on body measurements.
    
    - Uses scoring algorithm to match with size charts
    - Provides confidence scores and alternatives
    - AI-generated personalized tips
    """
    result = await recommend_size(
        product_id=request.product_id,
        product_type=request.product_type,
        height=request.height,
        weight=request.weight,
        chest=request.chest,
        waist=request.waist,
        hips=request.hips,
        shoulder=request.shoulder,
        fit_preference=request.fit_preference,
    )
    
    return SizeRecommendResponse(data=result)


@router.get("/size-guide/{product_type}")
async def get_size_guide(product_type: str):
    """Get size chart for a product type."""
    from app.workers.size_rec import SIZE_CHARTS
    
    if product_type not in SIZE_CHARTS:
        raise HTTPException(status_code=404, detail=f"Unknown product type: {product_type}")
    
    chart = SIZE_CHARTS[product_type]
    
    # Convert to more readable format
    readable_chart = {}
    for size, ranges in chart.items():
        readable_chart[size] = {
            metric: f"{min_val}-{max_val} cm" 
            for metric, (min_val, max_val) in ranges.items()
        }
    
    return {
        "success": True,
        "data": {
            "product_type": product_type,
            "size_chart": readable_chart,
        }
    }


# ==================== Virtual Try-on Endpoints ====================


@router.post("/try-on", response_model=TryOnResponse)
async def virtual_tryon(
    background_tasks: BackgroundTasks,
    r: redis.Redis = Depends(get_redis),
    user_image: UploadFile = File(..., description="Ảnh người dùng (JPEG/PNG, max 5MB)"),
    product_id: str = Form(...),
    product_name: str = Form("Sản phẩm"),
    product_type: str = Form("ao_thun"),
    product_sizes: str = Form("S,M,L,XL"),
    product_material: str = Form("cotton"),
):
    """
    Virtual Try-on using Gemini Vision AI.
    
    Analyzes user's body from photo and predicts how the garment will fit.
    Returns detailed fit description and size recommendation.
    """
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp"]
    if user_image.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {', '.join(allowed_types)}"
        )
    
    # Check file size (5MB max)
    contents = await user_image.read()
    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max 5MB")
    
    # Generate job ID
    job_id = f"tryon_{uuid.uuid4().hex[:12]}"
    
    # Create job record
    job_data = {
        "job_id": job_id,
        "status": "processing",
        "product_id": product_id,
        "created_at": str(uuid.uuid1().time),
    }
    await r.setex(f"ai:job:{job_id}", 3600, json.dumps(job_data))
    
    # Product info
    product_info = {
        "id": product_id,
        "name": product_name,
        "type": product_type,
        "sizes": [s.strip() for s in product_sizes.split(",")],
        "material": product_material,
    }
    
    # For now, we need a product image. Using a placeholder.
    # In production, you'd fetch this from the database
    product_image_data = b""  # Placeholder - would come from database
    
    try:
        # Process try-on synchronously for now
        result = await process_tryon(
            job_id=job_id,
            user_image_data=contents,
            product_image_data=product_image_data,
            product_info=product_info,
        )
        
        # Update job with result
        job_data["status"] = result.get("status", "completed")
        job_data["result"] = result
        await r.setex(f"ai:job:{job_id}", 3600, json.dumps(job_data))
        
        return TryOnResponse(data={
            "job_id": job_id,
            "status": result.get("status", "completed"),
            "body_analysis": result.get("body_analysis"),
            "fit_prediction": result.get("fit_prediction"),
            "garment_analysis": result.get("garment_analysis"),
        })
        
    except Exception as e:
        logger.error("Try-on failed", job_id=job_id, error=str(e))
        job_data["status"] = "failed"
        job_data["error"] = str(e)
        await r.setex(f"ai:job:{job_id}", 3600, json.dumps(job_data))
        
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/try-on/{job_id}", response_model=TryOnResponse)
async def get_tryon_result(job_id: str, r: redis.Redis = Depends(get_redis)):
    """Get the result of a try-on request."""
    key = f"ai:job:{job_id}"
    job_data = await r.get(key)
    
    if not job_data:
        raise HTTPException(status_code=404, detail="Try-on job not found")
    
    return TryOnResponse(data=json.loads(job_data))


# ==================== Job Status Endpoints ====================


@router.get("/jobs/{job_id}", response_model=JobStatusResponse)
async def get_job_status(job_id: str, r: redis.Redis = Depends(get_redis)):
    """
    Get the status and result of an AI job.
    
    Used for async operations like virtual try-on.
    """
    key = f"ai:job:{job_id}"
    job_data = await r.get(key)
    
    if not job_data:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return JobStatusResponse(data=json.loads(job_data))


# ==================== Helper Functions ====================


async def get_chat_history(r: redis.Redis, session_id: str) -> list[dict]:
    """Get chat history from Redis."""
    key = f"chat:session:{session_id}"
    history_raw = await r.lrange(key, 0, -1)
    
    history = []
    for item in history_raw:
        try:
            history.append(json.loads(item))
        except json.JSONDecodeError:
            continue
    
    return history[-settings.chat_max_history:]  # Limit history size


async def save_chat_message(r: redis.Redis, session_id: str, role: str, content: str):
    """Save a message to chat history."""
    key = f"chat:session:{session_id}"
    message = json.dumps({"role": role, "content": content})
    
    await r.rpush(key, message)
    await r.expire(key, settings.chat_session_ttl)
    
    # Trim to max history
    await r.ltrim(key, -(settings.chat_max_history * 2), -1)
