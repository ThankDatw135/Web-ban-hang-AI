# Fashion AI - Frontend Design System

> **Phiên bản:** 1.0  
> **Cập nhật:** 01/02/2026

---

## 1. Tổng Quan Thiết Kế

### 1.1 Phong Cách

- **Định hướng:** Cao cấp – Nhẹ nhàng – Thời trang – Premium
- **Thương hiệu:** Fashion AI
- **Đặc trưng:** Kết hợp thời trang cao cấp với công nghệ AI tiên tiến

### 1.2 Nguyên Tắc Thiết Kế

1. **Tối giản nhưng sang trọng** - Ưu tiên whitespace, bố cục thoáng
2. **AI là điểm nhấn** - Màu accent tím cho tất cả tính năng AI
3. **Tương tác mượt mà** - Animations và transitions tinh tế
4. **Responsive first** - Thiết kế từ mobile lên desktop

---

## 2. Bảng Màu (Color Palette)

### 2.1 Màu Chính

| Tên                    | Hex       | RGB                | Mục đích             |
| ---------------------- | --------- | ------------------ | -------------------- |
| **Cream (Background)** | `#FAF7F2` | rgb(250, 247, 242) | Nền chính - Cực sang |
| **White**              | `#FFFFFF` | rgb(255, 255, 255) | Nền phụ, Cards       |
| **Primary (Gold)**     | `#C7A26A` | rgb(199, 162, 106) | Buttons chính, CTA   |
| **Secondary (Gray)**   | `#6B7280` | rgb(107, 114, 128) | Text phụ, Icons      |
| **Accent (Purple)**    | `#A855F7` | rgb(168, 85, 247)  | AI features, Try-on  |
| **Text Main**          | `#1F2937` | rgb(31, 41, 55)    | Text chính           |
| **Border**             | `#E5E7EB` | rgb(229, 231, 235) | Borders, Dividers    |

### 2.2 Primary Scale (Gold Champagne)

```css
--primary-50: #fcf8f3;
--primary-100: #f5ebd9;
--primary-200: #e8d4b4;
--primary-300: #dbbf90;
--primary-400: #d1ac7a;
--primary-500: #c7a26a; /* DEFAULT */
--primary-600: #b8915a;
--primary-700: #a07b4a;
--primary-800: #7a5e39;
--primary-900: #5a4529;
```

### 2.3 Accent Scale (AI Purple)

```css
--accent-50: #f5f3ff;
--accent-100: #ede9fe;
--accent-200: #ddd6fe;
--accent-300: #c4b5fd;
--accent-400: #a78bfa;
--accent-500: #a855f7; /* DEFAULT */
--accent-600: #9333ea;
--accent-700: #7c3aed;
--accent-800: #6d28d9;
--accent-900: #5b21b6;
```

### 2.4 Semantic Colors

```css
/* Success */
--success: #22c55e;
--success-light: #dcfce7;

/* Warning */
--warning: #f59e0b;
--warning-light: #fef3c7;

/* Error */
--error: #ef4444;
--error-light: #fee2e2;

/* Info */
--info: #3b82f6;
--info-light: #dbeafe;
```

### 2.5 Hướng Dẫn Sử Dụng Màu

