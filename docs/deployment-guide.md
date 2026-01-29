# Hướng Dẫn Triển Khai (Deployment Guide)

Tài liệu hướng dẫn triển khai hệ thống Fashion AI E-commerce.

---

## Mục Lục

1. [Yêu Cầu Hệ Thống](#1-yêu-cầu-hệ-thống)
2. [Triển Khai Development](#2-triển-khai-development)
3. [Triển Khai Staging](#3-triển-khai-staging)
4. [Triển Khai Production](#4-triển-khai-production)
5. [CI/CD Pipeline](#5-cicd-pipeline)
6. [Rollback & Recovery](#6-rollback--recovery)

---

## 1. Yêu Cầu Hệ Thống

### Hardware Requirements

| Môi trường  | CPU      | RAM    | Storage     |
| ----------- | -------- | ------ | ----------- |
| Development | 2 cores  | 4 GB   | 20 GB       |
| Staging     | 4 cores  | 8 GB   | 50 GB       |
| Production  | 8+ cores | 16+ GB | 100+ GB SSD |

### Software Requirements

| Phần mềm       | Phiên bản |
| -------------- | --------- |
| Docker         | 24.0+     |
| Docker Compose | 2.20+     |
| Node.js        | 18 LTS    |
| Python         | 3.11+     |
| PostgreSQL     | 15+       |
| Redis          | 7+        |
| RabbitMQ       | 3.12+     |

---

## 2. Triển Khai Development

### 2.1. Sử Dụng Docker Compose

```bash
# Clone repository
git clone https://github.com/your-org/fashion-ai-ecommerce.git
cd fashion-ai-ecommerce

# Copy environment file
cd deployment
cp env/.env.example env/.env.development

# Khởi động tất cả services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Kiểm tra trạng thái
docker-compose ps

# Xem logs
docker-compose logs -f backend
```

### 2.2. Docker Compose Files

**docker-compose.yml** (Base):

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  rabbitmq:
    image: rabbitmq:3.12-management-alpine
    environment:
      RABBITMQ_DEFAULT_USER: ${RABBITMQ_USER}
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASS}
    ports:
      - "5672:5672"
      - "15672:15672"
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: ${MINIO_ACCESS_KEY}
      MINIO_ROOT_PASSWORD: ${MINIO_SECRET_KEY}
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data

  backend:
    build:
      context: ../backend
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}
      - REDIS_URL=redis://:${REDIS_PASSWORD}@redis:6379
      - RABBITMQ_URL=amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@rabbitmq:5672
    ports:
      - "3001:3001"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
      rabbitmq:
        condition: service_started

  frontend:
    build:
      context: ../frontend
      dockerfile: Dockerfile
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3001/api
    ports:
      - "3000:3000"
    depends_on:
      - backend

  ai-service:
    build:
      context: ../ai-service
      dockerfile: Dockerfile
    environment:
      - RABBITMQ_URL=amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@rabbitmq:5672
      - MINIO_ENDPOINT=minio:9000
    depends_on:
      - rabbitmq
      - minio

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.dev.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  redis_data:
  rabbitmq_data:
  minio_data:
```

### 2.3. Services URLs

| Service        | URL                            |
| -------------- | ------------------------------ |
| Frontend       | http://localhost:3000          |
| Backend API    | http://localhost:3001/api      |
| Swagger Docs   | http://localhost:3001/api/docs |
| RabbitMQ Admin | http://localhost:15672         |
| MinIO Console  | http://localhost:9001          |

---

## 3. Triển Khai Staging

### 3.1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 3.2. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot -y

# Get certificate
sudo certbot certonly --standalone -d staging.example.com

# Auto-renew (crontab)
0 0 1 * * /usr/bin/certbot renew --quiet
```

### 3.3. Deploy

```bash
# Clone và deploy
git clone https://github.com/your-org/fashion-ai-ecommerce.git
cd fashion-ai-ecommerce/deployment

# Setup environment
cp env/.env.example env/.env.staging
nano env/.env.staging  # Edit với staging values

# Deploy
docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d
```

---

## 4. Triển Khai Production

### 4.1. Infrastructure Architecture

```
                    ┌─────────────┐
                    │   Cloudflare │
                    │     (CDN)    │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   Nginx LB   │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼───────┐  ┌───────▼───────┐  ┌───────▼───────┐
│  Frontend 1   │  │  Frontend 2   │  │  Backend 1-3  │
└───────────────┘  └───────────────┘  └───────┬───────┘
                                              │
        ┌─────────────────────────────────────┤
        │                  │                  │
┌───────▼───────┐  ┌───────▼───────┐  ┌───────▼───────┐
│  PostgreSQL   │  │     Redis     │  │   RabbitMQ    │
│   Primary     │  │    Cluster    │  │    Cluster    │
└───────────────┘  └───────────────┘  └───────────────┘
```

### 4.2. Production Environment Variables

```bash
# .env.production
NODE_ENV=production

# Database (Managed PostgreSQL)
DATABASE_URL=postgresql://user:pass@db.example.com:5432/fashion_ai?sslmode=require

# Redis (Managed Redis)
REDIS_URL=rediss://user:pass@redis.example.com:6379

# RabbitMQ (Managed)
RABBITMQ_URL=amqps://user:pass@rabbitmq.example.com:5671

# Storage (AWS S3)
S3_ENDPOINT=https://s3.ap-southeast-1.amazonaws.com
S3_BUCKET=fashion-ai-prod
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Payment
MOMO_PARTNER_CODE=xxx
MOMO_ACCESS_KEY=xxx
MOMO_SECRET_KEY=xxx
ZALOPAY_APP_ID=xxx
ZALOPAY_KEY1=xxx
ZALOPAY_KEY2=xxx

# AI Service
LLM_API_KEY=xxx
```

### 4.3. Production Docker Compose

```yaml
# docker-compose.prod.yml
version: "3.8"

services:
  backend:
    image: registry.example.com/fashion-ai/backend:${VERSION}
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: "2"
          memory: 2G
      restart_policy:
        condition: on-failure
        max_attempts: 3
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    image: registry.example.com/fashion-ai/frontend:${VERSION}
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: "1"
          memory: 1G

  ai-service:
    image: registry.example.com/fashion-ai/ai-service:${VERSION}
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: "4"
          memory: 8G
```

### 4.4. Deploy Script

```bash
#!/bin/bash
# deploy-prod.sh

set -e

VERSION=$1
if [ -z "$VERSION" ]; then
    echo "Usage: ./deploy-prod.sh <version>"
    exit 1
fi

echo "🚀 Deploying version $VERSION to production..."

# Pull new images
docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull

# Rolling update
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps --scale backend=3 backend
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps --scale frontend=2 frontend
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps --scale ai-service=2 ai-service

# Health check
sleep 30
curl -f http://localhost:3001/health || exit 1

echo "✅ Deployment complete!"
```

---

## 5. CI/CD Pipeline

### 5.1. GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
    tags: ["v*"]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"
          cache-dependency-path: backend/package-lock.json

      - name: Install & Test Backend
        run: |
          cd backend
          npm ci
          npm run test
          npm run test:e2e

      - name: Install & Test Frontend
        run: |
          cd frontend
          npm ci
          npm run test
          npm run build

  build:
    needs: test
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/')
    steps:
      - uses: actions/checkout@v4

      - name: Login to Registry
        uses: docker/login-action@v3
        with:
          registry: registry.example.com
          username: ${{ secrets.REGISTRY_USER }}
          password: ${{ secrets.REGISTRY_PASS }}

      - name: Build & Push Images
        run: |
          VERSION=${GITHUB_REF#refs/tags/}

          docker build -t registry.example.com/fashion-ai/backend:$VERSION ./backend
          docker build -t registry.example.com/fashion-ai/frontend:$VERSION ./frontend
          docker build -t registry.example.com/fashion-ai/ai-service:$VERSION ./ai-service

          docker push registry.example.com/fashion-ai/backend:$VERSION
          docker push registry.example.com/fashion-ai/frontend:$VERSION
          docker push registry.example.com/fashion-ai/ai-service:$VERSION

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Deploy to Staging
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.STAGING_HOST }}
          username: deploy
          key: ${{ secrets.DEPLOY_KEY }}
          script: |
            cd /app
            VERSION=${GITHUB_REF#refs/tags/}
            ./deploy-staging.sh $VERSION

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to Production
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.PROD_HOST }}
          username: deploy
          key: ${{ secrets.DEPLOY_KEY }}
          script: |
            cd /app
            VERSION=${GITHUB_REF#refs/tags/}
            ./deploy-prod.sh $VERSION
```

---

## 6. Rollback & Recovery

### 6.1. Quick Rollback

```bash
#!/bin/bash
# rollback.sh

PREVIOUS_VERSION=$1

if [ -z "$PREVIOUS_VERSION" ]; then
    # Get previous version from history
    PREVIOUS_VERSION=$(docker images --format "{{.Tag}}" registry.example.com/fashion-ai/backend | head -2 | tail -1)
fi

echo "🔄 Rolling back to version $PREVIOUS_VERSION..."

VERSION=$PREVIOUS_VERSION docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

echo "✅ Rollback complete!"
```

### 6.2. Database Rollback

```bash
# Rollback last migration
cd backend
npx prisma migrate reset --skip-generate

# Restore from backup
pg_restore -h localhost -U postgres -d fashion_ai backup_20260129.dump
```

### 6.3. Backup Strategy

```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
BACKUP_DIR=/backups

# PostgreSQL
pg_dump -h localhost -U postgres fashion_ai > $BACKUP_DIR/db_$DATE.sql
gzip $BACKUP_DIR/db_$DATE.sql

# MinIO/S3 sync
aws s3 sync s3://fashion-ai-prod $BACKUP_DIR/s3_$DATE/

# Cleanup old backups (keep 30 days)
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete
```

---

## Checklist Triển Khai

### Pre-deployment

- [ ] Tests pass 100%
- [ ] Environment variables configured
- [ ] SSL certificates ready
- [ ] DNS configured
- [ ] Backup completed

### Deployment

- [ ] Images built & pushed
- [ ] Database migrations run
- [ ] Services healthy
- [ ] Health check passing

### Post-deployment

- [ ] Smoke tests pass
- [ ] Monitoring active
- [ ] Alerts configured
- [ ] Documentation updated
