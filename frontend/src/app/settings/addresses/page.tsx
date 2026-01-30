/**
 * Secure Address Management - Fashion AI
 * 
 * Quản lý địa chỉ giao hàng với API integration:
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
  ChevronLeft,
  Loader2,
  X
} from 'lucide-react';
import { Header, Footer } from '@/components';
import { useAddresses, useCreateAddress, useUpdateAddress, useDeleteAddress } from '@/hooks/useOrders';
import { toastSuccess, toastError } from '@/stores';
import type { Address, AddressInput } from '@/types';

export default function AddressesPage() {
  const { data: addresses, isLoading } = useAddresses();
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();
  const deleteAddress = useDeleteAddress();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<AddressInput>({
    fullName: '',
    phone: '',
    street: '',
    ward: '',
    district: '',
    city: '',
    province: '',
    isDefault: false,
  });
  const [addressType, setAddressType] = useState<'home' | 'office'>('home');

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      street: '',
      ward: '',
      district: '',
      city: '',
      province: '',
      isDefault: false,
    });
    setAddressType('home');
    setEditingAddress(null);
    setShowAddForm(false);
  };

  const openEditForm = (address: Address) => {
    setFormData({
      fullName: address.fullName,
      phone: address.phone,
      street: address.street,
      ward: address.ward,
      district: address.district,
      city: address.city,
      province: address.province,
      isDefault: address.isDefault,
    });
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.phone || !formData.street || !formData.district || !formData.city) {
      toastError('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      if (editingAddress) {
        await updateAddress.mutateAsync({
          id: editingAddress.id,
          data: formData,
        });
        toastSuccess('Thành công', 'Đã cập nhật địa chỉ');
      } else {
        await createAddress.mutateAsync(formData);
        toastSuccess('Thành công', 'Đã thêm địa chỉ mới');
      }
      resetForm();
    } catch {
      toastError('Lỗi', editingAddress ? 'Không thể cập nhật địa chỉ' : 'Không thể thêm địa chỉ');
    }
  };

  const handleSetDefault = async (address: Address) => {
    try {
      await updateAddress.mutateAsync({
        id: address.id,
        data: { isDefault: true },
      });
      toastSuccess('Thành công', 'Đã đặt làm địa chỉ mặc định');
    } catch {
      toastError('Lỗi', 'Không thể thay đổi địa chỉ mặc định');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa địa chỉ này?')) return;
    
    try {
      await deleteAddress.mutateAsync(id);
      toastSuccess('Đã xóa', 'Địa chỉ đã được xóa');
    } catch {
      toastError('Lỗi', 'Không thể xóa địa chỉ');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

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
            <p className="text-text-muted">{addresses?.length || 0} địa chỉ đã lưu</p>
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
          {addresses?.map((address) => (
            <div
              key={address.id}
              className={`bg-white rounded-2xl border-2 p-6 transition-all ${
                address.isDefault ? 'border-primary' : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600">
                    <Home className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-text-main">{address.fullName}</span>
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
                  <button 
                    onClick={() => openEditForm(address)}
                    className="size-8 bg-secondary-50 hover:bg-secondary-100 rounded-lg flex items-center justify-center text-text-muted transition-colors"
                  >
                    <Edit className="size-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(address.id)}
                    disabled={deleteAddress.isPending}
                    className="size-8 bg-secondary-50 hover:bg-red-50 rounded-lg flex items-center justify-center text-text-muted hover:text-red-500 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 mb-4">
                <MapPin className="size-4 text-text-muted mt-0.5 flex-shrink-0" />
                <p className="text-text-main">
                  {address.street}, {address.ward}, {address.district}, {address.city}
                </p>
              </div>

              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address)}
                  disabled={updateAddress.isPending}
                  className="text-primary text-sm font-medium flex items-center gap-1 hover:underline disabled:opacity-50"
                >
                  <Check className="size-4" />
                  Đặt làm mặc định
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add/Edit Address Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-main">
                  {editingAddress ? 'Chỉnh Sửa Địa Chỉ' : 'Thêm Địa Chỉ Mới'}
                </h2>
                <button onClick={resetForm} className="p-1 hover:bg-secondary-50 rounded-lg">
                  <X className="size-5 text-text-muted" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Họ tên</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                    placeholder="Nhập họ tên người nhận"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Địa chỉ</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                    placeholder="Số nhà, tên đường"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Phường/Xã</label>
                  <input
                    type="text"
                    value={formData.ward}
                    onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                    placeholder="Phường/Xã"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Quận/Huyện</label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                      placeholder="Quận/Huyện"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Tỉnh/Thành phố</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value, province: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                      placeholder="Tỉnh/Thành phố"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Loại địa chỉ</label>
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setAddressType('home')}
                      className={`flex-1 p-3 border-2 rounded-xl flex items-center justify-center gap-2 transition-colors ${
                        addressType === 'home' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'
                      }`}
                    >
                      <Home className={`size-4 ${addressType === 'home' ? 'text-primary' : 'text-text-muted'}`} />
                      <span className={`font-medium ${addressType === 'home' ? 'text-primary' : 'text-text-muted'}`}>Nhà riêng</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setAddressType('office')}
                      className={`flex-1 p-3 border-2 rounded-xl flex items-center justify-center gap-2 transition-colors ${
                        addressType === 'office' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'
                      }`}
                    >
                      <Building className={`size-4 ${addressType === 'office' ? 'text-primary' : 'text-text-muted'}`} />
                      <span className={`font-medium ${addressType === 'office' ? 'text-primary' : 'text-text-muted'}`}>Văn phòng</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="size-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="isDefault" className="text-sm text-text-main">
                    Đặt làm địa chỉ mặc định
                  </label>
                </div>
              </div>
              <div className="p-6 border-t border-border flex gap-4">
                <button
                  onClick={resetForm}
                  className="flex-1 py-3 bg-secondary-50 text-text-main font-medium rounded-xl hover:bg-secondary-100 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={createAddress.isPending || updateAddress.isPending}
                  className="flex-1 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {(createAddress.isPending || updateAddress.isPending) && (
                    <Loader2 className="size-4 animate-spin" />
                  )}
                  {editingAddress ? 'Cập nhật' : 'Lưu địa chỉ'}
                </button>
              </div>
            </div>
          </div>
        )}

        {(!addresses || addresses.length === 0) && (
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
