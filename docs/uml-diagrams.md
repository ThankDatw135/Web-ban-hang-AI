# UML Diagrams - Sơ Đồ Hành Vi

Tài liệu các sơ đồ UML tập trung vào hành vi hệ thống.

---

## 1. Use Case Diagram - Sơ Đồ Ca Sử Dụng

### 1.1. Use Case Tổng Quan

```mermaid
flowchart TB
    subgraph System["🛒 Hệ Thống Bán Quần Áo AI"]
        subgraph AuthUC["Xác Thực"]
            UC1["Đăng ký"]
            UC2["Đăng nhập"]
            UC3["Đăng xuất"]
            UC4["Quên mật khẩu"]
        end

        subgraph ProductUC["Sản Phẩm"]
            UC5["Xem danh sách SP"]
            UC6["Tìm kiếm SP"]
            UC7["Xem chi tiết SP"]
            UC8["Đánh giá SP"]
        end

        subgraph CartUC["Giỏ Hàng"]
            UC9["Thêm vào giỏ"]
            UC10["Cập nhật số lượng"]
            UC11["Xóa khỏi giỏ"]
            UC12["Xem giỏ hàng"]
        end

        subgraph OrderUC["Đơn Hàng"]
            UC13["Đặt hàng"]
            UC14["Thanh toán"]
            UC15["Xem lịch sử ĐH"]
            UC16["Hủy đơn hàng"]
        end

        subgraph AIUC["Tính Năng AI"]
            UC17["Thử đồ ảo"]
            UC18["Gợi ý kích thước"]
            UC19["Chat với AI"]
        end

        subgraph AdminUC["Quản Trị"]
            UC20["Quản lý sản phẩm"]
            UC21["Quản lý đơn hàng"]
            UC22["Quản lý người dùng"]
            UC23["Xem thống kê"]
        end
    end

    Guest["👤 Khách"]
    User["👤 Người Dùng"]
    Admin["👤 Quản Trị Viên"]

    Guest --> UC1 & UC2 & UC5 & UC6 & UC7
    User --> UC1 & UC2 & UC3 & UC4
    User --> UC5 & UC6 & UC7 & UC8
    User --> UC9 & UC10 & UC11 & UC12
    User --> UC13 & UC14 & UC15 & UC16
    User --> UC17 & UC18 & UC19
    Admin --> UC20 & UC21 & UC22 & UC23
```

### 1.2. Use Case Chi Tiết - Đặt Hàng

```mermaid
flowchart TB
    User["👤 Người Dùng"]

    subgraph OrderSystem["Use Case: Đặt Hàng"]
        UC_Main["Đặt hàng"]
        UC_SelectAddr["Chọn địa chỉ giao"]
        UC_AddAddr["Thêm địa chỉ mới"]
        UC_SelectPay["Chọn phương thức TT"]
        UC_ApplyCoupon["Áp dụng mã giảm giá"]
        UC_Confirm["Xác nhận đơn hàng"]
        UC_Pay["Thanh toán online"]
    end

    User --> UC_Main
    UC_Main -.->|include| UC_SelectAddr
    UC_Main -.->|include| UC_SelectPay
    UC_Main -.->|include| UC_Confirm
    UC_SelectAddr -.->|extend| UC_AddAddr
    UC_Main -.->|extend| UC_ApplyCoupon
    UC_SelectPay -.->|extend| UC_Pay
```

### 1.3. Use Case Chi Tiết - Tính Năng AI

```mermaid
flowchart TB
    User["👤 Người Dùng"]

    subgraph AISystem["Use Case: Tính Năng AI"]
        UC_TryOn["Thử đồ ảo"]
        UC_UploadPhoto["Upload ảnh cá nhân"]
        UC_SelectProduct["Chọn sản phẩm"]
        UC_ViewResult["Xem kết quả"]
        UC_SaveResult["Lưu kết quả"]

        UC_Size["Gợi ý kích thước"]
        UC_InputMeasure["Nhập số đo"]
        UC_ViewRecommend["Xem gợi ý"]

        UC_Chat["Chat với AI"]
        UC_AskQuestion["Đặt câu hỏi"]
        UC_ViewProducts["Xem SP gợi ý"]
    end

    User --> UC_TryOn
    User --> UC_Size
    User --> UC_Chat

    UC_TryOn -.->|include| UC_UploadPhoto
    UC_TryOn -.->|include| UC_SelectProduct
    UC_TryOn -.->|include| UC_ViewResult
    UC_ViewResult -.->|extend| UC_SaveResult

    UC_Size -.->|include| UC_InputMeasure
    UC_Size -.->|include| UC_ViewRecommend

    UC_Chat -.->|include| UC_AskQuestion
    UC_AskQuestion -.->|extend| UC_ViewProducts
```

