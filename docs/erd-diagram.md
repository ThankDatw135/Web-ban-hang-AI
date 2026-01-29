# ERD - Entity Relationship Diagram

Sơ đồ quan hệ thực thể chi tiết cho hệ thống thương mại điện tử.

---

## 1. ERD Tổng Quan

```mermaid
erDiagram
    %% User Domain
    USER {
        string id PK
        string email UK
        string password
        string first_name
        string last_name
        string phone
        string avatar
        enum role
        boolean is_active
        float height
        float weight
        float chest
        float waist
        float hips
        datetime created_at
        datetime updated_at
    }

    REFRESH_TOKEN {
        string id PK
        string token UK
        string user_id FK
        datetime expires_at
        datetime created_at
    }

    ADDRESS {
        string id PK
        string user_id FK
        string full_name
        string phone
        string street
        string ward
        string district
        string city
        string province
        string postal_code
        boolean is_default
    }

    %% Product Domain
    CATEGORY {
        string id PK
        string name
        string slug UK
        string description
        string image
        string parent_id FK
        boolean is_active
        int sort_order
    }

    PRODUCT {
        string id PK
        string name
        string slug UK
        text description
        decimal price
        decimal sale_price
        string sku UK
        string brand
        string material
        string category_id FK
        boolean is_active
        boolean is_featured
        json size_guide
    }

    PRODUCT_IMAGE {
        string id PK
        string product_id FK
        string url
        string alt
        int sort_order
        boolean is_main
    }

    PRODUCT_VARIANT {
        string id PK
        string product_id FK
        enum size
        string color
        string color_code
        int stock
        string sku UK
    }

    REVIEW {
        string id PK
        string user_id FK
        string product_id FK
        int rating
        string title
        text content
        boolean is_visible
        datetime created_at
    }

    %% Cart Domain
    CART {
        string id PK
        string user_id FK,UK
        datetime created_at
        datetime updated_at
    }

    CART_ITEM {
        string id PK
        string cart_id FK
        string product_id FK
        string variant_id FK
        int quantity
    }

    %% Order Domain
    ORDER {
        string id PK
        string order_number UK
        string user_id FK
        string address_id FK
        enum status
        enum payment_method
        enum payment_status
        decimal subtotal
        decimal shipping_fee
        decimal discount
        decimal total
        text note
        json shipping_address
        datetime paid_at
        datetime shipped_at
        datetime delivered_at
        datetime cancelled_at
    }

    ORDER_ITEM {
        string id PK
        string order_id FK
        string product_id FK
        string variant_id FK
        string product_name
        string product_image
        enum size
        string color
        int quantity
        decimal unit_price
        decimal total_price
    }

    PAYMENT {
        string id PK
        string order_id FK
        enum method
        enum status
        decimal amount
        string transaction_id
        json gateway_response
        string bank_code
        string reference_code UK
        datetime completed_at
    }

    %% AI Domain
    AI_JOB {
        string id PK
        string user_id FK
        enum type
        enum status
        json input_data
        json result_data
        string result_url
        string error_message
        string product_id FK
        datetime started_at
        datetime completed_at
    }

    CHAT_SESSION {
        string id PK
        string user_id FK
        string title
        boolean is_active
        datetime created_at
    }

    CHAT_MESSAGE {
        string id PK
        string session_id FK
        enum role
        text content
        json metadata
        datetime created_at
    }

    SETTING {
        string id PK
        string key UK
        json value
        string group
    }

    %% Relationships
    USER ||--o{ REFRESH_TOKEN : "has"
    USER ||--o{ ADDRESS : "has"
    USER ||--o| CART : "has"
    USER ||--o{ ORDER : "places"
    USER ||--o{ REVIEW : "writes"
    USER ||--o{ AI_JOB : "creates"
    USER ||--o{ CHAT_SESSION : "has"

    CATEGORY ||--o{ CATEGORY : "parent-child"
    CATEGORY ||--o{ PRODUCT : "contains"

    PRODUCT ||--o{ PRODUCT_IMAGE : "has"
    PRODUCT ||--o{ PRODUCT_VARIANT : "has"
    PRODUCT ||--o{ REVIEW : "receives"
    PRODUCT ||--o{ AI_JOB : "related"

    CART ||--o{ CART_ITEM : "contains"
    CART_ITEM }o--|| PRODUCT : "references"
    CART_ITEM }o--|| PRODUCT_VARIANT : "references"

    ORDER ||--o{ ORDER_ITEM : "contains"
    ORDER ||--o{ PAYMENT : "has"
    ORDER }o--|| ADDRESS : "ships_to"

    ORDER_ITEM }o--|| PRODUCT : "references"
    ORDER_ITEM }o--|| PRODUCT_VARIANT : "references"

    CHAT_SESSION ||--o{ CHAT_MESSAGE : "contains"
```

