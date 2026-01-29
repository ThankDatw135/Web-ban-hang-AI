# Sơ Đồ Kiến Trúc Hệ Thống

Tài liệu mô tả chi tiết kiến trúc hệ thống với các sơ đồ trực quan.

---

## 1. Kiến Trúc Tổng Thể (High-Level Architecture)

```mermaid
flowchart TB
    subgraph ClientLayer["🌐 Tầng Client"]
        Web["Web Browser"]
        Mobile["Mobile App"]
    end

    subgraph CDN["CDN Layer"]
        CloudCDN["Cloudflare CDN"]
    end

    subgraph LoadBalancer["⚖️ Cân Bằng Tải"]
        Nginx["Nginx Reverse Proxy"]
    end

    subgraph ApplicationLayer["🖥️ Tầng Ứng Dụng"]
        subgraph FrontendCluster["Frontend Cluster"]
            FE1["Next.js Instance 1"]
            FE2["Next.js Instance 2"]
        end

        subgraph BackendCluster["Backend Cluster"]
            BE1["NestJS Instance 1"]
            BE2["NestJS Instance 2"]
        end

        subgraph AICluster["AI Service Cluster"]
            AI1["FastAPI Worker 1"]
            AI2["FastAPI Worker 2"]
        end
    end

    subgraph MessageLayer["📨 Tầng Message Queue"]
        RabbitMQ["RabbitMQ Cluster"]
    end

    subgraph CacheLayer["⚡ Tầng Cache"]
        Redis["Redis Cluster"]
    end

    subgraph DataLayer["💾 Tầng Dữ Liệu"]
        PostgreSQL["PostgreSQL Primary"]
        PostgreSQLReplica["PostgreSQL Replica"]
        MinIO["MinIO Object Storage"]
    end

    subgraph ExternalServices["🔌 Dịch Vụ Bên Ngoài"]
        MoMo["MoMo API"]
        ZaloPay["ZaloPay API"]
        LLM["LLM API (Gemini/OpenAI)"]
    end

    Web & Mobile --> CloudCDN
    CloudCDN --> Nginx
    Nginx --> FE1 & FE2
    Nginx --> BE1 & BE2
    FE1 & FE2 <--> BE1 & BE2
    BE1 & BE2 --> Redis
    BE1 & BE2 --> PostgreSQL
    BE1 & BE2 --> RabbitMQ
    BE1 & BE2 --> MoMo & ZaloPay
    RabbitMQ --> AI1 & AI2
    AI1 & AI2 --> MinIO
    AI1 & AI2 --> LLM
    AI1 & AI2 --> RabbitMQ
    PostgreSQL --> PostgreSQLReplica
```

---

## 2. Kiến Trúc Chi Tiết Theo Component

### 2.1. Frontend Architecture

```mermaid
flowchart TB
    subgraph Browser
        User["Người Dùng"]
    end

    subgraph NextJS["Next.js Application"]
        subgraph AppRouter["App Router"]
            Pages["Pages"]
            Layouts["Layouts"]
            Loading["Loading States"]
        end

        subgraph Components["Components Layer"]
            UI["UI Components"]
            Features["Feature Components"]
            Layouts2["Layout Components"]
        end

        subgraph StateManagement["State Management"]
            Zustand["Zustand Stores"]
            ReactQuery["React Query Cache"]
        end

        subgraph Services["Services Layer"]
            APIService["API Service"]
            WSService["WebSocket Service"]
            AuthService["Auth Service"]
        end
    end

    subgraph External["External"]
        BackendAPI["Backend REST API"]
        WebSocket["WebSocket Server"]
    end

    User --> Pages
    Pages --> Components
    Components --> StateManagement
    StateManagement --> Services
    APIService --> BackendAPI
    WSService --> WebSocket
```

### 2.2. Backend Architecture (NestJS)

```mermaid
flowchart TB
    subgraph API["API Gateway Layer"]
        Controller["Controllers"]
        Guards["Auth Guards"]
        Pipes["Validation Pipes"]
        Interceptors["Interceptors"]
    end

    subgraph Business["Business Logic Layer"]
        AuthService["Auth Service"]
        UserService["User Service"]
        ProductService["Product Service"]
        OrderService["Order Service"]
        PaymentService["Payment Service"]
        AIService["AI Service"]
    end

    subgraph Data["Data Access Layer"]
        PrismaService["Prisma ORM"]
        CacheService["Redis Cache"]
        QueueService["RabbitMQ"]
    end

    subgraph Providers["Providers"]
        JWT["JWT Provider"]
        RMQ["RabbitMQ Provider"]
        S3["S3 Provider"]
    end

    Controller --> Guards --> Pipes
    Pipes --> Business
    Business --> Data
    Business --> Providers
    Data --> PrismaService & CacheService & QueueService
```

### 2.3. AI Service Architecture

