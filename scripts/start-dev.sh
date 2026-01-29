#!/bin/bash
# Quick start script for development

echo "🚀 Starting Fashion AI E-commerce Development Environment..."

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Navigate to deployment
cd deployment

# Copy env if not exists
if [ ! -f env/.env.development ]; then
    cp env/.env.example env/.env.development
    echo "📝 Created .env.development from template"
fi

# Start services
docker-compose up -d

echo ""
echo "✅ Services started!"
echo ""
echo "📌 URLs:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:3001/api"
echo "   Swagger:   http://localhost:3001/api/docs"
echo "   RabbitMQ:  http://localhost:15672"
echo "   MinIO:     http://localhost:9001"
echo ""
