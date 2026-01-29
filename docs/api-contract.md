# API Contract - Hợp Đồng API

Đặc tả API theo chuẩn OpenAPI 3.0 cho hệ thống.

---

## Thông Tin Chung

```yaml
openapi: 3.0.3
info:
  title: Fashion AI E-commerce API
  description: API cho hệ thống thương mại điện tử bán quần áo tích hợp AI
  version: 1.0.0
  contact:
    name: API Support
    email: api@example.com

servers:
  - url: http://localhost:3001/api
    description: Development server
  - url: https://api.example.com
    description: Production server

tags:
  - name: Auth
    description: Xác thực & Phân quyền
  - name: Users
    description: Quản lý người dùng
  - name: Products
    description: Quản lý sản phẩm
  - name: Categories
    description: Danh mục sản phẩm
  - name: Cart
    description: Giỏ hàng
  - name: Orders
    description: Đơn hàng
  - name: Payments
    description: Thanh toán
  - name: AI
    description: Tính năng AI
```

---

## 1. Authentication (Xác Thực)

### 1.1. Đăng Ký

```yaml
POST /auth/register:
  tags: [Auth]
  summary: Đăng ký tài khoản mới
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required: [email, password, firstName, lastName]
          properties:
            email:
              type: string
              format: email
              example: "user@example.com"
            password:
              type: string
              minLength: 8
              example: "SecurePass123!"
            firstName:
              type: string
              example: "Nguyễn"
            lastName:
              type: string
              example: "Văn A"
            phone:
              type: string
              pattern: "^0[0-9]{9}$"
              example: "0901234567"
  responses:
    201:
      description: Đăng ký thành công
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/AuthResponse"
    400:
      $ref: "#/components/responses/ValidationError"
    409:
      description: Email đã tồn tại
```

### 1.2. Đăng Nhập

```yaml
POST /auth/login:
  tags: [Auth]
  summary: Đăng nhập
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required: [email, password]
          properties:
            email:
              type: string
              format: email
            password:
              type: string
  responses:
    200:
      description: Đăng nhập thành công
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/AuthResponse"
    401:
      $ref: "#/components/responses/UnauthorizedError"
```

### 1.3. Refresh Token

```yaml
POST /auth/refresh:
  tags: [Auth]
  summary: Làm mới access token
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required: [refreshToken]
          properties:
            refreshToken:
              type: string
  responses:
    200:
      description: Token mới
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/TokenPair"
    401:
      description: Refresh token không hợp lệ hoặc hết hạn
```

### 1.4. Đăng Xuất

```yaml
POST /auth/logout:
  tags: [Auth]
  summary: Đăng xuất
  security:
    - bearerAuth: []
  responses:
    200:
      description: Đăng xuất thành công
      content:
        application/json:
          schema:
            type: object
            properties:
              success:
                type: boolean
                example: true
              message:
                type: string
                example: "Đăng xuất thành công"
```

---

## 2. Users (Người Dùng)

### 2.1. Lấy Thông Tin Cá Nhân

```yaml
GET /users/me:
  tags: [Users]
  summary: Lấy thông tin người dùng hiện tại
  security:
    - bearerAuth: []
  responses:
    200:
      description: Thông tin người dùng
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/User"
```

### 2.2. Cập Nhật Thông Tin

```yaml
PATCH /users/me:
  tags: [Users]
  summary: Cập nhật thông tin người dùng
  security:
    - bearerAuth: []
  requestBody:
    content:
      application/json:
        schema:
          type: object
          properties:
            firstName:
              type: string
            lastName:
              type: string
            phone:
              type: string
            avatar:
              type: string
              format: uri
            height:
              type: number
              minimum: 100
              maximum: 250
            weight:
              type: number
              minimum: 30
              maximum: 200
            chest:
              type: number
            waist:
              type: number
            hips:
              type: number
  responses:
    200:
      description: Cập nhật thành công
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/User"
```

### 2.3. Địa Chỉ

