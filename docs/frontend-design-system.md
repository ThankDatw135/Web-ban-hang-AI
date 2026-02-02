# Fashion AI - Frontend Design System

> **Phiên bản:** 2.0 | **Cập nhật:** 02/02/2026

---

## 1. Tổng Quan

**Thương hiệu:** Fashion AI  
**Phong cách:** Cao cấp – Nhẹ nhàng – Thời trang – Premium  
**Đặc trưng:** Kết hợp thời trang cao cấp với công nghệ AI tiên tiến

### Nguyên Tắc Thiết Kế

1. **Tối giản sang trọng** - Whitespace, bố cục thoáng
2. **AI là điểm nhấn** - Màu accent tím cho AI features
3. **Tương tác mượt mà** - Animations tinh tế
4. **Mobile first** - Responsive từ mobile lên desktop

---

## 2. Bảng Màu

### Màu Chính

| Token          | Hex       | Mục đích            |
| -------------- | --------- | ------------------- |
| **Background** | `#FAF7F2` | Kem sữa - Nền chính |
| **White**      | `#FFFFFF` | Cards, Modals       |
| **Primary**    | `#C7A26A` | Gold - Buttons, CTA |
| **Secondary**  | `#6B7280` | Gray - Text phụ     |
| **Accent**     | `#A855F7` | Tím - AI features   |
| **Text**       | `#1F2937` | Text chính          |
| **Border**     | `#E5E7EB` | Dividers            |

### Primary Scale (Gold)

```css
--primary-50: #fcf8f3;
--primary-100: #f5ebd9;
--primary-200: #e8d4b4;
--primary-300: #dbbf90;
--primary-400: #d1ac7a;
--primary-500: #c7a26a; /* DEFAULT */
--primary-600: #b8915a;
--primary-700: #a07b4a;
```

### Accent Scale (AI Purple)

```css
--accent-50: #f5f3ff;
--accent-100: #ede9fe;
--accent-500: #a855f7; /* DEFAULT */
--accent-600: #9333ea;
```

### Semantic Colors

```css
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

---

## 3. Typography

### Font Family

```css
font-family:
  "Manrope",
  -apple-system,
  BlinkMacSystemFont,
  sans-serif;
```

**Import:**

```html
<link
  href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
  rel="stylesheet"
/>
```

### Font Scale

| Tên        | Size | Weight | Sử dụng         |
| ---------- | ---- | ------ | --------------- |
| Display XL | 72px | 900    | Hero headlines  |
| Display LG | 60px | 800    | Section titles  |
| H1         | 48px | 800    | Page titles     |
| H2         | 36px | 700    | Section headers |
| H3         | 24px | 700    | Card titles     |
| H4         | 20px | 600    | Subsections     |
| Body LG    | 18px | 400    | Lead text       |
| Body       | 16px | 400    | Default         |
| Body SM    | 14px | 400    | Captions        |
| Caption    | 12px | 500    | Labels          |

---

## 4. Spacing & Layout

### Container

```css
max-width: 1280px;
padding: 0 16px; /* Mobile */
padding: 0 40px; /* Tablet */
padding: 0 160px; /* Desktop */
```

### Grid

```css
/* Products */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

/* Dashboard */
grid-template-columns: 280px 1fr;
```

---

## 5. Border Radius

| Token   | Value  | Sử dụng          |
| ------- | ------ | ---------------- |
| DEFAULT | 4px    | Inputs           |
| md      | 8px    | Small cards      |
| lg      | 12px   | Cards            |
| xl      | 16px   | Modals           |
| 2xl     | 24px   | Hero images      |
| full    | 9999px | Buttons, Avatars |

---

## 6. Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

/* Brand shadows */
--shadow-primary: 0 10px 40px rgba(199, 162, 106, 0.2);
--shadow-accent: 0 10px 40px rgba(168, 85, 247, 0.2);
```

---

## 7. Effects & Animations

### Glassmorphism

```css
bg-cream/90 backdrop-blur-md
```

### Hover Effects

