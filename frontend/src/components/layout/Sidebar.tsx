/**
 * Fashion AI - Dashboard Sidebar
 */

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  LogOut, 
  Settings,
  LayoutDashboard
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';

const menuItems = [
  { icon: LayoutDashboard, label: 'Tổng quan', href: '/dashboard' },
  { icon: User, label: 'Hồ sơ cá nhân', href: '/dashboard/profile' },
  { icon: ShoppingBag, label: 'Đơn hàng của tôi', href: '/dashboard/orders' },
  { icon: Heart, label: 'Sản phẩm yêu thích', href: '/dashboard/wishlist' },
  { icon: MapPin, label: 'Sổ địa chỉ', href: '/dashboard/addresses' },
  // { icon: Settings, label: 'Cài đặt', href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
      logout();
      router.push('/login');
  };

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-[#25221d] md:min-h-[calc(100vh-120px)] rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-secondary hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-text-main dark:hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}

        <hr className="my-4 border-gray-100 dark:border-gray-800" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-500 transition-all font-medium"
        >
          <LogOut className="w-5 h-5" />
          Đăng xuất
        </button>
      </nav>
    </aside>
  );
}