```yaml
GET /users/me/addresses:
  tags: [Users]
  summary: Lấy danh sách địa chỉ
  security:
    - bearerAuth: []
  responses:
    200:
      content:
        application/json:
          schema:
            type: array
            items:
              $ref: "#/components/schemas/Address"

POST /users/me/addresses:
  tags: [Users]
  summary: Thêm địa chỉ mới
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/AddressInput"
  responses:
    201:
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Address"

PATCH /users/me/addresses/{id}:
  tags: [Users]
  summary: Cập nhật địa chỉ
  security:
    - bearerAuth: []
  parameters:
    - name: id
      in: path
      required: true
      schema:
        type: string
  requestBody:
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/AddressInput"
  responses:
    200:
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Address"

DELETE /users/me/addresses/{id}:
  tags: [Users]
  summary: Xóa địa chỉ
  security:
    - bearerAuth: []
  parameters:
    - name: id
      in: path
      required: true
      schema:
        type: string
  responses:
    204:
      description: Xóa thành công
```

---

## 3. Products (Sản Phẩm)

### 3.1. Danh Sách Sản Phẩm

```yaml
GET /products:
  tags: [Products]
  summary: Lấy danh sách sản phẩm
  parameters:
    - name: page
      in: query
      schema:
        type: integer
        default: 1
        minimum: 1
    - name: limit
      in: query
      schema:
        type: integer
        default: 20
        minimum: 1
        maximum: 100
    - name: category
      in: query
      description: Slug danh mục
      schema:
        type: string
    - name: search
      in: query
      description: Từ khóa tìm kiếm
      schema:
        type: string
    - name: minPrice
      in: query
      schema:
        type: number
    - name: maxPrice
      in: query
      schema:
        type: number
    - name: size
      in: query
      schema:
        type: string
        enum: [XS, S, M, L, XL, XXL, XXXL]
    - name: color
      in: query
      schema:
        type: string
    - name: sort
      in: query
      schema:
        type: string
        enum: [price_asc, price_desc, newest, popular]
        default: newest
  responses:
    200:
      description: Danh sách sản phẩm
      content:
        application/json:
          schema:
            type: object
            properties:
              success:
                type: boolean
              data:
                type: object
                properties:
                  items:
                    type: array
                    items:
                      $ref: "#/components/schemas/ProductSummary"
                  meta:
                    $ref: "#/components/schemas/PaginationMeta"
```

### 3.2. Chi Tiết Sản Phẩm

```yaml
GET /products/{id}:
  tags: [Products]
  summary: Lấy chi tiết sản phẩm
  parameters:
    - name: id
      in: path
      required: true
      schema:
        type: string
  responses:
    200:
      description: Chi tiết sản phẩm
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/ProductDetail"
    404:
      $ref: "#/components/responses/NotFoundError"
```

### 3.3. Admin - Tạo Sản Phẩm

```yaml
POST /products:
  tags: [Products]
  summary: Tạo sản phẩm mới (Admin)
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/ProductInput"
  responses:
    201:
      description: Tạo thành công
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/ProductDetail"
    403:
      $ref: "#/components/responses/ForbiddenError"
```

---

## 4. Cart (Giỏ Hàng)

### 4.1. Xem Giỏ Hàng

```yaml
GET /cart:
  tags: [Cart]
  summary: Lấy giỏ hàng hiện tại
  security:
    - bearerAuth: []
  responses:
    200:
      description: Giỏ hàng
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Cart"
```

### 4.2. Thêm Sản Phẩm

```yaml
POST /cart/items:
  tags: [Cart]
  summary: Thêm sản phẩm vào giỏ
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required: [productId, variantId, quantity]
          properties:
            productId:
              type: string
            variantId:
              type: string
            quantity:
              type: integer
              minimum: 1
              maximum: 99
  responses:
    200:
      description: Cập nhật thành công
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Cart"
    400:
      description: Số lượng vượt quá tồn kho
```

### 4.3. Cập Nhật Số Lượng

