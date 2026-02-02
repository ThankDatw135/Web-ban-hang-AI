/**
 * Fashion AI - Admin Orders
 */

'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package
} from 'lucide-react';
import { useAdminOrders, useUpdateOrderStatus } from '@/hooks/use-order';
import { formatCurrency, formatDate } from '@/lib/utils/format';

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  { value: 'PROCESSING', label: 'Đang xử lý', color: 'bg-blue-100 text-blue-700', icon: Package },
  { value: 'SHIPPED', label: 'Đang giao', color: 'bg-purple-100 text-purple-700', icon: Truck },
  { value: 'DELIVERED', label: 'Đã giao', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  { value: 'CANCELLED', label: 'Đã hủy', color: 'bg-red-100 text-red-700', icon: XCircle },
];

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  
  const { data: ordersData, isLoading } = useAdminOrders({ 
      limit: 50, 
      status: statusFilter || undefined 
  });
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateOrderStatus();

  const orders = ordersData?.data || [];
  
  // Client-side search (mock, ideally server-side)
  const filteredOrders = orders.filter(order => 
      order.id.includes(search) || 
      order.shippingAddress?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = (id: string, newStatus: string) => {
      if (confirm(`Bạn có chắc chắn muốn đổi trạng thái đơn hàng sang ${newStatus}?`)) {
          updateStatus({ id, status: newStatus });
      }
  };

  if (isLoading) {
      return (
          <div className="flex items-center justify-center h-96">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
      );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
           <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
           <p className="text-secondary">Theo dõi và cập nhật trạng thái đơn hàng</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#1e1a14] p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button 
                 onClick={() => setStatusFilter('')}
                 className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${!statusFilter ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200'}`}
              >
                  Tất cả
              </button>
              {STATUS_OPTIONS.map(status => (
                  <button 
                     key={status.value}
                     onClick={() => setStatusFilter(status.value)}
                     className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${statusFilter === status.value ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200'}`}
                  >
                      <status.icon className="w-3 h-3" />
                      {status.label}
                  </button>
              ))}
          </div>
          
          <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input 
                 type="text" 
                 placeholder="Tìm mã đơn, khách hàng..." 
                 className="input pl-10 w-full"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
              />
          </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1e1a14] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                          <th className="p-4 font-medium text-secondary text-sm">Mã đơn</th>
                          <th className="p-4 font-medium text-secondary text-sm">Khách hàng</th>
                          <th className="p-4 font-medium text-secondary text-sm">Ngày đặt</th>
                          <th className="p-4 font-medium text-secondary text-sm">Tổng tiền</th>
                          <th className="p-4 font-medium text-secondary text-sm">Trạng thái</th>
                          <th className="p-4 font-medium text-secondary text-sm text-right">Thao tác</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                              <td className="p-4 font-mono text-sm font-bold">
                                  #{order.id.slice(0, 8).toUpperCase()}
                              </td>
                              <td className="p-4">
                                  <div className="flex flex-col">
                                      <span className="font-medium text-sm">{order.shippingAddress?.fullName || 'Khách vãng lai'}</span>
                                      <span className="text-xs text-secondary">{order.shippingAddress?.phone}</span>
                                  </div>
                              </td>
                              <td className="p-4 text-sm text-secondary">
                                  {formatDate(order.createdAt)}
                              </td>
                              <td className="p-4 font-bold text-sm">
                                  {formatCurrency(order.total)}
                              </td>
                              <td className="p-4">
                                  <select 
                                     value={order.status}
                                     onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                     disabled={isUpdating}
                                     className={`select select-sm w-36 text-xs font-medium ${
                                         STATUS_OPTIONS.find(s => s.value === order.status)?.color || 'bg-gray-100'
                                     }`}
                                  >
                                      {STATUS_OPTIONS.map(s => (
                                          <option key={s.value} value={s.value} className="bg-white text-black">
                                              {s.label}
                                          </option>
                                      ))}
                                  </select>
                              </td>
                              <td className="p-4 text-right">
                                  <button onClick={() => alert('Xem chi tiết đơn hàng (Chưa implement)')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-secondary hover:text-primary transition-colors">
                                      <Eye className="w-4 h-4" />
                                  </button>
                              </td>
                          </tr>
                      )) : (
                          <tr>
                              <td colSpan={6} className="p-8 text-center text-secondary">
                                  Không tìm thấy đơn hàng nào.
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}
