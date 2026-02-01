/**
 * Fashion AI - Admin Dashboard
 * 
 * Trang tổng quan admin với stats và charts
 */

'use client';

import Link from 'next/link';
import { cn, formatCurrency } from '@/lib/utils';
import { useOrders } from '@/hooks/use-orders';
import { useProducts } from '@/hooks/use-products';
import { Loader2 } from 'lucide-react';
import type { OrderStatus } from '@/types/api';

// Status badge mapping
const statusBadge: Record<OrderStatus, { label: string; class: string }> = {
  PENDING: { label: 'Chờ xử lý', class: 'bg-gray-100 text-gray-700' },
  CONFIRMED: { label: 'Đã xác nhận', class: 'bg-blue-100 text-blue-700' },
  PROCESSING: { label: 'Đang xử lý', class: 'bg-yellow-100 text-yellow-700' },
  SHIPPED: { label: 'Đang giao', class: 'bg-blue-100 text-blue-700' },
  DELIVERED: { label: 'Đã giao', class: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Đã hủy', class: 'bg-red-100 text-red-700' },
  REFUNDED: { label: 'Đã hoàn tiền', class: 'bg-purple-100 text-purple-700' },
};

// Mock stats (would come from analytics API in production)
const stats = [
  { label: 'Doanh thu hôm nay', value: '12.5M', change: '+12%', icon: 'payments', color: 'text-green-600 bg-green-100' },
  { label: 'Đơn hàng mới', value: '48', change: '+8%', icon: 'shopping_bag', color: 'text-blue-600 bg-blue-100' },
  { label: 'Khách hàng mới', value: '156', change: '+24%', icon: 'person_add', color: 'text-purple-600 bg-purple-100' },
  { label: 'AI Jobs đang chạy', value: '12', change: '', icon: 'smart_toy', color: 'text-amber-600 bg-amber-100' },
];

export default function AdminDashboard() {
  // Fetch recent orders
  const { data: ordersData, isLoading: ordersLoading } = useOrders({ limit: 5 });
  const recentOrders = ordersData?.data || [];
  
  // Fetch top products (by popularity/sales)
  const { data: productsData, isLoading: productsLoading } = useProducts({ limit: 4, sort: 'popular' });
  const topProducts = productsData?.data || [];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Tổng quan hoạt động kinh doanh</p>
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', stat.color)}>
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
              {stat.change && (
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="font-bold">Đơn hàng gần đây</h2>
            <Link href="/admin/orders" className="text-sm text-primary font-semibold hover:underline">
              Xem tất cả
            </Link>
          </div>
          <div className="divide-y">
            {ordersLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : recentOrders.length > 0 ? recentOrders.map((order) => (
              <div key={order.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{order.orderNumber}</span>
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-bold', statusBadge[order.status].class)}>
                      {statusBadge[order.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{order.shippingAddress?.fullName || 'N/A'}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(order.total)}</p>
                  <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                </div>
              </div>
            )) : (
              <p className="text-center text-gray-500 py-8">Chưa có đơn hàng nào</p>
            )}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-5 border-b">
            <h2 className="font-bold">Sản phẩm nổi bật</h2>
          </div>
          <div className="p-4 space-y-4">
            {productsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : topProducts.length > 0 ? topProducts.map((product, idx) => (
              <div key={product.id} className="flex items-center gap-3">
                <span className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                  idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                  idx === 1 ? 'bg-gray-100 text-gray-700' :
                  idx === 2 ? 'bg-amber-100 text-amber-700' : 'bg-gray-50 text-gray-600'
                )}>
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category?.name || 'Uncategorized'}</p>
                </div>
                <span className="text-sm font-semibold text-primary">{formatCurrency(product.price)}</span>
              </div>
            )) : (
              <p className="text-center text-gray-500 py-4">Chưa có sản phẩm</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Thêm sản phẩm', icon: 'add_box', href: '/admin/products/new' },
          { label: 'Xử lý đơn hàng', icon: 'package', href: '/admin/orders' },
          { label: 'Xem AI Jobs', icon: 'smart_toy', href: '/admin/ai-jobs' },
          { label: 'Báo cáo', icon: 'bar_chart', href: '/admin/reports' },
        ].map((action) => (
          <Link 
            key={action.label}
            href={action.href}
            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">{action.icon}</span>
            </div>
            <span className="font-semibold">{action.label}</span>
            <span className="material-symbols-outlined text-gray-400 ml-auto">arrow_forward</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