```yaml
PATCH /cart/items/{id}:
  tags: [Cart]
  summary: Cập nhật số lượng
  security:
    - bearerAuth: []
  parameters:
    - name: id
      in: path
      required: true
      schema:
        type: string
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required: [quantity]
          properties:
            quantity:
              type: integer
              minimum: 1
              maximum: 99
  responses:
    200:
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Cart"
```

---

## 5. Orders (Đơn Hàng)

### 5.1. Tạo Đơn Hàng

```yaml
POST /orders:
  tags: [Orders]
  summary: Tạo đơn hàng từ giỏ hàng
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required: [addressId, paymentMethod]
          properties:
            addressId:
              type: string
            paymentMethod:
              type: string
              enum: [COD, BANK, MOMO, ZALOPAY]
            couponCode:
              type: string
            note:
              type: string
              maxLength: 500
  responses:
    201:
      description: Tạo đơn hàng thành công
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Order"
    400:
      description: Giỏ hàng trống hoặc sản phẩm hết hàng
```

### 5.2. Danh Sách Đơn Hàng

```yaml
GET /orders:
  tags: [Orders]
  summary: Lấy danh sách đơn hàng của người dùng
  security:
    - bearerAuth: []
  parameters:
    - name: page
      in: query
      schema:
        type: integer
        default: 1
    - name: limit
      in: query
      schema:
        type: integer
        default: 10
    - name: status
      in: query
      schema:
        type: string
        enum: [PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED]
  responses:
    200:
      content:
        application/json:
          schema:
            type: object
            properties:
              items:
                type: array
                items:
                  $ref: "#/components/schemas/OrderSummary"
              meta:
                $ref: "#/components/schemas/PaginationMeta"
```

### 5.3. Hủy Đơn Hàng

```yaml
POST /orders/{id}/cancel:
  tags: [Orders]
  summary: Hủy đơn hàng
  security:
    - bearerAuth: []
  parameters:
    - name: id
      in: path
      required: true
      schema:
        type: string
  requestBody:
    content:
      application/json:
        schema:
          type: object
          properties:
            reason:
              type: string
  responses:
    200:
      description: Hủy thành công
    400:
      description: Không thể hủy đơn hàng ở trạng thái này
```

---

## 6. Payments (Thanh Toán)

### 6.1. Khởi Tạo Thanh Toán

```yaml
POST /payments/initiate:
  tags: [Payments]
  summary: Khởi tạo thanh toán online
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required: [orderId, method]
          properties:
            orderId:
              type: string
            method:
              type: string
              enum: [MOMO, ZALOPAY, BANK]
            returnUrl:
              type: string
              format: uri
  responses:
    200:
      description: Thông tin thanh toán
      content:
        application/json:
          schema:
            oneOf:
              - $ref: "#/components/schemas/OnlinePaymentResponse"
              - $ref: "#/components/schemas/BankTransferResponse"
```

### 6.2. Webhook MoMo

```yaml
POST /payments/webhook/momo:
  tags: [Payments]
  summary: Webhook nhận callback từ MoMo
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/MoMoCallback"
  responses:
    200:
      description: Xử lý thành công
      content:
        application/json:
          schema:
            type: object
            properties:
              returnCode:
                type: integer
                example: 0
              returnMessage:
                type: string
                example: "Success"
```

---

## 7. AI Features

### 7.1. Thử Đồ Ảo

```yaml
POST /ai/try-on:
  tags: [AI]
  summary: Yêu cầu thử đồ ảo
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      multipart/form-data:
        schema:
          type: object
          required: [userImage, productId]
          properties:
            userImage:
              type: string
              format: binary
              description: Ảnh người dùng (JPEG/PNG, max 5MB)
            productId:
              type: string
            options:
              type: object
              properties:
                pose:
                  type: string
                  enum: [front, side]
                quality:
                  type: string
                  enum: [standard, high]
  responses:
    202:
      description: Yêu cầu đã được tiếp nhận
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/AIJobCreated"
    400:
      description: Ảnh không hợp lệ
    429:
      $ref: "#/components/responses/RateLimitError"
```

### 7.2. Gợi Ý Kích Thước

