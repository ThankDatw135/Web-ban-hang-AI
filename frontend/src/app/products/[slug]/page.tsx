/**
 * Product Detail Page - Fashion AI
 * 
 * Chi tiết sản phẩm với:
 * - Editorial Hero với AI insights
 * - Style Forecast cá nhân
 * - Color Palette
 * - AI Predicted Essentials carousel
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Sparkles, Heart, ShoppingBag, ChevronRight, ChevronLeft, Star, Minus, Plus } from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock product data
const product = {
  id: '1',
  slug: 'structured-minimalism-blazer',
  name: 'Structured Minimalism Blazer',
  price: 6100000,
  originalPrice: 7625000,
  images: [
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
  ],
  description: 'Áo blazer thiết kế với vai cấu trúc, mang đậm phong cách Modern Classic. Chất liệu len cao cấp, form dáng thanh lịch, hoàn hảo cho mùa Thu/Đông.',
  material: '100% Wool',
  aiConfidence: 98,
  colors: [
    { name: 'Sand', hex: '#E5D3B3' },
    { name: 'Gold', hex: '#C7A26B' },
    { name: 'Milk', hex: '#F5F5F5' },
    { name: 'Charcoal', hex: '#2C2C2C' },
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  keyElements: ['Oversized Trench', 'Leather Loafers', 'Gold Accents'],
  aiInsight: 'Dựa trên lịch sử mua hàng (quần beige), chúng tôi dự đoán bạn sẽ thích tông màu ấm áp và form dáng cấu trúc này trong mùa này.',
};

const relatedProducts = [
  { id: '1', name: 'Sculpted Wool Blazer', price: 6100000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', material: 'Sand / 100% Wool' },
  { id: '2', name: 'Heritage Silk Scarf', price: 2950000, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', material: 'Gold Print / Silk' },
  { id: '3', name: 'Azure Pump', price: 7630000, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', material: 'Cobalt / Suede' },
  { id: '4', name: 'Pearl Statement Ring', price: 2090000, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400', material: 'Gold Vermeil / Pearl' },
];

export default function ProductDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-10 lg:px-20 py-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="size-4" />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight className="size-4" />
          <span className="text-text-main font-medium">{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16">
          {/* Image Gallery */}
          <div className="relative group overflow-hidden rounded-xl shadow-2xl">
            <div className="aspect-[4/5] w-full">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* AI Insight Badge */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent backdrop-blur-sm shadow-sm mb-3">
                <Sparkles className="size-3.5" />
                Tại sao AI chọn sản phẩm này
              </div>
              <div className="bg-white/95 backdrop-blur p-4 rounded-lg shadow-lg border-l-4 border-accent">
                <p className="text-text-main text-sm leading-relaxed">
                  {product.aiInsight}
                </p>
              </div>
            </div>

            {/* Image Navigation */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                className="size-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                className="size-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`size-2 rounded-full transition-all ${
                    i === selectedImage ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-8">
            {/* Trending Badge */}
            <div className="text-primary text-sm font-bold uppercase tracking-widest">
              Xu hướng cho bạn
            </div>

            <div className="space-y-4">
              <h1 className="text-text-main text-4xl lg:text-5xl font-bold leading-tight">
                {product.name}
              </h1>
              <p className="text-text-muted text-lg font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-text-main">
                {new Intl.NumberFormat('vi-VN').format(product.price)}₫
              </span>
              <span className="text-lg text-text-muted line-through">
                {new Intl.NumberFormat('vi-VN').format(product.originalPrice)}₫
              </span>
              <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                -20%
              </span>
            </div>

            {/* Key Elements */}
            <div className="flex flex-col gap-4 border-t border-primary/20 pt-8">
              <div className="flex items-center justify-between">
                <span className="text-text-main font-medium">Key Elements</span>
                <span className="text-text-muted text-sm">confidence score: {product.aiConfidence}%</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {product.keyElements.map((el) => (
                  <span key={el} className="rounded-full border border-border bg-white px-4 py-2 text-sm text-text-main shadow-sm">
                    {el}
                  </span>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-text-main">Màu sắc: {product.colors[selectedColor].name}</span>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(i)}
                    className={`size-10 rounded-full border-4 transition-all ${
                      i === selectedColor ? 'border-primary scale-110' : 'border-white shadow-md hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-main">Kích thước: {selectedSize}</span>
                <button className="text-sm text-accent hover:underline">Hướng dẫn chọn size</button>
              </div>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-12 rounded-lg border font-medium transition-all ${
                      size === selectedSize
                        ? 'border-primary bg-primary text-white'
                        : 'border-border bg-white text-text-main hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-text-main">Số lượng:</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="size-10 flex items-center justify-center hover:bg-secondary-50 transition-colors"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="size-10 flex items-center justify-center hover:bg-secondary-50 transition-colors"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 group flex items-center justify-center gap-3 rounded-full bg-text-main px-8 py-4 text-white transition-all hover:bg-primary hover:shadow-lg hover:shadow-primary/30">
                <ShoppingBag className="size-5" />
                <span className="font-bold tracking-wide">Thêm vào giỏ</span>
              </button>
              <button className="size-14 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Heart className="size-6" />
              </button>
            </div>

            {/* AI Try-On */}
            <button className="w-full flex items-center justify-center gap-3 rounded-full bg-accent/10 border border-accent/20 px-8 py-4 text-accent transition-all hover:bg-accent hover:text-white">
              <Sparkles className="size-5" />
              <span className="font-bold tracking-wide">Thử Đồ AI</span>
            </button>
          </div>
        </div>

        {/* Color Palette Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 mb-16">
          <div className="lg:col-span-4 flex flex-col justify-center gap-4">
            <h3 className="text-2xl font-bold text-text-main">Bảng Màu Xu Hướng</h3>
            <p className="text-text-muted">
              Bảng màu cá nhân của bạn đang chuyển sang tông ấm. Champagne Gold và Sand là chủ đạo.
            </p>
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium cursor-pointer hover:underline">
              <Sparkles className="size-4" />
              Tại sao những màu này?
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.colors.map((color) => (
              <div key={color.name} className="group relative aspect-square w-full overflow-hidden rounded-full border-4 border-white shadow-xl transition-transform hover:-translate-y-2">
                <div className="h-full w-full" style={{ backgroundColor: color.hex }} />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{color.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Predicted Essentials */}
        <div className="flex flex-col gap-6 py-6">
          <div className="flex items-end justify-between px-2">
            <h3 className="text-3xl font-bold text-text-main">AI Gợi Ý Phối Đồ</h3>
            <Link href="/shop" className="hidden sm:flex items-center gap-1 text-sm font-bold text-primary hover:text-primary/80">
              Xem tất cả
              <ChevronRight className="size-4" />
            </Link>
          </div>

          {/* Carousel */}
          <div className="flex gap-6 overflow-x-auto pb-8 pt-2 snap-x">
            {relatedProducts.map((item) => (
              <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-center group relative flex flex-col gap-3 rounded-lg bg-white p-3 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-secondary-100">
                  <button className="absolute right-3 top-3 z-10 size-8 rounded-full bg-white/90 flex items-center justify-center text-text-main opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                    <Heart className="size-4" />
                  </button>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-3 left-3">
                    <div className="inline-flex items-center justify-center rounded-full bg-accent/90 p-1.5 text-white shadow-lg backdrop-blur-sm">
                      <Sparkles className="size-3.5" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col px-1">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-text-main">{item.name}</h4>
                    <span className="font-medium text-text-main">
                      {new Intl.NumberFormat('vi-VN').format(item.price)}₫
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">{item.material}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
