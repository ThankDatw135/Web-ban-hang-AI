from fastapi import APIRouter

router = APIRouter()


@router.get("/status/{job_id}")
async def get_job_status(job_id: str):
    """Get the status of an AI job."""
    # TODO: Implement job status lookup
    return {
        "job_id": job_id,
        "status": "pending",
    }
