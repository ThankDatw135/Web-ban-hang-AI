/**
 * Fashion AI - Orders History Page
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, ChevronRight, Search, Filter } from 'lucide-react';
import { useOrders } from '@/hooks/use-order';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { Order, OrderItem } from '@/types/api';

const statusMap: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Chờ thanh toán', color: 'bg-yellow-100 text-yellow-700' },
  CONFIRMED: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-700' },
  SHIPPING: { label: 'Đang giao', color: 'bg-purple-100 text-purple-700' },
  COMPLETED: { label: 'Hoàn thành', color: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Đã hủy', color: 'bg-red-100 text-red-700' },
};

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useOrders(statusFilter ? { status: statusFilter } : undefined);
  // Fix: Access .data, not .items (PaginatedResponse)
  const orders = data?.data || [];

  return (
    <div className="space-y-6">
       <h1 className="text-2xl font-bold">Đơn hàng của tôi</h1>
       
       {/* Filters (Tabs) */}
       <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
           {['', 'PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED'].map((status) => (
               <button
                 key={status}
                 onClick={() => setStatusFilter(status)}
                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    statusFilter === status 
                        ? 'bg-primary text-white' 
                        : 'bg-white dark:bg-[#2c2822] border border-gray-200 dark:border-gray-700 hover:border-gray-300'
                 }`}
               >
                   {status ? statusMap[status]?.label : 'Tất cả'}
               </button>
           ))}
       </div>

       {isLoading ? (
           <div className="py-12 flex justify-center">
               <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
           </div>
       ) : orders.length > 0 ? (
           <div className="space-y-4">
               {orders.map((order: Order) => (
                   <Link 
                     key={order.id} 
                     href={`/dashboard/orders/${order.id}`}
                     className="block card p-0 hover:border-primary transition-colors overflow-hidden"
                   >
                       {/* Header */}
                       <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800">
                           <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-white dark:bg-[#2c2822] flex items-center justify-center border border-gray-100 dark:border-gray-700">
                                   <Package className="w-5 h-5 text-primary" />
                               </div>
                               <div>
                                   <p className="font-bold text-sm">#{order.orderNumber || order.id.slice(0, 8)}</p>
                                   <p className="text-xs text-secondary">{formatDate(order.createdAt)}</p>
                               </div>
                           </div>
                           <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusMap[order.status]?.color || 'bg-gray-100 text-gray-700'}`}>
                               {statusMap[order.status]?.label || order.status}
                           </span>
                       </div>

                       {/* Body */}
                       <div className="p-6">
                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                               <div className="space-y-1">
                                    {order.items.slice(0, 2).map((item: OrderItem, idx: number) => (
                                        <p key={idx} className="text-sm text-secondary line-clamp-1">
                                            {item.productName} <span className="text-xs">x{item.quantity}</span>
                                        </p>
                                    ))}
                                    {order.items.length > 2 && (
                                        <p className="text-xs text-secondary italic">+ {order.items.length - 2} sản phẩm khác</p>
                                    )}
                               </div>
                               <div className="flex items-end justify-between md:flex-col md:items-end md:gap-1">
                                    <span className="text-xs text-secondary">Tổng tiền</span>
                                    <span className="font-bold text-lg text-primary">{formatCurrency(order.total)}</span>
                               </div>
                           </div>
                       </div>
                   </Link>
               ))}
           </div>
       ) : (
           <div className="flex flex-col items-center justify-center py-16 text-center card bg-gray-50 dark:bg-gray-800/50 border-dashed">
               <Package className="w-12 h-12 text-gray-300 mb-4" />
               <h3 className="text-lg font-medium mb-1">Chưa có đơn hàng nào</h3>
               <p className="text-secondary mb-6">Bạn chưa mua sắm sản phẩm nào</p>
               <Link href="/products" className="btn-primary">
                   Mua sắm ngay
               </Link>
           </div>
       )}
    </div>
  );
}
