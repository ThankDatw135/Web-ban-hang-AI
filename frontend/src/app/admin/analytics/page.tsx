/**
 * Admin Analytics - Fashion AI
 */

'use client';

import Link from 'next/link';
import { ArrowLeft, TrendingUp, Users, Eye, ShoppingCart, Clock, Smartphone, Monitor, Globe } from 'lucide-react';

const trafficStats = [
  { label: 'Lượt truy cập', value: '45.2K', change: '+15%', icon: Eye },
  { label: 'Người dùng', value: '12.8K', change: '+8%', icon: Users },
  { label: 'Thời gian TB', value: '4:32', change: '+12%', icon: Clock },
  { label: 'Tỷ lệ chuyển đổi', value: '3.2%', change: '-0.2%', icon: ShoppingCart },
];

const deviceBreakdown = [
  { device: 'Mobile', percentage: 62, icon: Smartphone },
  { device: 'Desktop', percentage: 32, icon: Monitor },
  { device: 'Tablet', percentage: 6, icon: Monitor },
];

const topPages = [
  { page: '/shop', views: 15420, bounceRate: '35%' },
  { page: '/product/silk-dress', views: 8230, bounceRate: '28%' },
  { page: '/', views: 7150, bounceRate: '42%' },
  { page: '/cart', views: 4560, bounceRate: '22%' },
  { page: '/checkout', views: 2340, bounceRate: '15%' },
];

export default function AdminAnalytics() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
            <ArrowLeft className="size-5 text-text-muted" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">Analytics & Insights</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Traffic Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {trafficStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-border p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-text-muted">{stat.label}</p>
                <p className="text-2xl font-bold text-text-main">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Traffic Chart Placeholder */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-bold text-text-main mb-4">Lượt Truy Cập 7 Ngày</h3>
            <div className="aspect-[16/9] bg-secondary-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="size-12 text-text-muted mx-auto mb-2" />
                <p className="text-text-muted">Biểu đồ traffic</p>
              </div>
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-bold text-text-main mb-4">Thiết Bị Truy Cập</h3>
            <div className="space-y-4">
              {deviceBreakdown.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 text-text-muted" />
                        <span className="font-medium text-text-main">{item.device}</span>
                      </div>
                      <span className="text-text-muted">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 className="font-bold text-text-main mb-4 flex items-center gap-2">
            <Globe className="size-5 text-accent" />
            Trang Được Xem Nhiều
          </h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-sm font-medium text-text-muted">Trang</th>
                <th className="text-right py-3 text-sm font-medium text-text-muted">Lượt xem</th>
                <th className="text-right py-3 text-sm font-medium text-text-muted">Bounce Rate</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page, idx) => (
                <tr key={idx} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium text-primary">{page.page}</td>
                  <td className="py-3 text-right text-text-main">{page.views.toLocaleString()}</td>
                  <td className="py-3 text-right text-text-muted">{page.bounceRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
