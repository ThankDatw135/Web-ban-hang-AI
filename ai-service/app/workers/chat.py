import structlog
import google.generativeai as genai
from app.config import get_settings

settings = get_settings()
logger = structlog.get_logger()

# Configure Gemini
if settings.gemini_api_key:
    genai.configure(api_key=settings.gemini_api_key)


SYSTEM_PROMPT = """Bạn là trợ lý mua sắm thời trang của Fashion AI. Nhiệm vụ của bạn:

1. Hỗ trợ khách hàng tìm kiếm sản phẩm phù hợp
2. Tư vấn về kích thước, chất liệu, phối đồ
3. Giải đáp thắc mắc về đơn hàng, thanh toán, giao hàng
4. Gợi ý sản phẩm dựa trên sở thích

Quy tắc:
- Trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp
- Giữ câu trả lời ngắn gọn, dễ hiểu
- Nếu không biết, hãy nói không biết, đừng bịa đặt
"""


async def process_chat(session_id: str, message: str, history: list[dict]):
    """
    Process a chat message using LLM.

    Args:
        session_id: Chat session ID
        message: User message
        history: Previous messages in the session
    """
    logger.info("Processing chat", session_id=session_id)

    try:
        if settings.llm_provider == "gemini":
            return await _process_with_gemini(message, history)
        else:
            raise ValueError(f"Unknown LLM provider: {settings.llm_provider}")

    except Exception as e:
        logger.error("Chat processing failed", session_id=session_id, error=str(e))
        return {
            "response": "Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này. Vui lòng thử lại sau.",
            "error": str(e),
        }


async def _process_with_gemini(message: str, history: list[dict]) -> dict:
    """Process chat with Google Gemini."""
    model = genai.GenerativeModel("gemini-pro")

    # Build conversation history
    chat = model.start_chat(history=[
        {"role": msg["role"], "parts": [msg["content"]]}
        for msg in history
    ])

    # Send message
    response = chat.send_message(message)

    return {
        "response": response.text,
    }
