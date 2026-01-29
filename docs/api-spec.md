# API Specification - Ứng Dụng Web Bán Quần Áo AI

Tài liệu đặc tả API đầy đủ cho hệ thống.

**Base URL:** `http://localhost:3001/api`

---

## Mục Lục

1. [Xác Thực (Auth)](#1-xác-thực-auth)
2. [Người Dùng (Users)](#2-người-dùng-users)
3. [Sản Phẩm (Products)](#3-sản-phẩm-products)
4. [Danh Mục (Categories)](#4-danh-mục-categories)
5. [Giỏ Hàng (Cart)](#5-giỏ-hàng-cart)
6. [Đơn Hàng (Orders)](#6-đơn-hàng-orders)
7. [Thanh Toán (Payments)](#7-thanh-toán-payments)
8. [AI Features](#8-ai-features)

---

## 1. Xác Thực (Auth)

### POST /auth/register

Đăng ký tài khoản mới.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "Nguyễn",
  "lastName": "Văn A",
  "phone": "0901234567"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx...",
      "email": "user@example.com",
      "firstName": "Nguyễn",
      "lastName": "Văn A",
      "role": "USER"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

---

### POST /auth/login

Đăng nhập vào hệ thống.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "user": { ... },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

---

### POST /auth/refresh

Làm mới access token.

**Request Body:**

```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

---

### POST /auth/logout

Đăng xuất và hủy refresh token.

**Headers:** `Authorization: Bearer <accessToken>`

**Response (200):**

```json
{
  "success": true,
  "message": "Đăng xuất thành công"
}
```

---

## 2. Người Dùng (Users)

### GET /users/me

Lấy thông tin người dùng hiện tại.

**Headers:** `Authorization: Bearer <accessToken>`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "email": "user@example.com",
    "firstName": "Nguyễn",
    "lastName": "Văn A",
    "phone": "0901234567",
    "avatar": "https://...",
    "role": "USER",
    "height": 170,
    "weight": 65,
    "chest": 95,
    "waist": 80,
    "hips": 98
  }
}
```

---

### PATCH /users/me

Cập nhật thông tin người dùng.

**Headers:** `Authorization: Bearer <accessToken>`

**Request Body:**

```json
{
  "firstName": "Nguyễn Updated",
  "phone": "0909999999",
  "height": 172,
  "weight": 68
}
```

**Response (200):**

```json
{
  "success": true,
  "data": { ... }
}
```

---

### GET /users/me/addresses

Lấy danh sách địa chỉ.

**Headers:** `Authorization: Bearer <accessToken>`

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "fullName": "Nguyễn Văn A",
      "phone": "0901234567",
      "street": "123 Đường ABC",
      "ward": "Phường 1",
      "district": "Quận 1",
      "city": "TP.HCM",
      "province": "Hồ Chí Minh",
      "isDefault": true
    }
  ]
}
```

---

### POST /users/me/addresses

Thêm địa chỉ mới.

**Headers:** `Authorization: Bearer <accessToken>`

**Request Body:**

```json
{
  "fullName": "Nguyễn Văn A",
  "phone": "0901234567",
  "street": "123 Đường ABC",
  "ward": "Phường 1",
  "district": "Quận 1",
  "city": "TP.HCM",
  "province": "Hồ Chí Minh",
  "isDefault": true
}
```

---

### GET /users (Admin)

Lấy danh sách tất cả người dùng.

**Headers:** `Authorization: Bearer <adminAccessToken>`

**Query Parameters:**

- `page`: Số trang (default: 1)
- `limit`: Số lượng mỗi trang (default: 20)
- `search`: Tìm kiếm theo email/tên
- `role`: Lọc theo vai trò (USER/ADMIN)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "items": [...],
    "meta": {
      "total": 100,
      "page": 1,
      "limit": 20,
      "totalPages": 5
    }
  }
}
```

---

## 3. Sản Phẩm (Products)

### GET /products

Lấy danh sách sản phẩm.

**Query Parameters:**

- `page`: Số trang (default: 1)
- `limit`: Số lượng (default: 20)
- `category`: Slug danh mục
- `minPrice`: Giá tối thiểu
- `maxPrice`: Giá tối đa
- `size`: Kích thước (XS, S, M, L, XL, XXL)
- `color`: Màu sắc
- `sort`: Sắp xếp (`price_asc`, `price_desc`, `newest`, `popular`)
- `search`: Từ khóa tìm kiếm

**Response (200):**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "clx...",
        "name": "Áo Thun Nam Basic",
        "slug": "ao-thun-nam-basic",
        "price": 299000,
        "salePrice": 249000,
        "images": [
          { "url": "https://...", "isMain": true }
        ],
        "category": {
          "id": "clx...",
          "name": "Áo Thun",
          "slug": "ao-thun"
        },
        "variants": [
          { "size": "M", "color": "Đen", "stock": 50 }
        ]
      }
    ],
    "meta": { ... }
  }
}
```

---

### GET /products/:id

Lấy chi tiết sản phẩm.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "name": "Áo Thun Nam Basic",
    "slug": "ao-thun-nam-basic",
    "description": "Mô tả chi tiết sản phẩm...",
    "price": 299000,
    "salePrice": 249000,
    "sku": "ATN-001",
    "brand": "LocalBrand",
    "material": "Cotton 100%",
    "sizeGuide": {
      "M": { "chest": "94-98", "length": "68" },
      "L": { "chest": "98-102", "length": "70" }
    },
    "images": [...],
    "variants": [...],
    "category": { ... },
    "reviews": {
      "average": 4.5,
      "count": 120
    }
  }
}
```

---

### POST /products (Admin)

Tạo sản phẩm mới.

**Headers:** `Authorization: Bearer <adminAccessToken>`

**Request Body:**

```json
{
  "name": "Áo Thun Nam Basic",
  "description": "Mô tả...",
  "price": 299000,
  "salePrice": 249000,
  "sku": "ATN-001",
  "categoryId": "clx...",
  "brand": "LocalBrand",
  "material": "Cotton 100%",
  "sizeGuide": { ... },
  "variants": [
    { "size": "M", "color": "Đen", "colorCode": "#000000", "stock": 50, "sku": "ATN-001-M-BLK" }
  ],
  "images": [
    { "url": "https://...", "isMain": true }
  ]
}
```

---

### PATCH /products/:id (Admin)

Cập nhật sản phẩm.

---

### DELETE /products/:id (Admin)

Xóa sản phẩm (soft delete).

---

## 4. Danh Mục (Categories)

### GET /categories

Lấy danh sách danh mục.

**Query Parameters:**

- `tree`: Trả về dạng cây (true/false)

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "name": "Áo",
      "slug": "ao",
      "children": [
        { "id": "clx...", "name": "Áo Thun", "slug": "ao-thun" },
        { "id": "clx...", "name": "Áo Sơ Mi", "slug": "ao-so-mi" }
      ]
    }
  ]
}
```

---

### GET /categories/:slug

Lấy chi tiết danh mục theo slug.

---

### POST /categories (Admin)

Tạo danh mục mới.

---

## 5. Giỏ Hàng (Cart)

### GET /cart

Lấy giỏ hàng hiện tại.

**Headers:** `Authorization: Bearer <accessToken>`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "items": [
      {
        "id": "clx...",
        "product": {
          "id": "clx...",
          "name": "Áo Thun Nam Basic",
          "price": 299000,
          "salePrice": 249000,
          "image": "https://..."
        },
        "variant": {
          "id": "clx...",
          "size": "M",
          "color": "Đen",
          "stock": 50
        },
        "quantity": 2,
        "unitPrice": 249000,
        "totalPrice": 498000
      }
    ],
    "summary": {
      "itemCount": 2,
      "subtotal": 498000,
      "shipping": 30000,
      "total": 528000
    }
  }
}
```