```css
/* Button lift */
transform hover:-translate-y-0.5

/* Card shadow */
shadow-sm hover:shadow-xl

/* Image zoom */
group-hover:scale-105 duration-500
```

### Gradient Text

```css
bg-gradient-to-r from-primary to-[#dcb77d] bg-clip-text text-transparent
```

### AI Glow

```css
bg-accent/20 blur-3xl
```

---

## 8. Components

### Buttons

| Variant     | Style                                       |
| ----------- | ------------------------------------------- |
| Primary     | `bg-primary rounded-full shadow-primary/20` |
| Accent (AI) | `bg-accent rounded-full shadow-accent/20`   |
| Outline     | `border border-gray-300 rounded-full`       |
| Ghost       | `hover:bg-black/5`                          |

**Sizes:** SM (h-9), MD (h-11), LG (h-14)

### Product Card

- Aspect ratio: 3:4
- Wishlist button top-right
- Image zoom on hover
- Name, price, "Mua ngay" button

### Input

```css
h-12 px-4 rounded-xl border border-gray-300
focus:border-primary focus:ring-2 focus:ring-primary/20
```

---

## 9. Dark Mode

| Light     | Dark      |
| --------- | --------- |
| `#FAF7F2` | `#1e1a14` |
| `#FFFFFF` | `#25221d` |
| `#1F2937` | `#FFFFFF` |
| `#E5E7EB` | `#332f28` |

---

## 10. Responsive Breakpoints

| Breakpoint | Width  | Sử dụng          |
| ---------- | ------ | ---------------- |
| sm         | 640px  | Mobile landscape |
| md         | 768px  | Tablet           |
| lg         | 1024px | Desktop          |
| xl         | 1280px | Large desktop    |
| 2xl        | 1536px | Extra large      |

---

## 11. Page Layouts

### Public Layout

```
Header (sticky glassmorphism)
├── Logo + Nav + AI Studio + Icons
Main Content
Footer (4 columns)
```

### Dashboard Layout

```
Sidebar (280px) | Main Content
```

### Admin Layout

```
Sidebar (Nav) | Top Bar + Content
```

---

## 12. Z-Index Scale

| Layer          | Value |
| -------------- | ----- |
| Dropdown       | 10    |
| Sticky         | 20    |
| Fixed          | 30    |
| Modal Backdrop | 40    |
| Modal/Header   | 50    |
| Toast          | 60    |
| Tooltip        | 70    |

---

## 13. Icons

**Library:** Lucide React

```jsx
import { ShoppingBag, Heart, Search, Sparkles } from "lucide-react";
```

**Sizes:** XS (14px), SM (18px), MD (20px), LG (24px), XL (28px)

---

## 14. Pages Structure

### Trang Chủ & Thông Tin (7 pages)

- `/` - Homepage
- `/about` - Giới thiệu
- `/return-policy` - Đổi trả
- `/blog` - Tin tức
- `/contact` - Liên hệ
- `/ai-studio` - Thử đồ AI
- Live Chat Widget

### Xác Thực (5 pages)

- `/login`, `/register`, `/forgot-password`, `/verify-otp`, `/reset-password`

### Mua Sắm (3 pages)

- `/products`, `/products/[id]`, `/cart`

### Thanh Toán (3 pages)

- `/checkout`, `/checkout/success`, `/checkout/failed`

### User Dashboard (6 pages)

- `/dashboard`, `/dashboard/profile`, `/dashboard/orders`
- `/dashboard/wishlist`, `/dashboard/notifications`, `/dashboard/settings`

### Admin (7 pages)

- `/admin`, `/admin/products`, `/admin/orders`, `/admin/users`
- `/admin/coupons`, `/admin/ai-jobs`, `/admin/support`

### Error Pages

- `error.tsx`, `not-found.tsx`

---

## 15. Checklist Triển Khai

- [ ] Import Google Fonts (Manrope)
- [ ] Cấu hình tailwind.config.ts
- [ ] Tạo globals.css với CSS variables
- [ ] Tạo UI components (Button, Input, Card)
- [ ] Tạo Layout components (Header, Footer, Sidebar)
- [ ] Implement dark mode
- [ ] Test responsive
- [ ] Kiểm tra accessibility

