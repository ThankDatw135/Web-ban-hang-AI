import structlog
import aio_pika
from aio_pika import connect_robust

from app.config import get_settings

settings = get_settings()
logger = structlog.get_logger()

connection = None
channel = None


async def start_consumers():
    """Start RabbitMQ consumers for AI tasks."""
    global connection, channel

    try:
        connection = await connect_robust(settings.rabbitmq_url)
        channel = await connection.channel()

        # Declare queues
        await channel.declare_queue("ai.tryon.requests", durable=True)
        await channel.declare_queue("ai.size.requests", durable=True)
        await channel.declare_queue("ai.chat.requests", durable=True)
        await channel.declare_queue("ai.results", durable=True)

        logger.info("RabbitMQ consumers started")

        # TODO: Start consuming messages
        # tryon_queue = await channel.get_queue("ai.tryon.requests")
        # await tryon_queue.consume(process_tryon)

    except Exception as e:
        logger.error("Failed to start RabbitMQ consumers", error=str(e))
        raise


async def stop_consumers():
    """Stop RabbitMQ consumers."""
    global connection

    if connection:
        await connection.close()
        logger.info("RabbitMQ connection closed")


async def publish_result(job_id: str, result: dict):
    """Publish a result to the results queue."""
    global channel

    if channel:
        await channel.default_exchange.publish(
            aio_pika.Message(
                body=str({"job_id": job_id, **result}).encode(),
            ),
            routing_key="ai.results",
        )
