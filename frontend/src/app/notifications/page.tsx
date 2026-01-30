/**
 * Fashion AI Notification Hub - Fashion AI
 * 
 * Trung tâm thông báo với API integration:
 * - Order updates
 * - Promotions
 * - AI recommendations
 * - Mark as read
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
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Header, Footer } from '@/components';
import { useNotifications, useMarkAsRead, useMarkAllAsRead, useDeleteNotification, type Notification } from '@/hooks/useNotifications';
import { toastSuccess, toastError } from '@/stores';

const typeConfig = {
  ORDER: { icon: Package, color: 'text-blue-600 bg-blue-50' },
  PROMO: { icon: Tag, color: 'text-red-500 bg-red-50' },
  AI: { icon: Sparkles, color: 'text-accent bg-accent/10' },
  WISHLIST: { icon: Heart, color: 'text-pink-500 bg-pink-50' },
  SYSTEM: { icon: AlertCircle, color: 'text-gray-600 bg-gray-50' },
};

const filterTabs = [
  { value: 'all', label: 'Tất cả' },
  { value: 'order', label: 'Đơn hàng' },
  { value: 'promo', label: 'Ưu đãi' },
  { value: 'ai', label: 'AI Stylist' },
];

export default function NotificationsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const { data, isLoading } = useNotifications(selectedFilter);
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();
  const deleteNotification = useDeleteNotification();

  const notifications = data?.items || [];
  const unreadCount = data?.unreadCount || 0;

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead.mutateAsync(id);
    } catch {
      // Silent fail - clicking will navigate anyway
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead.mutateAsync();
      toastSuccess('Thành công', 'Đã đánh dấu tất cả là đã đọc');
    } catch {
      toastError('Lỗi', 'Không thể đánh dấu đã đọc');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification.mutateAsync(id);
      toastSuccess('Đã xóa', 'Thông báo đã được xóa');
    } catch {
      toastError('Lỗi', 'Không thể xóa thông báo');
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

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
                onClick={handleMarkAllAsRead}
                disabled={markAllAsRead.isPending}
                className="px-4 py-2 bg-white border border-border hover:bg-secondary-50 text-text-main font-medium rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {markAllAsRead.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Check className="size-4" />
                )}
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
          {notifications.map((notification) => {
            const config = typeConfig[notification.type as keyof typeof typeConfig] || typeConfig.SYSTEM;
            const Icon = config.icon;
            const colorClass = config.color;

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
                      <h3 className="font-bold text-text-main">
                        {notification.title}
                        {!notification.read && (
                          <span className="inline-block size-2 bg-red-500 rounded-full ml-2" />
                        )}
                      </h3>
                      <span className="text-xs text-text-muted whitespace-nowrap">{formatTime(notification.createdAt)}</span>
                    </div>
                    <p className="text-sm text-text-muted mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      {notification.link ? (
                        <Link
                          href={notification.link}
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
                        >
                          Xem chi tiết <ChevronRight className="size-4" />
                        </Link>
                      ) : (
                        <span />
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        disabled={deleteNotification.isPending}
                        className="text-text-muted hover:text-red-500 transition-colors disabled:opacity-50"
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

        {notifications.length === 0 && (
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
