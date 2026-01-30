/**
 * Cart Page - Fashion AI (Version 1)
 * 
 * Giỏ hàng Premium với:
 * - AI Coupon Assistant "Aria"
 * - Discount Applied Badge
 * - AI Product Recommendations với Match %
 * - Order Summary với glow effects
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Trash2, Minus, Plus, ArrowRight, Lock, Bot } from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock cart data
const initialCartItems = [
  {
    id: '1',
    name: 'Silk Trench Coat',
    ref: '8392-TC',
    price: 28800000,
    color: { name: 'Beige', hex: '#D2B48C' },
    size: 'M',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
  },
  {
    id: '2',
    name: 'Leather Ankle Boots',
    ref: '1102-LB',
    price: 10800000,
    color: { name: 'Black', hex: '#000000' },
    size: '38',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
  },
];

const aiRecommendations = [
  {
    id: '3',
    name: 'Gold Chain Belt',
    price: 4320000,
    match: 98,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300',
  },
  {
    id: '4',
    name: 'Silk Pattern Scarf',
    price: 2880000,
    match: 94,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('VIP-ARIA-15');
  const [discountApplied, setDiscountApplied] = useState(true);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = discountApplied ? Math.round(subtotal * 0.15) : 0;
  const tax = Math.round((subtotal - discount) * 0.1);
  const total = subtotal - discount + tax;
  const originalTotal = subtotal + tax;

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 w-full px-4 md:px-10 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Page Heading */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-light text-text-main tracking-tight">
                Giỏ Hàng Của Bạn
              </h1>
              <p className="text-text-muted">
                {cartItems.length} sản phẩm cao cấp trong giỏ hàng
              </p>
            </div>

            {/* Cart Items List */}
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white p-5 rounded-xl shadow-sm border border-transparent hover:border-border transition-all"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image */}
                    <div className="shrink-0">
                      <div
                        className="w-full sm:w-32 aspect-[3/4] sm:aspect-square rounded-lg bg-cover bg-center bg-secondary-100"
                        style={{ backgroundImage: `url('${item.image}')` }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-text-main">
                            {item.name}
                          </h3>
                          <p className="text-sm text-text-muted mt-1">
                            Ref: {item.ref}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-text-main">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Attributes */}
                      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted">
                        <div className="flex items-center gap-2">
                          <span>Màu:</span>
                          <span
                            className="w-3 h-3 rounded-full ring-1 ring-border"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <span className="text-text-main font-medium">
                            {item.color.name}
                          </span>
                        </div>
                        <div className="w-px h-4 bg-border hidden sm:block" />
                        <div className="flex items-center gap-2">
                          <span>Size:</span>
                          <span className="text-text-main font-medium">
                            {item.size}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex items-center justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-text-muted hover:text-red-500 transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="size-4" />
                          <span className="underline underline-offset-2">
                            Xóa
                          </span>
                        </button>

                        {/* Quantity Selector */}
                        <div className="flex items-center border border-border rounded-lg h-9">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-9 h-full flex items-center justify-center text-text-muted hover:text-text-main hover:bg-secondary-50 rounded-l-lg transition-colors"
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-text-main">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-9 h-full flex items-center justify-center text-text-muted hover:text-text-main hover:bg-secondary-50 rounded-r-lg transition-colors"
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {cartItems.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl">
                  <p className="text-text-muted mb-4">Giỏ hàng của bạn đang trống</p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    Tiếp tục mua sắm <ArrowRight className="size-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* AI Recommendations Section */}
            {cartItems.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="size-8 text-accent" />
                  <h2 className="text-2xl font-bold text-text-main tracking-tight">
                    AI Stylist Gợi Ý
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {aiRecommendations.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-4 flex gap-4 border border-accent/20 shadow-[0_0_15px_rgba(168,85,247,0.05)] hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-shadow"
                    >
                      <div
                        className="w-24 aspect-square rounded-lg bg-secondary-100 bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url('${item.image}')` }}
                      />
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-medium text-text-main">
                              {item.name}
                            </h4>
                            <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                              {item.match}% Phù hợp
                            </span>
                          </div>
                          <p className="text-sm text-text-muted mt-1">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <button className="mt-2 text-sm font-semibold text-accent hover:text-white hover:bg-accent border border-accent rounded-lg py-1.5 px-3 transition-colors w-max">
                          Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-xl shadow-lg border border-primary/40 p-6 flex flex-col gap-6 relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-accent/5 to-primary/5 opacity-50" />

                <h2 className="text-xl font-bold text-text-main pb-2 border-b border-border z-10 relative">
                  Tóm Tắt Đơn Hàng
                </h2>

                {/* AI Discount Badge */}
                {discountApplied && (
                  <div className="z-10 relative bg-white border border-primary rounded-lg p-3 shadow-md flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      <Sparkles className="size-5 text-accent animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-green-700 leading-tight mb-1">
                        Đã áp dụng giảm giá!
                      </h4>
                      <p className="text-xs text-text-muted">
                        Bạn tiết kiệm{' '}
                        <span className="font-bold text-green-700">
                          {formatPrice(discount)}
                        </span>{' '}
                        nhờ Aria.
                      </p>
                    </div>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="flex flex-col gap-3 z-10 relative">
                  <div className="flex justify-between text-base">
                    <span className="text-text-muted">Tạm tính</span>
                    <span className="font-medium text-text-main">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-text-muted">Phí vận chuyển</span>
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-base">
                      <span className="text-text-muted">Giảm giá</span>
                      <span className="text-green-700 font-medium">
                        -{formatPrice(discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-base">
                    <span className="text-text-muted">Thuế (10%)</span>
                    <span className="font-medium text-text-main">
                      {formatPrice(tax)}
                    </span>
                  </div>
                </div>

                {/* AI Coupon Assistant */}
                <div className="mt-2 pt-4 border-t border-border z-10 relative">
                  <div className="bg-gradient-to-r from-cream to-white border border-accent/30 rounded-lg p-3 shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/20 blur-xl rounded-full" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="size-5 text-accent" />
                        <h3 className="text-sm font-bold text-text-main">
                          AI Trợ Lý Mã Giảm Giá
                        </h3>
                      </div>
                      <p className="text-xs text-text-muted mb-3 leading-relaxed">
                        Aria tìm thấy mã{' '}
                        <span className="text-accent font-semibold">
                          giảm 15% VIP
                        </span>{' '}
                        cho bạn!
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Nhập mã"
                          className="w-full bg-white border border-border rounded text-xs px-2 py-2 placeholder:text-text-muted focus:border-primary focus:ring-0 transition-all"
                        />
                        <button
                          onClick={() => setDiscountApplied(true)}
                          className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3 py-2 rounded transition-colors whitespace-nowrap"
                        >
                          ÁP DỤNG
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-border z-10 relative">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-lg font-bold text-text-main">
                      Tổng cộng
                    </span>
                    <div className="flex flex-col items-end">
                      {discountApplied && (
                        <span className="text-sm line-through text-text-muted">
                          {formatPrice(originalTotal)}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full bg-primary hover:bg-primary/90 text-white text-base font-bold py-3.5 px-4 rounded-lg shadow-md transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 z-10 relative"
                >
                  <span>Tiến Hành Thanh Toán</span>
                  <ArrowRight className="size-5" />
                </Link>

                {/* Trust Badges */}
                <div className="flex flex-col items-center gap-3 pt-2 z-10 relative">
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <Lock className="size-3.5" />
                    Thanh toán bảo mật
                  </div>
                  <div className="flex gap-2 opacity-60">
                    <div className="h-6 w-10 bg-secondary-200 rounded" />
                    <div className="h-6 w-10 bg-secondary-200 rounded" />
                    <div className="h-6 w-10 bg-secondary-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
