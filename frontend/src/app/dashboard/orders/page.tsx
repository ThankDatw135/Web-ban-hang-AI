/**
 * Fashion AI - Dashboard Orders List
 * 
 * Danh sách đơn hàng của user
 * Pattern: Direct imports, ternary render
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn, formatCurrency } from '@/lib/utils';
import { useOrders } from '@/hooks/use-orders';
import type { OrderStatus } from '@/types/api';
import { Loader2 } from 'lucide-react';

// Status config
const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  PENDING: { label: 'Chờ xác nhận', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  CONFIRMED: { label: 'Đã xác nhận', color: 'text-blue-600', bg: 'bg-blue-100' },
  PROCESSING: { label: 'Đang xử lý', color: 'text-blue-600', bg: 'bg-blue-100' },
  SHIPPED: { label: 'Đang giao', color: 'text-indigo-600', bg: 'bg-indigo-100' },
  DELIVERED: { label: 'Đã giao', color: 'text-green-600', bg: 'bg-green-100' },
  CANCELLED: { label: 'Đã hủy', color: 'text-red-600', bg: 'bg-red-100' },
  REFUNDED: { label: 'Đã hoàn tiền', color: 'text-gray-600', bg: 'bg-gray-100' },
};

// Sidebar nav items
const sidebarItems = [
  { href: '/dashboard', icon: 'dashboard', label: 'Tổng quan' },
  { href: '/dashboard/orders', icon: 'receipt_long', label: 'Đơn hàng', active: true },
  { href: '/dashboard/wishlist', icon: 'favorite', label: 'Yêu thích' },
  { href: '/dashboard/addresses', icon: 'location_on', label: 'Địa chỉ' },
  { href: '/dashboard/settings', icon: 'settings', label: 'Cài đặt' },
];

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  // Fetch orders from API
  const { data, isLoading, error } = useOrders({
    status: filter !== 'all' ? filter : undefined,
  });

  const orders = data?.data ?? [];

  return (
    <>
      <Header cartItemsCount={2} isLoggedIn={true} />
      
      <main className="flex-1 bg-cream">
        <div className="container-app py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <nav className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="space-y-1">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                        item.active 
                          ? 'bg-primary/10 text-primary font-bold' 
                          : 'hover:bg-gray-50'
                      )}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold">Đơn hàng của tôi</h1>
                
                {/* Filter tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                  {[
                    { value: 'all', label: 'Tất cả' },
                    { value: 'PROCESSING', label: 'Đang xử lý' },
                    { value: 'SHIPPED', label: 'Đang giao' },
                    { value: 'DELIVERED', label: 'Đã giao' },
                  ].map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setFilter(tab.value as OrderStatus | 'all')}
                      className={cn(
                        'px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors',
                        filter === tab.value
                          ? 'bg-primary text-white'
                          : 'bg-white hover:bg-gray-50'
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders list */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="bg-white rounded-2xl p-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-gray-500">Đang tải...</p>
                  </div>
                ) : orders.length > 0 ? (
                  orders.map((order) => {
                    const statusInfo = statusConfig[order.status] || statusConfig.PENDING;
                    const orderDate = new Date(order.createdAt).toLocaleDateString('vi-VN');
                    const productNames = order.items?.map(i => i.productName).join(', ') || '';
                    
                    return (
                    <Link
                      key={order.id}
                      href={`/dashboard/orders/${order.id}`}
                      className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Order info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold">{order.orderNumber}</span>
                            <span className={cn(
                              'px-2 py-0.5 rounded-full text-xs font-bold',
                              statusInfo.bg,
                              statusInfo.color
                            )}>
                              {statusInfo.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-1">{orderDate}</p>
                          <p className="text-sm text-gray-600 truncate max-w-md">{productNames}</p>
                        </div>

                        {/* Price & items */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{formatCurrency(order.total)}</p>
                          <p className="text-sm text-gray-500">{order.items?.length || 0} sản phẩm</p>
                        </div>

                        {/* Arrow */}
                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                      </div>
                    </Link>
                    );
                  })
                ) : (
                  <div className="bg-white rounded-2xl p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">inbox</span>
                    <p className="text-gray-500">Không có đơn hàng nào</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
