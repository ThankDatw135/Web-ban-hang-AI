/**
 * Order Success Page - Fashion AI
 * 
 * Trang xác nhận đơn hàng với:
 * - Success animation
 * - Order details card
 * - AI Stylist Tip
 * - Action buttons
 */

import Link from 'next/link';
import { Check, Sparkles, Truck, ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock order data
const order = {
  number: '#8392-AI',
  date: '30/01/2024',
  estimatedDelivery: '05/02/2024',
  items: [
    {
      id: '1',
      name: 'Silk Trench Coat',
      size: 'M',
      color: 'Beige',
      price: 28800000,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200',
    },
    {
      id: '2',
      name: 'Leather Ankle Boots',
      size: '38',
      color: 'Black',
      price: 10800000,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200',
    },
  ],
  subtotal: 39600000,
  shipping: 0,
  tax: 3960000,
  total: 43560000,
};

export default function OrderSuccessPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-[720px] flex flex-col gap-8">
          {/* Hero Heading */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-100 text-green-600 mb-2 animate-bounce">
              <Check className="size-8" strokeWidth={3} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-main">
              Cảm Ơn Bạn!
            </h1>
            <p className="text-text-muted text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed">
              Cảm ơn bạn đã chọn sự tinh tế. Đơn hàng của bạn thể hiện một phong cách thực sự tinh tế.
            </p>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-xl border border-primary shadow-sm overflow-hidden">
            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-border bg-white">
              <div>
                <p className="text-xs uppercase tracking-wider text-text-muted font-bold mb-1">
                  Mã Đơn Hàng
                </p>
                <p className="text-lg font-bold text-text-main">{order.number}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-text-muted font-bold mb-1">
                  Dự Kiến Giao
                </p>
                <p className="text-lg font-bold text-text-main">{order.estimatedDelivery}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 space-y-6">
              {order.items.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-4 items-start">
                    <div
                      className="w-24 aspect-[3/4] rounded-lg bg-secondary-100 bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    <div className="flex-1 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-base font-bold text-text-main">{item.name}</h3>
                          <span className="text-base font-bold">{formatPrice(item.price)}</span>
                        </div>
                        <p className="text-text-muted text-sm mt-1">
                          Size: {item.size} | Màu: {item.color}
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < order.items.length - 1 && (
                    <div className="h-px w-full bg-border mt-6" />
                  )}
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="bg-secondary-50 p-6 border-t border-border space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Tạm tính</span>
                <span className="font-medium">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Phí vận chuyển</span>
                <span className="font-medium text-green-600">Miễn phí</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Thuế</span>
                <span className="font-medium">{formatPrice(order.tax)}</span>
              </div>
              <div className="h-px w-full bg-border my-2" />
              <div className="flex justify-between text-lg font-bold items-center">
                <span>Tổng cộng</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* AI Stylist Tip Section */}
          <div className="relative bg-accent/5 border border-accent/30 rounded-xl p-6 flex flex-col sm:flex-row gap-5 items-start">
            <div className="size-10 rounded-full bg-accent flex items-center justify-center shrink-0 shadow-sm text-white">
              <Sparkles className="size-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-accent font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                AI Stylist Gợi Ý
              </h4>
              <p className="text-text-main text-sm leading-relaxed">
                <span className="font-semibold">Silk Trench Coat</span> của bạn cần được chăm sóc đặc biệt. 
                Chúng tôi khuyên bạn giặt khô hoặc giặt tay nhẹ nhàng với nước lạnh và chất tẩy rửa nhẹ 
                để duy trì độ bóng và mềm mại sang trọng.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
            <Link
              href="/orders"
              className="flex-1 h-12 rounded-lg bg-secondary-200 hover:bg-secondary-300 text-text-main font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Truck className="size-5" />
              Theo Dõi Đơn Hàng
            </Link>
            <Link
              href="/shop"
              className="flex-[2] h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              Tiếp Tục Mua Sắm
              <ArrowRight className="size-5" />
            </Link>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center gap-6 text-sm text-text-muted">
            <Link href="/returns" className="hover:text-primary transition-colors">
              Chính Sách Đổi Trả
            </Link>
            <span className="text-border">|</span>
            <Link href="/support" className="hover:text-primary transition-colors">
              Hỗ Trợ Khách Hàng
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