---

## 2. Sequence Diagram - Sơ Đồ Tuần Tự

### 2.1. Đăng Nhập & Xác Thực

```mermaid
sequenceDiagram
    autonumber
    actor User as Người Dùng
    participant FE as Frontend
    participant BE as Backend
    participant DB as Database
    participant Redis as Redis

    User->>FE: Nhập email/password
    FE->>FE: Validate form
    FE->>BE: POST /auth/login
    BE->>DB: Tìm user theo email
    DB-->>BE: User data

    alt User không tồn tại
        BE-->>FE: 401 Unauthorized
        FE-->>User: Hiển thị lỗi
    else User tồn tại
        BE->>BE: Verify password (bcrypt)
        alt Password sai
            BE-->>FE: 401 Unauthorized
            FE-->>User: Hiển thị lỗi
        else Password đúng
            BE->>BE: Generate Access Token (15m)
            BE->>BE: Generate Refresh Token (7d)
            BE->>Redis: Lưu Refresh Token
            BE-->>FE: 200 OK + Tokens
            FE->>FE: Lưu tokens vào storage
            FE-->>User: Chuyển đến trang chủ
        end
    end
```

### 2.2. Đặt Hàng

```mermaid
sequenceDiagram
    autonumber
    actor User as Người Dùng
    participant FE as Frontend
    participant BE as Backend
    participant DB as Database
    participant Redis as Redis

    User->>FE: Click "Đặt hàng"
    FE->>BE: GET /cart
    BE->>DB: Lấy cart items
    DB-->>BE: Cart data
    BE-->>FE: Cart + Products

    FE-->>User: Hiển thị trang checkout
    User->>FE: Chọn địa chỉ giao
    User->>FE: Chọn PT thanh toán
    User->>FE: Click "Xác nhận"

    FE->>BE: POST /orders
    BE->>DB: Kiểm tra stock

    alt Hết hàng
        DB-->>BE: Stock = 0
        BE-->>FE: 400 Bad Request
        FE-->>User: Thông báo hết hàng
    else Còn hàng
        BE->>DB: Tạo Order (PENDING)
        BE->>DB: Tạo OrderItems
        BE->>DB: Giảm stock variants
        BE->>DB: Xóa cart items
        DB-->>BE: Order created
        BE-->>FE: 201 Created + Order

        alt PT = MoMo/ZaloPay
            FE->>BE: POST /payments/initiate
            BE->>BE: Create payment request
            BE-->>FE: Payment URL
            FE->>FE: Redirect to gateway
        else PT = COD/Bank
            FE-->>User: Hiển thị xác nhận
        end
    end
```

### 2.3. Thử Đồ Ảo (Virtual Try-On)

```mermaid
sequenceDiagram
    autonumber
    actor User as Người Dùng
    participant FE as Frontend
    participant BE as Backend
    participant RMQ as RabbitMQ
    participant AI as AI Service
    participant S3 as MinIO/S3
    participant DB as Database

    User->>FE: Upload ảnh cá nhân
    User->>FE: Chọn sản phẩm
    User->>FE: Click "Thử đồ"

    FE->>BE: POST /ai/try-on (multipart)
    BE->>S3: Upload user image
    S3-->>BE: Image URL
    BE->>DB: Tạo AIJob (PENDING)
    DB-->>BE: Job ID
    BE->>RMQ: Publish to ai.tryon.requests
    BE-->>FE: 202 Accepted + jobId

    FE->>FE: Connect WebSocket
    FE->>FE: Listen ai:job:status

    RMQ->>AI: Consume message
    AI->>DB: Update job (PROCESSING)
    AI->>FE: WS: status = PROCESSING

    AI->>S3: Download user image
    AI->>S3: Download product image
    AI->>AI: Run VITON model
    AI->>S3: Upload result image
    S3-->>AI: Result URL

    AI->>RMQ: Publish to ai.results
    RMQ->>BE: Consume result
    BE->>DB: Update job (COMPLETED)
    BE->>FE: WS: ai:job:result + URL

    FE-->>User: Hiển thị kết quả
```

