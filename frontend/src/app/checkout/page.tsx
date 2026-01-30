/**
 * Checkout Page - Fashion AI
 * 
 * Trang thanh toán minimalist với:
 * - Contact Information
 * - Shipping Address Form
 * - Payment Details (Credit Card)
 * - Order Summary sidebar
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, CreditCard, ChevronRight, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock order data
const orderItems = [
  {
    id: '1',
    name: 'Silk Trench Coat',
    size: 'M',
    color: 'Beige',
    price: 28800000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200',
  },
  {
    id: '2',
    name: 'Leather Ankle Boots',
    size: '38',
    color: 'Black',
    price: 10800000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200',
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const aiDiscount = Math.round(subtotal * 0.1);
  const total = subtotal - aiDiscount;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/order-success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      {/* Minimal Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4 md:px-12 lg:px-40 bg-white sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <div className="size-6 text-primary">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-text-main">Fashion AI</h1>
        </Link>
        <div className="flex items-center gap-1 text-text-muted">
          <Lock className="size-4" />
          <span className="text-sm font-medium hidden sm:inline">Thanh Toán Bảo Mật</span>
        </div>
      </header>

      <main className="flex-grow flex justify-center w-full px-4 py-8 md:px-12 lg:px-40 lg:py-12">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12 max-w-[1200px] w-full">
          {/* Left Column: Forms */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
              <Link href="/cart" className="text-primary hover:text-primary/80 transition-colors">
                Giỏ hàng
              </Link>
              <ChevronRight className="size-4 text-text-muted" />
              <span className="text-text-main font-bold">Thanh toán</span>
            </nav>

            {/* Contact Info */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-main">Thông Tin Liên Hệ</h2>
                <Link href="/login" className="text-sm text-primary font-medium hover:underline">
                  Đăng nhập
                </Link>
              </div>
              <label className="block">
                <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                  Email
                </span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-1 block w-full rounded-lg border-border bg-white px-4 py-3 text-text-main shadow-sm focus:border-primary focus:ring-primary"
                />
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <label htmlFor="newsletter" className="text-sm text-text-muted">
                  Nhận thông tin khuyến mãi và gợi ý AI
                </label>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="space-y-4 pt-4 border-t border-border">
              <h2 className="text-xl font-bold text-text-main">Địa Chỉ Giao Hàng</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">Họ</span>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-lg border-border bg-white px-4 py-3 text-text-main shadow-sm focus:border-primary focus:ring-primary"
                  />
                </label>
                <label className="block">
                  <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">Tên</span>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-lg border-border bg-white px-4 py-3 text-text-main shadow-sm focus:border-primary focus:ring-primary"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">Địa chỉ</span>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-lg border-border bg-white px-4 py-3 text-text-main shadow-sm focus:border-primary focus:ring-primary"
                />
              </label>
              <label className="block">
                <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                  Căn hộ, tầng (tùy chọn)
                </span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border-border bg-white px-4 py-3 text-text-main shadow-sm focus:border-primary focus:ring-primary"
                />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block">
                  <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                    Thành phố
                  </span>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-lg border-border bg-white px-4 py-3 text-text-main shadow-sm focus:border-primary focus:ring-primary"
                  />
                </label>
                <label className="block">
                  <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                    Tỉnh/Quận
                  </span>
                  <select className="mt-1 block w-full rounded-lg border-border bg-white px-4 py-3 text-text-main shadow-sm focus:border-primary focus:ring-primary">
                    <option>TP. Hồ Chí Minh</option>
                    <option>Hà Nội</option>
                    <option>Đà Nẵng</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                    Mã bưu chính
                  </span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-border bg-white px-4 py-3 text-text-main shadow-sm focus:border-primary focus:ring-primary"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                  Số điện thoại
                </span>
                <input
                  type="tel"
                  required
                  placeholder="0912 345 678"
                  className="mt-1 block w-full rounded-lg border-border bg-white px-4 py-3 text-text-main shadow-sm focus:border-primary focus:ring-primary"
                />
              </label>
            </section>

            {/* Payment Details */}
            <section className="space-y-4 pt-4 border-t border-border">
              <h2 className="text-xl font-bold text-text-main">Thanh Toán</h2>
              <div className="rounded-lg border border-border bg-white overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="size-5 text-primary" />
                    <span className="text-sm font-medium text-text-main">Thẻ tín dụng</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-9 bg-secondary-100 rounded flex items-center justify-center text-[8px] font-bold text-text-muted border border-border">
                      VISA
                    </div>
                    <div className="h-6 w-9 bg-secondary-100 rounded flex items-center justify-center text-[8px] font-bold text-text-muted border border-border">
                      MC
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4 bg-secondary-50">
                  <input
                    type="text"
                    placeholder="Số thẻ"
                    required
                    className="block w-full rounded-lg border-border bg-white px-4 py-3 text-text-main shadow-sm focus:border-primary focus:ring-primary placeholder:text-text-muted"
                  />
                  <input
                    type="text"
                    placeholder="Tên trên thẻ"
                    required
                    className="block w-full rounded-lg border-border bg-white px-4 py-3 text-text-main shadow-sm focus:border-primary focus:ring-primary placeholder:text-text-muted"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      required
                      className="block w-full rounded-lg border-border bg-white px-4 py-3 text-text-main shadow-sm focus:border-primary focus:ring-primary placeholder:text-text-muted"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      required
                      className="block w-full rounded-lg border-border bg-white px-4 py-3 text-text-main shadow-sm focus:border-primary focus:ring-primary placeholder:text-text-muted"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-[420px] shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl border border-primary/40 shadow-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-bold text-text-main mb-6">Đơn Hàng</h2>
                  
                  {/* Items List */}
                  <div className="space-y-6">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative size-20 rounded-lg overflow-hidden bg-secondary-100 shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-sm ring-2 ring-white">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex flex-col flex-1">
                          <span className="font-medium text-text-main">{item.name}</span>
                          <span className="text-sm text-text-muted">
                            Size: {item.size} / {item.color}
                          </span>
                          <span className="mt-auto text-sm font-semibold text-text-main">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calculations */}
                <div className="p-6 bg-secondary-50 space-y-3">
                  <div className="flex justify-between text-sm text-text-muted">
                    <span>Tạm tính</span>
                    <span className="font-medium text-text-main">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-text-muted">
                    <span>Phí vận chuyển</span>
                    <span className="font-medium text-green-600">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-sm text-accent">
                    <span className="flex items-center gap-1">
                      <Sparkles className="size-4" />
                      AI Discount
                    </span>
                    <span className="font-semibold">-{formatPrice(aiDiscount)}</span>
                  </div>
                  <div className="border-t border-border my-3" />
                  <div className="flex justify-between items-end">
                    <span className="text-base font-bold text-text-main">Tổng cộng</span>
                    <div className="text-right">
                      <span className="text-xs text-text-muted block">VNĐ</span>
                      <span className="text-2xl font-bold text-text-main">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Main Action */}
                <div className="p-6 pt-2 bg-secondary-50">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-bold py-4 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2 group"
                  >
                    {isProcessing ? (
                      <span>Đang xử lý...</span>
                    ) : (
                      <>
                        <span>Hoàn Tất Thanh Toán</span>
                        <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <div className="mt-4 flex justify-center gap-4 text-text-muted opacity-60">
                    <Lock className="size-5" />
                    <ShieldCheck className="size-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <footer className="mt-auto py-8 text-center text-sm text-text-muted border-t border-border">
        <p>© 2024 Fashion AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
