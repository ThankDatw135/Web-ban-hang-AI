@echo off
REM Quick start script for development (Windows)

echo 🚀 Starting Fashion AI E-commerce Development Environment...

REM Check Docker
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    exit /b 1
)

REM Navigate to deployment
cd deployment

REM Copy env if not exists
if not exist env\.env.development (
    copy env\.env.example env\.env.development
    echo 📝 Created .env.development from template
)

REM Start services
docker-compose up -d

echo.
echo ✅ Services started!
echo.
echo 📌 URLs:
echo    Frontend:  http://localhost:3000
echo    Backend:   http://localhost:3001/api
echo    Swagger:   http://localhost:3001/api/docs
echo    RabbitMQ:  http://localhost:15672
echo    MinIO:     http://localhost:9001
echo.