### 2.4. Thanh Toán MoMo

```mermaid
sequenceDiagram
    autonumber
    actor User as Người Dùng
    participant FE as Frontend
    participant BE as Backend
    participant MoMo as MoMo Gateway
    participant DB as Database

    FE->>BE: POST /payments/initiate (MOMO)
    BE->>DB: Lấy Order info
    BE->>BE: Build MoMo request
    BE->>BE: Create HMAC signature
    BE->>MoMo: POST /v2/gateway/api/create
    MoMo-->>BE: payUrl, qrCodeUrl
    BE->>DB: Tạo Payment (PROCESSING)
    BE-->>FE: Payment URL + QR

    alt Redirect Payment
        FE->>FE: Redirect to payUrl
        User->>MoMo: Xác nhận thanh toán
    else QR Payment
        FE-->>User: Hiển thị QR Code
        User->>MoMo: Scan & Pay
    end

    MoMo->>MoMo: Process payment
    MoMo->>BE: POST /payments/webhook/momo
    BE->>BE: Verify HMAC signature

    alt Signature valid
        BE->>DB: Update Payment (COMPLETED)
        BE->>DB: Update Order (CONFIRMED)
        BE->>FE: WS: payment:completed
        FE-->>User: Thanh toán thành công
    else Signature invalid
        BE-->>MoMo: 400 Invalid signature
    end
```

### 2.5. Chat với AI

```mermaid
sequenceDiagram
    autonumber
    actor User as Người Dùng
    participant FE as Frontend
    participant BE as Backend
    participant RMQ as RabbitMQ
    participant AI as AI Service
    participant LLM as LLM API
    participant DB as Database

    User->>FE: Nhập tin nhắn
    FE->>BE: POST /ai/chat
    BE->>DB: Lưu user message
    BE->>DB: Lấy chat history (10 gần nhất)
    BE->>RMQ: Publish to ai.chat.requests
    BE-->>FE: 200 OK

    RMQ->>AI: Consume message
    AI->>AI: Build context + system prompt
    AI->>LLM: Send request (streaming)

    loop Streaming response
        LLM-->>AI: Response chunk
        AI->>RMQ: Publish chunk
        RMQ->>BE: Consume chunk
        BE->>FE: WS: chat:chunk
        FE-->>User: Append text
    end

    AI->>DB: Lưu assistant message
    AI->>RMQ: Publish complete
    RMQ->>BE: Consume complete
    BE->>FE: WS: chat:complete
```

---

## 3. Activity Diagram - Sơ Đồ Hoạt Động

### 3.1. Luồng Mua Hàng

```mermaid
flowchart TD
    Start([Bắt đầu])
    Browse[Duyệt sản phẩm]
    ViewProduct[Xem chi tiết SP]
    SelectVariant{Chọn size/màu?}
    AddCart[Thêm vào giỏ]
    ContinueShopping{Tiếp tục mua?}
    ViewCart[Xem giỏ hàng]
    UpdateCart{Cập nhật giỏ?}
    Checkout[Đến trang checkout]
    Login{Đã đăng nhập?}
    DoLogin[Đăng nhập]
    SelectAddress[Chọn địa chỉ]
    SelectPayment[Chọn PT thanh toán]
    ConfirmOrder[Xác nhận đơn hàng]
    PaymentCheck{PT online?}
    ProcessPayment[Xử lý thanh toán]
    PaymentSuccess{Thành công?}
    CreateOrder[Tạo đơn hàng]
    OrderSuccess([Đặt hàng thành công])
    PaymentFailed[Thanh toán thất bại]
    Retry{Thử lại?}
    Cancel([Hủy bỏ])

    Start --> Browse
    Browse --> ViewProduct
    ViewProduct --> SelectVariant
    SelectVariant -->|Đã chọn| AddCart
    SelectVariant -->|Chưa chọn| ViewProduct
    AddCart --> ContinueShopping
    ContinueShopping -->|Có| Browse
    ContinueShopping -->|Không| ViewCart
    ViewCart --> UpdateCart
    UpdateCart -->|Có| ViewCart
    UpdateCart -->|Không| Checkout
    Checkout --> Login
    Login -->|Chưa| DoLogin
    DoLogin --> SelectAddress
    Login -->|Rồi| SelectAddress
    SelectAddress --> SelectPayment
    SelectPayment --> ConfirmOrder
    ConfirmOrder --> PaymentCheck
    PaymentCheck -->|COD/Bank| CreateOrder
    PaymentCheck -->|MoMo/ZaloPay| ProcessPayment
    ProcessPayment --> PaymentSuccess
    PaymentSuccess -->|Có| CreateOrder
    PaymentSuccess -->|Không| PaymentFailed
    PaymentFailed --> Retry
    Retry -->|Có| ProcessPayment
    Retry -->|Không| Cancel
    CreateOrder --> OrderSuccess
```

