/**
 * Admin Dashboard - Fashion AI
 * 
 * Trang chính admin:
 * - Overview stats
 * - Quick actions
 * - Recent orders
 * - Sidebar navigation
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Settings,
  Sparkles,
  BarChart3,
  Tag,
  MessageSquare,
  Database,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';

// Admin sidebar items
const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', active: true },
  { icon: BarChart3, label: 'Tổng quan', href: '/admin/overview' },
  { icon: ShoppingCart, label: 'Đơn hàng', href: '/admin/orders' },
  { icon: Package, label: 'Sản phẩm', href: '/admin/products' },


  { icon: Users, label: 'Khách hàng', href: '/admin/customers' },

  { icon: Sparkles, label: 'AI Config', href: '/admin/ai-config' },
  { icon: Database, label: 'Dữ liệu', href: '/admin/data' },
  { icon: MessageSquare, label: 'Đánh giá', href: '/admin/reviews' },
  { icon: Bell, label: 'Thông báo', href: '/admin/notifications' },
  { icon: Settings, label: 'Cài đặt', href: '/admin/settings' },
];

// Stats
const stats = [
  { label: 'Doanh thu hôm nay', value: '15.200.000₫', change: '+12%', trend: 'up' },
  { label: 'Đơn hàng mới', value: '48', change: '+8%', trend: 'up' },
  { label: 'Khách hàng mới', value: '23', change: '+5%', trend: 'up' },
  { label: 'Tỷ lệ chuyển đổi', value: '3.2%', change: '-0.2%', trend: 'down' },
];

// Recent orders
const recentOrders = [
  { id: 'ORD-2024001', customer: 'Ngọc Anh', total: '4.500.000₫', status: 'processing' },
  { id: 'ORD-2024002', customer: 'Minh Tuấn', total: '2.300.000₫', status: 'shipping' },
  { id: 'ORD-2024003', customer: 'Thanh Hằng', total: '8.900.000₫', status: 'completed' },
  { id: 'ORD-2024004', customer: 'Hoàng Nam', total: '1.500.000₫', status: 'pending' },
];

// Alerts
const alerts = [
  { type: 'warning', message: '5 sản phẩm sắp hết hàng' },
  { type: 'info', message: '3 đánh giá chờ duyệt' },
  { type: 'error', message: '2 đơn hàng cần xử lý khẩn' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-600',
  processing: 'bg-blue-100 text-blue-600',
  shipping: 'bg-purple-100 text-purple-600',
  completed: 'bg-green-100 text-green-600',
};

const statusLabels: Record<string, string> = {
  pending: 'Chờ xử lý',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  completed: 'Hoàn thành',
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="size-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-text-main">Fashion AI</h1>
              <p className="text-xs text-text-muted">Admin Panel</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-200px)]">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  item.active 
                    ? 'bg-primary text-white' 
                    : 'text-text-muted hover:bg-secondary-50 hover:text-text-main'
                }`}
              >
                <Icon className="size-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <LogOut className="size-5" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50"
            >
              <Menu className="size-5 text-text-muted" />
            </button>
            <h2 className="text-xl font-bold text-text-main">Dashboard</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="size-10 rounded-lg bg-secondary-50 flex items-center justify-center text-text-muted hover:bg-secondary-100 relative">
              <Bell className="size-5" />
              <span className="absolute -top-1 -right-1 size-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                A
              </div>
              <span className="font-medium text-text-main hidden md:block">Admin</span>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Alerts */}
          <div className="space-y-2 mb-6">
            {alerts.map((alert, idx) => (
              <div key={idx} className={`flex items-center gap-3 p-4 rounded-xl ${
                alert.type === 'error' ? 'bg-red-50 text-red-700' :
                alert.type === 'warning' ? 'bg-amber-50 text-amber-700' :
                'bg-blue-50 text-blue-700'
              }`}>
                <AlertCircle className="size-5" />
                <span className="font-medium">{alert.message}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-border p-5">
                <p className="text-sm text-text-muted mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-text-main mb-2">{stat.value}</p>
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-500'
                }`}>
                  {stat.change} so với hôm qua
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text-main">Đơn Hàng Mới</h3>
                <Link href="/admin/orders" className="text-primary text-sm font-medium flex items-center gap-1">
                  Xem tất cả <ChevronRight className="size-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-xl">
                    <div>
                      <p className="font-medium text-text-main">{order.id}</p>
                      <p className="text-sm text-text-muted">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-text-main">{order.total}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <h3 className="font-bold text-text-main mb-4">Thao Tác Nhanh</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/admin/products/new" className="p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors text-center">
                  <Package className="size-6 text-primary mx-auto mb-2" />
                  <span className="text-sm font-medium text-text-main">Thêm sản phẩm</span>
                </Link>
                <Link href="/admin/orders" className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center">
                  <ShoppingCart className="size-6 text-green-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-text-main">Xử lý đơn</span>
                </Link>
                <Link href="/admin/promotions/new" className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors text-center">
                  <Tag className="size-6 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-text-main">Tạo khuyến mãi</span>
                </Link>
                <Link href="/admin/ai-config" className="p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors text-center">
                  <Sparkles className="size-6 text-amber-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-text-main">Cấu hình AI</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
