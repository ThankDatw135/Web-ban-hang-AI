# Cài Đặt Môi Trường Phát Triển (Environment Setup)

Hướng dẫn chi tiết cài đặt môi trường phát triển cho dự án Fashion AI E-commerce.

---

## Mục Lục

1. [Yêu Cầu Phần Mềm](#1-yêu-cầu-phần-mềm)
2. [Cài Đặt Dependencies](#2-cài-đặt-dependencies)
3. [Cấu Hình Environment Variables](#3-cấu-hình-environment-variables)
4. [Khởi Động Services](#4-khởi-động-services)
5. [IDE Setup](#5-ide-setup)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Yêu Cầu Phần Mềm

### 1.1. Bắt Buộc

| Phần mềm       | Phiên bản | Download                           |
| -------------- | --------- | ---------------------------------- |
| Node.js        | 18.x LTS  | [nodejs.org](https://nodejs.org)   |
| Python         | 3.11+     | [python.org](https://python.org)   |
| Docker Desktop | Latest    | [docker.com](https://docker.com)   |
| Git            | Latest    | [git-scm.com](https://git-scm.com) |

### 1.2. Tùy Chọn (Nếu không dùng Docker)

| Phần mềm   | Phiên bản |
| ---------- | --------- |
| PostgreSQL | 15+       |
| Redis      | 7+        |
| RabbitMQ   | 3.12+     |

### 1.3. Kiểm Tra Versions

```bash
node -v      # v18.x.x
npm -v       # 9.x.x
python --version  # 3.11.x
docker --version  # 24.x.x
git --version     # 2.x.x
```

---

## 2. Cài Đặt Dependencies

### 2.1. Clone Repository

```bash
git clone https://github.com/your-org/fashion-ai-ecommerce.git
cd fashion-ai-ecommerce
```

### 2.2. Backend (NestJS)

```bash
cd backend

# Install packages
npm install

# Generate Prisma Client
npx prisma generate

# Copy environment file
cp .env.example .env
```

### 2.3. Frontend (Next.js)

```bash
cd frontend

# Install packages
npm install

# Copy environment file
cp .env.example .env.local
```

### 2.4. AI Service (Python)

```bash
cd ai-service

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate

# Install packages
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
```

---

## 3. Cấu Hình Environment Variables

### 3.1. Backend (.env)

```bash
# Application
NODE_ENV=development
PORT=3001
APP_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fashion_ai_dev

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis123

# RabbitMQ
RABBITMQ_URL=amqp://guest:guest@localhost:5672

# JWT
JWT_SECRET=your-development-secret-key-min-32-characters
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-characters
JWT_REFRESH_EXPIRES_IN=7d

# Storage (MinIO)
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=fashion-ai-dev
S3_REGION=us-east-1

# Payment (Sandbox)
MOMO_PARTNER_CODE=MOMO_SANDBOX
MOMO_ACCESS_KEY=sandbox_access_key
MOMO_SECRET_KEY=sandbox_secret_key
MOMO_ENDPOINT=https://test-payment.momo.vn/v2/gateway/api

ZALOPAY_APP_ID=sandbox_app_id
ZALOPAY_KEY1=sandbox_key1
ZALOPAY_KEY2=sandbox_key2
ZALOPAY_ENDPOINT=https://sb-openapi.zalopay.vn/v2

# CORS
CORS_ORIGINS=http://localhost:3000

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
```

### 3.2. Frontend (.env.local)

```bash
# API
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Storage
NEXT_PUBLIC_STORAGE_URL=http://localhost:9000/fashion-ai-dev

# Feature Flags
NEXT_PUBLIC_ENABLE_AI_FEATURES=true
NEXT_PUBLIC_ENABLE_VIRTUAL_TRYON=true
```

### 3.3. AI Service (.env)

```bash
# Application
ENV=development
DEBUG=true

# RabbitMQ
RABBITMQ_URL=amqp://guest:guest@localhost:5672

# Storage (MinIO)
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=fashion-ai-dev
MINIO_SECURE=false

# AI Models
AI_MODEL_PATH=./models
VITON_MODEL=viton-hd

# LLM (cho Chat AI)
LLM_PROVIDER=gemini
GEMINI_API_KEY=your-gemini-api-key
# hoặc
# LLM_PROVIDER=openai
# OPENAI_API_KEY=your-openai-api-key
```

---

## 4. Khởi Động Services

### 4.1. Sử Dụng Docker (Recommended)

```bash
cd deployment

# Copy environment
cp env/.env.example env/.env.development

# Khởi động infrastructure services
docker-compose up -d postgres redis rabbitmq minio

# Chờ services ready (~30s)
docker-compose ps

# Khởi động application
docker-compose up -d
```

### 4.2. Không Dùng Docker

**Terminal 1 - PostgreSQL & Redis & RabbitMQ:**

```bash
# Đảm bảo các services đã được cài đặt và chạy
# PostgreSQL: chạy trên port 5432
# Redis: chạy trên port 6379
# RabbitMQ: chạy trên port 5672
```

**Terminal 2 - Backend:**

```bash
cd backend

# Run database migrations
npx prisma migrate dev

# Seed data (optional)
npx prisma db seed

# Start development server
npm run start:dev
```

**Terminal 3 - Frontend:**

```bash
cd frontend
npm run dev
```

**Terminal 4 - AI Service:**

```bash
cd ai-service
source venv/bin/activate  # hoặc venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 4.3. Kiểm Tra Services

| Service      | URL                            | Status Check          |
| ------------ | ------------------------------ | --------------------- |
| Frontend     | http://localhost:3000          | Trang chủ hiển thị    |
| Backend API  | http://localhost:3001/api      | JSON response         |
| Swagger Docs | http://localhost:3001/api/docs | Swagger UI            |
| RabbitMQ     | http://localhost:15672         | guest/guest           |
| MinIO        | http://localhost:9001          | minioadmin/minioadmin |

---

## 5. IDE Setup

### 5.1. VS Code Extensions

**Required:**

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "prisma.prisma",
    "bradlc.vscode-tailwindcss",
    "ms-python.python",
    "ms-python.vscode-pylance"
  ]
}
```

**Optional:**

```json
{
  "recommendations": [
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "streetsidesoftware.code-spell-checker",
    "eamodio.gitlens"
  ]
}
```

### 5.2. VS Code Settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[python]": {
    "editor.defaultFormatter": "ms-python.python"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### 5.3. ESLint & Prettier

**Backend .eslintrc.js:**

```javascript
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
```

---

## 6. Troubleshooting

### 6.1. Database Connection Error

```bash
# Kiểm tra PostgreSQL đang chạy
docker ps | grep postgres

# Kiểm tra connection
npx prisma db pull

# Reset database
npx prisma migrate reset
```

### 6.2. Redis Connection Error

```bash
# Kiểm tra Redis đang chạy
docker ps | grep redis

# Test connection
redis-cli -h localhost -p 6379 -a redis123 ping
```

### 6.3. RabbitMQ Connection Error

```bash
# Kiểm tra RabbitMQ đang chạy
docker ps | grep rabbitmq

# Truy cập management UI
# http://localhost:15672 (guest/guest)
```

### 6.4. Port Already in Use

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3001
kill -9 <PID>
```

### 6.5. Node Modules Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### 6.6. Prisma Issues

```bash
# Regenerate Prisma Client
npx prisma generate

# Sync database schema
npx prisma db push

# View database
npx prisma studio
```

---

## Quick Reference

### Useful Commands

```bash
# Backend
npm run start:dev     # Development mode
npm run build         # Build production
npm run test          # Run tests
npm run lint          # Lint code
npx prisma studio     # Database GUI

# Frontend
npm run dev           # Development mode
npm run build         # Build production
npm run lint          # Lint code

# AI Service
uvicorn app.main:app --reload  # Development mode
pytest                         # Run tests

# Docker
docker-compose up -d           # Start all
docker-compose down            # Stop all
docker-compose logs -f backend # View logs
docker-compose restart backend # Restart service
```