| Thành phần        | Màu sử dụng                     |
| ----------------- | ------------------------------- |
| Nền trang         | `cream` (#FAF7F2)               |
| Cards, Modals     | `white` (#FFFFFF)               |
| Button chính      | `primary` (#C7A26A)             |
| Button AI/Try-on  | `accent` (#A855F7)              |
| Text chính        | `text-main` (#1F2937)           |
| Text phụ          | `secondary` (#6B7280)           |
| Links             | `primary` hover → `primary-600` |
| AI badges, labels | `accent` với opacity            |
| Borders           | `border` (#E5E7EB)              |

---

## 3. Typography

### 3.1 Font Family

```css
font-family:
  "Manrope",
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

**Import Google Fonts:**

```html
<link
  href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
  rel="stylesheet"
/>
```

### 3.2 Font Scale

| Tên            | Size | Weight | Line Height | Sử dụng          |
| -------------- | ---- | ------ | ----------- | ---------------- |
| **Display XL** | 72px | 900    | 1.1         | Hero headlines   |
| **Display LG** | 60px | 800    | 1.1         | Section titles   |
| **H1**         | 48px | 800    | 1.2         | Page titles      |
| **H2**         | 36px | 700    | 1.25        | Section headers  |
| **H3**         | 24px | 700    | 1.3         | Card titles      |
| **H4**         | 20px | 600    | 1.4         | Subsections      |
| **Body LG**    | 18px | 400    | 1.6         | Lead paragraphs  |
| **Body**       | 16px | 400    | 1.5         | Default text     |
| **Body SM**    | 14px | 400    | 1.5         | Captions, meta   |
| **Caption**    | 12px | 500    | 1.4         | Labels, badges   |
| **Overline**   | 12px | 700    | 1.2         | Uppercase labels |

### 3.3 Tailwind Classes

```css
/* Headlines */
.text-display-xl {
  @apply text-7xl font-black leading-[1.1] tracking-tight;
}
.text-display-lg {
  @apply text-6xl font-extrabold leading-[1.1] tracking-tight;
}
.text-h1 {
  @apply text-5xl font-extrabold leading-[1.2];
}
.text-h2 {
  @apply text-4xl font-bold leading-tight;
}
.text-h3 {
  @apply text-2xl font-bold;
}
.text-h4 {
  @apply text-xl font-semibold;
}

/* Body */
.text-body-lg {
  @apply text-lg leading-relaxed;
}
.text-body {
  @apply text-base leading-normal;
}
.text-body-sm {
  @apply text-sm;
}
.text-caption {
  @apply text-xs font-medium;
}
.text-overline {
  @apply text-xs font-bold uppercase tracking-wider;
}
```

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

| Token | Value | Sử dụng          |
| ----- | ----- | ---------------- |
| `1`   | 4px   | Icon gaps        |
| `2`   | 8px   | Tight spacing    |
| `3`   | 12px  | Between elements |
| `4`   | 16px  | Default gap      |
| `6`   | 24px  | Section padding  |
| `8`   | 32px  | Large gaps       |
| `12`  | 48px  | Section margins  |
| `16`  | 64px  | Page sections    |
| `20`  | 80px  | Large sections   |
| `24`  | 96px  | Hero padding     |

### 4.2 Container

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 16px; /* Mobile */
  padding-left: 40px; /* Tablet (md) */
  padding-left: 160px; /* Desktop (lg) */
}
```

### 4.3 Grid System

```css
/* Product grid */
.product-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(1, 1fr); /* Mobile */
  grid-template-columns: repeat(2, 1fr); /* sm */
  grid-template-columns: repeat(3, 1fr); /* lg */
  grid-template-columns: repeat(4, 1fr); /* xl */
}

/* Dashboard grid */
.dashboard-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: 280px 1fr; /* Sidebar + Content */
}
```

---

## 5. Border Radius

| Token     | Value  | Sử dụng                 |
| --------- | ------ | ----------------------- |
| `DEFAULT` | 4px    | Inputs                  |
| `md`      | 8px    | Small cards             |
| `lg`      | 12px   | Cards                   |
| `xl`      | 16px   | Modals, large cards     |
| `2xl`     | 24px   | Hero images             |
| `3xl`     | 32px   | Featured sections       |
| `full`    | 9999px | Buttons, Pills, Avatars |

---

## 6. Shadows

```css
/* Elevation levels */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Special shadows */
--shadow-primary: 0 10px 40px rgba(199, 162, 106, 0.2);
--shadow-accent: 0 10px 40px rgba(168, 85, 247, 0.2);
```

---

## 7. Icons

### 7.1 Icon Library

Sử dụng **Material Symbols Outlined** hoặc **Lucide React**

```html
<!-- Material Symbols -->
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1"
  rel="stylesheet"
/>

<!-- Hoặc Lucide React (đã cài sẵn) -->
import { ShoppingBag, Heart, Search } from 'lucide-react';
```

### 7.2 Icon Sizes

| Size | Pixels | Tailwind            | Sử dụng             |
| ---- | ------ | ------------------- | ------------------- |
| XS   | 14px   | `w-3.5 h-3.5`       | Inline với text nhỏ |
| SM   | 18px   | `w-[18px] h-[18px]` | Buttons nhỏ         |
| MD   | 20px   | `w-5 h-5`           | Default             |
| LG   | 24px   | `w-6 h-6`           | Nav icons           |
| XL   | 28px   | `w-7 h-7`           | Featured icons      |

---

## 8. Components

### 8.1 Buttons

#### Primary Button (Gold)

```jsx
<button
  className="
  flex items-center justify-center gap-2
  px-8 h-14 rounded-full
  bg-primary hover:bg-primary-600
  text-white text-base font-bold
  shadow-lg shadow-primary/20
  transition-all transform hover:-translate-y-0.5
"
>
  <ShoppingBag className="w-5 h-5" />
  Mua ngay
</button>
```

#### Accent Button (AI Purple)

```jsx
<button
  className="
  flex items-center justify-center gap-2
  px-8 h-14 rounded-full
  bg-accent hover:bg-accent-600
  text-white text-base font-bold
  shadow-lg shadow-accent/20
  transition-all transform hover:-translate-y-0.5
"
>
  <Sparkles className="w-5 h-5" />
  Thử đồ ngay với AI
</button>
```

#### Outline Button

```jsx
<button
  className="
  flex items-center justify-center gap-2
  px-8 h-14 rounded-full
  border border-gray-300 dark:border-gray-600
  hover:bg-white dark:hover:bg-white/5
  text-text-main dark:text-white
  text-base font-bold transition-all
"
>
  Khám phá bộ sưu tập
</button>
```

#### Button Sizes

| Size | Height      | Padding | Font      |
| ---- | ----------- | ------- | --------- |
| SM   | 36px (h-9)  | px-4    | text-sm   |
| MD   | 44px (h-11) | px-6    | text-sm   |
| LG   | 56px (h-14) | px-8    | text-base |

### 8.2 Inputs

```jsx
<input
  className="
  w-full h-12 px-4
  rounded-xl border border-gray-300 dark:border-gray-700
  bg-transparent
  text-sm outline-none
  focus:border-primary focus:ring-2 focus:ring-primary/20
  transition-all
"
  placeholder="Email của bạn"
/>
```

### 8.3 Cards

#### Product Card

```jsx
<div
  className="
  flex flex-col gap-4
  rounded-2xl bg-white dark:bg-[#2c2822]
  shadow-sm hover:shadow-xl
  transition-shadow duration-300
  group overflow-hidden
"
>
  {/* Image */}
  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-2xl">
    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:text-red-500">
      <Heart />
    </button>
  </div>

  {/* Content */}
  <div className="flex flex-col p-5 pt-2 gap-4">
    <div>
      <div className="flex justify-between items-start">
        <p className="text-lg font-bold">Product Name</p>
        <p className="text-primary font-bold">$450</p>
      </div>
      <p className="text-gray-500 text-sm mt-1">Description</p>
    </div>
    <button className="w-full h-11 rounded-full bg-primary text-white font-bold">
      Mua ngay
    </button>
  </div>
</div>
```

### 8.4 Navigation

#### Header

```jsx
<header
  className="
  sticky top-0 z-50 w-full
  bg-cream/90 dark:bg-background-dark/90
  backdrop-blur-md
  border-b border-border dark:border-[#332f28]
"
>
  <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Diamond className="w-7 h-7 text-primary" />
        <span className="text-xl font-extrabold">Fashion AI</span>
      </div>

      {/* Nav Links */}
      <nav className="hidden lg:flex gap-8">
        <a className="text-sm font-semibold hover:text-primary">Hàng mới về</a>
        <a className="text-sm font-semibold hover:text-primary">Nữ</a>
        <a className="text-sm font-semibold hover:text-primary">Nam</a>
        <a className="text-sm font-semibold text-accent flex items-center gap-1">
          <Sparkles className="w-4 h-4" />
          AI Studio
        </a>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full hover:bg-black/5">
          <Search />
        </button>
        <button className="w-10 h-10 rounded-full hover:bg-black/5 relative">
          <ShoppingBag />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </button>
      </div>
    </div>
  </div>
</header>
```

---

## 9. Effects & Animations

### 9.1 Transitions

```css
/* Default transition */
transition-all duration-300

/* Fast interactions */
transition-colors duration-150

/* Slow, smooth */
transition-all duration-500

/* Image hover */
transition-transform duration-700
```

### 9.2 Hover Effects

```css
/* Button lift */
transform hover:-translate-y-0.5

/* Card shadow */
shadow-sm hover:shadow-xl

/* Image zoom */
group-hover:scale-105

/* Link color */
hover:text-primary
```

### 9.3 Glassmorphism

```css
/* Header blur */
bg-cream/90 backdrop-blur-md

/* Modal overlay */
bg-white/80 backdrop-blur-md border border-white/20

/* AI Processing card */
bg-black/60 backdrop-blur-md
```

### 9.4 Gradient Effects

```css
/* Text gradient */
bg-gradient-to-r from-primary to-[#dcb77d] bg-clip-text text-transparent

/* Hero overlay */
bg-gradient-to-t from-black/40 via-transparent to-transparent

/* Glow effects */
bg-primary/20 blur-3xl /* Behind images */
bg-accent/20 blur-[100px] /* AI sections */
```

### 9.5 Keyframe Animations

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* AI Processing */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
```

---

## 10. Responsive Breakpoints

| Breakpoint | Min Width | Sử dụng          |
| ---------- | --------- | ---------------- |
| `sm`       | 640px     | Mobile landscape |
| `md`       | 768px     | Tablet           |
| `lg`       | 1024px    | Desktop          |
| `xl`       | 1280px    | Large desktop    |
| `2xl`      | 1536px    | Extra large      |

### Responsive Patterns

```css
/* Typography */
text-5xl md:text-6xl lg:text-7xl

/* Padding */
px-4 md:px-10 lg:px-40

/* Grid */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

/* Layout */
flex-col lg:flex-row

/* Visibility */
hidden lg:flex /* Desktop only */
lg:hidden /* Mobile only */
```

---

## 11. Dark Mode

### 11.1 Color Mapping

| Light              | Dark      |
| ------------------ | --------- |
| `#FAF7F2` (cream)  | `#1e1a14` |
| `#FFFFFF` (white)  | `#25221d` |
| `#1F2937` (text)   | `#FFFFFF` |
| `#E5E7EB` (border) | `#332f28` |
| Cards: `white`     | `#2c2822` |

### 11.2 Implementation

```jsx
// TailwindCSS dark mode
<html className="dark">

// Component usage
<div className="bg-cream dark:bg-[#1e1a14] text-text-main dark:text-white">
```

---

## 12. Z-Index Scale

| Layer          | Value | Sử dụng         |
| -------------- | ----- | --------------- |
| Base           | 0     | Default         |
| Dropdown       | 10    | Dropdowns       |
| Sticky         | 20    | Sticky elements |
| Fixed          | 30    | Fixed nav       |
| Modal Backdrop | 40    | Overlay         |
| Modal          | 50    | Header, Modal   |
| Toast          | 60    | Notifications   |
| Tooltip        | 70    | Tooltips        |

---

## 13. Page Layouts

### 13.1 Public Layout

```
┌─────────────────────────────────────┐
│          Header (sticky)            │
├─────────────────────────────────────┤
│                                     │
│           Main Content              │
│                                     │
├─────────────────────────────────────┤
│              Footer                 │
└─────────────────────────────────────┘
```

### 13.2 Dashboard Layout

```
┌──────────┬──────────────────────────┐
│          │       Header             │
│ Sidebar  ├──────────────────────────┤
│ (280px)  │                          │
│          │      Main Content        │
│          │                          │
└──────────┴──────────────────────────┘
```

### 13.3 Admin Layout

```
┌──────────┬──────────────────────────┐
│  Logo    │    Top Bar (search)      │
├──────────┼──────────────────────────┤
│          │                          │
│ Sidebar  │      Main Content        │
│ (Nav)    │                          │
│          │                          │
└──────────┴──────────────────────────┘
```

---

## 14. Common Patterns

### 14.1 AI Badge

```jsx
<span
  className="
  inline-flex items-center gap-1
  px-2 py-1 rounded-md
  bg-accent/10 text-accent
  text-xs font-bold
"
>
  <Sparkles className="w-3 h-3" />
  AI Recommended
</span>
```

### 14.2 Price Display

```jsx
<div className="flex items-baseline gap-2">
  <span className="text-primary font-bold text-lg">2.500.000đ</span>
  <span className="text-gray-400 line-through text-sm">3.000.000đ</span>
</div>
```

### 14.3 Loading Skeleton

```jsx
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>
```

### 14.4 AI Processing State

```jsx
<div className="flex items-center gap-3 p-4 bg-accent/10 rounded-xl">
  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center animate-pulse">
    <Sparkles className="w-4 h-4" />
  </div>
  <span className="text-sm font-bold">AI đang xử lý...</span>
</div>
```

---

## 15. Accessibility

### 15.1 Focus States

```css
focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
```

### 15.2 Color Contrast

- Text chính (#1F2937) trên cream (#FAF7F2): **12.4:1** ✅
- Text trắng trên primary (#C7A26A): **2.9:1** ⚠️ (cần font-bold)
- Text trắng trên accent (#A855F7): **3.6:1** ✅

### 15.3 ARIA Labels

```jsx
<button aria-label="Thêm vào giỏ hàng">
<button aria-label="Yêu thích sản phẩm">
<nav aria-label="Main navigation">
```

---

## 16. File Structure

```
frontend/src/
├── app/
│   ├── globals.css          # Global styles, CSS variables
│   ├── layout.tsx           # Root layout với fonts
│   ├── page.tsx             # Homepage
│   └── ...
├── components/
│   ├── ui/                  # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   └── layout/              # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── Sidebar.tsx
│       └── ...
├── lib/
│   └── utils.ts             # cn() utility
└── styles/
    └── animations.css       # Custom keyframes
```

---

## 17. Checklist Triển Khai

- [ ] Import Google Fonts (Manrope, Material Symbols)
- [ ] Cấu hình `tailwind.config.ts` đầy đủ
- [ ] Tạo `globals.css` với CSS variables
- [ ] Tạo utility function `cn()`
- [ ] Tạo UI components cơ bản
- [ ] Tạo Header/Footer/Sidebar
- [ ] Implement dark mode
- [ ] Test responsive trên tất cả breakpoints
- [ ] Kiểm tra accessibility
- [ ] Optimize performance (lazy loading, etc.)