---

# BRAND GUIDELINE

## Bộ nhận diện thương hiệu Fashion AI

---

## 16. Logo System

### Logo Chính

- **Text:** "Fashion AI"
- **Icon:** Diamond (💎) từ Lucide - tượng trưng sự sang trọng
- **Font:** Manrope ExtraBold (800)
- **Màu:** Text đen `#1F2937`, Icon gold `#C7A26A`

### Quy Tắc Sử Dụng Logo

| Trường hợp   | Cách dùng                     |
| ------------ | ----------------------------- |
| Nền sáng     | Logo đen + icon gold          |
| Nền tối      | Logo trắng + icon gold        |
| Nền màu      | Logo trắng (đảm bảo contrast) |
| Minimum size | 120px width                   |
| Clear space  | 1x chiều cao logo xung quanh  |

### Logo Variants

```
[💎] Fashion AI          // Full logo
[💎] FA                   // Short logo
[💎]                      // Icon only
```

---

## 17. Favicon & App Icons

### Favicon

- **Design:** Chữ "F" hoặc "FA" với gradient gold
- **Background:** Transparent hoặc cream
- **Sizes:** 16x16, 32x32, 48x48, 64x64

### App Icons

| Size    | Sử dụng          |
| ------- | ---------------- |
| 16x16   | Browser tab      |
| 32x32   | Bookmark         |
| 180x180 | Apple Touch Icon |
| 192x192 | Android Chrome   |
| 512x512 | PWA Splash       |

### Favicon Code

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

---

## 18. Icon System

### Thư viện: Lucide React

### Icons Chức Năng

| Chức năng    | Icon            | Màu                |
| ------------ | --------------- | ------------------ |
| Giỏ hàng     | `ShoppingBag`   | Text chính         |
| Tài khoản    | `User`          | Text chính         |
| AI Try-on    | `Sparkles`      | `#A855F7` (accent) |
| Chat         | `MessageCircle` | Text chính         |
| Wishlist     | `Heart`         | Đỏ khi active      |
| Thanh toán   | `CreditCard`    | Text chính         |
| Tìm kiếm     | `Search`        | Text chính         |
| Menu         | `Menu`          | Text chính         |
| Đóng         | `X`             | Text chính         |
| Back         | `ArrowLeft`     | Text chính         |
| Settings     | `Settings`      | Text chính         |
| Notification | `Bell`          | Text chính         |

### Icon Sizes

```jsx
// Quy chuẩn
<Icon className="w-4 h-4" />   // 16px - inline text
<Icon className="w-5 h-5" />   // 20px - buttons, nav
<Icon className="w-6 h-6" />   // 24px - feature icons
<Icon className="w-8 h-8" />   // 32px - large feature
```

### AI Icons - Đặc biệt

Tất cả icons liên quan AI sử dụng màu accent tím:

```jsx
<Sparkles className="w-5 h-5 text-accent" />
<Wand2 className="w-5 h-5 text-accent" />
<Bot className="w-5 h-5 text-accent" />
```

---

## 19. UI Component Style

### Buttons

```jsx
// Primary (Gold)
className =
  "bg-primary hover:bg-primary-600 text-white rounded-full px-8 h-14 font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5";

// AI Button (Purple)
className =
  "bg-accent hover:bg-accent-600 text-white rounded-full px-8 h-14 font-bold shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5";

// Outline
className =
  "border-2 border-gray-300 hover:border-primary text-text-main rounded-full px-8 h-14 font-bold transition-all";

// Ghost
className = "hover:bg-black/5 rounded-full px-4 h-10 transition-colors";
```

### Product Card

```jsx
// Container
className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group"

// Image
className="aspect-[3/4] overflow-hidden"
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

// Wishlist button
className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:text-red-500 transition-colors"

// Price
className="text-primary font-bold text-lg"

// Buy button
className="w-full h-11 rounded-full bg-primary text-white font-bold hover:bg-primary-600 transition-colors"
```

### Form Inputs

