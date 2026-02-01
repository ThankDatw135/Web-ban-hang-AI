/**
 * Fashion AI - User Dashboard Page
 * 
 * Trang tổng quan của người dùng với sidebar navigation
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  User, 
  Package, 
  Heart, 
  Sparkles, 
  Settings, 
  LogOut,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { OrderStatusBadge } from '@/components/ui/Badge';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { useProfile } from '@/hooks/use-user';
import { useOrders } from '@/hooks/use-orders';
import { Loader2 } from 'lucide-react';
import type { OrderStatus } from '@/types/api';

// Status mapping for OrderStatusBadge
const statusMap: Record<OrderStatus, 'processing' | 'shipped' | 'delivered' | 'cancelled'> = {
  PENDING: 'processing',
  CONFIRMED: 'processing',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'cancelled',
};

// Sidebar navigation items
const navItems = [
  { href: '/dashboard', label: 'Tổng quan', icon: User },
  { href: '/dashboard/orders', label: 'Đơn hàng', icon: Package },
  { href: '/dashboard/wishlist', label: 'Yêu thích', icon: Heart },
  { href: '/dashboard/ai-history', label: 'Lịch sử AI', icon: Sparkles },
  { href: '/dashboard/addresses', label: 'Địa chỉ', icon: MapPin },
  { href: '/dashboard/settings', label: 'Cài đặt', icon: Settings },
];

export default function DashboardPage() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  // Fetch profile and recent orders
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: ordersData, isLoading: ordersLoading } = useOrders({ limit: 3 });
  
  const recentOrders = ordersData?.data || [];
  const memberSince = profile?.createdAt 
    ? new Date(profile.createdAt).toLocaleDateString('vi-VN', { month: '2-digit', year: 'numeric' })
    : '--';

  // Loading state
  if (profileLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-gray-50 dark:bg-[#151210]">
          <div className="container-app py-20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header isLoggedIn cartItemsCount={2} />

      <main className="flex-1 bg-gray-50 dark:bg-[#151210]">
        <div className="container-app py-8">
          <div className="lg:flex lg:gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0 mb-8 lg:mb-0">
              <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-6 shadow-sm">
                {/* User info */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                  <div
                    className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">{user?.firstName} {user?.lastName}</h3>
                    <p className="text-sm text-secondary">Thành viên từ {memberSince}</p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {navItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                        pathname === item.href
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium flex-1">{item.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* Logout */}
                <button className="flex items-center gap-3 px-4 py-3 w-full mt-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Đăng xuất</span>
                </button>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 space-y-8">
              {/* Welcome banner */}
              <div className="bg-gradient-to-r from-primary to-primary-600 rounded-2xl p-6 text-white">
                <h1 className="text-2xl font-extrabold mb-2">
                  Xin chào, {user?.lastName || 'bạn'}! 👋
                </h1>
                <p className="text-white/80">
                  Chào mừng trở lại với Fashion AI. Hôm nay bạn muốn khám phá gì?
                </p>
                <div className="flex gap-4 mt-6">
                  <Link href="/products">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      Khám phá sản phẩm
                    </Button>
                  </Link>
                  <Link href="/ai-studio">
                    <Button className="bg-white text-primary hover:bg-white/90" leftIcon={<Sparkles className="w-5 h-5" />}>
                      Thử đồ AI
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: 'Đơn hàng', value: '12', icon: Package },
                  { label: 'Yêu thích', value: '8', icon: Heart },
                  { label: 'AI Try-ons', value: '23', icon: Sparkles },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="bg-white dark:bg-[#1a1814] rounded-2xl p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-secondary">{stat.label}</p>
                        <p className="text-3xl font-extrabold mt-1">{stat.value}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Đơn hàng gần đây</h2>
                  <Link href="/dashboard/orders" className="text-sm text-primary hover:underline">
                    Xem tất cả
                  </Link>
                </div>

                <div className="space-y-4">
                  {ordersLoading ? (
                    <div className="flex justify-center py-6">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : recentOrders.length > 0 ? recentOrders.map(order => (
                    <Link
                      key={order.id}
                      href={`/dashboard/orders/${order.id}`}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div>
                        <p className="font-bold">{order.orderNumber}</p>
                        <p className="text-sm text-secondary mt-1">
                          {formatDate(new Date(order.createdAt))} • {order.items?.length || 0} sản phẩm
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(order.total)}</p>
                          <OrderStatusBadge status={statusMap[order.status]} />
                        </div>
                        <ChevronRight className="w-5 h-5 text-secondary" />
                      </div>
                    </Link>
                  )) : (
                    <p className="text-center text-secondary py-6">Chưa có đơn hàng nào</p>
                  )}
                </div>
              </div>

              {/* Recent AI try-ons */}
              <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Thử đồ AI
                  </h2>
                  <Link href="/ai-studio" className="text-sm text-primary hover:underline">
                    Thử ngay
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Try new */}
                  <Link
                    href="/ai-studio"
                    className="aspect-[3/4] rounded-xl border-2 border-dashed border-accent/30 flex flex-col items-center justify-center gap-2 hover:border-accent hover:bg-accent/5 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-accent">Thử đồ mới</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
