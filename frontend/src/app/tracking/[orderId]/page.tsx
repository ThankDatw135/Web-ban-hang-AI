/**
 * Fashion AI - Order Tracking Page
 * 
 * Theo dõi vận chuyển đơn hàng với map và timeline
 */

'use client';

import { use } from 'react';
import Link from 'next/link';
import { cn, formatCurrency } from '@/lib/utils';
import { useOrder } from '@/hooks/use-orders';
import { 
  Truck, Package, Warehouse, CheckCircle, Home, MapPin, 
  Copy, Bot, Phone, ChevronRight, Loader2 
} from 'lucide-react';

interface TrackingPageProps {
  params: Promise<{ orderId: string }>;
}

// Timeline step data
const getTimelineSteps = (status: string) => {
  const steps = [
    { 
      id: 'confirmed', 
      icon: CheckCircle, 
      title: 'Đơn hàng đã xác nhận', 
      desc: 'Hệ thống đã ghi nhận đơn đặt hàng của bạn.',
      completed: true
    },
    { 
      id: 'picked', 
      icon: Package, 
      title: 'Đã lấy hàng', 
      desc: 'Đơn vị vận chuyển đã nhận kiện hàng từ Fashion AI.',
      completed: ['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(status)
    },
    { 
      id: 'warehouse', 
      icon: Warehouse, 
      title: 'Đã đến kho phân loại', 
      desc: 'Kiện hàng đã được phân tuyến giao nhận.',
      completed: ['SHIPPED', 'DELIVERED'].includes(status)
    },
    { 
      id: 'shipping', 
      icon: Truck, 
      title: 'Đang giao hàng', 
      desc: 'Shipper đang trên đường giao đến bạn.',
      active: status === 'SHIPPED',
      completed: ['SHIPPED', 'DELIVERED'].includes(status)
    },
    { 
      id: 'delivered', 
      icon: Home, 
      title: 'Giao hàng thành công', 
      desc: 'Đơn hàng đã được giao thành công.',
      completed: status === 'DELIVERED',
      future: status !== 'DELIVERED'
    },
  ];
  return steps;
};

const statusLabels: Record<string, { label: string; class: string }> = {
  PENDING: { label: 'Chờ xử lý', class: 'bg-gray-100 text-gray-700' },
  CONFIRMED: { label: 'Đã xác nhận', class: 'bg-blue-100 text-blue-700' },
  PROCESSING: { label: 'Đang chuẩn bị', class: 'bg-yellow-100 text-yellow-700' },
  SHIPPED: { label: 'Đang vận chuyển', class: 'bg-green-100 text-green-700' },
  DELIVERED: { label: 'Đã giao', class: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Đã hủy', class: 'bg-red-100 text-red-700' },
};

export default function TrackingPage({ params }: TrackingPageProps) {
  const { orderId } = use(params);
  const { data: order, isLoading, error } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream dark:bg-background-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-cream dark:bg-background-dark flex flex-col items-center justify-center gap-4">
        <Package className="w-16 h-16 text-secondary" />
        <h1 className="text-2xl font-bold text-text-main dark:text-white">Không tìm thấy đơn hàng</h1>
        <p className="text-secondary">Mã đơn hàng không tồn tại hoặc đã bị xóa.</p>
        <Link href="/dashboard/orders">
          <button className="mt-4 px-6 py-3 bg-primary text-text-main font-bold rounded-lg hover:bg-primary-600 transition-colors">
            Xem đơn hàng của tôi
          </button>
        </Link>
      </div>
    );
  }

  const timelineSteps = getTimelineSteps(order.status);
  const statusInfo = statusLabels[order.status] || statusLabels.PENDING;

  return (
    <div className="min-h-screen bg-cream dark:bg-background-dark">
      <main className="max-w-[1280px] mx-auto px-5 md:px-10 py-8">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/dashboard" className="hover:text-primary transition-colors">Tài khoản</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-main dark:text-white font-medium">Đơn hàng #{order.orderNumber}</span>
        </nav>

        {/* Page Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-text-main dark:text-white tracking-tight mb-2">
              Theo dõi đơn hàng <span className="text-primary">#{order.orderNumber}</span>
            </h1>
            <div className="flex items-center gap-2">
              <span className={cn('px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1', statusInfo.class)}>
                {order.status === 'SHIPPED' && <span className="size-2 rounded-full bg-green-500 animate-pulse" />}
                {statusInfo.label}
              </span>
              <span className="text-secondary text-sm">Cập nhật gần đây</span>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-secondary text-sm">Dự kiến giao hàng</p>
            <p className="text-xl font-bold text-text-main dark:text-white">
              {order.deliveredAt 
                ? new Date(order.deliveredAt).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' })
                : 'Đang cập nhật'
              }
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Tracking Journey */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Map Visualization */}
            <div className="w-full bg-white dark:bg-[#1a1a1a] p-2 rounded-2xl shadow-sm border border-border dark:border-[#333]">
              <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-secondary">Đang cập nhật vị trí...</p>
                  </div>
                </div>
                {/* Location Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur shadow-lg px-4 py-2 rounded-lg flex items-center gap-3">
                  <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-secondary font-medium uppercase tracking-wider">Vị trí hiện tại</p>
                    <p className="text-sm font-bold text-text-main dark:text-white">
                      {order.shippingAddress?.district}, {order.shippingAddress?.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 md:p-8 shadow-sm border border-border dark:border-[#333]">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-text-main dark:text-white">
                <span className="material-symbols-outlined text-primary">timeline</span>
                Lộ trình vận chuyển
              </h3>
              
              <div className="flex flex-col relative pb-4">
                {timelineSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isLast = index === timelineSteps.length - 1;
                  
                  return (
                    <div key={step.id} className="relative pl-14 py-4">
                      {/* Connector Line */}
                      {!isLast && (
                        <div className={cn(
                          'absolute left-5 top-14 bottom-0 w-0.5',
                          step.completed ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                        )} />
                      )}
                      
                      {/* Icon */}
                      <div className={cn(
                        'absolute left-0 top-4 size-10 rounded-full flex items-center justify-center z-10',
                        step.active 
                          ? 'bg-primary text-white shadow-lg shadow-primary/30'
                          : step.completed 
                            ? 'bg-primary/20 text-primary border-2 border-primary'
                            : 'border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1a1a] text-gray-300 dark:text-gray-600'
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                        <div>
                          <h4 className={cn(
                            'font-bold',
                            step.future && !step.completed ? 'text-gray-400' : 'text-text-main dark:text-white',
                            step.active && 'text-lg'
                          )}>
                            {step.title}
                          </h4>
                          <p className={cn(
                            'text-sm',
                            step.future && !step.completed ? 'text-gray-400' : 'text-secondary'
                          )}>
                            {step.desc}
                          </p>
                        </div>
                        {step.completed && !step.future && (
                          <span className="text-xs text-secondary whitespace-nowrap">
                            {new Date(order.updatedAt).toLocaleDateString('vi-VN')}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Summary & Support */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Order Summary Card */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-border dark:border-[#333] overflow-hidden">
              <div className="p-5 border-b border-border dark:border-[#333] flex justify-between items-center bg-cream dark:bg-[#252525]">
                <h3 className="font-bold text-text-main dark:text-white">
                  Kiện hàng ({order.items?.length || 0} sản phẩm)
                </h3>
                <Link href={`/dashboard/orders/${order.id}`} className="text-xs font-bold text-primary hover:underline">
                  Xem chi tiết
                </Link>
              </div>
              
              <div className="p-5 flex flex-col gap-4">
                {order.items?.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border border-border dark:border-[#333] bg-cream dark:bg-[#333]">
                      {item.productImage && (
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${item.productImage})` }}
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <p className="font-bold text-sm text-text-main dark:text-white leading-snug line-clamp-2">
                          {item.productName}
                        </p>
                        <p className="text-xs text-secondary mt-1">
                          {item.color && `Màu: ${item.color}`} {item.size && `/ Size: ${item.size}`}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-text-main dark:text-white">
                        {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Info */}
              <div className="bg-cream dark:bg-[#252525] p-4 text-sm border-t border-border dark:border-[#333]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-secondary">Đơn vị vận chuyển:</span>
                  <span className="font-semibold text-text-main dark:text-white flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    Giao hàng nhanh
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Mã vận đơn:</span>
                  <button className="font-mono text-primary font-bold hover:bg-primary/10 px-2 py-0.5 rounded transition-colors flex items-center gap-1 group">
                    {order.orderNumber}
                    <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Support CTA */}
            <div className="bg-gradient-to-br from-white to-accent/5 dark:from-[#1a1a1a] dark:to-accent/10 rounded-2xl p-6 shadow-sm border border-accent/20 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-accent/10">
                <Bot className="w-28 h-28" />
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">Cần hỗ trợ?</h3>
                <p className="text-sm text-secondary mb-5 leading-relaxed">
                  Trợ lý AI của chúng tôi có thể giúp bạn thay đổi thời gian giao hàng hoặc giải quyết sự cố ngay lập tức.
                </p>
                <Link href="/chat">
                  <button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-accent/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                    <Bot className="w-5 h-5" />
                    Liên hệ hỗ trợ AI
                  </button>
                </Link>
              </div>
            </div>

            {/* Recipient Info */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-4 border border-border dark:border-[#333]">
              <h4 className="text-sm font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">info</span>
                Thông tin nhận hàng
              </h4>
              <div className="text-sm text-secondary space-y-2 pl-7">
                <p><span className="text-text-main dark:text-white font-semibold">Người nhận:</span> {order.shippingAddress?.fullName}</p>
                <p><span className="text-text-main dark:text-white font-semibold">Điện thoại:</span> {order.shippingAddress?.phone}</p>
                <p>
                  <span className="text-text-main dark:text-white font-semibold">Địa chỉ:</span>{' '}
                  {order.shippingAddress?.street}, {order.shippingAddress?.ward}, {order.shippingAddress?.district}, {order.shippingAddress?.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