---

## 2. ERD Chi Tiết Theo Domain

### 2.1. User Domain

```mermaid
erDiagram
    USER {
        string id PK "CUID"
        string email UK "user@example.com"
        string password "bcrypt hash"
        string first_name "Nguyễn"
        string last_name "Văn A"
        string phone "0901234567"
        string avatar "https://..."
        enum role "USER | ADMIN"
        boolean is_active "true"
        boolean email_verified "false"
        float height "170 cm"
        float weight "65 kg"
        float chest "95 cm"
        float waist "80 cm"
        float hips "98 cm"
        datetime created_at
        datetime updated_at
    }

    ADDRESS {
        string id PK
        string user_id FK
        string full_name "Tên người nhận"
        string phone "SĐT người nhận"
        string street "Số nhà, tên đường"
        string ward "Phường/Xã"
        string district "Quận/Huyện"
        string city "Thành phố"
        string province "Tỉnh"
        string postal_code "Mã bưu chính"
        boolean is_default "Địa chỉ mặc định"
    }

    REFRESH_TOKEN {
        string id PK
        string token UK "JWT refresh token"
        string user_id FK
        datetime expires_at
        datetime created_at
    }

    USER ||--o{ ADDRESS : "1:N"
    USER ||--o{ REFRESH_TOKEN : "1:N"
```

### 2.2. Product Domain

```mermaid
erDiagram
    CATEGORY {
        string id PK
        string name "Áo Thun"
        string slug UK "ao-thun"
        string description "Mô tả danh mục"
        string image "URL hình ảnh"
        string parent_id FK "Danh mục cha"
        boolean is_active
        int sort_order "Thứ tự hiển thị"
    }

    PRODUCT {
        string id PK
        string name "Áo Thun Nam Basic"
        string slug UK "ao-thun-nam-basic"
        text description "Mô tả chi tiết"
        decimal price "299000"
        decimal sale_price "249000"
        string sku UK "ATN-001"
        string brand "LocalBrand"
        string material "Cotton 100%"
        string category_id FK
        boolean is_active
        boolean is_featured
        json size_guide "Bảng hướng dẫn size"
    }

    PRODUCT_VARIANT {
        string id PK
        string product_id FK
        enum size "XS|S|M|L|XL|XXL|XXXL|FREE"
        string color "Đen"
        string color_code "#000000"
        int stock "50"
        string sku UK "ATN-001-M-BLK"
    }

    PRODUCT_IMAGE {
        string id PK
        string product_id FK
        string url "https://..."
        string alt "Mô tả ảnh"
        int sort_order
        boolean is_main "Ảnh chính"
    }

    REVIEW {
        string id PK
        string user_id FK
        string product_id FK
        int rating "1-5"
        string title "Tiêu đề"
        text content "Nội dung đánh giá"
        boolean is_visible
        datetime created_at
    }

    CATEGORY ||--o{ CATEGORY : "self-reference"
    CATEGORY ||--o{ PRODUCT : "1:N"
    PRODUCT ||--o{ PRODUCT_VARIANT : "1:N"
    PRODUCT ||--o{ PRODUCT_IMAGE : "1:N"
    PRODUCT ||--o{ REVIEW : "1:N"
```

### 2.3. Order Domain

