# 🛒 Fashion AI E-commerce

Hệ thống thương mại điện tử bán quần áo tích hợp AI với các tính năng: thử đồ ảo, gợi ý kích thước, và hỗ trợ khách hàng bằng AI.

---

## 📋 Mục Lục

- [Tổng Quan](#tổng-quan)
- [Tính Năng](#tính-năng)
- [Công Nghệ](#công-nghệ)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Bắt Đầu Nhanh](#bắt-đầu-nhanh)
- [Tài Liệu](#tài-liệu)
- [Đóng Góp](#đóng-góp)

---

## 🎯 Tổng Quan

Fashion AI là nền tảng e-commerce hiện đại cho ngành thời trang, kết hợp trải nghiệm mua sắm truyền thống với công nghệ AI tiên tiến.

### Điểm Nổi Bật

- 🤖 **AI-Powered**: Thử đồ ảo, gợi ý size thông minh, chatbot hỗ trợ 24/7
- 🛍️ **E-commerce Hoàn Chỉnh**: Quản lý sản phẩm, giỏ hàng, đơn hàng, thanh toán
- 💳 **Thanh Toán Đa Dạng**: COD, Chuyển khoản, MoMo, ZaloPay
- 🔒 **Bảo Mật Cao**: JWT, RBAC, HTTPS, Rate limiting
- 📱 **Responsive**: Tương thích mọi thiết bị
- 🚀 **Production-Ready**: Docker, CI/CD, Monitoring

---

## ✨ Tính Năng

### Khách Hàng

| Tính năng         | Mô tả                     |
| ----------------- | ------------------------- |
| Đăng ký/Đăng nhập | JWT Authentication        |
| Duyệt sản phẩm    | Tìm kiếm, lọc, phân trang |
| Giỏ hàng          | Thêm, sửa, xóa sản phẩm   |
| Đặt hàng          | Checkout đa bước          |
| Thanh toán        | COD, Bank, MoMo, ZaloPay  |
| Thử đồ ảo         | AI Virtual Try-On         |
| Gợi ý size        | AI Size Recommendation    |
| Chat AI           | Hỗ trợ 24/7               |

### Quản Trị Viên

| Tính năng          | Mô tả                      |
| ------------------ | -------------------------- |
| Quản lý sản phẩm   | CRUD sản phẩm, danh mục    |
| Quản lý đơn hàng   | Xử lý, cập nhật trạng thái |
| Quản lý người dùng | Xem, khóa tài khoản        |
| Thống kê           | Dashboard báo cáo          |

---

## 🛠️ Công Nghệ

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State**: Zustand
- **Real-time**: Socket.io Client

### Backend

- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: Prisma
- **Auth**: JWT + Passport
- **Queue**: RabbitMQ
- **Cache**: Redis

### AI Service

- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Models**: VITON-HD, LLM APIs

### Infrastructure

- **Database**: PostgreSQL
- **Cache**: Redis
- **Queue**: RabbitMQ
- **Storage**: MinIO / S3
- **Proxy**: Nginx
- **Container**: Docker

---

## 📁 Cấu Trúc Dự Án

```
fashion-ai-ecommerce/
├── frontend/           # Next.js application
│   ├── src/
│   │   ├── app/       # Pages (App Router)
│   │   ├── components/
│   │   ├── services/
│   │   ├── stores/
│   │   └── utils/
│   └── Dockerfile
│
├── backend/            # NestJS API
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── payments/
│   │   ├── ai/
│   │   └── websocket/
│   ├── prisma/
│   └── Dockerfile
│
├── ai-service/         # Python FastAPI
│   ├── app/
│   │   ├── workers/
│   │   ├── models/
│   │   └── services/
│   └── Dockerfile
│
├── database/           # DB schemas
│   └── prisma/
│
├── deployment/         # Docker configs
│   ├── docker-compose.yml
│   ├── nginx/
│   └── env/
│
└── docs/               # Documentation
```

---

## 🚀 Bắt Đầu Nhanh

### Yêu Cầu

- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- Git

### 1. Clone Repository

```bash
git clone https://github.com/your-org/fashion-ai-ecommerce.git
cd fashion-ai-ecommerce
```

### 2. Khởi Động với Docker

```bash
# Development
cd deployment
cp env/.env.example env/.env.development
docker-compose up -d

# Truy cập
# Frontend: http://localhost:3000
# Backend:  http://localhost:3001/api
# API Docs: http://localhost:3001/api/docs
```

### 3. Phát Triển Không Dùng Docker

```bash
# Backend
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run start:dev

# Frontend
cd frontend
npm install
cp .env.example .env.local
npm run dev

# AI Service
cd ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## 📚 Tài Liệu

| Tài liệu                                                 | Mô tả                        |
| -------------------------------------------------------- | ---------------------------- |
| [Kiến Trúc](./docs/architecture.md)                      | Tổng quan kiến trúc hệ thống |
| [Sơ Đồ Kiến Trúc](./docs/system-architecture-diagram.md) | Sơ đồ trực quan              |
| [API Specification](./docs/api-spec.md)                  | Đặc tả API                   |
| [API Contract](./docs/api-contract.md)                   | OpenAPI 3.0 spec             |
| [Database Schema](./docs/database-schema.md)             | Cấu trúc CSDL                |
| [ERD Diagram](./docs/erd-diagram.md)                     | Sơ đồ quan hệ thực thể       |
| [UML Diagrams](./docs/uml-diagrams.md)                   | Use Case, Sequence, Activity |
| [Payment Flow](./docs/payment-flow.md)                   | Luồng thanh toán             |
| [AI Flow](./docs/ai-flow.md)                             | Luồng xử lý AI               |
| [Deployment Guide](./docs/deployment-guide.md)           | Hướng dẫn triển khai         |
| [Environment Setup](./docs/environment-setup.md)         | Cài đặt môi trường           |
| [Security](./docs/security.md)                           | Bảo mật hệ thống             |
| [Admin Manual](./docs/admin-manual.md)                   | Hướng dẫn quản trị           |

---

## 🤝 Đóng Góp

1. Fork repository
2. Tạo branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

---

## 📄 License

MIT License - xem [LICENSE](LICENSE) để biết thêm chi tiết.

---

## 📞 Liên Hệ

- **Email**: support@example.com
- **Website**: https://example.com
- **Issues**: [GitHub Issues](https://github.com/your-org/fashion-ai-ecommerce/issues)
