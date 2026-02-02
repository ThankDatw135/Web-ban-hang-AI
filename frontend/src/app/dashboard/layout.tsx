/**
 * Fashion AI - Dashboard Layout
 * 
 * Layout chung cho các trang user dashboard
 * Bao gồm sidebar menu và main content area
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  User, 
  Package, 
  Heart, 
  Bell, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';

// Menu items
const menuItems = [
  { href: '/dashboard', icon: User, label: 'Thông tin cá nhân' },
  { href: '/dashboard/orders', icon: Package, label: 'Đơn hàng của tôi' },
  { href: '/dashboard/wishlist', icon: Heart, label: 'Sản phẩm yêu thích' },
  { href: '/dashboard/notifications', icon: Bell, label: 'Thông báo' },
  { href: '/dashboard/settings', icon: Settings, label: 'Cài đặt' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen py-8">
      <div className="container-app">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-primary">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-main dark:text-white">Tài khoản</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="card p-4 lg:sticky lg:top-24">
              {/* User info */}
              <div className="flex items-center gap-3 p-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Nguyễn Văn A</p>
                  <p className="text-xs text-secondary">user@example.com</p>
                </div>
              </div>

              {/* Menu */}
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== '/dashboard' && pathname.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-text-main dark:hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}

                {/* Logout */}
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <LogOut className="w-5 h-5" />
                  Đăng xuất
                </button>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