```mermaid
erDiagram
    ORDER {
        string id PK
        string order_number UK "ORD-20260129-001"
        string user_id FK
        string address_id FK
        enum status "PENDING|CONFIRMED|PROCESSING|SHIPPED|DELIVERED|CANCELLED|REFUNDED"
        enum payment_method "COD|BANK|MOMO|ZALOPAY"
        enum payment_status "PENDING|PROCESSING|COMPLETED|FAILED|REFUNDED"
        decimal subtotal "498000"
        decimal shipping_fee "30000"
        decimal discount "0"
        decimal total "528000"
        text note "Ghi chú"
        json shipping_address "Snapshot địa chỉ"
        datetime paid_at
        datetime shipped_at
        datetime delivered_at
        datetime cancelled_at
    }

    ORDER_ITEM {
        string id PK
        string order_id FK
        string product_id FK
        string variant_id FK
        string product_name "Snapshot tên SP"
        string product_image "Snapshot ảnh SP"
        enum size
        string color
        int quantity "2"
        decimal unit_price "249000"
        decimal total_price "498000"
    }

    PAYMENT {
        string id PK
        string order_id FK
        enum method
        enum status
        decimal amount
        string transaction_id "Mã giao dịch gateway"
        json gateway_response "Response đầy đủ"
        string bank_code "VCB"
        string reference_code UK "ORD20260129001"
        datetime completed_at
    }

    ORDER ||--o{ ORDER_ITEM : "1:N"
    ORDER ||--o{ PAYMENT : "1:N"
```

### 2.4. AI Domain

```mermaid
erDiagram
    AI_JOB {
        string id PK
        string user_id FK
        enum type "VIRTUAL_TRYON|SIZE_RECOMMEND|CHAT_SUPPORT"
        enum status "PENDING|PROCESSING|COMPLETED|FAILED"
        json input_data "Dữ liệu đầu vào"
        json result_data "Kết quả xử lý"
        string result_url "URL ảnh kết quả"
        string error_message "Thông báo lỗi"
        string product_id FK "Sản phẩm liên quan"
        datetime started_at
        datetime completed_at
    }

    CHAT_SESSION {
        string id PK
        string user_id FK
        string title "Tiêu đề phiên chat"
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    CHAT_MESSAGE {
        string id PK
        string session_id FK
        enum role "USER|ASSISTANT|SYSTEM"
        text content "Nội dung tin nhắn"
        json metadata "Thông tin bổ sung"
        datetime created_at
    }

    CHAT_SESSION ||--o{ CHAT_MESSAGE : "1:N"
```

---

## 3. Cardinality Rules

| Quan hệ                   | Cardinality | Mô tả                          |
| ------------------------- | ----------- | ------------------------------ |
| User - Cart               | 1:1         | Mỗi user có đúng 1 giỏ hàng    |
| User - Address            | 1:N         | User có nhiều địa chỉ          |
| User - Order              | 1:N         | User có nhiều đơn hàng         |
| Category - Category       | 1:N (self)  | Danh mục cha-con               |
| Category - Product        | 1:N         | Danh mục chứa nhiều SP         |
| Product - ProductVariant  | 1:N         | SP có nhiều biến thể           |
| Product - ProductImage    | 1:N         | SP có nhiều ảnh                |
| Cart - CartItem           | 1:N         | Giỏ hàng có nhiều items        |
| Order - OrderItem         | 1:N         | Đơn hàng có nhiều items        |
| Order - Payment           | 1:N         | Đơn có thể có nhiều thanh toán |
| ChatSession - ChatMessage | 1:N         | Phiên chat có nhiều tin nhắn   |

---

## 4. Database Indexes

```sql
-- Performance Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active_featured ON products(is_active, is_featured);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_payments_reference ON payments(reference_code);
CREATE INDEX idx_ai_jobs_user ON ai_jobs(user_id);
CREATE INDEX idx_ai_jobs_status ON ai_jobs(status);
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);

-- Full-text Search
CREATE INDEX idx_products_name_gin ON products USING gin(to_tsvector('vietnamese', name));
CREATE INDEX idx_products_description_gin ON products USING gin(to_tsvector('vietnamese', description));
```
