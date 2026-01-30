/**
 * Secure Address & Payment Management - Fashion AI
 * 
 * Quản lý địa chỉ giao hàng:
 * - List addresses
 * - Add/Edit/Delete
 * - Set default
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  Home,
  Building,
  Star,
  ChevronLeft
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock addresses
const initialAddresses = [
  {
    id: '1',
    name: 'Ngọc Anh',
    phone: '+84 912 345 678',
    address: '123 Nguyễn Huệ, Phường Bến Nghé',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    type: 'home',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Ngọc Anh',
    phone: '+84 912 345 678',
    address: 'Tầng 15, Tòa nhà Bitexco, 2 Hải Triều',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    type: 'office',
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showAddForm, setShowAddForm] = useState(false);

  const setDefault = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Back Link */}
        <Link href="/profile" className="flex items-center gap-2 text-text-muted hover:text-primary mb-6 transition-colors">
          <ChevronLeft className="size-5" />
          <span>Quay lại Profile</span>
        </Link>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-main mb-2">Địa Chỉ Giao Hàng</h1>
            <p className="text-text-muted">{addresses.length} địa chỉ đã lưu</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="size-4" />
            Thêm địa chỉ
          </button>
        </div>

        {/* Addresses List */}
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white rounded-2xl border-2 p-6 transition-all ${
                address.isDefault ? 'border-primary' : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-xl flex items-center justify-center ${
                    address.type === 'home' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                  }`}>
                    {address.type === 'home' ? <Home className="size-5" /> : <Building className="size-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-text-main">{address.name}</span>
                      {address.isDefault && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="size-3" />
                          Mặc định
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-text-muted">{address.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="size-8 bg-secondary-50 hover:bg-secondary-100 rounded-lg flex items-center justify-center text-text-muted transition-colors">
                    <Edit className="size-4" />
                  </button>
                  <button 
                    onClick={() => deleteAddress(address.id)}
                    className="size-8 bg-secondary-50 hover:bg-red-50 rounded-lg flex items-center justify-center text-text-muted hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 mb-4">
                <MapPin className="size-4 text-text-muted mt-0.5 flex-shrink-0" />
                <p className="text-text-main">
                  {address.address}, {address.district}, {address.city}
                </p>
              </div>

              {!address.isDefault && (
                <button
                  onClick={() => setDefault(address.id)}
                  className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
                >
                  <Check className="size-4" />
                  Đặt làm mặc định
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Address Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold text-text-main">Thêm Địa Chỉ Mới</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Họ tên</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                    placeholder="Nhập họ tên người nhận"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Địa chỉ</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                    placeholder="Số nhà, tên đường"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Quận/Huyện</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                      placeholder="Quận/Huyện"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Tỉnh/Thành phố</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                      placeholder="Tỉnh/Thành phố"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Loại địa chỉ</label>
                  <div className="flex gap-4">
                    <button className="flex-1 p-3 border-2 border-primary bg-primary/5 rounded-xl flex items-center justify-center gap-2">
                      <Home className="size-4 text-primary" />
                      <span className="font-medium text-primary">Nhà riêng</span>
                    </button>
                    <button className="flex-1 p-3 border border-border rounded-xl flex items-center justify-center gap-2 hover:border-primary transition-colors">
                      <Building className="size-4 text-text-muted" />
                      <span className="font-medium text-text-muted">Văn phòng</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-border flex gap-4">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-3 bg-secondary-50 text-text-main font-medium rounded-xl hover:bg-secondary-100 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Lưu địa chỉ
                </button>
              </div>
            </div>
          </div>
        )}

        {addresses.length === 0 && (
          <div className="text-center py-16">
            <div className="size-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="size-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">Chưa có địa chỉ</h3>
            <p className="text-text-muted mb-6">Thêm địa chỉ giao hàng đầu tiên của bạn</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="size-5" />
              Thêm Địa Chỉ
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
