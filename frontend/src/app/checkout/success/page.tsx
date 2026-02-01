/**
 * Fashion AI - Order Success Page
 * 
 * Trang xác nhận đơn hàng thành công
 */

'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function OrderSuccessPage() {
  const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <>
      <Header cartItemsCount={0} />
      
      <main className="flex-1 bg-cream">
        <div className="container-app py-16">
          <div className="max-w-lg mx-auto text-center">
            {/* Success icon */}
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-5xl text-green-600">check_circle</span>
            </div>

            <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>
            <p className="text-gray-600 mb-8">
              Cảm ơn bạn đã mua sắm tại Fashion AI. Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.
            </p>

            {/* Order info card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm text-left mb-8">
              <div className="flex items-center justify-between pb-4 border-b mb-4">
                <span className="text-gray-600">Mã đơn hàng</span>
                <span className="font-bold text-primary">{orderId}</span>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức thanh toán</span>
                  <span>Thanh toán khi nhận hàng</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian giao hàng dự kiến</span>
                  <span>3-5 ngày làm việc</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">local_shipping</span>
                  <div>
                    <p className="font-semibold mb-1">Giao hàng đến</p>
                    <p className="text-sm text-gray-600">
                      Nguyễn Văn A, 0901234567<br />
                      123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email notification */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-8">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              <span>Thông tin đơn hàng đã được gửi đến email của bạn</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard/orders">
                <button className="w-full sm:w-auto px-8 h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                  Xem đơn hàng
                </button>
              </Link>
              <Link href="/products">
                <button className="w-full sm:w-auto px-8 h-12 rounded-full border border-gray-300 font-bold hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  Tiếp tục mua sắm
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
