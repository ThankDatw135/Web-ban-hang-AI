/**
 * Order History & Tracking - Fashion AI
 * 
 * Lịch sử đơn hàng động với API:
 * - Fetch orders từ API
 * - Filter by status
 * - Cancel order
 * - Reorder functionality
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Eye,
  Loader2
} from 'lucide-react';
import { Header, Footer } from '@/components';
import { useOrders, useCancelOrder } from '@/hooks/useOrders';
import { toastSuccess, toastError } from '@/stores';
import type { OrderStatus } from '@/types';

const statusFilters: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'PENDING', label: 'Chờ xử lý' },
  { value: 'CONFIRMED', label: 'Đã xác nhận' },
  { value: 'PROCESSING', label: 'Đang xử lý' },
  { value: 'SHIPPED', label: 'Đang giao' },
  { value: 'DELIVERED', label: 'Đã giao' },
  { value: 'CANCELLED', label: 'Đã hủy' },
];

const statusConfig: Record<OrderStatus, { icon: any; color: string; text: string }> = {
  PENDING: { icon: Clock, color: 'text-amber-600 bg-amber-50', text: 'Chờ xử lý' },
  CONFIRMED: { icon: CheckCircle, color: 'text-blue-600 bg-blue-50', text: 'Đã xác nhận' },
  PROCESSING: { icon: Package, color: 'text-indigo-600 bg-indigo-50', text: 'Đang xử lý' },
  SHIPPED: { icon: Truck, color: 'text-blue-600 bg-blue-50', text: 'Đang giao' },
  DELIVERED: { icon: CheckCircle, color: 'text-green-600 bg-green-50', text: 'Đã giao' },
  CANCELLED: { icon: XCircle, color: 'text-red-600 bg-red-50', text: 'Đã hủy' },
  REFUNDED: { icon: XCircle, color: 'text-orange-600 bg-orange-50', text: 'Đã hoàn tiền' },
};

export default function OrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const statusFilter = (searchParams.get('status') as OrderStatus | 'all') || 'all';
  const page = Number(searchParams.get('page')) || 1;
  
  // Fetch orders
  const { data: ordersData, isLoading } = useOrders(
    statusFilter === 'all' ? undefined : statusFilter,
    page
  );
  
  const cancelOrder = useCancelOrder();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleFilterChange = (filter: OrderStatus | 'all') => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === 'all') {
      params.delete('status');
    } else {
      params.set('status', filter);
    }
    params.set('page', '1');
    router.push(`/orders?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/orders?${params.toString()}`);
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Bạn có chắc muốn hủy đơn hàng này?')) return;
    
    try {
      await cancelOrder.mutateAsync({ orderId });
      toastSuccess('Đã hủy', 'Đơn hàng đã được hủy thành công');
    } catch {
      toastError('Lỗi', 'Không thể hủy đơn hàng');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
          <span className="ml-3 text-text-muted">Đang tải đơn hàng...</span>
        </main>
        <Footer />
      </div>
    );
  }

  const orders = ordersData?.items || [];
  const meta = ordersData?.meta;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-main mb-2">Đơn Hàng Của Tôi</h1>
          <p className="text-text-muted">{meta?.total || 0} đơn hàng</p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto mb-6 pb-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => handleFilterChange(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                statusFilter === filter.value
                  ? 'bg-text-main text-white'
                  : 'bg-white text-text-muted border border-border hover:border-primary'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order: any) => {
            const config = statusConfig[order.status as OrderStatus] || statusConfig.PENDING;
            const StatusIcon = config.icon;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-border overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-text-main">{order.orderNumber}</span>
                      <span className="text-sm text-text-muted">
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${config.color}`}>
                      <StatusIcon className="size-3" />
                      {config.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {order.status === 'SHIPPED' && (
                      <Link
                        href={`/orders/${order.id}/tracking`}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg flex items-center gap-1 hover:bg-blue-100 transition-colors"
                      >
                        <Truck className="size-4" />
                        Theo dõi
                      </Link>
                    )}
                    {order.status === 'PENDING' && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancelOrder.isPending}
                        className="px-3 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-lg flex items-center gap-1 hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        <XCircle className="size-4" />
                        Hủy
                      </button>
                    )}
                    <Link
                      href={`/orders/${order.id}`}
                      className="px-3 py-1.5 bg-secondary-50 text-text-main text-sm font-medium rounded-lg flex items-center gap-1 hover:bg-secondary-100 transition-colors"
                    >
                      <Eye className="size-4" />
                      Chi tiết
                    </Link>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  {order.items?.slice(0, 2).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 py-2">
                      <img
                        src={item.product?.image || 'https://via.placeholder.com/64'}
                        alt={item.product?.name || 'Product'}
                        className="size-16 rounded-lg object-cover bg-secondary-100"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-text-main">{item.product?.name}</h3>
                        <p className="text-sm text-text-muted">
                          {item.variant?.size} • {item.variant?.color} • SL: {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium text-text-main">{formatPrice(item.totalPrice)}</span>
                    </div>
                  ))}
                  {order.items?.length > 2 && (
                    <p className="text-sm text-text-muted text-center py-2">
                      + {order.items.length - 2} sản phẩm khác
                    </p>
                  )}
                </div>

                {/* Order Footer */}
                <div className="p-4 bg-secondary-50 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-sm">
                    {order.status === 'SHIPPED' && order.estimatedDelivery && (
                      <span className="text-text-muted">
                        Dự kiến giao: <span className="text-text-main font-medium">
                          {new Date(order.estimatedDelivery).toLocaleDateString('vi-VN')}
                        </span>
                      </span>
                    )}
                    {order.status === 'DELIVERED' && order.deliveredAt && (
                      <span className="text-text-muted">
                        Đã giao: <span className="text-text-main font-medium">
                          {new Date(order.deliveredAt).toLocaleDateString('vi-VN')}
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg text-primary">{formatPrice(order.total)}</span>
                    {order.status === 'DELIVERED' && (
                      <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg flex items-center gap-2 transition-colors">
                        <RefreshCw className="size-4" />
                        Mua lại
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-16">
            <div className="size-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="size-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">Không có đơn hàng</h3>
            <p className="text-text-muted mb-6">
              {statusFilter === 'all' 
                ? 'Bạn chưa có đơn hàng nào'
                : 'Không có đơn hàng nào với trạng thái này'
              }
            </p>
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
              Bắt đầu mua sắm
            </Link>
          </div>
        )}

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="h-10 px-4 rounded-lg border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="size-4" /> Trước
            </button>
            <span className="px-4 text-sm text-text-muted">
              Trang {page} / {meta.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= meta.totalPages}
              className="h-10 px-4 rounded-lg border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Sau <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
