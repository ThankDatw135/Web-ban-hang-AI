/**
 * Fashion AI User Dashboard - Fashion AI
 * 
 * Trang dashboard chính của người dùng:
 * - Welcome banner với AI greeting
 * - Quick stats (đơn hàng, điểm thưởng, wishlist)
 * - Recent orders
 * - AI Style recommendations
 * - Quick actions
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Package, 
  Heart, 
  Gift, 
  Clock, 
  ChevronRight,
  ShoppingBag,
  Truck,
  Star,
  Bell,
  User,
  Shirt,
  Calendar
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock user data
const user = {
  name: 'Ngọc Anh',
  email: 'ngocanh@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  memberSince: '2023',
  tier: 'Gold',
  points: 2450,
};

// Mock stats
const stats = [
  { label: 'Đơn hàng', value: 12, icon: Package, color: 'text-blue-600 bg-blue-50' },
  { label: 'Wishlist', value: 8, icon: Heart, color: 'text-red-500 bg-red-50' },
  { label: 'Điểm tích lũy', value: '2,450', icon: Star, color: 'text-amber-500 bg-amber-50' },
  { label: 'Ưu đãi', value: 3, icon: Gift, color: 'text-purple-600 bg-purple-50' },
];

// Mock recent orders
const recentOrders = [
  {
    id: 'ORD-2024001',
    date: '28/01/2024',
    total: 5800000,
    status: 'Đang giao',
    statusColor: 'text-blue-600 bg-blue-50',
    items: 2,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100',
  },
  {
    id: 'ORD-2024002',
    date: '25/01/2024',
    total: 3200000,
    status: 'Đã giao',
    statusColor: 'text-green-600 bg-green-50',
    items: 1,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100',
  },
];

// Mock AI recommendations
const aiRecommendations = [
  {
    id: '1',
    name: 'Silk Blouse',
    price: 2400000,
    match: 96,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=300',
  },
  {
    id: '2',
    name: 'Wool Coat',
    price: 8500000,
    match: 94,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300',
  },
  {
    id: '3',
    name: 'Midi Skirt',
    price: 1800000,
    match: 92,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?w=300',
  },
];

// Quick actions
const quickActions = [
  { label: 'Thử đồ AI', href: '/try-on', icon: Shirt, color: 'bg-accent' },
  { label: 'Tủ đồ của tôi', href: '/wardrobe', icon: Shirt, color: 'bg-primary' },
  { label: 'Đặt lịch styling', href: '/stylist', icon: Calendar, color: 'bg-green-600' },
  { label: 'Hỗ trợ', href: '/support', icon: Bell, color: 'bg-blue-600' },
];

export default function DashboardPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 size-60 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 -bottom-10 size-40 bg-accent/10 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="size-16 rounded-2xl object-cover border-2 border-white shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="size-4 text-accent" />
                  <span className="text-xs font-bold text-accent uppercase tracking-wide">AI Stylist Greeting</span>
                </div>
                <h1 className="text-2xl font-bold text-text-main">
                  Xin chào, {user.name}! ✨
                </h1>
                <p className="text-text-muted">
                  Hôm nay là ngày tuyệt vời để khám phá phong cách mới!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white rounded-xl border border-border">
                <p className="text-xs text-text-muted">Hạng thành viên</p>
                <p className="font-bold text-amber-600">{user.tier} Member</p>
              </div>
              <div className="px-4 py-2 bg-white rounded-xl border border-border">
                <p className="text-xs text-text-muted">Điểm tích lũy</p>
                <p className="font-bold text-primary">{user.points} pts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-5 border border-border hover:shadow-md transition-shadow"
              >
                <div className={`size-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon className="size-5" />
                </div>
                <p className="text-2xl font-bold text-text-main">{stat.value}</p>
                <p className="text-sm text-text-muted">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders */}
            <section className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-main">Đơn Hàng Gần Đây</h2>
                <Link href="/orders" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                  Xem tất cả <ChevronRight className="size-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-4 p-4 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors"
                  >
                    <img
                      src={order.image}
                      alt="Order item"
                      className="size-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-text-main">{order.id}</p>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted">{order.items} sản phẩm • {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{formatPrice(order.total)}</p>
                      <Link href={`/orders/${order.id}`} className="text-xs text-text-muted hover:text-primary">
                        Chi tiết →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Recommendations */}
            <section className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 text-accent" />
                  <h2 className="text-xl font-bold text-text-main">AI Gợi Ý Cho Bạn</h2>
                </div>
                <Link href="/shop" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                  Khám phá thêm <ChevronRight className="size-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {aiRecommendations.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.id}`}
                    className="group"
                  >
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-secondary-100 mb-3 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                        {item.match}% Match
                      </div>
                    </div>
                    <h3 className="font-medium text-text-main group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <section className="bg-white rounded-2xl border border-border p-6">
              <h2 className="text-lg font-bold text-text-main mb-4">Truy Cập Nhanh</h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.label}
                      href={action.href}
                      className="p-4 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-colors flex flex-col items-center gap-2 text-center"
                    >
                      <div className={`size-10 rounded-xl ${action.color} text-white flex items-center justify-center`}>
                        <Icon className="size-5" />
                      </div>
                      <span className="text-xs font-medium text-text-main">{action.label}</span>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Upcoming Delivery */}
            <section className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="size-5 text-blue-600" />
                <h2 className="text-lg font-bold text-text-main">Giao Hàng Sắp Đến</h2>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-blue-100">
                <div className="size-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Package className="size-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-main text-sm">ORD-2024001</p>
                  <p className="text-xs text-text-muted">Dự kiến: 30/01/2024</p>
                </div>
                <Link href="/orders/ORD-2024001" className="text-blue-600 text-sm font-medium">
                  Theo dõi
                </Link>
              </div>
            </section>

            {/* VIP Perks */}
            <section className="bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="size-5 text-amber-500" />
                <h2 className="text-lg font-bold text-text-main">Ưu Đãi {user.tier}</h2>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-text-muted flex items-center gap-2">
                  <Gift className="size-4 text-amber-500" />
                  Giảm 15% đơn tiếp theo
                </li>
                <li className="text-sm text-text-muted flex items-center gap-2">
                  <Truck className="size-4 text-amber-500" />
                  Miễn phí giao hàng
                </li>
                <li className="text-sm text-text-muted flex items-center gap-2">
                  <Clock className="size-4 text-amber-500" />
                  Early access bộ sưu tập mới
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
