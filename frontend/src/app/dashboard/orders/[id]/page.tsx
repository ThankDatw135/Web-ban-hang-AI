/**
 * Fashion AI - Order Detail Page
 * 
 * Chi tiết đơn hàng theo ID
 */

'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn, formatCurrency } from '@/lib/utils';
import { useOrder } from '@/hooks/use-orders';
import { Loader2 } from 'lucide-react';
import type { OrderStatus } from '@/types/api';

// Status config  
const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  PENDING: { label: 'Chờ xử lý', color: 'text-gray-600', bg: 'bg-gray-100' },
  CONFIRMED: { label: 'Đã xác nhận', color: 'text-blue-600', bg: 'bg-blue-100' },
  PROCESSING: { label: 'Đang xử lý', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  SHIPPED: { label: 'Đang giao', color: 'text-blue-600', bg: 'bg-blue-100' },
  DELIVERED: { label: 'Đã giao', color: 'text-green-600', bg: 'bg-green-100' },
  CANCELLED: { label: 'Đã hủy', color: 'text-red-600', bg: 'bg-red-100' },
  REFUNDED: { label: 'Đã hoàn tiền', color: 'text-orange-600', bg: 'bg-orange-100' },
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  
  const { data: order, isLoading, error } = useOrder(orderId);

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-cream">
          <div className="container-app py-20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Error or not found
  if (error || !order) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-cream">
          <div className="container-app py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy đơn hàng</h1>
            <Link href="/dashboard/orders" className="text-primary hover:underline">
              ← Quay lại danh sách đơn hàng
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const statusInfo = statusConfig[order.status] || statusConfig.PENDING;
  const orderDate = new Date(order.createdAt).toLocaleDateString('vi-VN');

  return (
    <>
      <Header cartItemsCount={2} isLoggedIn={true} />
      
      <main className="flex-1 bg-cream">
        <div className="container-app py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/dashboard" className="text-gray-500 hover:text-primary">Tài khoản</Link>
            <span className="text-gray-400">/</span>
            <Link href="/dashboard/orders" className="text-gray-500 hover:text-primary">Đơn hàng</Link>
            <span className="text-gray-400">/</span>
            <span className="font-semibold">{params.id}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order header */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">Đơn hàng {order.orderNumber}</h1>
                    <p className="text-gray-500">Đặt ngày {orderDate}</p>
                  </div>
                  <span className={cn(
                    'px-3 py-1 rounded-full text-sm font-bold w-fit',
                    statusInfo.bg,
                    statusInfo.color
                  )}>
                    {statusInfo.label}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div 
                        className="w-20 h-24 rounded-lg bg-cover bg-center shrink-0 bg-gray-200"
                        style={{ backgroundImage: item.productImage ? `url(${item.productImage})` : undefined }}
                      />
                      <div className="flex-1">
                        <h3 className="font-bold">{item.productName}</h3>
                        <p className="text-sm text-gray-500">Size: {item.size} | Màu: {item.color}</p>
                        <p className="text-sm text-gray-500">SL: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-primary">{formatCurrency(item.unitPrice)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Status Timeline */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold mb-4">Trạng thái đơn hàng</h2>
                <div className="flex items-center gap-2">
                  <div className={cn('w-4 h-4 rounded-full', statusInfo.bg)} />
                  <span className={cn('font-semibold', statusInfo.color)}>{statusInfo.label}</span>
                  {order.deliveredAt && (
                    <span className="text-sm text-gray-500">- {new Date(order.deliveredAt).toLocaleDateString('vi-VN')}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold mb-4">Tổng cộng</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className={order.shippingFee === 0 ? 'text-green-600' : ''}>
                      {order.shippingFee === 0 ? 'Miễn phí' : formatCurrency(order.shippingFee)}
                    </span>
                  </div>
                  {order.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giảm giá</span>
                    <span className="text-green-600">-{formatCurrency(order.discount)}</span>
                  </div>
                  )}
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold mb-4">Thông tin giao hàng</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500">Địa chỉ</p>
                    <p>{order.shippingAddress?.street}, {order.shippingAddress?.district}, {order.shippingAddress?.city}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phương thức thanh toán</p>
                    <p>{order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : order.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">refresh</span>
                  Mua lại
                </button>
                <button className="w-full h-12 rounded-full border border-gray-300 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">help</span>
                  Hỗ trợ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