```jsx
// Text input
className =
  "w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";

// Select
className =
  "w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary appearance-none";

// Textarea
className =
  "w-full p-4 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none";
```

### Cards

```jsx
// Standard card
className = "bg-white rounded-2xl p-6 shadow-sm";

// Hover card
className =
  "bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow";

// AI card
className = "bg-accent/5 border border-accent/20 rounded-2xl p-6";
```

### Borders & Dividers

```css
/* Standard border */
border border-gray-200

/* Divider */
border-t border-gray-200

/* AI border */
border border-accent/30
```

---

## 20. Banner / Hero Images

### Banner Trang Chủ (Hero)

```
┌─────────────────────────────────────────────────────────┐
│  [Background: High-quality fashion model image]         │
│  Overlay: gradient from-black/50 to-transparent         │
│                                                         │
│  ✨ Powered by AI (badge accent)                       │
│                                                         │
│  KHÁM PHÁ PHONG CÁCH                                   │
│  CỦA RIÊNG BẠN                                         │
│  (72px, gradient text gold)                            │
│                                                         │
│  [🛍️ Mua sắm ngay] [✨ Thử đồ với AI]                 │
│  (gold button)       (purple button)                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Specs:**

- Height: 80-100vh
- Image: Model với outfit, màu tone ấm
- Overlay: `bg-gradient-to-t from-black/60 via-black/20 to-transparent`

### Banner AI Try-On

```
┌─────────────────────────────────────────────────────────┐
│  [Purple gradient background + glow effects]            │
│                                                         │
│  ✨ THỬ ĐỒ TRỰC TUYẾN VỚI AI                           │
│                                                         │
│  [Demo animation]    Công nghệ AI tiên tiến             │
│                      giúp bạn thử đồ mọi lúc            │
│                      [Thử ngay →]                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Specs:**

- Background: `bg-gradient-to-r from-accent/10 to-primary/10`
- Glow: `bg-accent/20 blur-[100px]` phía sau
- Border: `border border-accent/20`

### Banner Sale / Collection

```
┌─────────────────────────────────────────────────────────┐
│  SALE UP TO 50%                                         │
│  Bộ sưu tập Xuân - Hè 2026                             │
│  [Xem ngay →]                                           │
│                                                         │
│  [Product images collage]                               │
└─────────────────────────────────────────────────────────┘
```

**Specs:**

- Background: Cream hoặc gradient gold subtle
- Text: Display size, bold
- CTA: Primary gold button

---

## 21. AI Visual Elements

### Gradient AI

```css
/* Background gradient */
bg-gradient-to-r from-accent/5 via-accent/10 to-primary/5

/* Text gradient (for AI titles) */
bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent
```

### Glow Effects

```css
/* Subtle glow behind AI elements */
.ai-glow::before {
  content: '';
  position: absolute;
  inset: -20px;
  background: rgba(168, 85, 247, 0.15);
  filter: blur(40px);
  border-radius: 50%;
  z-index: -1;
}

/* Strong glow for featured AI */
bg-accent/20 blur-[100px]
```

### AI Badge

```jsx
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold">
  <Sparkles className="w-3 h-3" />
  AI Powered
</span>
```

### AI Processing Animation

```jsx
<div className="flex items-center gap-3 p-4 bg-accent/10 rounded-xl border border-accent/20">
  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center animate-pulse">
    <Sparkles className="w-5 h-5" />
  </div>
  <div>
    <p className="font-bold text-sm">AI đang xử lý...</p>
    <p className="text-xs text-gray-500">Vui lòng chờ trong giây lát</p>
  </div>
</div>
```

### Tech Pattern (Optional)

```css
/* Dot pattern for AI sections */
background-image: radial-gradient(
  circle,
  rgba(168, 85, 247, 0.1) 1px,
  transparent 1px
);
background-size: 20px 20px;
```

---

## 22. Typography System (Chi tiết)

### Quy Chuẩn Headings

