# Kiến Trúc Hệ Thống - Ứng Dụng Web Bán Quần Áo AI

## Tổng Quan

Hệ thống thương mại điện tử bán quần áo tích hợp AI với kiến trúc microservices.

---

## Sơ Đồ Kiến Trúc Tổng Thể

```mermaid
flowchart TB
    subgraph Internet
        Client["🌐 Người Dùng"]
    end

    subgraph LoadBalancer["Cân Bằng Tải"]
        Nginx["Nginx Reverse Proxy"]
    end

    subgraph Frontend["Frontend Layer"]
        NextJS["Next.js App<br/>TypeScript"]
    end

    subgraph Backend["Backend Layer"]
        NestJS["NestJS API<br/>TypeScript"]
        WS["WebSocket Gateway"]
    end

    subgraph Queue["Message Queue"]
        RabbitMQ["RabbitMQ"]
    end

    subgraph AI["AI Service Layer"]
        FastAPI["FastAPI<br/>Python"]
        TryOn["Worker Thử Đồ"]
        Size["Worker Size"]
        Chat["Worker Chat"]
    end

    subgraph Data["Data Layer"]
        PostgreSQL[(PostgreSQL)]
        Redis[(Redis Cache)]
        MinIO[(MinIO/S3)]
    end

    Client --> Nginx
    Nginx --> NextJS
    Nginx --> NestJS
    NextJS <--> NestJS
    NextJS <--> WS
    NestJS --> PostgreSQL
    NestJS --> Redis
    NestJS --> RabbitMQ
    RabbitMQ --> FastAPI
    FastAPI --> TryOn & Size & Chat
    FastAPI --> MinIO
    FastAPI --> RabbitMQ
    RabbitMQ --> NestJS
```

---

## Các Thành Phần

### 1. Frontend (Next.js)

**Công nghệ:**

- Next.js 14+ (App Router)
- TypeScript
- TailwindCSS
- Zustand (State Management)
- Socket.io Client

**Chức năng:**

- Server-Side Rendering (SEO)
- Client-side navigation
- Real-time updates via WebSocket
- Responsive design

---

### 2. Backend (NestJS)

**Công nghệ:**

- NestJS Framework
- TypeScript
- Prisma ORM
- Passport.js (Auth)
- Socket.io Server

**Modules:**
| Module | Chức năng |
|--------|-----------|
| Auth | JWT authentication, refresh token |
| Users | Quản lý người dùng, hồ sơ |
| Products | CRUD sản phẩm, tìm kiếm |
| Cart | Giỏ hàng (Redis-backed) |
| Orders | Quản lý đơn hàng, state machine |
| Payments | Tích hợp MoMo, ZaloPay, Bank |
| AI | Điều phối tác vụ AI |
| WebSocket | Real-time notifications |
| Queue | RabbitMQ producer/consumer |

---

### 3. AI Service (FastAPI)

**Công nghệ:**

- Python 3.11+
- FastAPI
- Pika (RabbitMQ)
- Boto3 (S3)
- PyTorch / TensorFlow

**Workers:**
| Worker | Chức năng |
|--------|-----------|
| tryon_worker | Thử đồ ảo với AI |
| size_worker | Gợi ý kích thước |
| chat_worker | Hỗ trợ khách hàng (LLM) |

---

### 4. Message Queue (RabbitMQ)

**Queues:**

```
ai.tryon.requests    → Yêu cầu thử đồ
ai.size.requests     → Yêu cầu gợi ý size
ai.chat.requests     → Tin nhắn chat
ai.results           → Kết quả AI → Backend
```

**Flow:**

```mermaid
sequenceDiagram
    participant Client
    participant Backend
    participant RabbitMQ
    participant AIService
    participant Storage

    Client->>Backend: POST /ai/try-on
    Backend->>Backend: Tạo AIJob (PENDING)
    Backend->>RabbitMQ: Publish message
    Backend-->>Client: 202 Accepted (jobId)

    RabbitMQ->>AIService: Consume message
    AIService->>AIService: Xử lý AI
    AIService->>Storage: Upload kết quả
    AIService->>RabbitMQ: Publish result

    RabbitMQ->>Backend: Consume result
    Backend->>Backend: Cập nhật AIJob (COMPLETED)
    Backend-->>Client: WebSocket: ai:job:result
```

---

### 5. Database (PostgreSQL)

**Cấu hình:**

- PostgreSQL 15+
- Connection pooling (PgBouncer)
- Backup hàng ngày

