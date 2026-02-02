/**
 * Fashion AI - Admin Quản Lý Đơn Hàng
 * 
 * Danh sách đơn hàng với filter và actions
 */

'use client';

import { Search, Eye, Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';

// Mock orders data
const orders = [
  { id: 'FA-001', customer: 'Nguyễn Văn A', email: 'a@email.com', total: 2450000, items: 3, status: 'processing', date: '02/02/2026' },
  { id: 'FA-002', customer: 'Trần Thị B', email: 'b@email.com', total: 850000, items: 1, status: 'shipping', date: '01/02/2026' },
  { id: 'FA-003', customer: 'Lê Văn C', email: 'c@email.com', total: 1650000, items: 2, status: 'delivered', date: '31/01/2026' },
  { id: 'FA-004', customer: 'Phạm Thị D', email: 'd@email.com', total: 750000, items: 1, status: 'cancelled', date: '30/01/2026' },
  { id: 'FA-005', customer: 'Hoàng Văn E', email: 'e@email.com', total: 950000, items: 2, status: 'delivered', date: '29/01/2026' },
];

// Status config
const statusConfig: Record<string, { label: string; color: string; icon: typeof Package }> = {
  processing: { label: 'Đang xử lý', color: 'bg-yellow-500/10 text-yellow-500', icon: Clock },
  shipping: { label: 'Đang giao', color: 'bg-blue-500/10 text-blue-500', icon: Truck },
  delivered: { label: 'Đã giao', color: 'bg-green-500/10 text-green-500', icon: CheckCircle },
  cancelled: { label: 'Đã hủy', color: 'bg-red-500/10 text-red-500', icon: XCircle },
};

// Format giá tiền
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <div key={key} className="card p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-bold">{orders.filter(o => o.status === key).length}</p>
                  <p className="text-xs text-secondary">{config.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary transition-all"
          />
        </div>
        <select className="h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary appearance-none cursor-pointer">
          <option value="">Tất cả trạng thái</option>
          <option value="processing">Đang xử lý</option>
          <option value="shipping">Đang giao</option>
          <option value="delivered">Đã giao</option>
          <option value="cancelled">Đã hủy</option>
        </select>
        <input
          type="date"
          className="h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-secondary bg-gray-50 dark:bg-[#2c2822]">
                <th className="p-4 font-medium">Mã đơn</th>
                <th className="p-4 font-medium">Khách hàng</th>
                <th className="p-4 font-medium">Sản phẩm</th>
                <th className="p-4 font-medium">Tổng tiền</th>
                <th className="p-4 font-medium">Trạng thái</th>
                <th className="p-4 font-medium">Ngày đặt</th>
                <th className="p-4 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={order.id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium">{order.id}</td>
                    <td className="p-4">
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-secondary">{order.email}</p>
                    </td>
                    <td className="p-4 text-sm">{order.items} sản phẩm</td>
                    <td className="p-4 font-medium text-primary">{formatPrice(order.total)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-secondary">{order.date}</td>
                    <td className="p-4">
                      <Link href={`/admin/orders/${order.id}`} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex">
                        <Eye className="w-4 h-4 text-secondary" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
