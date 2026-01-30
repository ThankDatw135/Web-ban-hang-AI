/**
 * Admin Overview - Fashion AI
 * 
 * Tổng quan chi tiết:
 * - Charts & analytics
 * - Sales breakdown
 * - Top products
 */

'use client';

import Link from 'next/link';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Package,
  Users,
  ShoppingCart,
  ArrowLeft,
  Calendar
} from 'lucide-react';

// Top products
const topProducts = [
  { name: 'Silk Evening Dress', sales: 156, revenue: '936.000.000₫' },
  { name: 'Cashmere Sweater', sales: 132, revenue: '660.000.000₫' },
  { name: 'Leather Handbag', sales: 98, revenue: '490.000.000₫' },
  { name: 'Velvet Blazer', sales: 87, revenue: '348.000.000₫' },
  { name: 'Wool Coat', sales: 76, revenue: '456.000.000₫' },
];

// Sales by category
const salesByCategory = [
  { category: 'Áo', percentage: 35, value: '1.2B' },
  { category: 'Váy/Đầm', percentage: 28, value: '950M' },
  { category: 'Quần', percentage: 18, value: '610M' },
  { category: 'Phụ kiện', percentage: 12, value: '410M' },
  { category: 'Khác', percentage: 7, value: '240M' },
];

export default function AdminOverview() {
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
            <button className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium flex items-center gap-2">
              <Calendar className="size-4" />
              Tháng 1, 2024
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-green-50 flex items-center justify-center">
                <TrendingUp className="size-6 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">+18%</span>
            </div>
            <p className="text-sm text-text-muted mb-1">Tổng doanh thu</p>
            <p className="text-2xl font-bold text-text-main">3.4 tỷ</p>
          </div>

          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <ShoppingCart className="size-6 text-blue-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">+12%</span>
            </div>
            <p className="text-sm text-text-muted mb-1">Tổng đơn hàng</p>
            <p className="text-2xl font-bold text-text-main">1,247</p>
          </div>

          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-purple-50 flex items-center justify-center">
                <Users className="size-6 text-purple-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">+8%</span>
            </div>
            <p className="text-sm text-text-muted mb-1">Khách hàng mới</p>
            <p className="text-2xl font-bold text-text-main">456</p>
          </div>

          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <Package className="size-6 text-amber-600" />
              </div>
              <span className="text-red-500 text-sm font-medium">-2%</span>
            </div>
            <p className="text-sm text-text-muted mb-1">Giá trị TB đơn</p>
            <p className="text-2xl font-bold text-text-main">2.73M</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart Placeholder */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-bold text-text-main mb-4">Doanh Thu Theo Ngày</h3>
            <div className="aspect-[16/9] bg-secondary-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="size-12 text-text-muted mx-auto mb-2" />
                <p className="text-text-muted">Biểu đồ doanh thu</p>
              </div>
            </div>
          </div>

          {/* Sales by Category */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-bold text-text-main mb-4">Doanh Thu Theo Danh Mục</h3>
            <div className="space-y-4">
              {salesByCategory.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-text-main">{item.category}</span>
                    <span className="text-text-muted">{item.value}</span>
                  </div>
                  <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
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
                {topProducts.map((product, idx) => (
                  <tr key={idx} className="border-b border-border last:border-0">
                    <td className="py-4 px-4 text-text-muted">{idx + 1}</td>
                    <td className="py-4 px-4 font-medium text-text-main">{product.name}</td>
                    <td className="py-4 px-4 text-right text-text-main">{product.sales}</td>
                    <td className="py-4 px-4 text-right font-bold text-primary">{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