---

### POST /cart/items

Thêm sản phẩm vào giỏ hàng.

**Headers:** `Authorization: Bearer <accessToken>`

**Request Body:**

```json
{
  "productId": "clx...",
  "variantId": "clx...",
  "quantity": 1
}
```

---

### PATCH /cart/items/:id

Cập nhật số lượng.

**Request Body:**

```json
{
  "quantity": 3
}
```

---

### DELETE /cart/items/:id

Xóa sản phẩm khỏi giỏ hàng.

---

### DELETE /cart

Xóa toàn bộ giỏ hàng.

---

## 6. Đơn Hàng (Orders)

### POST /orders

Tạo đơn hàng mới.

**Headers:** `Authorization: Bearer <accessToken>`

**Request Body:**

```json
{
  "addressId": "clx...",
  "paymentMethod": "COD",
  "note": "Giao giờ hành chính"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "orderNumber": "ORD-20260129-001",
    "status": "PENDING",
    "paymentMethod": "COD",
    "paymentStatus": "PENDING",
    "subtotal": 498000,
    "shippingFee": 30000,
    "discount": 0,
    "total": 528000,
    "items": [...],
    "shippingAddress": { ... }
  }
}
```

---

### GET /orders

Lấy danh sách đơn hàng của người dùng.

**Headers:** `Authorization: Bearer <accessToken>`

**Query Parameters:**

- `page`, `limit`
- `status`: Lọc theo trạng thái

---

### GET /orders/:id

Lấy chi tiết đơn hàng.

---

### POST /orders/:id/cancel

Hủy đơn hàng.

**Request Body:**

```json
{
  "reason": "Đổi ý không muốn mua"
}
```

---

### PATCH /orders/:id/status (Admin)

Cập nhật trạng thái đơn hàng.

**Request Body:**

```json
{
  "status": "SHIPPED",
  "note": "Đã giao cho đơn vị vận chuyển"
}
```

---

## 7. Thanh Toán (Payments)

### POST /payments/initiate

Khởi tạo thanh toán.

**Headers:** `Authorization: Bearer <accessToken>`

**Request Body:**

```json
{
  "orderId": "clx...",
  "method": "MOMO",
  "returnUrl": "https://example.com/payment/callback"
}
```

**Response (200) - MOMO/ZaloPay:**

