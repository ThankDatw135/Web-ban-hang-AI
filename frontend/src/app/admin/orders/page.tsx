/**
 * Admin Orders Management - Fashion AI
 * 
 * Quản lý đơn hàng:
 * - Orders list with filters
 * - Status management
 * - Order details
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  ChevronDown,
  Eye,
  Truck,
  Check,
  X,
  MoreVertical
} from 'lucide-react';

// Mock orders
const ordersData = [
  { id: 'ORD-2024001', customer: 'Ngọc Anh', email: 'ngocanh@email.com', total: 4500000, items: 3, date: '30/01/2024', status: 'processing' },
  { id: 'ORD-2024002', customer: 'Minh Tuấn', email: 'minhtuan@email.com', total: 2300000, items: 2, date: '30/01/2024', status: 'shipping' },
  { id: 'ORD-2024003', customer: 'Thanh Hằng', email: 'thanhhang@email.com', total: 8900000, items: 5, date: '29/01/2024', status: 'completed' },
  { id: 'ORD-2024004', customer: 'Hoàng Nam', email: 'hoangnam@email.com', total: 1500000, items: 1, date: '29/01/2024', status: 'pending' },
  { id: 'ORD-2024005', customer: 'Lan Anh', email: 'lananh@email.com', total: 6700000, items: 4, date: '28/01/2024', status: 'completed' },
  { id: 'ORD-2024006', customer: 'Đức Minh', email: 'ducminh@email.com', total: 3200000, items: 2, date: '28/01/2024', status: 'cancelled' },
];

const statusFilters = ['Tất cả', 'Chờ xử lý', 'Đang xử lý', 'Đang giao', 'Hoàn thành', 'Đã hủy'];

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-600',
  processing: 'bg-blue-100 text-blue-600',
  shipping: 'bg-purple-100 text-purple-600',
  completed: 'bg-green-100 text-green-600',
  cancelled: 'bg-red-100 text-red-600',
};

const statusLabels: Record<string, string> = {
  pending: 'Chờ xử lý',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'Tất cả' || statusLabels[order.status] === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mã đơn hoặc tên khách..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {statusFilters.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedStatus === status
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-muted border border-border hover:border-primary'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
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
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary-50">
                    <td className="py-4 px-6">
                      <span className="font-bold text-primary">{order.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-text-main">{order.customer}</p>
                        <p className="text-sm text-text-muted">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center text-text-main">{order.items}</td>
                    <td className="py-4 px-6 text-right font-bold text-text-main">{formatPrice(order.total)}</td>
                    <td className="py-4 px-6 text-center text-text-muted">{order.date}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100">
                          <Eye className="size-4" />
                        </button>
                        {order.status === 'pending' && (
                          <>
                            <button className="size-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100">
                              <Check className="size-4" />
                            </button>
                            <button className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100">
                              <X className="size-4" />
                            </button>
                          </>
                        )}
                        {order.status === 'processing' && (
                          <button className="size-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100">
                            <Truck className="size-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <p className="text-sm text-text-muted">Hiển thị 1-{filteredOrders.length} / {filteredOrders.length} đơn hàng</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-border rounded-lg text-sm disabled:opacity-50" disabled>Trước</button>
              <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm">1</button>
              <button className="px-3 py-1 border border-border rounded-lg text-sm disabled:opacity-50" disabled>Sau</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