```yaml
POST /ai/size-recommend:
  tags: [AI]
  summary: Gợi ý kích thước phù hợp
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required: [productId]
          properties:
            productId:
              type: string
            measurements:
              type: object
              properties:
                height:
                  type: number
                  description: Chiều cao (cm)
                weight:
                  type: number
                  description: Cân nặng (kg)
                chest:
                  type: number
                  description: Vòng ngực (cm)
                waist:
                  type: number
                  description: Vòng eo (cm)
                hips:
                  type: number
                  description: Vòng hông (cm)
  responses:
    200:
      description: Kết quả gợi ý
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/SizeRecommendation"
```

### 7.3. Chat AI

```yaml
POST /ai/chat:
  tags: [AI]
  summary: Gửi tin nhắn chat với AI
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required: [message]
          properties:
            sessionId:
              type: string
              description: ID phiên chat (tạo mới nếu không có)
            message:
              type: string
              maxLength: 2000
  responses:
    200:
      description: Tin nhắn đã được gửi
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/ChatMessageSent"
```

### 7.4. Lấy Trạng Thái AI Job

```yaml
GET /ai/jobs/{id}:
  tags: [AI]
  summary: Lấy trạng thái và kết quả AI job
  security:
    - bearerAuth: []
  parameters:
    - name: id
      in: path
      required: true
      schema:
        type: string
  responses:
    200:
      description: Trạng thái job
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/AIJob"
    404:
      $ref: "#/components/responses/NotFoundError"
```

---

## Components

### Schemas