| Element | Mobile | Desktop | Weight | Line Height | Letter Spacing |
| ------- | ------ | ------- | ------ | ----------- | -------------- |
| H1      | 36px   | 48px    | 800    | 1.2         | -0.02em        |
| H2      | 28px   | 36px    | 700    | 1.25        | -0.01em        |
| H3      | 22px   | 24px    | 700    | 1.3         | 0              |
| H4      | 18px   | 20px    | 600    | 1.4         | 0              |
| H5      | 16px   | 18px    | 600    | 1.4         | 0              |
| H6      | 14px   | 16px    | 600    | 1.4         | 0              |

### Body Text

| Type       | Size | Weight | Line Height | Sử dụng               |
| ---------- | ---- | ------ | ----------- | --------------------- |
| Body Large | 18px | 400    | 1.6         | Lead paragraphs       |
| Body       | 16px | 400    | 1.5         | Default content       |
| Body Small | 14px | 400    | 1.5         | Secondary text        |
| Caption    | 12px | 500    | 1.4         | Labels, hints         |
| Overline   | 12px | 700    | 1.2         | Categories, uppercase |

### Tailwind Classes

```jsx
// Headings
<h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
<h2 className="text-2xl md:text-4xl font-bold leading-tight">
<h3 className="text-xl md:text-2xl font-bold">
<h4 className="text-lg md:text-xl font-semibold">

// Body
<p className="text-lg leading-relaxed">    // Lead
<p className="text-base leading-normal">   // Default
<p className="text-sm text-gray-600">      // Secondary
<span className="text-xs font-medium">    // Caption
<span className="text-xs font-bold uppercase tracking-wider"> // Overline
```

---

## 23. Social Media Kit

### Avatar / Profile Picture

| Platform  | Size    | Format |
| --------- | ------- | ------ |
| Facebook  | 180x180 | PNG    |
| Instagram | 320x320 | PNG    |
| Twitter/X | 400x400 | PNG    |
| LinkedIn  | 400x400 | PNG    |

**Design:**

- Logo icon (Diamond) centered
- Background: Cream `#FAF7F2` hoặc gradient gold
- Icon: Gold `#C7A26A`

### Cover Images

| Platform  | Size     |
| --------- | -------- |
| Facebook  | 820x312  |
| Twitter/X | 1500x500 |
| LinkedIn  | 1584x396 |

**Design:**

- Background: Cream với subtle gold gradient
- Logo left, tagline right
- Hoặc: Fashion imagery với overlay

### Post Template (Square 1080x1080)

```
┌────────────────────────────┐
│                            │
│     [Product Image]        │
│                            │
├────────────────────────────┤
│ 💎 Fashion AI              │
│ Product Name               │
│ 2.500.000đ                 │
│                            │
│ ✨ AI Try-On Available     │
└────────────────────────────┘
```

### Story Template (1080x1920)

```
┌────────────────────────────┐
│ 💎 Fashion AI              │
│                            │
│                            │
│     [Product Image]        │
│     Full height            │
│                            │
│                            │
├────────────────────────────┤
│ Product Name               │
│ 2.500.000đ                 │
│                            │
│ [Swipe Up / Link]          │
└────────────────────────────┘
```

---

## 24. Email Templates

### Style Guide

```css
/* Email-safe fonts */
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

/* Colors */
Background: #FAF7F2
Primary button: #C7A26A
Text: #1F2937
Border: #E5E7EB

/* Max width */
max-width: 600px;
```

### Email OTP / Xác thực

```
┌─────────────────────────────────────┐
│         💎 Fashion AI               │
├─────────────────────────────────────┤
│                                     │
│  Xin chào [Tên khách hàng],        │
│                                     │
│  Mã xác thực của bạn là:           │
│                                     │
│  ┌─────────────────────────┐       │
│  │        123456            │       │
│  └─────────────────────────┘       │
│                                     │
│  Mã có hiệu lực trong 5 phút.      │
│                                     │
│  Nếu bạn không yêu cầu mã này,     │
│  vui lòng bỏ qua email.            │
│                                     │
├─────────────────────────────────────┤
│  © 2026 Fashion AI                  │
│  Liên hệ: support@fashionai.vn      │
└─────────────────────────────────────┘
```

