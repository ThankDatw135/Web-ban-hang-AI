/**
 * Fashion AI - Chi Tiết Sản Phẩm
 * 
 * Trang hiển thị thông tin chi tiết sản phẩm
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Truck, 
  RefreshCw, 
  Shield, 
  ChevronRight,
  Minus,
  Plus,
  Star
} from 'lucide-react';

// Mock product data
const product = {
  id: 1,
  name: 'Áo sơ mi trắng Premium',
  price: 850000,
  originalPrice: 1200000,
  description: 'Áo sơ mi trắng cao cấp với chất liệu cotton 100% mềm mại, thoáng mát. Thiết kế cổ điển phù hợp cho cả công sở và dạo phố.',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
    { name: 'Trắng', code: '#FFFFFF' },
    { name: 'Xanh navy', code: '#1F2937' },
    { name: 'Hồng nhạt', code: '#FED7E2' },
  ],
  images: ['/product-1.jpg', '/product-2.jpg', '/product-3.jpg'],
  rating: 4.8,
  reviews: 125,
  stock: 15,
  category: 'Áo',
  sku: 'FA-SHIRT-001',
};

// Format giá tiền
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="min-h-screen py-8">
      <div className="container-app">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-primary">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-primary">Sản phẩm</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-main dark:text-white">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div>
            {/* Main image */}
            <div className="aspect-product rounded-2xl bg-gray-100 dark:bg-[#2c2822] mb-4 flex items-center justify-center overflow-hidden">
              <span className="text-8xl">👕</span>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 rounded-xl bg-gray-100 dark:bg-[#2c2822] flex items-center justify-center border-2 transition-colors ${
                    activeImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <span className="text-2xl">👕</span>
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            {/* Category & Rating */}
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-secondary">({product.reviews} đánh giá)</span>
              </div>
            </div>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-secondary line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-error text-white text-xs font-bold">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-secondary mb-6">{product.description}</p>

            {/* Color selection */}
            <div className="mb-6">
              <p className="font-medium mb-3">Màu sắc: <span className="text-secondary">{selectedColor.name}</span></p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name ? 'border-primary scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium">Kích thước</p>
                <button className="text-sm text-primary hover:underline">Hướng dẫn chọn size</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-12 rounded-xl border-2 font-medium transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="font-medium mb-3">Số lượng</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-full transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-full transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-secondary">Còn {product.stock} sản phẩm</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mb-8">
              <button className="btn-primary flex-1">
                <ShoppingBag className="w-5 h-5" />
                Thêm vào giỏ hàng
              </button>
              <button className="btn-accent">
                <Sparkles className="w-5 h-5" />
                Thử với AI
              </button>
              <button className="btn-ghost w-14 h-14 border border-gray-300 dark:border-gray-600 rounded-full">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#2c2822]">
              <div className="text-center">
                <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Miễn phí ship</p>
                <p className="text-xs text-secondary">Đơn từ 500k</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Đổi trả 30 ngày</p>
                <p className="text-xs text-secondary">Miễn phí</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Bảo hành</p>
                <p className="text-xs text-secondary">12 tháng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
