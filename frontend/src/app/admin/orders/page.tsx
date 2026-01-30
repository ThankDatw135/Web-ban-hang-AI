/**
 * Admin Orders Management - Fashion AI
 * 
 * Quản lý đơn hàng với API integration:
 * - Orders list with filters
 * - Status management
 * - Pagination
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Eye,
  Truck,
  Check,
  X,
  Loader2,
  Package,
  RefreshCw
} from 'lucide-react';
import { useAdminOrders, useUpdateOrderStatus, type AdminOrderFilters } from '@/hooks/useAdmin';
import { toastSuccess, toastError } from '@/stores';
import type { OrderStatus } from '@/types';

const statusFilters = [
  { value: '', label: 'Tất cả' },
  { value: 'PENDING', label: 'Chờ xử lý' },
  { value: 'PROCESSING', label: 'Đang xử lý' },
  { value: 'SHIPPED', label: 'Đang giao' },
  { value: 'DELIVERED', label: 'Đã giao' },
  { value: 'CANCELLED', label: 'Đã hủy' },
];

const statusColors: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-600',
  PROCESSING: 'bg-blue-100 text-blue-600',
  SHIPPED: 'bg-purple-100 text-purple-600',
  DELIVERED: 'bg-green-100 text-green-600',
  CANCELLED: 'bg-red-100 text-red-600',
  REFUNDED: 'bg-gray-100 text-gray-600',
};

const statusLabels: Record<string, string> = {
  PENDING: 'Chờ xử lý',
  PROCESSING: 'Đang xử lý',
  SHIPPED: 'Đang giao',
  DELIVERED: 'Đã giao',
  CANCELLED: 'Đã hủy',
  REFUNDED: 'Đã hoàn tiền',
};

export default function AdminOrders() {
  const [filters, setFilters] = useState<AdminOrderFilters>({ page: 1, limit: 10 });
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data, isLoading, refetch } = useAdminOrders({ ...filters, search: searchQuery });
  const updateStatus = useUpdateOrderStatus();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ orderId, status: newStatus });
      toastSuccess('Thành công', 'Đã cập nhật trạng thái đơn hàng');
    } catch {
      toastError('Lỗi', 'Không thể cập nhật trạng thái');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <h1 className="text-xl font-bold text-text-main">Quản Lý Đơn Hàng</h1>
          </div>
          <button 
            onClick={() => refetch()}
            className="size-10 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-secondary-100"
          >
            <RefreshCw className="size-5 text-text-muted" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mã đơn hoặc tên khách..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:border-primary"
            />
          </form>
          <div className="flex items-center gap-2 overflow-x-auto">
            {statusFilters.map((status) => (
              <button
                key={status.value}
                onClick={() => setFilters({ ...filters, status: status.value as OrderStatus || undefined, page: 1 })}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filters.status === status.value || (!filters.status && !status.value)
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-muted border border-border hover:border-primary'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary-50 border-b border-border">
                      <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Mã đơn</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Khách hàng</th>
                      <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Số SP</th>
                      <th className="text-right py-4 px-6 text-sm font-medium text-text-muted">Tổng tiền</th>
                      <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Ngày</th>
                      <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Trạng thái</th>
                      <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.items.map((order) => (
                      <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary-50">
                        <td className="py-4 px-6">
                          <span className="font-bold text-primary">{order.orderNumber || order.id}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-text-main">{order.shippingAddress?.fullName || 'N/A'}</p>
                            <p className="text-sm text-text-muted">{order.shippingAddress?.phone || ''}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center text-text-main">{order.items?.length || 0}</td>
                        <td className="py-4 px-6 text-right font-bold text-text-main">{formatPrice(order.total)}</td>
                        <td className="py-4 px-6 text-center text-text-muted">{formatDate(order.createdAt)}</td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                            {statusLabels[order.status] || order.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <Link 
                              href={`/admin/orders/${order.id}`}
                              className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                            >
                              <Eye className="size-4" />
                            </Link>
                            {order.status === 'PENDING' && (
                              <>
                                <button 
                                  onClick={() => handleStatusChange(order.id, 'PROCESSING')}
                                  disabled={updateStatus.isPending}
                                  className="size-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 disabled:opacity-50"
                                  title="Xác nhận"
                                >
                                  <Check className="size-4" />
                                </button>
                                <button 
                                  onClick={() => handleStatusChange(order.id, 'CANCELLED')}
                                  disabled={updateStatus.isPending}
                                  className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 disabled:opacity-50"
                                  title="Hủy đơn"
                                >
                                  <X className="size-4" />
                                </button>
                              </>
                            )}
                            {order.status === 'PROCESSING' && (
                              <button 
                                onClick={() => handleStatusChange(order.id, 'SHIPPED')}
                                disabled={updateStatus.isPending}
                                className="size-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100 disabled:opacity-50"
                                title="Giao hàng"
                              >
                                <Truck className="size-4" />
                              </button>
                            )}
                            {order.status === 'SHIPPED' && (
                              <button 
                                onClick={() => handleStatusChange(order.id, 'DELIVERED')}
                                disabled={updateStatus.isPending}
                                className="size-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 disabled:opacity-50"
                                title="Đã giao"
                              >
                                <Package className="size-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty state */}
              {(!data?.items || data.items.length === 0) && (
                <div className="text-center py-16">
                  <Package className="size-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-muted">Không có đơn hàng nào</p>
                </div>
              )}

              {/* Pagination */}
              {data && data.items.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                  <p className="text-sm text-text-muted">
                    Trang {data.meta.page} / {data.meta.totalPages} ({data.meta.total} đơn)
                  </p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setFilters({ ...filters, page: (filters.page || 1) - 1 })}
                      disabled={(filters.page || 1) <= 1}
                      className="px-3 py-1 border border-border rounded-lg text-sm disabled:opacity-50"
                    >
                      Trước
                    </button>
                    <span className="px-3 py-1 bg-primary text-white rounded-lg text-sm">
                      {filters.page || 1}
                    </span>
                    <button 
                      onClick={() => setFilters({ ...filters, page: (filters.page || 1) + 1 })}
                      disabled={(filters.page || 1) >= data.meta.totalPages}
                      className="px-3 py-1 border border-border rounded-lg text-sm disabled:opacity-50"
                    >
                      Sau
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
