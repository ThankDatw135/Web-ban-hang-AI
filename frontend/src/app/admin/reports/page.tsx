/**
 * Admin Reports - Fashion AI
 */

'use client';

import Link from 'next/link';
import { ArrowLeft, BarChart3, Download, Calendar, TrendingUp, ShoppingCart, Users, DollarSign } from 'lucide-react';

const reportTypes = [
  { id: 'sales', name: 'Báo cáo doanh thu', icon: DollarSign, description: 'Doanh thu theo ngày, tuần, tháng', color: 'bg-green-50 text-green-600' },
  { id: 'orders', name: 'Báo cáo đơn hàng', icon: ShoppingCart, description: 'Thống kê đơn hàng và trạng thái', color: 'bg-blue-50 text-blue-600' },
  { id: 'customers', name: 'Báo cáo khách hàng', icon: Users, description: 'Phân tích khách hàng mới/cũ', color: 'bg-purple-50 text-purple-600' },
  { id: 'products', name: 'Báo cáo sản phẩm', icon: BarChart3, description: 'Sản phẩm bán chạy, tồn kho', color: 'bg-amber-50 text-amber-600' },
];

const recentReports = [
  { id: '1', name: 'Doanh thu T01/2024', type: 'sales', date: '01/02/2024', size: '2.3 MB' },
  { id: '2', name: 'Đơn hàng T01/2024', type: 'orders', date: '01/02/2024', size: '1.8 MB' },
  { id: '3', name: 'Khách hàng Q4/2023', type: 'customers', date: '05/01/2024', size: '3.1 MB' },
];

export default function AdminReports() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
            <ArrowLeft className="size-5 text-text-muted" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">Báo Cáo & Thống Kê</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Report Types */}
        <section className="mb-8">
          <h2 className="font-bold text-text-main mb-4">Tạo Báo Cáo</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <button
                  key={report.id}
                  className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow text-left"
                >
                  <div className={`size-12 rounded-xl ${report.color} flex items-center justify-center mb-4`}>
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-bold text-text-main mb-1">{report.name}</h3>
                  <p className="text-sm text-text-muted">{report.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-white rounded-2xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-main flex items-center gap-2">
              <TrendingUp className="size-5 text-primary" />
              Tóm Tắt Tháng Này
            </h2>
            <button className="px-3 py-1 bg-secondary-100 rounded-lg text-sm flex items-center gap-1">
              <Calendar className="size-4" />
              T01/2024
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-secondary-50 rounded-xl">
              <p className="text-sm text-text-muted">Doanh thu</p>
              <p className="text-2xl font-bold text-green-600">3.4 tỷ</p>
              <span className="text-xs text-green-600">+18% vs tháng trước</span>
            </div>
            <div className="p-4 bg-secondary-50 rounded-xl">
              <p className="text-sm text-text-muted">Đơn hàng</p>
              <p className="text-2xl font-bold text-text-main">1,247</p>
              <span className="text-xs text-green-600">+12% vs tháng trước</span>
            </div>
            <div className="p-4 bg-secondary-50 rounded-xl">
              <p className="text-sm text-text-muted">Khách mới</p>
              <p className="text-2xl font-bold text-text-main">456</p>
              <span className="text-xs text-green-600">+8% vs tháng trước</span>
            </div>
            <div className="p-4 bg-secondary-50 rounded-xl">
              <p className="text-sm text-text-muted">Giá trị TB</p>
              <p className="text-2xl font-bold text-text-main">2.73M</p>
              <span className="text-xs text-red-500">-2% vs tháng trước</span>
            </div>
          </div>
        </section>

        {/* Recent Reports */}
        <section className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-bold text-text-main mb-4">Báo Cáo Gần Đây</h2>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-main">{report.name}</p>
                    <p className="text-sm text-text-muted">Tạo: {report.date} • {report.size}</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium flex items-center gap-2 hover:border-primary">
                  <Download className="size-4" />
                  Tải về
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
