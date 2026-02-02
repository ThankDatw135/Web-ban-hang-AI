/**
 * Fashion AI - Đặt Hàng Thành Công
 * 
 * Trang hiển thị sau khi đặt hàng thành công
 */

import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đặt hàng thành công',
};

export default function CheckoutSuccessPage() {
  // Mock order data
  const order = {
    id: 'FA-2026020201',
    total: 2450000,
    email: 'example@email.com',
    estimatedDelivery: '3-5 ngày',
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg text-center">
        {/* Success icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto animate-fade-in">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          {/* Decorative rings */}
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-success/20 animate-ping" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 animate-slide-up">Đặt hàng thành công!</h1>
        <p className="text-secondary mb-8 animate-slide-up">
          Cảm ơn bạn đã mua sắm tại Fashion AI
        </p>

        {/* Order info card */}
        <div className="card p-6 mb-8 text-left animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-secondary">Mã đơn hàng</p>
              <p className="font-bold">{order.id}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-secondary">Tổng thanh toán</span>
              <span className="font-bold text-primary">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-secondary">Thời gian giao hàng dự kiến</span>
              <span className="font-medium">{order.estimatedDelivery}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-secondary">Email xác nhận</span>
              <span className="font-medium">{order.email}</span>
            </div>
          </div>
        </div>

        {/* Email notification */}
        <div className="flex items-center justify-center gap-2 text-sm text-secondary mb-8 animate-slide-up">
          <Mail className="w-4 h-4" />
          Chi tiết đơn hàng đã được gửi đến email của bạn
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Link href="/dashboard/orders" className="btn-primary">
            Theo dõi đơn hàng
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/products" className="btn-outline">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
