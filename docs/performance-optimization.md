# Tối Ưu Hiệu Năng Hệ Thống

> **Mục đích**: Hướng dẫn các kỹ thuật tối ưu hiệu năng cho backend và cách monitor hệ thống.

---

## 1. Query Database Optimization

### 1.1. Sử Dụng Select Chính Xác

```typescript
// ❌ KHÔNG NÊN: Lấy toàn bộ fields
const products = await prisma.product.findMany();

// ✅ NÊN: Chỉ lấy fields cần thiết
const products = await prisma.product.findMany({
  select: {
    id: true,
    name: true,
    price: true,
    slug: true,
  },
});
```

### 1.2. Sử Dụng Promise.all cho Parallel Queries

```typescript
// ❌ KHÔNG NÊN: Chạy tuần tự
const products = await prisma.product.findMany({ where });
const total = await prisma.product.count({ where });

// ✅ NÊN: Chạy song song
const [products, total] = await Promise.all([
  prisma.product.findMany({ where }),
  prisma.product.count({ where }),
]);
```

### 1.3. Database Indexes

```prisma
// schema.prisma - Thêm indexes cho các field thường query

model Product {
  // ... fields

  @@index([categoryId, isActive])  // Filter by category
  @@index([price])                 // Sort by price
  @@index([createdAt])             // Sort by newest
}

model Order {
  // ... fields

  @@index([userId, status])        // User's orders by status
  @@index([createdAt])             // Sort by date
}
```

---

## 2. Redis Caching

### 2.1. Caching Strategy

| Dữ liệu             | TTL     | Invalidate khi        |
| ------------------- | ------- | --------------------- |
| Categories          | 1 giờ   | Admin update category |
| Product List (page) | 5 phút  | Admin update product  |
| Product Detail      | 10 phút | Admin update product  |
| User Session        | 7 ngày  | User logout           |

### 2.2. Cache Key Format

```typescript
// Format: {module}:{action}:{params_hash}

// Ví dụ:
"categories:all"; // Tất cả categories
"products:list:page=1:limit=10:cat=ao"; // Product list
"products:detail:slug=ao-thun-nam"; // Product detail
"user:session:user123"; // User session
```

### 2.3. Cache Invalidation

```typescript
// Khi admin update product
async updateProduct(id: string, dto: UpdateProductDto) {
  const product = await this.prisma.product.update({ ... });

  // Xóa cache liên quan
  await this.redis.del(`products:detail:${product.slug}`);
  await this.redis.del('products:list:*');  // Pattern delete

  return product;
}
```

---

## 3. Queue & Stream Processing

### 3.1. RabbitMQ Queues

| Queue                 | Mục đích                | Priority |
| --------------------- | ----------------------- | -------- |
| `ai.tryon`            | Virtual try-on requests | High     |
| `ai.size`             | Size recommendations    | Medium   |
| `ai.chat`             | AI chat messages        | Medium   |
| `notifications.email` | Email notifications     | Low      |
| `notifications.push`  | Push notifications      | Low      |
| `analytics.events`    | Event tracking          | Low      |

### 3.2. Dead Letter Queue (DLQ)

```typescript
// Cấu hình DLQ cho retry failed messages
const queueOptions = {
  durable: true,
  arguments: {
    "x-dead-letter-exchange": "dlx",
    "x-dead-letter-routing-key": "failed",
    "x-message-ttl": 30000, // 30 giây timeout
  },
};

// Retry strategy: 3 lần với exponential backoff
// Retry 1: sau 1 giây
// Retry 2: sau 5 giây
// Retry 3: sau 30 giây
// Sau 3 lần fail → chuyển vào DLQ để review thủ công
```

---

## 4. Memory Management

### 4.1. Pagination Bắt Buộc

```typescript
// Luôn giới hạn số lượng records trả về
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

async findAll(filter: ProductFilterDto) {
  const limit = Math.min(filter.limit || DEFAULT_LIMIT, MAX_LIMIT);
  const skip = filter.skip || 0;

  return prisma.product.findMany({
    take: limit,
    skip,
    // ...
  });
}
```

### 4.2. Streaming cho Large Data

```typescript
// Sử dụng stream thay vì load toàn bộ vào memory
import { createReadStream } from 'fs';

// Export large data to CSV
async exportOrders(): Promise<ReadableStream> {
  const cursor = await prisma.order.findMany({
    cursor: { id: lastId },
    take: 1000,
    // ...
  });

  // Process in batches, không load hết vào RAM
}
```

---

## 5. API Response Optimization

### 5.1. Response Compression

```typescript
// main.ts - Enable gzip compression
import * as compression from "compression";

app.use(compression());
```

### 5.2. Field Filtering (Sparse Fieldsets)

```typescript
// API cho phép client chọn fields cần lấy
// GET /products?fields=id,name,price

async findAll(filter: ProductFilterDto) {
  const select = this.buildSelectFromFields(filter.fields);

  return prisma.product.findMany({ select });
}
```

---

## 6. Monitoring & Metrics

### 6.1. Health Check Endpoints

```typescript
// GET /api/health
{
  "status": "ok",
  "uptime": 123456,
  "database": "connected",
  "redis": "connected",
  "rabbitmq": "connected"
}
```

### 6.2. Performance Logging

```typescript
// Log slow queries (> 500ms)
const start = Date.now();
const result = await prisma.product.findMany({ ... });
const duration = Date.now() - start;

if (duration > 500) {
  this.logger.warn(`Slow query: findProducts took ${duration}ms`);
}
```

---

## 7. Checklist Tối Ưu

Trước khi deploy, kiểm tra:

- [ ] Tất cả queries có pagination
- [ ] Không có N+1 query problem
- [ ] Cache được setup cho data ít thay đổi
- [ ] Database có indexes cho các fields thường filter/sort
- [ ] API responses được compress
- [ ] Health check endpoint hoạt động
- [ ] Slow query logging được bật
