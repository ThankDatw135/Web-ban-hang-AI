/**
 * Fashion AI - Settings Page
 * 
 * Cài đặt tài khoản người dùng
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

// Sidebar items
const sidebarItems = [
  { href: '/dashboard', icon: 'dashboard', label: 'Tổng quan' },
  { href: '/dashboard/orders', icon: 'receipt_long', label: 'Đơn hàng' },
  { href: '/dashboard/wishlist', icon: 'favorite', label: 'Yêu thích' },
  { href: '/dashboard/addresses', icon: 'location_on', label: 'Địa chỉ' },
  { href: '/dashboard/settings', icon: 'settings', label: 'Cài đặt', active: true },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');

  return (
    <>
      <Header cartItemsCount={2} isLoggedIn={true} />
      
      <main className="flex-1 bg-cream">
        <div className="container-app py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <nav className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="space-y-1">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                        item.active 
                          ? 'bg-primary/10 text-primary font-bold' 
                          : 'hover:bg-gray-50'
                      )}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-6">Cài đặt tài khoản</h1>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-200">
                {[
                  { id: 'profile', label: 'Hồ sơ', icon: 'person' },
                  { id: 'security', label: 'Bảo mật', icon: 'lock' },
                  { id: 'notifications', label: 'Thông báo', icon: 'notifications' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 -mb-[2px] transition-colors',
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    )}
                  >
                    <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  {/* Avatar */}
                  <div className="flex items-center gap-6 mb-8 pb-6 border-b">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-primary">person</span>
                    </div>
                    <div>
                      <button className="px-4 h-9 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors mr-2">
                        Đổi ảnh
                      </button>
                      <button className="px-4 h-9 rounded-full border border-gray-300 text-sm font-semibold hover:bg-gray-50 transition-colors">
                        Xóa
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Họ</label>
                        <input 
                          type="text" 
                          defaultValue="Nguyễn"
                          className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Tên</label>
                        <input 
                          type="text" 
                          defaultValue="Văn A"
                          className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input 
                        type="email" 
                        defaultValue="nguyenvana@email.com"
                        className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Số điện thoại</label>
                      <input 
                        type="tel" 
                        defaultValue="0901234567"
                        className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-6 h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                    >
                      Lưu thay đổi
                    </button>
                  </form>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-bold mb-6">Đổi mật khẩu</h2>
                  <form className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Mật khẩu hiện tại</label>
                      <input 
                        type="password" 
                        className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Mật khẩu mới</label>
                      <input 
                        type="password" 
                        className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Xác nhận mật khẩu mới</label>
                      <input 
                        type="password" 
                        className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-6 h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                    >
                      Đổi mật khẩu
                    </button>
                  </form>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-bold mb-6">Cài đặt thông báo</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'orders', label: 'Cập nhật đơn hàng', desc: 'Nhận thông báo khi đơn hàng được xử lý, giao hàng' },
                      { id: 'promo', label: 'Khuyến mãi', desc: 'Nhận thông tin về chương trình giảm giá, ưu đãi' },
                      { id: 'ai', label: 'AI Recommendations', desc: 'Nhận gợi ý phong cách từ AI Stylist' },
                      { id: 'newsletter', label: 'Bản tin', desc: 'Nhận email về xu hướng thời trang mới nhất' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-semibold">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
