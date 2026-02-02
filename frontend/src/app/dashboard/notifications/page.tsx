/**
 * Fashion AI - Thông Báo
 * 
 * Danh sách thông báo của user
 */

'use client';

import { Bell, Package, Sparkles, Gift, Tag, CheckCheck, Trash2 } from 'lucide-react';

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: 'order',
    icon: Package,
    title: 'Đơn hàng đã giao thành công',
    message: 'Đơn hàng FA-2026020201 đã được giao đến bạn. Cảm ơn bạn đã mua sắm tại Fashion AI!',
    time: '2 giờ trước',
    isRead: false,
  },
  {
    id: 2,
    type: 'promo',
    icon: Tag,
    title: 'Giảm giá 20% toàn bộ sản phẩm',
    message: 'Chương trình Sale Tết đang diễn ra! Sử dụng mã TET2026 để được giảm 20%.',
    time: '1 ngày trước',
    isRead: false,
  },
  {
    id: 3,
    type: 'ai',
    icon: Sparkles,
    title: 'AI đã hoàn tất xử lý ảnh',
    message: 'Ảnh thử đồ của bạn đã sẵn sàng. Xem kết quả ngay!',
    time: '2 ngày trước',
    isRead: true,
  },
  {
    id: 4,
    type: 'order',
    icon: Package,
    title: 'Đơn hàng đang được giao',
    message: 'Đơn hàng FA-2026012501 đang trên đường giao đến bạn.',
    time: '3 ngày trước',
    isRead: true,
  },
  {
    id: 5,
    type: 'promo',
    icon: Gift,
    title: 'Chúc mừng sinh nhật!',
    message: 'Fashion AI gửi tặng bạn voucher giảm 15% cho tất cả đơn hàng trong tháng này.',
    time: '1 tuần trước',
    isRead: true,
  },
];

// Icon colors
const iconColors: Record<string, string> = {
  order: 'text-blue-500 bg-blue-500/10',
  promo: 'text-accent bg-accent/10',
  ai: 'text-purple-500 bg-purple-500/10',
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Thông báo</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-secondary">{unreadCount} thông báo chưa đọc</p>
          )}
        </div>
        {notifications.length > 0 && (
          <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            <CheckCheck className="w-4 h-4" />
            Đánh dấu đã đọc tất cả
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            const colorClass = iconColors[notification.type] || 'text-gray-500 bg-gray-500/10';
            
            return (
              <div 
                key={notification.id} 
                className={`card p-4 flex gap-4 cursor-pointer hover:shadow-md transition-shadow ${
                  !notification.isRead ? 'bg-primary/5 border-primary/20' : ''
                }`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-medium ${!notification.isRead ? 'font-bold' : ''}`}>
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-sm text-secondary line-clamp-2 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-secondary mt-2">{notification.time}</p>
                </div>

                {/* Delete button */}
                <button className="text-secondary hover:text-red-500 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        // Empty state
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#2c2822] flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="font-bold mb-2">Không có thông báo</h3>
          <p className="text-secondary text-sm">Bạn chưa có thông báo nào</p>
        </div>
      )}
    </div>
  );
}