```yaml
components:
  schemas:
    # Auth
    AuthResponse:
      type: object
      properties:
        success:
          type: boolean
        data:
          type: object
          properties:
            user:
              $ref: "#/components/schemas/User"
            accessToken:
              type: string
            refreshToken:
              type: string

    TokenPair:
      type: object
      properties:
        accessToken:
          type: string
        refreshToken:
          type: string

    # User
    User:
      type: object
      properties:
        id:
          type: string
        email:
          type: string
        firstName:
          type: string
        lastName:
          type: string
        phone:
          type: string
        avatar:
          type: string
        role:
          type: string
          enum: [USER, ADMIN]
        height:
          type: number
        weight:
          type: number
        chest:
          type: number
        waist:
          type: number
        hips:
          type: number
        createdAt:
          type: string
          format: date-time

    Address:
      type: object
      properties:
        id:
          type: string
        fullName:
          type: string
        phone:
          type: string
        street:
          type: string
        ward:
          type: string
        district:
          type: string
        city:
          type: string
        province:
          type: string
        postalCode:
          type: string
        isDefault:
          type: boolean

    AddressInput:
      type: object
      required: [fullName, phone, street, district, city, province]
      properties:
        fullName:
          type: string
        phone:
          type: string
        street:
          type: string
        ward:
          type: string
        district:
          type: string
        city:
          type: string
        province:
          type: string
        postalCode:
          type: string
        isDefault:
          type: boolean

    # Product
    ProductSummary:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        slug:
          type: string
        price:
          type: number
        salePrice:
          type: number
        mainImage:
          type: string
        category:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
            slug:
              type: string

    ProductDetail:
      allOf:
        - $ref: "#/components/schemas/ProductSummary"
        - type: object
          properties:
            description:
              type: string
            sku:
              type: string
            brand:
              type: string
            material:
              type: string
            sizeGuide:
              type: object
            images:
              type: array
              items:
                type: object
                properties:
                  url:
                    type: string
                  alt:
                    type: string
                  isMain:
                    type: boolean
            variants:
              type: array
              items:
                $ref: "#/components/schemas/ProductVariant"
            reviews:
              type: object
              properties:
                average:
                  type: number
                count:
                  type: integer

    ProductVariant:
      type: object
      properties:
        id:
          type: string
        size:
          type: string
          enum: [XS, S, M, L, XL, XXL, XXXL, FREE]
        color:
          type: string
        colorCode:
          type: string
        stock:
          type: integer
        sku:
          type: string

    # Cart
    Cart:
      type: object
      properties:
        id:
          type: string
        items:
          type: array
          items:
            $ref: "#/components/schemas/CartItem"
        summary:
          type: object
          properties:
            itemCount:
              type: integer
            subtotal:
              type: number
            shipping:
              type: number
            total:
              type: number

    CartItem:
      type: object
      properties:
        id:
          type: string
        product:
          $ref: "#/components/schemas/ProductSummary"
        variant:
          $ref: "#/components/schemas/ProductVariant"
        quantity:
          type: integer
        unitPrice:
          type: number
        totalPrice:
          type: number

    # Order
    Order:
      type: object
      properties:
        id:
          type: string
        orderNumber:
          type: string
        status:
          type: string
          enum:
            [
              PENDING,
              CONFIRMED,
              PROCESSING,
              SHIPPED,
              DELIVERED,
              CANCELLED,
              REFUNDED,
            ]
        paymentMethod:
          type: string
          enum: [COD, BANK, MOMO, ZALOPAY]
        paymentStatus:
          type: string
          enum: [PENDING, PROCESSING, COMPLETED, FAILED, REFUNDED]
        subtotal:
          type: number
        shippingFee:
          type: number
        discount:
          type: number
        total:
          type: number
        items:
          type: array
          items:
            $ref: "#/components/schemas/OrderItem"
        shippingAddress:
          $ref: "#/components/schemas/Address"
        createdAt:
          type: string
          format: date-time

    OrderItem:
      type: object
      properties:
        id:
          type: string
        productName:
          type: string
        productImage:
          type: string
        size:
          type: string
        color:
          type: string
        quantity:
          type: integer
        unitPrice:
          type: number
        totalPrice:
          type: number

    # Payment
    OnlinePaymentResponse:
      type: object
      properties:
        paymentId:
          type: string
        payUrl:
          type: string
        qrCode:
          type: string

    BankTransferResponse:
      type: object
      properties:
        paymentId:
          type: string
        bankInfo:
          type: object
          properties:
            bankName:
              type: string
            accountNumber:
              type: string
            accountName:
              type: string
            amount:
              type: number
            referenceCode:
              type: string

    # AI
    AIJobCreated:
      type: object
      properties:
        jobId:
          type: string
        status:
          type: string
          enum: [PENDING]
        estimatedTime:
          type: integer
          description: Thời gian ước tính (giây)

    AIJob:
      type: object
      properties:
        id:
          type: string
        type:
          type: string
          enum: [VIRTUAL_TRYON, SIZE_RECOMMEND, CHAT_SUPPORT]
        status:
          type: string
          enum: [PENDING, PROCESSING, COMPLETED, FAILED]
        progress:
          type: integer
          minimum: 0
          maximum: 100
        resultUrl:
          type: string
        resultData:
          type: object
        errorMessage:
          type: string
        completedAt:
          type: string
          format: date-time

    SizeRecommendation:
      type: object
      properties:
        recommendedSize:
          type: string
        confidence:
          type: number
        alternatives:
          type: array
          items:
            type: object
            properties:
              size:
                type: string
              confidence:
                type: number
              note:
                type: string
        tips:
          type: array
          items:
            type: string

    # Common
    PaginationMeta:
      type: object
      properties:
        total:
          type: integer
        page:
          type: integer
        limit:
          type: integer
        totalPages:
          type: integer

  # Security Schemes
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  # Responses
  responses:
    ValidationError:
      description: Dữ liệu không hợp lệ
      content:
        application/json:
          schema:
            type: object
            properties:
              success:
                type: boolean
                example: false
              error:
                type: object
                properties:
                  code:
                    type: string
                    example: "VALIDATION_ERROR"
                  message:
                    type: string
                  details:
                    type: array
                    items:
                      type: object
                      properties:
                        field:
                          type: string
                        message:
                          type: string

    UnauthorizedError:
      description: Chưa đăng nhập hoặc token hết hạn

    ForbiddenError:
      description: Không có quyền truy cập

    NotFoundError:
      description: Không tìm thấy tài nguyên

    RateLimitError:
      description: Vượt quá giới hạn request
```
