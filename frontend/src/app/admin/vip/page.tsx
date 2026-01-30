/**
 * Admin VIP Management - Fashion AI
 */

'use client';

import Link from 'next/link';
import { ArrowLeft, Crown, Users, Gift, TrendingUp, ChevronRight } from 'lucide-react';

const vipStats = [
  { label: 'Platinum Members', value: 45, change: '+12%', color: 'text-purple-600' },
  { label: 'Gold Members', value: 156, change: '+8%', color: 'text-amber-600' },
  { label: 'VIP Doanh thu tháng', value: '850M', change: '+15%', color: 'text-green-600' },
  { label: 'Điểm đã đổi', value: '125K', change: '+20%', color: 'text-blue-600' },
];

const recentVIPActivity = [
  { member: 'Ngọc Anh', action: 'Đổi Voucher 500K', time: '2 giờ trước', tier: 'Platinum' },
  { member: 'Lan Anh', action: 'Nâng hạng Gold', time: '5 giờ trước', tier: 'Gold' },
  { member: 'Minh Tuấn', action: 'Đổi Free Shipping', time: '1 ngày trước', tier: 'Gold' },
  { member: 'Thanh Hằng', action: 'Tích 450 điểm', time: '1 ngày trước', tier: 'Silver' },
];

const tierColors: Record<string, string> = {
  Platinum: 'bg-purple-100 text-purple-600',
  Gold: 'bg-amber-100 text-amber-600',
  Silver: 'bg-gray-100 text-gray-600',
};

export default function AdminVIP() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
            <ArrowLeft className="size-5 text-text-muted" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">Quản Lý VIP</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {vipStats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-border p-5">
              <p className="text-sm text-text-muted mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-bold text-text-main mb-4">Quản Lý Nhanh</h3>
            <div className="space-y-3">
              <Link href="/admin/vip/tiers" className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Crown className="size-5 text-purple-600" />
                  <span className="font-medium text-text-main">Cấu hình hạng thành viên</span>
                </div>
                <ChevronRight className="size-5 text-text-muted" />
              </Link>
              <Link href="/admin/vip/rewards" className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Gift className="size-5 text-pink-600" />
                  <span className="font-medium text-text-main">Quản lý phần thưởng</span>
                </div>
                <ChevronRight className="size-5 text-text-muted" />
              </Link>
              <Link href="/admin/vip/points" className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors">
                <div className="flex items-center gap-3">
                  <TrendingUp className="size-5 text-green-600" />
                  <span className="font-medium text-text-main">Cấu hình quy đổi điểm</span>
                </div>
                <ChevronRight className="size-5 text-text-muted" />
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-bold text-text-main mb-4">Hoạt Động Gần Đây</h3>
            <div className="space-y-3">
              {recentVIPActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-secondary-50 rounded-xl">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-text-main">{activity.member}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tierColors[activity.tier]}`}>
                        {activity.tier}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted">{activity.action}</p>
                  </div>
                  <span className="text-xs text-text-muted">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