### 3.2. Luồng Xử Lý Đơn Hàng (Admin)

```mermaid
flowchart TD
    Start([Đơn hàng mới])
    CheckPayment{Đã thanh toán?}
    WaitPayment[Chờ thanh toán]
    PaymentTimeout{Quá hạn?}
    AutoCancel[Tự động hủy]
    ConfirmOrder[Xác nhận đơn hàng]
    CheckStock{Còn hàng?}
    ContactCustomer[Liên hệ khách]
    CustomerDecision{Khách đồng ý?}
    CancelOrder[Hủy đơn]
    RefundPayment[Hoàn tiền]
    ProcessOrder[Xử lý đơn hàng]
    PackOrder[Đóng gói]
    ShipOrder[Giao shipper]
    UpdateTracking[Cập nhật tracking]
    Delivered{Đã giao?}
    CompleteOrder[Hoàn thành]
    FailedDelivery[Giao thất bại]
    RetryDeliver{Giao lại?}
    ReturnOrder[Trả hàng về]
    End([Kết thúc])

    Start --> CheckPayment
    CheckPayment -->|COD/Đã TT| ConfirmOrder
    CheckPayment -->|Chưa| WaitPayment
    WaitPayment --> PaymentTimeout
    PaymentTimeout -->|Có| AutoCancel
    PaymentTimeout -->|Không| WaitPayment
    AutoCancel --> End
    ConfirmOrder --> CheckStock
    CheckStock -->|Có| ProcessOrder
    CheckStock -->|Không| ContactCustomer
    ContactCustomer --> CustomerDecision
    CustomerDecision -->|Đợi/Thay SP| ConfirmOrder
    CustomerDecision -->|Hủy| CancelOrder
    CancelOrder --> RefundPayment
    RefundPayment --> End
    ProcessOrder --> PackOrder
    PackOrder --> ShipOrder
    ShipOrder --> UpdateTracking
    UpdateTracking --> Delivered
    Delivered -->|Có| CompleteOrder
    Delivered -->|Không| FailedDelivery
    FailedDelivery --> RetryDeliver
    RetryDeliver -->|Có| ShipOrder
    RetryDeliver -->|Không| ReturnOrder
    ReturnOrder --> RefundPayment
    CompleteOrder --> End
```

### 3.3. Luồng Thử Đồ Ảo

```mermaid
flowchart TD
    Start([Bắt đầu])
    SelectProduct[Chọn sản phẩm]
    UploadPhoto[Upload ảnh cá nhân]
    ValidatePhoto{Ảnh hợp lệ?}
    ShowError[Hiển thị lỗi]
    RetryUpload{Thử lại?}
    SubmitJob[Gửi yêu cầu]
    JobQueue[Đưa vào queue]
    WaitProcessing[Chờ xử lý]
    AIProcessing[AI xử lý]
    ProcessSuccess{Thành công?}
    ShowResult[Hiển thị kết quả]
    SaveResult{Lưu kết quả?}
    SaveToHistory[Lưu vào lịch sử]
    TryAnother{Thử SP khác?}
    AddToCart{Thêm giỏ hàng?}
    GoToCart[Đến giỏ hàng]
    End([Kết thúc])
    ShowAIError[Hiển thị lỗi AI]
    RetryAI{Thử lại?}

    Start --> SelectProduct
    SelectProduct --> UploadPhoto
    UploadPhoto --> ValidatePhoto
    ValidatePhoto -->|Không| ShowError
    ShowError --> RetryUpload
    RetryUpload -->|Có| UploadPhoto
    RetryUpload -->|Không| End
    ValidatePhoto -->|Có| SubmitJob
    SubmitJob --> JobQueue
    JobQueue --> WaitProcessing
    WaitProcessing --> AIProcessing
    AIProcessing --> ProcessSuccess
    ProcessSuccess -->|Có| ShowResult
    ProcessSuccess -->|Không| ShowAIError
    ShowAIError --> RetryAI
    RetryAI -->|Có| SubmitJob
    RetryAI -->|Không| End
    ShowResult --> SaveResult
    SaveResult -->|Có| SaveToHistory
    SaveResult -->|Không| TryAnother
    SaveToHistory --> TryAnother
    TryAnother -->|Có| SelectProduct
    TryAnother -->|Không| AddToCart
    AddToCart -->|Có| GoToCart
    AddToCart -->|Không| End
    GoToCart --> End
```

