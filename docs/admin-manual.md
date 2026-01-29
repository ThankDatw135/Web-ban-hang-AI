# Hướng Dẫn Quản Trị Viên (Admin Manual)

Hướng dẫn sử dụng trang quản trị hệ thống Fashion AI E-commerce.

---

## Mục Lục

1. [Đăng Nhập Admin](#1-đăng-nhập-admin)
2. [Dashboard](#2-dashboard)
3. [Quản Lý Sản Phẩm](#3-quản-lý-sản-phẩm)
4. [Quản Lý Đơn Hàng](#4-quản-lý-đơn-hàng)
5. [Quản Lý Người Dùng](#5-quản-lý-người-dùng)
6. [Quản Lý Thanh Toán](#6-quản-lý-thanh-toán)
7. [Cấu Hình Hệ Thống](#7-cấu-hình-hệ-thống)

---

## 1. Đăng Nhập Admin

### 1.1. Truy Cập Trang Admin

```
URL: https://example.com/admin
hoặc: https://admin.example.com
```

### 1.2. Thông Tin Đăng Nhập

| Trường   | Mô tả                 |
| -------- | --------------------- |
| Email    | Email tài khoản admin |
| Password | Mật khẩu              |

> **Lưu ý**: Tài khoản admin mặc định được tạo khi chạy seed database.

### 1.3. Quên Mật Khẩu

1. Click "Quên mật khẩu"
2. Nhập email admin
3. Kiểm tra email và click link đặt lại
4. Nhập mật khẩu mới

---

## 2. Dashboard

### 2.1. Tổng Quan

Dashboard hiển thị các thông tin quan trọng:

| Widget                | Mô tả                             |
| --------------------- | --------------------------------- |
| **Doanh thu hôm nay** | Tổng doanh thu các đơn hoàn thành |
| **Đơn hàng mới**      | Số đơn chờ xử lý                  |
| **Khách hàng mới**    | Số đăng ký mới trong 24h          |
| **Sản phẩm sắp hết**  | SP có stock < 10                  |

### 2.2. Biểu Đồ

- **Biểu đồ doanh thu**: Theo ngày/tuần/tháng
- **Biểu đồ đơn hàng**: Trạng thái đơn hàng
- **Top sản phẩm**: Bán chạy nhất
- **Top danh mục**: Theo doanh thu

### 2.3. Quick Actions

| Hành động      | Mô tả                 |
| -------------- | --------------------- |
| + Sản phẩm mới | Tạo sản phẩm mới      |
| Xem đơn chờ    | Danh sách đơn PENDING |
| Xuất báo cáo   | Export Excel/PDF      |

---

## 3. Quản Lý Sản Phẩm

### 3.1. Danh Sách Sản Phẩm

**Truy cập:** Menu → Sản phẩm → Danh sách

**Bộ lọc:**

- Danh mục
- Trạng thái (Đang bán / Ngừng bán)
- Khoảng giá
- Tồn kho

**Hành động nhanh:**

- 👁️ Xem chi tiết
- ✏️ Chỉnh sửa
- 🗑️ Xóa (soft delete)
- 📋 Nhân bản

### 3.2. Thêm Sản Phẩm Mới

**Bước 1: Thông tin cơ bản**

| Trường         | Bắt buộc | Mô tả                   |
| -------------- | -------- | ----------------------- |
| Tên sản phẩm   | ✅       | Tên hiển thị            |
| SKU            | ✅       | Mã sản phẩm duy nhất    |
| Danh mục       | ✅       | Chọn từ danh sách       |
| Giá gốc        | ✅       | VNĐ                     |
| Giá khuyến mãi | ❌       | VNĐ (nếu có)            |
| Thương hiệu    | ❌       | Tên thương hiệu         |
| Chất liệu      | ❌       | Cotton, Polyester, etc. |

**Bước 2: Mô tả**

- Mô tả ngắn (hiển thị listing)
- Mô tả chi tiết (HTML editor)
- Hướng dẫn size

**Bước 3: Hình ảnh**

| Loại      | Số lượng | Kích thước |
| --------- | -------- | ---------- |
| Ảnh chính | 1        | 800x1000px |
| Ảnh phụ   | 1-10     | 800x1000px |

> **Tip**: Kéo thả để sắp xếp thứ tự ảnh

**Bước 4: Biến thể**

Thêm các biến thể theo Size và Màu:

| Size | Màu   | Mã HEX  | Tồn kho | SKU biến thể  |
| ---- | ----- | ------- | ------- | ------------- |
| M    | Đen   | #000000 | 50      | ATN-001-M-BLK |
| M    | Trắng | #FFFFFF | 30      | ATN-001-M-WHT |
| L    | Đen   | #000000 | 40      | ATN-001-L-BLK |

**Bước 5: SEO**

- Meta title
- Meta description
- URL slug (tự động từ tên)

### 3.3. Chỉnh Sửa Sản Phẩm

1. Tìm sản phẩm trong danh sách
2. Click ✏️ hoặc vào chi tiết
3. Chỉnh sửa các trường cần thiết
4. Click "Lưu thay đổi"

### 3.4. Quản Lý Tồn Kho

**Cập nhật nhanh:**

1. Menu → Sản phẩm → Tồn kho
2. Tìm biến thể cần cập nhật
3. Nhập số lượng mới
4. Click "Cập nhật"

**Nhập hàng loạt:**

1. Tải template Excel
2. Điền số lượng theo SKU
3. Upload file
4. Xác nhận import

### 3.5. Quản Lý Danh Mục

**Truy cập:** Menu → Sản phẩm → Danh mục

**Thao tác:**

- Thêm danh mục mới
- Chỉnh sửa tên/mô tả/ảnh
- Sắp xếp thứ tự (kéo thả)
- Tạo danh mục con

---

## 4. Quản Lý Đơn Hàng

### 4.1. Danh Sách Đơn Hàng

**Truy cập:** Menu → Đơn hàng → Danh sách

**Bộ lọc:**
| Lọc | Giá trị |
|-----|---------|
| Trạng thái | Chờ xử lý / Đã xác nhận / Đang xử lý / Đã gửi / Đã giao / Đã hủy |
| Thanh toán | COD / MoMo / ZaloPay / Bank |
| Ngày đặt | Từ ngày - Đến ngày |
| Tổng tiền | Tối thiểu - Tối đa |

### 4.2. Chi Tiết Đơn Hàng

Click vào mã đơn hàng để xem:

**Thông tin đơn:**

- Mã đơn hàng
- Ngày đặt
- Trạng thái
- Phương thức thanh toán
- Trạng thái thanh toán

**Thông tin khách:**

- Tên người nhận
- Số điện thoại
- Địa chỉ giao hàng

**Sản phẩm:**

- Danh sách sản phẩm
- Size/Màu
- Số lượng
- Đơn giá
- Thành tiền

**Tổng cộng:**

- Tạm tính
- Phí vận chuyển
- Giảm giá
- **Tổng thanh toán**

### 4.3. Xử Lý Đơn Hàng

**Luồng trạng thái:**

```
PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED
    ↓         ↓           ↓           ↓
    ↓      CANCELLED   CANCELLED   CANCELLED
    ↓
CANCELLED
```

**Bước xử lý:**

| Từ trạng thái | Đến trạng thái | Hành động         |
| ------------- | -------------- | ----------------- |
| PENDING       | CONFIRMED      | Xác nhận đơn hàng |
| CONFIRMED     | PROCESSING     | Bắt đầu xử lý     |
| PROCESSING    | SHIPPED        | Giao cho shipper  |
| SHIPPED       | DELIVERED      | Xác nhận đã giao  |
| \*            | CANCELLED      | Hủy đơn           |

**Cập nhật trạng thái:**

1. Mở chi tiết đơn hàng
2. Click "Cập nhật trạng thái"
3. Chọn trạng thái mới
4. Nhập ghi chú (tùy chọn)
5. Xác nhận

### 4.4. Hủy Đơn Hàng

1. Mở chi tiết đơn hàng
2. Click "Hủy đơn"
3. Chọn lý do hủy:
   - Khách yêu cầu hủy
   - Hết hàng
   - Không liên lạc được
   - Khác (nhập lý do)
4. Xác nhận hủy

> **Lưu ý**: Nếu đơn đã thanh toán, cần tiến hành hoàn tiền.

### 4.5. In Đơn Hàng

1. Chọn đơn hàng cần in
2. Click "In đơn"
3. Chọn loại:
   - Phiếu giao hàng
   - Hóa đơn
4. In hoặc tải PDF

---

## 5. Quản Lý Người Dùng

### 5.1. Danh Sách Người Dùng

**Truy cập:** Menu → Người dùng → Danh sách

**Bộ lọc:**

- Vai trò (User / Admin)
- Trạng thái (Hoạt động / Bị khóa)
- Ngày đăng ký
- Đã xác minh email

### 5.2. Xem Chi Tiết Người Dùng

Click vào tên người dùng để xem:

**Thông tin cơ bản:**

- Email
- Họ tên
- Số điện thoại
- Ngày đăng ký
- Lần đăng nhập cuối

**Thống kê:**

- Số đơn hàng
- Tổng chi tiêu
- Điểm tích lũy

**Đơn hàng gần đây:**

- Danh sách 10 đơn gần nhất

### 5.3. Khóa/Mở Khóa Tài Khoản

**Khóa tài khoản:**

1. Mở chi tiết người dùng
2. Click "Khóa tài khoản"
3. Nhập lý do
4. Xác nhận

**Mở khóa:**

1. Mở chi tiết người dùng
2. Click "Mở khóa"
3. Xác nhận

### 5.4. Tạo Tài Khoản Admin

1. Menu → Người dùng → Thêm mới
2. Điền thông tin:
   - Email
   - Họ tên
   - Mật khẩu
   - Vai trò: **Admin**
3. Click "Tạo tài khoản"

---

## 6. Quản Lý Thanh Toán

### 6.1. Danh Sách Giao Dịch

**Truy cập:** Menu → Thanh toán → Giao dịch

**Bộ lọc:**

- Phương thức (COD / MoMo / ZaloPay / Bank)
- Trạng thái (Chờ / Hoàn thành / Thất bại / Hoàn tiền)
- Ngày giao dịch
- Số tiền

### 6.2. Xác Nhận Chuyển Khoản

Với đơn hàng thanh toán chuyển khoản:

1. Menu → Thanh toán → Chờ xác nhận
2. Kiểm tra thông tin:
   - Mã tham chiếu
   - Số tiền
   - Thời gian
3. Đối chiếu với sao kê ngân hàng
4. Click "Xác nhận" hoặc "Từ chối"

### 6.3. Hoàn Tiền

**Khi nào hoàn tiền:**

- Đơn hàng bị hủy sau khi đã thanh toán
- Khiếu nại từ khách hàng
- Sản phẩm không đúng

**Quy trình:**

1. Mở chi tiết đơn hàng
2. Click "Hoàn tiền"
3. Nhập số tiền hoàn (toàn bộ hoặc một phần)
4. Nhập lý do
5. Xác nhận

**Với MoMo/ZaloPay:**

- Hệ thống tự động gọi API hoàn tiền
- Kiểm tra trạng thái sau 5-10 phút

**Với Bank/COD:**

- Liên hệ khách lấy thông tin ngân hàng
- Thực hiện chuyển khoản thủ công
- Cập nhật trạng thái hoàn tiền

---

## 7. Cấu Hình Hệ Thống

### 7.1. Cài Đặt Chung

**Truy cập:** Menu → Cài đặt → Chung

| Cài đặt       | Mô tả                |
| ------------- | -------------------- |
| Tên cửa hàng  | Hiển thị trên web    |
| Logo          | Logo cửa hàng        |
| Favicon       | Icon tab trình duyệt |
| Email liên hệ | Email hỗ trợ         |
| Hotline       | Số điện thoại        |
| Địa chỉ       | Địa chỉ cửa hàng     |

### 7.2. Cài Đặt Vận Chuyển

**Phí vận chuyển:**
| Khu vực | Phí |
|---------|-----|
| Nội thành TP.HCM | 20,000 VNĐ |
| Ngoại thành TP.HCM | 30,000 VNĐ |
| Các tỉnh khác | 35,000 VNĐ |

**Miễn phí vận chuyển:**

- Đơn hàng từ: 500,000 VNĐ

### 7.3. Cài Đặt Thanh Toán

**Phương thức thanh toán:**

- [ ] COD - Bật/Tắt
- [ ] Chuyển khoản - Bật/Tắt
- [ ] MoMo - Bật/Tắt
- [ ] ZaloPay - Bật/Tắt

**Thông tin ngân hàng:**

- Tên ngân hàng
- Số tài khoản
- Chủ tài khoản

### 7.4. Cài Đặt Email

**Template email:**

- Email xác nhận đơn hàng
- Email cập nhật trạng thái
- Email quên mật khẩu

### 7.5. Quản Lý AI

**Truy cập:** Menu → Cài đặt → AI

**Cấu hình:**
| Tính năng | Trạng thái | Rate Limit |
|-----------|------------|------------|
| Thử đồ ảo | Bật | 5 req/phút |
| Gợi ý size | Bật | 20 req/phút |
| Chat AI | Bật | 30 req/phút |

---

## Phím Tắt

| Phím       | Hành động               |
| ---------- | ----------------------- |
| `Ctrl + K` | Tìm kiếm nhanh          |
| `Ctrl + N` | Thêm mới (theo context) |
| `Ctrl + S` | Lưu                     |
| `Esc`      | Đóng modal              |

---

## Hỗ Trợ

Nếu gặp vấn đề, vui lòng liên hệ:

- **Email**: admin@example.com
- **Hotline**: 1900 1234
- **Tài liệu**: [docs.example.com](https://docs.example.com)
