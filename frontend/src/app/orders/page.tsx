/**
 * Order History & Tracking - Fashion AI
 * 
 * Lịch sử đơn hàng:
 * - Order list với status
 * - Order tracking
 * - Filter by status
 * - Reorder functionality
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  ChevronRight,
  RefreshCw,
  Eye,
  Download
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock orders
const orders = [
  {
    id: 'ORD-2024001',
    date: '28/01/2024',
    total: 5800000,
    status: 'shipping',
    statusText: 'Đang giao',
    items: [
      { name: 'Silk Evening Gown', qty: 1, price: 4200000, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100' },
      { name: 'Pearl Earrings', qty: 1, price: 1600000, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100' },
    ],
    tracking: 'VNPOST123456789',
    estimatedDelivery: '30/01/2024',
  },
  {
    id: 'ORD-2024002',
    date: '25/01/2024',
    total: 3200000,
    status: 'delivered',
    statusText: 'Đã giao',
    items: [
      { name: 'Velvet Blazer', qty: 1, price: 3200000, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100' },
    ],
    deliveredDate: '27/01/2024',
  },
  {
    id: 'ORD-2024003',
    date: '20/01/2024',
    total: 8500000,
    status: 'delivered',
    statusText: 'Đã giao',
    items: [
      { name: 'Cashmere Coat', qty: 1, price: 8500000, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=100' },
    ],
    deliveredDate: '23/01/2024',
  },
  {
    id: 'ORD-2024004',
    date: '15/01/2024',
    total: 2400000,
    status: 'cancelled',
    statusText: 'Đã hủy',
    items: [
      { name: 'Silk Blouse', qty: 2, price: 2400000, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=100' },
    ],
  },
];

const statusFilters = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'shipping', label: 'Đang giao' },
  { value: 'delivered', label: 'Đã giao' },
  { value: 'cancelled', label: 'Đã hủy' },
];

const statusConfig = {
  pending: { icon: Clock, color: 'text-amber-600 bg-amber-50' },
  shipping: { icon: Truck, color: 'text-blue-600 bg-blue-50' },
  delivered: { icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  cancelled: { icon: XCircle, color: 'text-red-600 bg-red-50' },
};

export default function OrdersPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const filteredOrders = selectedFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedFilter);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-main mb-2">Đơn Hàng Của Tôi</h1>
          <p className="text-text-muted">{orders.length} đơn hàng</p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto mb-6 pb-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedFilter === filter.value
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
          {filteredOrders.map((order) => {
            const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Package;
            const statusColorClass = statusConfig[order.status as keyof typeof statusConfig]?.color || '';

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-border overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-text-main">{order.id}</span>
                      <span className="text-sm text-text-muted">{order.date}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${statusColorClass}`}>
                      <StatusIcon className="size-3" />
                      {order.statusText}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {order.status === 'shipping' && order.tracking && (
                      <Link
                        href={`/orders/${order.id}/tracking`}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg flex items-center gap-1 hover:bg-blue-100 transition-colors"
                      >
                        <Truck className="size-4" />
                        Theo dõi
                      </Link>
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
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-text-main">{item.name}</h3>
                        <p className="text-sm text-text-muted">Số lượng: {item.qty}</p>
                      </div>
                      <span className="font-medium text-text-main">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="p-4 bg-secondary-50 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-sm">
                    {order.status === 'shipping' && order.estimatedDelivery && (
                      <span className="text-text-muted">
                        Dự kiến giao: <span className="text-text-main font-medium">{order.estimatedDelivery}</span>
                      </span>
                    )}
                    {order.status === 'delivered' && order.deliveredDate && (
                      <span className="text-text-muted">
                        Đã giao: <span className="text-text-main font-medium">{order.deliveredDate}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg text-primary">{formatPrice(order.total)}</span>
                    {order.status === 'delivered' && (
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

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="size-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="size-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">Không có đơn hàng</h3>
            <p className="text-text-muted mb-6">Chưa có đơn hàng nào với trạng thái này</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
