/**
 * Fashion AI - Admin Orders Management
 * 
 * Quản lý đơn hàng
 */

'use client';

import { useState } from 'react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { useOrders } from '@/hooks/use-orders';
import { Loader2 } from 'lucide-react';
import type { OrderStatus } from '@/types/api';

const statusConfig: Record<OrderStatus, { label: string; class: string }> = {
  PENDING: { label: 'Chờ xử lý', class: 'bg-gray-100 text-gray-700' },
  CONFIRMED: { label: 'Đã xác nhận', class: 'bg-blue-100 text-blue-700' },
  PROCESSING: { label: 'Đang xử lý', class: 'bg-yellow-100 text-yellow-700' },
  SHIPPED: { label: 'Đang giao', class: 'bg-blue-100 text-blue-700' },
  DELIVERED: { label: 'Đã giao', class: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Đã hủy', class: 'bg-red-100 text-red-700' },
  REFUNDED: { label: 'Đã hoàn tiền', class: 'bg-purple-100 text-purple-700' },
};

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  // Fetch orders from API with optional status filter
  const { data: ordersData, isLoading } = useOrders(
    statusFilter === 'all' ? undefined : { status: statusFilter }
  );
  const orders = ordersData?.data || [];
  const totalCount = ordersData?.meta?.total || orders.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Đơn hàng</h1>
        <p className="text-gray-600">{totalCount} đơn hàng</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { value: 'all' as const, label: 'Tất cả' },
          { value: 'PENDING' as const, label: 'Chờ xử lý' },
          { value: 'PROCESSING' as const, label: 'Đang xử lý' },
          { value: 'SHIPPED' as const, label: 'Đang giao' },
          { value: 'DELIVERED' as const, label: 'Đã giao' },
          { value: 'CANCELLED' as const, label: 'Đã hủy' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors',
              statusFilter === tab.value ? 'bg-primary text-white' : 'bg-white hover:bg-gray-50'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-sm">Mã đơn</th>
              <th className="text-left p-4 font-semibold text-sm">Khách hàng</th>
              <th className="text-left p-4 font-semibold text-sm">Ngày đặt</th>
              <th className="text-left p-4 font-semibold text-sm">Sản phẩm</th>
              <th className="text-left p-4 font-semibold text-sm">Tổng tiền</th>
              <th className="text-left p-4 font-semibold text-sm">Trạng thái</th>
              <th className="text-center p-4 font-semibold text-sm">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                </td>
              </tr>
            ) : orders.length > 0 ? orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-4 font-semibold">{order.orderNumber}</td>
                <td className="p-4">
                  <div>
                    <p className="font-semibold">{order.shippingAddress?.fullName || 'N/A'}</p>
                    <p className="text-sm text-gray-500">{order.shippingAddress?.phone || ''}</p>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{formatDate(new Date(order.createdAt))}</td>
                <td className="p-4">{order.items?.length || 0} sản phẩm</td>
                <td className="p-4 font-semibold text-primary">{formatCurrency(order.total)}</td>
                <td className="p-4">
                  <span className={cn('px-2 py-1 rounded-full text-xs font-bold', statusConfig[order.status].class)}>
                    {statusConfig[order.status].label}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">print</span>
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  Không có đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