### Email Xác Nhận Đơn Hàng

```
┌─────────────────────────────────────┐
│         💎 Fashion AI               │
├─────────────────────────────────────┤
│                                     │
│  ✅ Đặt hàng thành công!           │
│                                     │
│  Mã đơn hàng: #FA123456            │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ [Ảnh] Tên sản phẩm          │   │
│  │        Size M - Đen          │   │
│  │        x1    2.500.000đ      │   │
│  └─────────────────────────────┘   │
│                                     │
│  Tổng cộng: 2.500.000đ             │
│                                     │
│  [Theo dõi đơn hàng]               │
│                                     │
├─────────────────────────────────────┤
│  Giao hàng đến:                     │
│  Nguyễn Văn A                       │
│  123 Đường ABC, Quận 1, TP.HCM     │
└─────────────────────────────────────┘
```

### Email Chăm Sóc Khách Hàng

```
┌─────────────────────────────────────┐
│         💎 Fashion AI               │
├─────────────────────────────────────┤
│                                     │
│  Cảm ơn bạn đã mua sắm!            │
│                                     │
│  Bạn có hài lòng với đơn hàng?     │
│                                     │
│  ⭐⭐⭐⭐⭐                          │
│  [Đánh giá ngay]                    │
│                                     │
│  ─────────────────────────          │
│                                     │
│  ✨ Thử ngay tính năng AI Try-On   │
│  [Khám phá]                         │
│                                     │
└─────────────────────────────────────┘
```

---

## 25. Motion / Animation Style

### Nguyên Tắc Animation

1. **Subtle & Elegant** - Không quá flashy
2. **Purposeful** - Animation có mục đích
3. **Fast** - Duration 150-500ms
4. **AI = Purple glow** - Hiệu ứng tím cho AI

### Transition Durations

```css
/* Fast (interactions) */
duration-150   // Hover color changes
duration-200   // Button states

/* Normal (UI feedback) */
duration-300   // Default transitions
duration-500   // Card shadows, transforms

/* Slow (emphasis) */
duration-700   // Image zoom
duration-1000  // Page transitions
```

### Hover Effects

```css
/* Button hover - lift up */
transition-all duration-300
hover:-translate-y-0.5 hover:shadow-lg

/* Card hover - shadow expand */
transition-shadow duration-300
hover:shadow-xl

/* Image hover - zoom */
transition-transform duration-700
group-hover:scale-105

/* Link hover - color change */
transition-colors duration-150
hover:text-primary
```

### Loading Animations

```css
/* Spinner */
animate-spin

/* Pulse (AI processing) */
animate-pulse

/* Skeleton shimmer */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### Page Transitions

```css
/* Fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Usage */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}
```

### AI-Specific Animations

```css
/* Purple glow pulse */
@keyframes aiGlow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.5);
  }
}

.ai-glow-pulse {
  animation: aiGlow 2s ease-in-out infinite;
}

/* Sparkle effect */
@keyframes sparkle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

.animate-sparkle {
  animation: sparkle 1.5s ease-in-out infinite;
}
```

---

## 26. Tổng Kết Brand Guideline

| Yếu tố                | Đã định nghĩa               |
| --------------------- | --------------------------- |
| ✅ Màu sắc chuẩn      | Primary, Accent, Semantic   |
| ✅ Font chữ           | Manrope, scale đầy đủ       |
| ✅ Quy tắc logo       | Variants, spacing, colors   |
| ✅ Favicon            | Sizes, formats              |
| ✅ Icon System        | Lucide React, sizes, colors |
| ✅ UI Components      | Buttons, Cards, Forms       |
| ✅ Banner / Hero      | Layouts, specs              |
| ✅ AI Visual Elements | Gradients, glows, badges    |
| ✅ Typography System  | Headings, body, responsive  |
| ✅ Social Media Kit   | Avatars, covers, templates  |
| ✅ Email Templates    | OTP, Order, Care            |
| ✅ Motion / Animation | Transitions, hover, loading |

> 👉 **Kết quả:** Thương hiệu đồng bộ – Chuyên nghiệp – Premium
