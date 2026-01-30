/**
 * Admin Notifications - Fashion AI
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, Send, Plus, Users, Calendar, Trash2 } from 'lucide-react';

const notifications = [
  { id: '1', title: 'Flash Sale Tết', message: 'Giảm đến 50% toàn bộ sản phẩm', target: 'all', sent: '30/01/2024', reach: 12500, status: 'sent' },
  { id: '2', title: 'Sản phẩm mới', message: 'BST Xuân Hè 2024 đã có mặt', target: 'vip', sent: '28/01/2024', reach: 450, status: 'sent' },
  { id: '3', title: 'Voucher sinh nhật', message: 'Nhận ngay voucher 500K', target: 'birthday', sent: 'Scheduled', reach: 0, status: 'scheduled' },
];

const statusColors: Record<string, string> = {
  sent: 'bg-green-100 text-green-600',
  scheduled: 'bg-blue-100 text-blue-600',
  draft: 'bg-gray-100 text-gray-600',
};

export default function AdminNotifications() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <h1 className="text-xl font-bold text-text-main">Quản Lý Thông Báo</h1>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90">
            <Plus className="size-5" />
            Tạo thông báo
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Đã gửi tháng này</p>
            <p className="text-2xl font-bold text-text-main">24</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Tổng người nhận</p>
            <p className="text-2xl font-bold text-green-600">35.2K</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Đã lên lịch</p>
            <p className="text-2xl font-bold text-blue-600">3</p>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="space-y-4 p-6">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Bell className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-text-main">{notif.title}</p>
                    <p className="text-sm text-text-muted">{notif.message}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Users className="size-3" />
                        {notif.target === 'all' ? 'Tất cả' : notif.target === 'vip' ? 'VIP' : 'Birthday'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {notif.sent}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {notif.status === 'sent' && (
                    <span className="text-sm text-text-muted">{notif.reach.toLocaleString()} người nhận</span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[notif.status]}`}>
                    {notif.status === 'sent' ? 'Đã gửi' : notif.status === 'scheduled' ? 'Đã lên lịch' : 'Nháp'}
                  </span>
                  <button className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