---

## 4. State Diagram - Sơ Đồ Trạng Thái

### 4.1. Trạng Thái Đơn Hàng

```mermaid
stateDiagram-v2
    [*] --> PENDING: Tạo đơn hàng

    PENDING --> CONFIRMED: Admin xác nhận
    PENDING --> CANCELLED: Khách hủy / Timeout

    CONFIRMED --> PROCESSING: Bắt đầu xử lý
    CONFIRMED --> CANCELLED: Admin hủy

    PROCESSING --> SHIPPED: Giao cho shipper
    PROCESSING --> CANCELLED: Hết hàng

    SHIPPED --> DELIVERED: Giao thành công
    SHIPPED --> PROCESSING: Giao thất bại - thử lại
    SHIPPED --> CANCELLED: Giao thất bại - hủy

    DELIVERED --> REFUNDED: Hoàn tiền (khiếu nại)
    CANCELLED --> REFUNDED: Hoàn tiền (đã thanh toán)

    DELIVERED --> [*]
    REFUNDED --> [*]
    CANCELLED --> [*]

    note right of PENDING
        Chờ xác nhận
        Max 24h → auto cancel
    end note

    note right of CONFIRMED
        Đã xác nhận
        Chuẩn bị hàng
    end note

    note right of SHIPPED
        Đang giao
        Có tracking number
    end note
```

### 4.2. Trạng Thái Thanh Toán

```mermaid
stateDiagram-v2
    [*] --> PENDING: Tạo payment

    PENDING --> PROCESSING: Redirect to gateway
    PENDING --> FAILED: Timeout / Error

    PROCESSING --> COMPLETED: Webhook success
    PROCESSING --> FAILED: Webhook failed
    PROCESSING --> PENDING: Retry

    COMPLETED --> REFUNDED: Hoàn tiền

    FAILED --> PENDING: Thử lại
    FAILED --> [*]: Hủy bỏ

    COMPLETED --> [*]
    REFUNDED --> [*]

    note right of PROCESSING
        Đang xử lý tại gateway
        Chờ webhook callback
    end note
```

### 4.3. Trạng Thái AI Job

```mermaid
stateDiagram-v2
    [*] --> PENDING: Tạo job

    PENDING --> PROCESSING: Worker pick up
    PENDING --> FAILED: Queue error

    PROCESSING --> COMPLETED: Xử lý xong
    PROCESSING --> FAILED: Lỗi xử lý

    FAILED --> PENDING: Retry (max 3)
    FAILED --> [*]: Max retries reached

    COMPLETED --> [*]

    note right of PENDING
        Chờ trong queue
        Priority: FIFO
    end note

    note right of PROCESSING
        Đang xử lý AI
        Có progress updates
    end note
```

### 4.4. Trạng Thái Giỏ Hàng

```mermaid
stateDiagram-v2
    [*] --> EMPTY: Tạo cart

    EMPTY --> HAS_ITEMS: Thêm sản phẩm

    HAS_ITEMS --> EMPTY: Xóa hết
    HAS_ITEMS --> HAS_ITEMS: Thêm/Xóa/Cập nhật
    HAS_ITEMS --> CHECKOUT: Đặt hàng

    CHECKOUT --> HAS_ITEMS: Hủy checkout
    CHECKOUT --> ORDERED: Tạo order thành công

    ORDERED --> EMPTY: Reset cart

    EMPTY --> [*]
```
