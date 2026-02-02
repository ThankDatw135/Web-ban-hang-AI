/**
 * Fashion AI - Dashboard Order Detail
 */

'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Package, Truck, Clock, AlertCircle, ChevronLeft, MapPin } from 'lucide-react';
import { useOrder } from '@/hooks/use-order';
import { formatCurrency, formatDate } from '@/lib/utils/format';

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: order, isLoading, isError } = useOrder(id);

  if (isLoading) {
    return (
        <div className="py-12 flex justify-center">
             <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  if (isError || !order) {
      return (
          <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
              <AlertCircle className="w-12 h-12 text-error" />
              <h1 className="text-2xl font-bold">Không tìm thấy đơn hàng</h1>
              <Link href="/dashboard/orders" className="btn-primary">Quay lại danh sách</Link>
          </div>
      );
  }

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
           <Link href="/dashboard/orders" className="btn-ghost p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
               <ChevronLeft className="w-6 h-6" />
           </Link>
           <div>
               <h1 className="text-2xl font-bold flex items-center gap-3">
                   Đơn hàng #{order.orderNumber || order.id.slice(0, 8)}
                   <span className={`px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary`}>
                       {order.status}
                   </span>
               </h1>
               <p className="text-secondary text-sm">{formatDate(order.createdAt)}</p>
           </div>
       </div>

       <div className="grid lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 space-y-6">
               {/* Items */}
               <div className="card p-0 overflow-hidden">
                   <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-100 dark:border-gray-800 font-bold">
                       Sản phẩm
                   </div>
                   <div className="divide-y divide-gray-100 dark:divide-gray-800">
                       {order.items.map(item => (
                           <div key={item.id} className="p-4 flex gap-4">
                               <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                   {/* Img placeholder */}
                               </div>
                               <div className="flex-1">
                                   <div className="flex justify-between items-start">
                                       <div>
                                           <p className="font-medium">{item.productName}</p>
                                           <p className="text-sm text-secondary">{item.color} / {item.size}</p>
                                       </div>
                                       <span className="font-bold">{formatCurrency(item.totalPrice)}</span>
                                   </div>
                                   <div className="text-sm text-secondary mt-1">x{item.quantity}</div>
                               </div>
                           </div>
                       ))}
                   </div>
                   <div className="p-4 bg-gray-50 dark:bg-gray-800/20 border-t border-gray-100 dark:border-gray-800 space-y-2 text-sm">
                       <div className="flex justify-between">
                           <span className="text-secondary">Tạm tính</span>
                           <span>{formatCurrency(order.subtotal)}</span>
                       </div>
                       <div className="flex justify-between">
                           <span className="text-secondary">Phí vận chuyển</span>
                           <span>{formatCurrency(order.shippingFee)}</span>
                       </div>
                       <div className="flex justify-between font-bold text-lg pt-2 border-t border-dashed border-gray-200 dark:border-gray-700 mt-2">
                           <span>Tổng cộng</span>
                           <span className="text-primary">{formatCurrency(order.total)}</span>
                       </div>
                   </div>
               </div>
           </div>

           <div className="space-y-6">
               {/* Address */}
               <div className="card p-5">
                   <h3 className="font-bold mb-4 flex items-center gap-2">
                       <MapPin className="w-5 h-5 text-primary" />
                       Địa chỉ nhận hàng
                   </h3>
                   <p className="font-bold">{order.shippingAddress.fullName}</p>
                   <p className="text-secondary text-sm mb-1">{order.shippingAddress.phone}</p>
                   <p className="text-sm text-secondary">
                       {order.shippingAddress.street}, {order.shippingAddress.district}, {order.shippingAddress.city}
                   </p>
               </div>

               {/* Payment */}
               <div className="card p-5">
                   <h3 className="font-bold mb-4 flex items-center gap-2">
                       <Clock className="w-5 h-5 text-primary" />
                       Thanh toán
                   </h3>
                   <div className="space-y-3">
                       <div>
                           <span className="text-xs text-secondary block">Phương thức</span>
                           <span className="font-medium">{order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}</span>
                       </div>
                       <div>
                           <span className="text-xs text-secondary block">Trạng thái</span>
                           <span className={`font-medium ${order.paymentStatus === 'COMPLETED' ? 'text-success' : 'text-warning'}`}>
                               {order.paymentStatus === 'PENDING' ? 'Chưa thanh toán' : 'Đã thanh toán'}
                           </span>
                       </div>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
}
