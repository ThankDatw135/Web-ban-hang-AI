import structlog
from minio import Minio
from app.config import get_settings

settings = get_settings()
logger = structlog.get_logger()


def get_minio_client() -> Minio:
    """Get MinIO client instance."""
    return Minio(
        settings.minio_endpoint,
        access_key=settings.minio_access_key,
        secret_key=settings.minio_secret_key,
        secure=settings.minio_secure,
    )


async def upload_file(file_path: str, object_name: str) -> str:
    """Upload a file to MinIO/S3."""
    client = get_minio_client()

    # Ensure bucket exists
    if not client.bucket_exists(settings.minio_bucket):
        client.make_bucket(settings.minio_bucket)

    client.fput_object(
        settings.minio_bucket,
        object_name,
        file_path,
    )

    url = f"{'https' if settings.minio_secure else 'http'}://{settings.minio_endpoint}/{settings.minio_bucket}/{object_name}"
    logger.info("File uploaded", object_name=object_name, url=url)

    return url


async def download_file(object_name: str, file_path: str):
    """Download a file from MinIO/S3."""
    client = get_minio_client()

    client.fget_object(
        settings.minio_bucket,
        object_name,
        file_path,
    )

    logger.info("File downloaded", object_name=object_name, file_path=file_path)
