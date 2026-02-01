/**
 * Fashion AI - Addresses Page
 * 
 * Quản lý địa chỉ giao hàng
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { useAddresses, useDeleteAddress, useSetDefaultAddress } from '@/hooks/use-user';
import { Loader2 } from 'lucide-react';

// Sidebar items
const sidebarItems = [
  { href: '/dashboard', icon: 'dashboard', label: 'Tổng quan' },
  { href: '/dashboard/orders', icon: 'receipt_long', label: 'Đơn hàng' },
  { href: '/dashboard/wishlist', icon: 'favorite', label: 'Yêu thích' },
  { href: '/dashboard/addresses', icon: 'location_on', label: 'Địa chỉ', active: true },
  { href: '/dashboard/settings', icon: 'settings', label: 'Cài đặt' },
];

export default function AddressesPage() {
  const [showModal, setShowModal] = useState(false);
  
  // Fetch addresses from API
  const { data: addresses = [], isLoading } = useAddresses();
  const deleteAddressMutation = useDeleteAddress();
  const setDefaultMutation = useSetDefaultAddress();

  const handleSetDefault = (id: string) => {
    setDefaultMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa địa chỉ này?')) {
      deleteAddressMutation.mutate(id);
    }
  };

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
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Địa chỉ giao hàng</h1>
                <button 
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 px-4 h-10 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Thêm địa chỉ
                </button>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : addresses.map((addr) => (
                  <div key={addr.id} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold">{addr.fullName}</h3>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                              Mặc định
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{addr.phone}</p>
                        <p className="text-gray-600 text-sm">
                          {addr.street}, {addr.district}, {addr.city}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col gap-2">
                        <button 
                          onClick={() => handleSetDefault(addr.id)}
                          disabled={addr.isDefault || setDefaultMutation.isPending}
                          className={cn(
                            'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                            addr.isDefault
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-primary hover:bg-primary/10'
                          )}
                        >
                          Đặt mặc định
                        </button>
                        <button className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
                          Sửa
                        </button>
                        <button 
                          onClick={() => handleDelete(addr.id)}
                          disabled={addr.isDefault || deleteAddressMutation.isPending}
                          className={cn(
                            'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                            addr.isDefault
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-red-500 hover:bg-red-50'
                          )}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {addresses.length === 0 && !isLoading && (
                  <div className="bg-white rounded-2xl p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">location_off</span>
                    <p className="text-gray-500">Chưa có địa chỉ nào</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