**Schema Groups:**

- Users & Auth
- Products & Categories
- Orders & Payments
- AI Jobs & Chat

---

### 6. Cache (Redis)

**Mục đích:**
| Key Pattern | Mô tả | TTL |
|-------------|-------|-----|
| `session:*` | User sessions | 24h |
| `cart:*` | Giỏ hàng guest | 7d |
| `product:*` | Cache sản phẩm | 1h |
| `rate:*` | Rate limiting | 1m |
| `ai:job:*` | Trạng thái AI job | 1h |

---

### 7. Object Storage (MinIO/S3)

**Buckets:**
| Bucket | Nội dung |
|--------|----------|
| `products` | Ảnh sản phẩm |
| `avatars` | Ảnh đại diện user |
| `ai-inputs` | Ảnh upload cho AI |
| `ai-results` | Kết quả AI (try-on) |

---

## Luồng Dữ Liệu Chính

### Luồng Đăng Nhập

```mermaid
sequenceDiagram
    participant Client
    participant Backend
    participant Redis
    participant PostgreSQL

    Client->>Backend: POST /auth/login
    Backend->>PostgreSQL: Tìm user
    Backend->>Backend: Verify password
    Backend->>Backend: Generate JWT
    Backend->>Redis: Lưu refresh token
    Backend-->>Client: Access + Refresh Token
```

### Luồng Đặt Hàng

```mermaid
sequenceDiagram
    participant Client
    participant Backend
    participant PostgreSQL
    participant PaymentGateway

    Client->>Backend: POST /orders
    Backend->>PostgreSQL: Tạo Order (PENDING)
    Backend->>PostgreSQL: Tạo OrderItems
    Backend->>PostgreSQL: Giảm stock
    Backend-->>Client: Order created

    Client->>Backend: POST /payments/initiate
    Backend->>PaymentGateway: Tạo thanh toán
    PaymentGateway-->>Backend: Payment URL
    Backend-->>Client: Redirect to payment

    PaymentGateway->>Backend: Webhook callback
    Backend->>PostgreSQL: Cập nhật Payment
    Backend->>PostgreSQL: Cập nhật Order status
```

---

## Bảo Mật

### Authentication

- JWT Access Token (15 phút)
- Refresh Token (7 ngày, rotate on use)
- Bcrypt password hashing

### Authorization

- Role-based: USER, ADMIN
- Guard-level protection
- Resource ownership validation

### API Security

- HTTPS only
- CORS configuration
- Rate limiting (Redis)
- Input validation (class-validator)
- SQL injection prevention (Prisma)

### Payment Security

- HMAC signature verification
- Idempotency keys
- Webhook IP whitelist
- Sensitive data encryption

---

## Scalability

### Horizontal Scaling

```mermaid
flowchart LR
    LB[Load Balancer] --> BE1[Backend 1]
    LB --> BE2[Backend 2]
    LB --> BE3[Backend 3]

    BE1 & BE2 & BE3 --> DB[(PostgreSQL<br/>Primary)]
    BE1 & BE2 & BE3 --> Redis[(Redis<br/>Cluster)]
    BE1 & BE2 & BE3 --> RMQ[RabbitMQ]

    RMQ --> AI1[AI Worker 1]
    RMQ --> AI2[AI Worker 2]
```

### Caching Strategy

- **L1:** In-memory (NestJS Cache)
- **L2:** Redis (shared)
- **L3:** CDN (static assets)

---

## Monitoring & Logging

### Logging

- Winston (Backend)
- Structured JSON logs
- Log levels: error, warn, info, debug

### Metrics

- Prometheus + Grafana
- API response times
- Queue depths
- Error rates

### Health Checks

- `/health` endpoint
- Database connectivity
- Redis connectivity
- RabbitMQ connectivity

---

## Deployment

### Docker Containers

| Service    | Port        | Replicas      |
| ---------- | ----------- | ------------- |
| frontend   | 3000        | 2+            |
| backend    | 3001        | 2+            |
| ai-service | 8000        | 2+            |
| postgres   | 5432        | 1 (+ replica) |
| redis      | 6379        | 1 (+ replica) |
| rabbitmq   | 5672, 15672 | 1             |
| minio      | 9000, 9001  | 1             |
| nginx      | 80, 443     | 1             |

### Environments

- **Development:** Docker Compose local
- **Staging:** Docker Compose on VPS
- **Production:** Kubernetes / Docker Swarm
