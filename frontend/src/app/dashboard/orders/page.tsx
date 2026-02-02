/**
 * Fashion AI - Đơn Hàng Của Tôi
 * 
 * Danh sách đơn hàng của user
 */

'use client';

import { Package, Eye, ChevronRight, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';

// Mock orders data
const orders = [
  {
    id: 'FA-2026020201',
    date: '02/02/2026',
    total: 2450000,
    status: 'delivered',
    statusText: 'Đã giao',
    items: 3,
    image: null,
  },
  {
    id: 'FA-2026012501',
    date: '25/01/2026',
    total: 850000,
    status: 'shipping',
    statusText: 'Đang giao',
    items: 1,
    image: null,
  },
  {
    id: 'FA-2026012001',
    date: '20/01/2026',
    total: 1650000,
    status: 'processing',
    statusText: 'Đang xử lý',
    items: 2,
    image: null,
  },
  {
    id: 'FA-2026011501',
    date: '15/01/2026',
    total: 750000,
    status: 'cancelled',
    statusText: 'Đã hủy',
    items: 1,
    image: null,
  },
];

// Status colors
const statusConfig: Record<string, { color: string; bgColor: string; icon: typeof Package }> = {
  delivered: { color: 'text-success', bgColor: 'bg-success/10', icon: CheckCircle },
  shipping: { color: 'text-blue-500', bgColor: 'bg-blue-500/10', icon: Truck },
  processing: { color: 'text-warning', bgColor: 'bg-warning/10', icon: Clock },
  cancelled: { color: 'text-error', bgColor: 'bg-error/10', icon: XCircle },
};

// Format giá tiền
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['Tất cả', 'Đang xử lý', 'Đang giao', 'Đã giao', 'Đã hủy'].map((tab, index) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              index === 0
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-[#2c2822] text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {orders.map((order) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;
          
          return (
            <div key={order.id} className="card p-4 md:p-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">{order.id}</p>
                    <p className="text-xs text-secondary">{order.date}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${config.bgColor} ${config.color}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  {order.statusText}
                </span>
              </div>

              {/* Items preview */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {[...Array(Math.min(order.items, 3))].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-[#2c2822] border-2 border-white dark:border-[#25221d] flex items-center justify-center"
                    >
                      <span className="text-lg">👕</span>
                    </div>
                  ))}
                  {order.items > 3 && (
                    <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-[#25221d] flex items-center justify-center">
                      <span className="text-xs font-bold">+{order.items - 3}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-secondary">{order.items} sản phẩm</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-secondary">Tổng tiền</p>
                  <p className="text-lg font-bold text-primary">{formatPrice(order.total)}</p>
                </div>
                <Link 
                  href={`/dashboard/orders/${order.id}`}
                  className="btn-outline h-10 text-sm"
                >
                  <Eye className="w-4 h-4" />
                  Xem chi tiết
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {orders.length === 0 && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#2c2822] flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="font-bold mb-2">Chưa có đơn hàng</h3>
          <p className="text-secondary text-sm mb-4">Bạn chưa có đơn hàng nào</p>
          <Link href="/products" className="btn-primary">
            Mua sắm ngay
          </Link>
        </div>
      )}
    </div>
  );
}
