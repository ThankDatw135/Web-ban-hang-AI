from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # Application
    env: str = "development"
    debug: bool = True
    host: str = "0.0.0.0"
    port: int = 8000

    # RabbitMQ
    rabbitmq_url: str = "amqp://guest:guest@localhost:5672"

    # Database
    database_url: str = "postgresql://postgres:postgres@localhost:5432/fashion_ai_dev"

    # MinIO/S3
    minio_endpoint: str = "localhost:9000"
    minio_access_key: str = "minioadmin"
    minio_secret_key: str = "minioadmin"
    minio_bucket: str = "fashion-ai-dev"
    minio_secure: bool = False

    # Redis
    redis_url: str = "redis://:redis123@localhost:6379"

    # AI Models
    ai_model_path: str = "./models"
    viton_model: str = "viton-hd"

    # LLM
    llm_provider: str = "gemini"
    gemini_api_key: str = ""
    openai_api_key: str = ""

    # Rate Limiting
    max_tryon_per_minute: int = 5
    max_size_rec_per_minute: int = 20
    max_chat_per_minute: int = 30

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
