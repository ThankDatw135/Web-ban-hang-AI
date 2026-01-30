/**
 * Admin Overview - Fashion AI
 * 
 * Tổng quan chi tiết với API integration:
 * - Charts & analytics
 * - Sales breakdown
 * - Top products
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Package,
  Users,
  ShoppingCart,
  ArrowLeft,
  Calendar,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { useAdminAnalytics } from '@/hooks/useAdmin';

export default function AdminOverview() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const { data, isLoading, refetch } = useAdminAnalytics(period);

  const formatPrice = (value: number) => {
    if (value >= 1000000000) return (value / 1000000000).toFixed(1) + ' tỷ';
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    return new Intl.NumberFormat('vi-VN').format(value) + '₫';
  };

  // Mock data for summary (would be from useAdminDashboard in real app)
  const summaryStats = [
    { label: 'Tổng doanh thu', value: '3.4 tỷ', change: '+18%', positive: true, icon: TrendingUp, color: 'bg-green-50 text-green-600' },
    { label: 'Tổng đơn hàng', value: '1,247', change: '+12%', positive: true, icon: ShoppingCart, color: 'bg-blue-50 text-blue-600' },
    { label: 'Khách hàng mới', value: '456', change: '+8%', positive: true, icon: Users, color: 'bg-purple-50 text-purple-600' },
    { label: 'Giá trị TB đơn', value: '2.73M', change: '-2%', positive: false, icon: Package, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <h1 className="text-xl font-bold text-text-main">Tổng Quan Doanh Thu</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(['week', 'month', 'year'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-2 text-sm font-medium ${
                    period === p ? 'bg-primary text-white' : 'bg-white text-text-muted hover:bg-secondary-50'
                  }`}
                >
                  {p === 'week' ? 'Tuần' : p === 'month' ? 'Tháng' : 'Năm'}
                </button>
              ))}
            </div>
            <button 
              onClick={() => refetch()}
              className="size-10 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-secondary-100"
            >
              <RefreshCw className="size-5 text-text-muted" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`size-12 rounded-xl flex items-center justify-center ${stat.color.split(' ')[0]}`}>
                    <Icon className={`size-6 ${stat.color.split(' ')[1]}`} />
                  </div>
                  <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-text-muted mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-text-main">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Chart */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="font-bold text-text-main mb-4">Doanh Thu Theo Ngày</h3>
                <div className="space-y-3">
                  {(data?.revenue || []).slice(0, 7).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-sm text-text-muted w-20">{item.date}</span>
                      <div className="flex-1 h-6 bg-secondary-100 rounded-lg overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-lg"
                          style={{ width: `${Math.min(100, (item.value / 100000000) * 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-text-main w-20 text-right">
                        {formatPrice(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
                {(!data?.revenue || data.revenue.length === 0) && (
                  <div className="aspect-[16/9] bg-secondary-50 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="size-12 text-text-muted mx-auto mb-2" />
                      <p className="text-text-muted">Chưa có dữ liệu</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sales by Category */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="font-bold text-text-main mb-4">Doanh Thu Theo Danh Mục</h3>
                <div className="space-y-4">
                  {(data?.topCategories || []).map((item, idx) => {
                    const maxSales = Math.max(...(data?.topCategories?.map(c => c.sales) || [1]));
                    const percentage = (item.sales / maxSales) * 100;
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-text-main">{item.name}</span>
                          <span className="text-text-muted">{item.sales} đơn</span>
                        </div>
                        <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                {(!data?.topCategories || data.topCategories.length === 0) && (
                  <p className="text-text-muted text-center py-8">Chưa có dữ liệu</p>
                )}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <h3 className="font-bold text-text-main mb-4">Sản Phẩm Bán Chạy</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">#</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Sản phẩm</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Số lượng</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Doanh thu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data?.topProducts || []).map((product, idx) => (
                      <tr key={idx} className="border-b border-border last:border-0">
                        <td className="py-4 px-4 text-text-muted">{idx + 1}</td>
                        <td className="py-4 px-4 font-medium text-text-main">{product.name}</td>
                        <td className="py-4 px-4 text-right text-text-main">{product.sales}</td>
                        <td className="py-4 px-4 text-right font-bold text-primary">{formatPrice(product.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {(!data?.topProducts || data.topProducts.length === 0) && (
                <p className="text-text-muted text-center py-8">Chưa có dữ liệu</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
