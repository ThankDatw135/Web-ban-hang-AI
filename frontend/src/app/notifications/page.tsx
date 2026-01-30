/**
 * Fashion AI Notification Hub - Fashion AI
 * 
 * Trung tâm thông báo:
 * - Order updates
 * - Promotions
 * - AI recommendations
 * - Settings
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  Package, 
  Tag, 
  Sparkles, 
  Heart,
  Check,
  Trash2,
  Settings,
  ChevronRight
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock notifications
const initialNotifications = [
  {
    id: '1',
    type: 'order',
    title: 'Đơn hàng đang được giao',
    message: 'Đơn hàng ORD-2024001 đang trên đường giao đến bạn. Dự kiến nhận hàng: 30/01/2024',
    time: '2 giờ trước',
    read: false,
    link: '/orders/ORD-2024001',
  },
  {
    id: '2',
    type: 'promo',
    title: 'Flash Sale 50% - Chỉ hôm nay!',
    message: 'Giảm đến 50% cho hàng trăm sản phẩm. Nhanh tay kẻo hết!',
    time: '5 giờ trước',
    read: false,
    link: '/shop?sale=true',
  },
  {
    id: '3',
    type: 'ai',
    title: 'AI Stylist có gợi ý mới cho bạn',
    message: 'Dựa trên phong cách của bạn, chúng tôi tìm thấy 5 items bạn có thể thích!',
    time: '1 ngày trước',
    read: true,
    link: '/shop',
  },
  {
    id: '4',
    type: 'wishlist',
    title: 'Sản phẩm yêu thích đang giảm giá',
    message: 'Silk Evening Gown trong wishlist của bạn đang giảm 10%!',
    time: '2 ngày trước',
    read: true,
    link: '/wishlist',
  },
  {
    id: '5',
    type: 'order',
    title: 'Đơn hàng đã được giao thành công',
    message: 'Đơn hàng ORD-2024002 đã được giao. Cảm ơn bạn đã mua sắm!',
    time: '3 ngày trước',
    read: true,
    link: '/orders/ORD-2024002',
  },
];

const typeConfig = {
  order: { icon: Package, color: 'text-blue-600 bg-blue-50' },
  promo: { icon: Tag, color: 'text-red-500 bg-red-50' },
  ai: { icon: Sparkles, color: 'text-accent bg-accent/10' },
  wishlist: { icon: Heart, color: 'text-pink-500 bg-pink-50' },
};

const filterTabs = [
  { value: 'all', label: 'Tất cả' },
  { value: 'order', label: 'Đơn hàng' },
  { value: 'promo', label: 'Ưu đãi' },
  { value: 'ai', label: 'AI Stylist' },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = selectedFilter === 'all'
    ? notifications
    : notifications.filter(n => n.type === selectedFilter);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bell className="size-6 text-primary" />
              <h1 className="text-3xl font-bold text-text-main">Thông Báo</h1>
              {unreadCount > 0 && (
                <span className="size-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <p className="text-text-muted">{notifications.length} thông báo</p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-white border border-border hover:bg-secondary-50 text-text-main font-medium rounded-lg flex items-center gap-2 transition-colors"
              >
                <Check className="size-4" />
                Đọc tất cả
              </button>
            )}
            <Link
              href="/settings/notifications"
              className="size-10 bg-white border border-border hover:bg-secondary-50 rounded-lg flex items-center justify-center transition-colors"
            >
              <Settings className="size-5 text-text-muted" />
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto mb-6 pb-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedFilter(tab.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedFilter === tab.value
                  ? 'bg-text-main text-white'
                  : 'bg-white text-text-muted border border-border hover:border-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification) => {
            const config = typeConfig[notification.type as keyof typeof typeConfig];
            const Icon = config?.icon || Bell;
            const colorClass = config?.color || 'text-gray-600 bg-gray-50';

            return (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl border p-5 transition-all hover:shadow-md ${
                  notification.read ? 'border-border' : 'border-primary/30 bg-primary/[0.02]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`size-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                    <Icon className="size-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className={`font-bold ${notification.read ? 'text-text-main' : 'text-text-main'}`}>
                        {notification.title}
                        {!notification.read && (
                          <span className="inline-block size-2 bg-red-500 rounded-full ml-2" />
                        )}
                      </h3>
                      <span className="text-xs text-text-muted whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className="text-sm text-text-muted mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <Link
                        href={notification.link}
                        onClick={() => markAsRead(notification.id)}
                        className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
                      >
                        Xem chi tiết <ChevronRight className="size-4" />
                      </Link>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-text-muted hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-16">
            <div className="size-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="size-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">Không có thông báo</h3>
            <p className="text-text-muted">Bạn đã cập nhật tất cả thông báo!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
