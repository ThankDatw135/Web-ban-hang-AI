# 🛍️ Fashion AI - Frontend Design System

## Thương Hiệu

**Tên:** Fashion AI  
**Phong cách:** Cao cấp – Nhẹ nhàng – Thời trang – Premium

---

## 🎨 Color Palette (Chính Thức)

| Tên                  | Hex       | Sử dụng                              |
| -------------------- | --------- | ------------------------------------ |
| **Background chính** | `#FAF7F2` | Nền trang (kem sữa) - cực sang       |
| **Background phụ**   | `#FFFFFF` | Cards, modals, sections              |
| **Primary**          | `#C7A26A` | Button chính, links (gold champagne) |
| **Primary Hover**    | `#B8956A` | Hover states                         |
| **Secondary**        | `#6B7280` | Text phụ, icons (xám ấm)             |
| **Accent**           | `#A855F7` | AI features, Try-on (tím nhẹ)        |
| **Accent Light**     | `#E9D5FF` | AI background nhẹ                    |
| **Text chính**       | `#1F2937` | Headings, body - dễ đọc              |
| **Text muted**       | `#6B7280` | Captions, placeholders               |
| **Border/Divider**   | `#E5E7EB` | Lines, borders                       |
| **Success**          | `#10B981` | Thành công                           |
| **Error**            | `#EF4444` | Lỗi                                  |
| **Warning**          | `#F59E0B` | Cảnh báo                             |

### Quy Tắc Sử Dụng

| Element          | Màu               |
| ---------------- | ----------------- |
| Nền trang        | `#FAF7F2` kem sữa |
| Cards/Sections   | `#FFFFFF` trắng   |
| Button chính     | `#C7A26A` gold    |
| Button AI/Try-on | `#A855F7` tím     |
| Text chính       | `#1F2937` đậm     |
| Text phụ         | `#6B7280` xám     |
| Borders          | `#E5E7EB` nhạt    |

---

## 📐 TailwindCSS Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        "bg-cream": "#FAF7F2",
        primary: "#C7A26A",
        "primary-hover": "#B8956A",
        secondary: "#6B7280",
        accent: "#A855F7",
        "accent-light": "#E9D5FF",
        "text-main": "#1F2937",
        "text-muted": "#6B7280",
        border: "#E5E7EB",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
      },
    },
  },
};
```

### CSS Variables

```css
:root {
  --bg-cream: #faf7f2;
  --bg-white: #ffffff;
  --color-primary: #c7a26a;
  --color-primary-hover: #b8956a;
  --color-secondary: #6b7280;
  --color-accent: #a855f7;
  --color-accent-light: #e9d5ff;
  --text-main: #1f2937;
  --text-muted: #6b7280;
  --border: #e5e7eb;
}
```

---

## 🧩 Components

### Buttons

```css
/* Primary - Gold Champagne */
.btn-primary {
  background: #c7a26a;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
}
.btn-primary:hover {
  background: #b8956a;
}

/* AI Button - Purple Accent */
.btn-ai {
  background: #a855f7;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
.btn-ai:hover {
  background: #9333ea;
}

/* Outline Button */
.btn-outline {
  background: transparent;
  border: 1px solid #e5e7eb;
  color: #1f2937;
}
```

### Cards

```css
.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
}
```

### AI Badge

```css
.badge-ai {
  background: #e9d5ff;
  color: #a855f7;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
```

---

## 📝 Typography

**Font:** Manrope (Google Fonts)

| Size | Pixels | Usage          |
| ---- | ------ | -------------- |
| xs   | 12px   | Badges         |
| sm   | 14px   | Body small     |
| base | 16px   | Body           |
| lg   | 18px   | Body large     |
| xl   | 20px   | Subheadings    |
| 2xl  | 24px   | Section titles |
| 3xl  | 30px   | Page titles    |
| 4xl  | 36px   | Hero           |

---

## ✅ Checklist Áp Dụng

- [ ] Cập nhật `tailwind.config.js` với colors
- [ ] Thêm Google Font Manrope
- [ ] Tạo global CSS variables
- [ ] Apply background `#FAF7F2` cho body
- [ ] Dùng `#C7A26A` cho buttons chính
- [ ] Dùng `#A855F7` cho AI features