```mermaid
flowchart TB
    subgraph MessageQueue["RabbitMQ Queues"]
        TryOnQueue["ai.tryon.requests"]
        SizeQueue["ai.size.requests"]
        ChatQueue["ai.chat.requests"]
        ResultQueue["ai.results"]
    end

    subgraph FastAPI["FastAPI Application"]
        subgraph Consumers["Message Consumers"]
            TryOnConsumer["TryOn Consumer"]
            SizeConsumer["Size Consumer"]
            ChatConsumer["Chat Consumer"]
        end

        subgraph Workers["AI Workers"]
            TryOnWorker["Virtual TryOn Worker"]
            SizeWorker["Size Recommendation Worker"]
            ChatWorker["Chat Support Worker"]
        end

        subgraph Models["AI Models"]
            VITON["VITON-HD Model"]
            SizeML["Size ML Model"]
            LLMClient["LLM Client"]
        end

        subgraph Services["Services"]
            StorageService["S3 Storage Service"]
            RMQPublisher["RabbitMQ Publisher"]
        end
    end

    TryOnQueue --> TryOnConsumer --> TryOnWorker --> VITON
    SizeQueue --> SizeConsumer --> SizeWorker --> SizeML
    ChatQueue --> ChatConsumer --> ChatWorker --> LLMClient
    TryOnWorker & SizeWorker & ChatWorker --> StorageService
    TryOnWorker & SizeWorker & ChatWorker --> RMQPublisher --> ResultQueue
```

---

## 3. Deployment Architecture

```mermaid
flowchart TB
    subgraph Internet["Internet"]
        Users["👥 Users"]
    end

    subgraph CloudProvider["Cloud Provider"]
        subgraph Network["Network Layer"]
            DNS["DNS"]
            CDN["CDN"]
            LB["Load Balancer"]
        end

        subgraph Compute["Compute Layer"]
            subgraph Docker["Docker Host"]
                FrontendContainer["Frontend Container"]
                BackendContainer["Backend Container x2"]
                AIContainer["AI Service Container x2"]
                NginxContainer["Nginx Container"]
            end
        end

        subgraph Managed["Managed Services"]
            PostgreSQLService["PostgreSQL"]
            RedisService["Redis"]
            RabbitMQService["RabbitMQ"]
            S3Service["S3 / MinIO"]
        end
    end

    Users --> DNS --> CDN --> LB
    LB --> NginxContainer
    NginxContainer --> FrontendContainer
    NginxContainer --> BackendContainer
    BackendContainer --> PostgreSQLService
    BackendContainer --> RedisService
    BackendContainer --> RabbitMQService
    RabbitMQService --> AIContainer
    AIContainer --> S3Service
```

---

## 4. Network Flow Diagram

```mermaid
flowchart LR
    subgraph Public["Public Zone"]
        Internet["Internet"]
    end

    subgraph DMZ["DMZ"]
        LB["Load Balancer<br>:80, :443"]
    end

    subgraph Private["Private Zone"]
        Frontend["Frontend<br>:3000"]
        Backend["Backend<br>:3001"]
        WebSocket["WebSocket<br>:3001"]
    end

    subgraph Secure["Secure Zone"]
        PostgreSQL["PostgreSQL<br>:5432"]
        Redis["Redis<br>:6379"]
        RabbitMQ["RabbitMQ<br>:5672"]
        AIService["AI Service<br>:8000"]
        MinIO["MinIO<br>:9000"]
    end

    Internet -->|HTTPS| LB
    LB -->|HTTP| Frontend
    LB -->|HTTP| Backend
    LB -->|WS| WebSocket
    Frontend -->|HTTP| Backend
    Backend -->|TCP| PostgreSQL
    Backend -->|TCP| Redis
    Backend -->|AMQP| RabbitMQ
    RabbitMQ -->|AMQP| AIService
    AIService -->|HTTP| MinIO
```

---

## 5. Security Architecture

```mermaid
flowchart TB
    subgraph Client["Client Layer"]
        Browser["Browser"]
    end

    subgraph Edge["Edge Security"]
        WAF["Web Application Firewall"]
        DDoS["DDoS Protection"]
        SSL["SSL/TLS Termination"]
    end

    subgraph AppSecurity["Application Security"]
        RateLimit["Rate Limiting"]
        Auth["JWT Authentication"]
        RBAC["Role-Based Access Control"]
        InputVal["Input Validation"]
        SQLInj["SQL Injection Prevention"]
    end

    subgraph DataSecurity["Data Security"]
        Encryption["Data Encryption at Rest"]
        TLS["TLS in Transit"]
        Secrets["Secret Management"]
    end

    subgraph PaymentSecurity["Payment Security"]
        HMAC["HMAC Signature Verification"]
        IPWhitelist["IP Whitelist"]
        Idempotency["Idempotency Keys"]
    end

    Browser --> WAF --> DDoS --> SSL
    SSL --> RateLimit --> Auth --> RBAC
    RBAC --> InputVal --> SQLInj
    SQLInj --> Encryption & TLS
    PaymentSecurity --> HMAC & IPWhitelist & Idempotency
```

---

## 6. Monitoring & Observability

```mermaid
flowchart TB
    subgraph Applications["Applications"]
        Frontend["Frontend"]
        Backend["Backend"]
        AIService["AI Service"]
    end

    subgraph Logging["Logging"]
        Winston["Winston Logger"]
        ELK["ELK Stack"]
    end

    subgraph Metrics["Metrics"]
        Prometheus["Prometheus"]
        Grafana["Grafana Dashboards"]
    end

    subgraph Tracing["Distributed Tracing"]
        Jaeger["Jaeger"]
    end

    subgraph Alerting["Alerting"]
        AlertManager["Alert Manager"]
        PagerDuty["PagerDuty/Slack"]
    end

    Applications --> Winston --> ELK
    Applications --> Prometheus --> Grafana
    Applications --> Jaeger
    Prometheus --> AlertManager --> PagerDuty
```
