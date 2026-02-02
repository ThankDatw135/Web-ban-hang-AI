/**
 * Fashion AI - Admin Sidebar
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Ticket, 
  Bot, 
  LogOut,
  Settings
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';

const ADMIN_LINKS = [
  { name: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
  { name: 'Sản phẩm', href: '/admin/products', icon: Package },
  { name: 'Đơn hàng', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Khách hàng', href: '/admin/users', icon: Users },
  { name: 'Mã giảm giá', href: '/admin/coupons', icon: Ticket },
  { name: 'AI Features', href: '/admin/ai-jobs', icon: Bot },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="w-64 bg-white dark:bg-[#1e1a14] border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen fixed left-0 top-0 z-40">
      {/* Header */}
      <div className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <Link href="/" className="flex items-center gap-2">
           <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-black font-bold text-lg">A</span>
           </div>
           <span className="font-bold text-xl tracking-tight">Admin<span className="text-primary">Panel</span></span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {ADMIN_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive 
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg' 
                  : 'text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
         <button 
           onClick={logout}
           className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium"
         >
           <LogOut className="w-5 h-5" />
           Đăng xuất
         </button>
      </div>
    </aside>
  );
}