```json
{
  "success": true,
  "data": {
    "paymentId": "clx...",
    "payUrl": "https://payment.momo.vn/...",
    "qrCode": "00020101..."
  }
}
```

**Response (200) - Bank Transfer:**

```json
{
  "success": true,
  "data": {
    "paymentId": "clx...",
    "bankInfo": {
      "bankName": "Vietcombank",
      "accountNumber": "1234567890",
      "accountName": "CONG TY ABC",
      "amount": 528000,
      "referenceCode": "ORD20260129001"
    }
  }
}
```

---

### POST /payments/webhook/momo

Webhook nhận callback từ MoMo.

---

### POST /payments/webhook/zalopay

Webhook nhận callback từ ZaloPay.

---

### GET /payments/:id/status

Kiểm tra trạng thái thanh toán.

---

## 8. AI Features

### POST /ai/try-on

Yêu cầu thử đồ ảo.

**Headers:** `Authorization: Bearer <accessToken>`

**Request Body (multipart/form-data):**

```
userImage: <file>
productId: "clx..."
```

**Response (202):**

```json
{
  "success": true,
  "data": {
    "jobId": "clx...",
    "status": "PENDING",
    "estimatedTime": 30
  }
}
```

---

### POST /ai/size-recommend

Yêu cầu gợi ý kích thước.

**Headers:** `Authorization: Bearer <accessToken>`

**Request Body:**

```json
{
  "productId": "clx...",
  "measurements": {
    "height": 170,
    "weight": 65,
    "chest": 95,
    "waist": 80,
    "hips": 98
  }
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "recommendedSize": "M",
    "confidence": 0.92,
    "alternatives": [
      { "size": "L", "confidence": 0.78, "note": "Nếu bạn thích mặc rộng" }
    ],
    "tips": [
      "Với chiều cao của bạn, size M sẽ vừa vặn nhất",
      "Vòng ngực phù hợp với bảng size M (94-98cm)"
    ]
  }
}
```

---

### POST /ai/chat

Gửi tin nhắn chat AI.

**Headers:** `Authorization: Bearer <accessToken>`

**Request Body:**

```json
{
  "sessionId": "clx...",
  "message": "Tôi muốn tìm áo thun cho mùa hè"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "sessionId": "clx...",
    "message": {
      "id": "clx...",
      "role": "ASSISTANT",
      "content": "Chào bạn! Tôi có thể giúp bạn tìm áo thun phù hợp cho mùa hè. Bạn có thể cho tôi biết thêm về phong cách bạn thích và ngân sách không?",
      "metadata": {
        "suggestedProducts": ["clx...", "clx..."]
      }
    }
  }
}
```

---

### GET /ai/jobs/:id

Lấy trạng thái và kết quả AI job.

**Headers:** `Authorization: Bearer <accessToken>`

**Response (200) - Processing:**

```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "type": "VIRTUAL_TRYON",
    "status": "PROCESSING",
    "progress": 60
  }
}
```

**Response (200) - Completed:**

```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "type": "VIRTUAL_TRYON",
    "status": "COMPLETED",
    "resultUrl": "https://storage.example.com/results/abc123.jpg",
    "completedAt": "2026-01-29T15:30:00Z"
  }
}
```

---

### GET /ai/chat/sessions

Lấy danh sách phiên chat.

---

### GET /ai/chat/sessions/:id/messages

Lấy lịch sử chat của một phiên.

---

## WebSocket Events

**Endpoint:** `ws://localhost:3001`

### Kết nối

```javascript
const socket = io("ws://localhost:3001", {
  auth: { token: "accessToken" },
});
```

### Events

**ai:job:status**

```json
{
  "jobId": "clx...",
  "status": "PROCESSING",
  "progress": 60
}
```

**ai:job:result**

```json
{
  "jobId": "clx...",
  "status": "COMPLETED",
  "resultUrl": "https://..."
}
```

**chat:message**

```json
{
  "sessionId": "clx...",
  "message": {
    "id": "clx...",
    "role": "ASSISTANT",
    "content": "..."
  }
}
```

---

## Error Responses

Tất cả lỗi trả về theo format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": [{ "field": "email", "message": "Email không đúng định dạng" }]
  }
}
```

### HTTP Status Codes

| Code | Mô tả                              |
| ---- | ---------------------------------- |
| 200  | Thành công                         |
| 201  | Tạo mới thành công                 |
| 202  | Đã nhận, đang xử lý                |
| 400  | Bad Request - Dữ liệu không hợp lệ |
| 401  | Unauthorized - Chưa đăng nhập      |
| 403  | Forbidden - Không có quyền         |
| 404  | Not Found - Không tìm thấy         |
| 409  | Conflict - Xung đột dữ liệu        |
| 422  | Unprocessable Entity               |
| 429  | Too Many Requests - Rate limit     |
| 500  | Internal Server Error              |

---

## Rate Limiting

| Endpoint         | Limit               |
| ---------------- | ------------------- |
| General API      | 100 requests/minute |
| Auth endpoints   | 10 requests/minute  |
| AI endpoints     | 5 requests/minute   |
| Payment webhooks | Không giới hạn      |
