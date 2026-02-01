/**
 * Fashion AI - Admin Layout
 * 
 * Layout chung cho admin dashboard với sidebar
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// Admin sidebar items
const sidebarItems = [
  { href: '/admin', icon: 'dashboard', label: 'Dashboard' },
  { href: '/admin/products', icon: 'inventory_2', label: 'Sản phẩm' },
  { href: '/admin/orders', icon: 'receipt_long', label: 'Đơn hàng' },
  { href: '/admin/users', icon: 'group', label: 'Khách hàng' },
  { href: '/admin/ai-jobs', icon: 'smart_toy', label: 'AI Jobs' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e1a14] text-white shrink-0 hidden lg:block">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/10">
          <span className="material-symbols-outlined text-primary">diamond</span>
          <span className="font-bold text-lg">Fashion AI</span>
          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold ml-auto">Admin</span>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                  isActive
                    ? 'bg-primary text-white' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Admin User</p>
              <p className="text-xs text-gray-400">admin@fashionai.com</p>
            </div>
            <button className="text-gray-400 hover:text-white">
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
              <input 
                type="text" 
                placeholder="Tìm kiếm..."
                className="h-10 pl-10 pr-4 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link href="/" className="text-sm text-gray-600 hover:text-primary">
              Xem trang chủ →
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
