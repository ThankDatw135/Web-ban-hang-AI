"""
Fashion AI Chat Service
Uses Gemini 2.5-flash for conversational AI
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

# System prompt for Fashion AI assistant
SYSTEM_PROMPT = """Bạn là Fashion AI - trợ lý mua sắm thời trang thông minh. 

## Nhiệm vụ của bạn:
1. **Tư vấn thời trang**: Gợi ý phối đồ, chọn màu sắc, chọn size
2. **Hỗ trợ mua sắm**: Tìm sản phẩm, so sánh giá, kiểm tra tồn kho
3. **Giải đáp thắc mắc**: Chính sách đổi trả, vận chuyển, thanh toán
4. **Gợi ý cá nhân hóa**: Dựa trên phong cách và sở thích của khách

## Quy tắc:
- Luôn trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp
- Câu trả lời ngắn gọn, dễ hiểu (tối đa 3-4 câu trừ khi cần giải thích chi tiết)
- Nếu không biết chắc, hãy nói "Tôi không chắc chắn, để tôi kiểm tra thêm"
- Không bịa đặt thông tin về sản phẩm hoặc giá cả
- Hãy hỏi thêm nếu cần thông tin để tư vấn tốt hơn

## Phong cách:
- Thân thiện, nhiệt tình như một stylist chuyên nghiệp
- Sử dụng emoji phù hợp để tạo cảm giác gần gũi
- Luôn kết thúc bằng câu hỏi mở để tiếp tục cuộc trò chuyện
"""


async def process_chat(
    session_id: str,
    message: str,
    history: list[dict] | None = None,
    context: dict | None = None,
) -> dict:
    """
    Process a chat message using Gemini 2.5-flash.

    Args:
        session_id: Unique chat session ID
        message: User's message
        history: Previous messages [{"role": "user/model", "content": "..."}]
        context: Additional context (user profile, cart items, etc.)

    Returns:
        dict with response and metadata
    """
    logger.info("Processing chat", session_id=session_id, message_length=len(message))

    if not client:
        logger.error("Gemini client not initialized")
        return {
            "response": "Xin lỗi, dịch vụ AI đang bảo trì. Vui lòng thử lại sau.",
            "error": "GEMINI_NOT_CONFIGURED",
        }

    try:
        # Build conversation history for Gemini
        contents = []
        
        # Add system prompt as first user message (Gemini workaround)
        system_content = SYSTEM_PROMPT
        if context:
            system_content += f"\n\n## Thông tin người dùng:\n{_format_context(context)}"
        
        # Add history
        if history:
            for msg in history[-settings.chat_max_history:]:
                role = "user" if msg.get("role") == "user" else "model"
                contents.append(
                    types.Content(
                        role=role,
                        parts=[types.Part(text=msg.get("content", ""))]
                    )
                )
        
        # Add current message
        contents.append(
            types.Content(
                role="user",
                parts=[types.Part(text=message)]
            )
        )

        # Call Gemini
        response = await client.aio.models.generate_content(
            model=settings.gemini_model,
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=system_content,
                temperature=0.7,
                max_output_tokens=1024,
                top_p=0.9,
            ),
        )

        response_text = response.text if response.text else ""
        
        logger.info(
            "Chat completed",
            session_id=session_id,
            response_length=len(response_text),
        )

        return {
            "response": response_text,
            "session_id": session_id,
            "tokens_used": getattr(response.usage_metadata, "total_token_count", 0) if response.usage_metadata else 0,
        }

    except Exception as e:
        logger.error("Chat processing failed", session_id=session_id, error=str(e))
        return {
            "response": "Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này. Vui lòng thử lại sau.",
            "error": str(e),
        }


async def process_chat_stream(
    session_id: str,
    message: str,
    history: list[dict] | None = None,
    context: dict | None = None,
):
    """
    Process chat with streaming response.

    Yields:
        dict chunks with partial response
    """
    logger.info("Processing chat stream", session_id=session_id)

    if not client:
        yield {"error": "GEMINI_NOT_CONFIGURED"}
        return

    try:
        # Build contents
        contents = []
        system_content = SYSTEM_PROMPT
        if context:
            system_content += f"\n\n## Thông tin người dùng:\n{_format_context(context)}"

        if history:
            for msg in history[-settings.chat_max_history:]:
                role = "user" if msg.get("role") == "user" else "model"
                contents.append(
                    types.Content(
                        role=role,
                        parts=[types.Part(text=msg.get("content", ""))]
                    )
                )

        contents.append(
            types.Content(
                role="user",
                parts=[types.Part(text=message)]
            )
        )

        # Stream response
        async for chunk in client.aio.models.generate_content_stream(
            model=settings.gemini_model,
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=system_content,
                temperature=0.7,
                max_output_tokens=1024,
            ),
        ):
            if chunk.text:
                yield {"chunk": chunk.text, "done": False}

        yield {"chunk": "", "done": True, "session_id": session_id}

    except Exception as e:
        logger.error("Chat stream failed", session_id=session_id, error=str(e))
        yield {"error": str(e)}


def _format_context(context: dict) -> str:
    """Format user context for system prompt."""
    parts = []
    
    if context.get("user_name"):
        parts.append(f"- Tên: {context['user_name']}")
    
    if context.get("cart_items"):
        items = ", ".join([item.get("name", "") for item in context["cart_items"][:5]])
        parts.append(f"- Giỏ hàng: {items}")
    
    if context.get("recent_views"):
        views = ", ".join([item.get("name", "") for item in context["recent_views"][:5]])
        parts.append(f"- Đã xem gần đây: {views}")
    
    if context.get("preferences"):
        prefs = context["preferences"]
        if prefs.get("style"):
            parts.append(f"- Phong cách yêu thích: {prefs['style']}")
        if prefs.get("sizes"):
            parts.append(f"- Size thường mặc: {', '.join(prefs['sizes'])}")
    
    return "\n".join(parts) if parts else "Không có thông tin thêm"
