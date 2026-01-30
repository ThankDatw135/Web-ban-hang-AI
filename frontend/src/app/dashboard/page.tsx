/**
 * Fashion AI User Dashboard
 * 
 * Trang dashboard động với API integration:
 * - Current user info
 * - Recent orders
 * - AI recommendations
 * - Quick stats
 */

'use client';

import Link from 'next/link';
import { 
  Sparkles, 
  Package, 
  Heart, 
  Gift, 
  Clock, 
  ChevronRight,
  Truck,
  Star,
  Shirt,
  Calendar,
  Loader2
} from 'lucide-react';
import { Header, Footer } from '@/components';
import { useCurrentUser } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { useWishlistStore } from '@/stores';

export default function DashboardPage() {
  // Fetch data
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: ordersData } = useOrders(undefined, 1);
  const { data: recommendations } = useFeaturedProducts(3);
  const wishlist = useWishlistStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  // Loading state
  if (userLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
          <span className="ml-3 text-text-muted">Đang tải...</span>
        </main>
        <Footer />
      </div>
    );
  }

  // Stats
  const stats = [
    { label: 'Đơn hàng', value: ordersData?.meta?.total || 0, icon: Package, color: 'text-blue-600 bg-blue-50' },
    { label: 'Wishlist', value: wishlist.items.length, icon: Heart, color: 'text-red-500 bg-red-50' },
    { label: 'Điểm tích lũy', value: '0', icon: Star, color: 'text-amber-500 bg-amber-50' },
    { label: 'Ưu đãi', value: 0, icon: Gift, color: 'text-purple-600 bg-purple-50' },
  ];

  // Quick actions
  const quickActions = [
    { label: 'Thử đồ AI', href: '/try-on', icon: Shirt, color: 'bg-accent' },
    { label: 'Tủ đồ của tôi', href: '/wardrobe', icon: Shirt, color: 'bg-primary' },
    { label: 'Đặt lịch styling', href: '/stylist', icon: Calendar, color: 'bg-green-600' },
    { label: 'Hỗ trợ', href: '/support', icon: Gift, color: 'bg-blue-600' },
  ];

  const recentOrders = ordersData?.items?.slice(0, 2) || [];

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
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className="size-16 rounded-2xl object-cover border-2 border-white shadow-lg"
                />
              ) : (
                <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="size-4 text-accent" />
                  <span className="text-xs font-bold text-accent uppercase tracking-wide">AI Stylist Greeting</span>
                </div>
                <h1 className="text-2xl font-bold text-text-main">
                  Xin chào, {user?.firstName || 'Bạn'}! ✨
                </h1>
                <p className="text-text-muted">
                  Hôm nay là ngày tuyệt vời để khám phá phong cách mới!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/profile" className="px-4 py-2 bg-white rounded-xl border border-border hover:border-primary transition-colors">
                <p className="text-xs text-text-muted">Tài khoản</p>
                <p className="font-bold text-primary">{user?.email}</p>
              </Link>
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
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order: any) => (
                    <div
                      key={order.id}
                      className="flex items-center gap-4 p-4 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors"
                    >
                      <div className="size-16 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="size-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-text-main">{order.orderNumber}</p>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            order.status === 'DELIVERED' ? 'text-green-600 bg-green-50' :
                            order.status === 'SHIPPED' ? 'text-blue-600 bg-blue-50' :
                            order.status === 'CANCELLED' ? 'text-red-600 bg-red-50' :
                            'text-amber-600 bg-amber-50'
                          }`}>
                            {order.status === 'PENDING' ? 'Chờ xác nhận' :
                             order.status === 'CONFIRMED' ? 'Đã xác nhận' :
                             order.status === 'PROCESSING' ? 'Đang xử lý' :
                             order.status === 'SHIPPED' ? 'Đang giao' :
                             order.status === 'DELIVERED' ? 'Đã giao' :
                             order.status === 'CANCELLED' ? 'Đã hủy' : order.status}
                          </span>
                        </div>
                        <p className="text-sm text-text-muted">
                          {order.itemCount || 1} sản phẩm • {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                        </p>
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
              ) : (
                <div className="text-center py-8">
                  <Package className="size-12 text-text-muted mx-auto mb-3 opacity-50" />
                  <p className="text-text-muted">Chưa có đơn hàng nào</p>
                  <Link href="/shop" className="text-primary font-medium hover:underline mt-2 inline-block">
                    Bắt đầu mua sắm
                  </Link>
                </div>
              )}
            </section>

            {/* AI Recommendations */}
            {recommendations && recommendations.length > 0 && (
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
                  {recommendations.map((item: any) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.slug}`}
                      className="group"
                    >
                      <div className="aspect-[3/4] rounded-xl overflow-hidden bg-secondary-100 mb-3 relative">
                        <img
                          src={item.images?.[0]?.url || 'https://via.placeholder.com/300x400'}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                          AI Pick
                        </div>
                      </div>
                      <h3 className="font-medium text-text-main group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                      <p className="text-primary font-bold">{formatPrice(item.salePrice || item.price)}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
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
            {recentOrders.some((o: any) => o.status === 'SHIPPED') && (
              <section className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="size-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-text-main">Giao Hàng Sắp Đến</h2>
                </div>
                {recentOrders.filter((o: any) => o.status === 'SHIPPED').slice(0, 1).map((order: any) => (
                  <div key={order.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-blue-100">
                    <div className="size-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Package className="size-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-text-main text-sm">{order.orderNumber}</p>
                      <p className="text-xs text-text-muted">Đang giao hàng</p>
                    </div>
                    <Link href={`/orders/${order.id}`} className="text-blue-600 text-sm font-medium">
                      Theo dõi
                    </Link>
                  </div>
                ))}
              </section>
            )}

            {/* Account Settings */}
            <section className="bg-white rounded-2xl border border-border p-6">
              <h2 className="text-lg font-bold text-text-main mb-4">Tài Khoản</h2>
              <div className="space-y-2">
                <Link href="/profile" className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary-50 transition-colors">
                  <span className="text-sm text-text-main">Thông tin cá nhân</span>
                  <ChevronRight className="size-4 text-text-muted" />
                </Link>
                <Link href="/settings/addresses" className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary-50 transition-colors">
                  <span className="text-sm text-text-main">Sổ địa chỉ</span>
                  <ChevronRight className="size-4 text-text-muted" />
                </Link>
                <Link href="/notifications" className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary-50 transition-colors">
                  <span className="text-sm text-text-main">Thông báo</span>
                  <ChevronRight className="size-4 text-text-muted" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
