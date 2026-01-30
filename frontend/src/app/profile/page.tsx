/**
 * Fashion AI User Profile
 * 
 * Trang profile động với API:
 * - User info từ API
 * - Body measurements từ store
 * - Update profile
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Camera, 
  Edit, 
  Mail, 
  MapPin,
  Ruler,
  Palette,
  Shield,
  ChevronRight,
  Save,
  User,
  Calendar,
  Star,
  Loader2
} from 'lucide-react';
import { Header, Footer } from '@/components';
import { useCurrentUser, useUpdateProfile } from '@/hooks/useAuth';
import { useUserStore } from '@/stores/user-store';
import { toastSuccess, toastError } from '@/stores';

const settingsLinks = [
  { label: 'Địa chỉ giao hàng', href: '/settings/addresses', icon: MapPin },
  { label: 'Phương thức thanh toán', href: '/settings/payment', icon: Shield },
  { label: 'Thông báo', href: '/notifications', icon: Mail },
  { label: 'Bảo mật tài khoản', href: '/settings/security', icon: Shield },
];

export default function ProfilePage() {
  const { data: user, isLoading } = useCurrentUser();
  const updateProfile = useUpdateProfile();
  const { measurements, preferences, setMeasurements, setPreferences } = useUserStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
  });

  // Update form when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        gender: user.gender || '',
        dateOfBirth: user.dateOfBirth || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync(formData);
      setIsEditing(false);
      toastSuccess('Thành công', 'Đã cập nhật thông tin');
    } catch {
      toastError('Lỗi', 'Không thể cập nhật thông tin');
    }
  };

  if (isLoading) {
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

  const stylePreferences = preferences || {
    styles: ['Minimalist', 'Classic'],
    colors: ['Neutral', 'Earth Tones'],
    occasions: ['Công sở', 'Hàng ngày'],
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-border p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className="size-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="size-32 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-4xl font-bold border-4 border-white shadow-lg">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
              )}
              <button className="absolute -bottom-2 -right-2 size-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                <Camera className="size-5" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                {isEditing ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="input w-32"
                      placeholder="Họ"
                    />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="input w-32"
                      placeholder="Tên"
                    />
                  </div>
                ) : (
                  <h1 className="text-2xl font-bold text-text-main">
                    {user?.firstName} {user?.lastName}
                  </h1>
                )}
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1">
                  <Star className="size-3" />
                  Gold Member
                </span>
              </div>
              <p className="text-text-muted mb-4">{user?.email}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-text-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  Thành viên từ {new Date(user?.createdAt || Date.now()).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                </span>
                {(isEditing ? formData.gender : user?.gender) && (
                  <span className="flex items-center gap-1">
                    <User className="size-4" />
                    {isEditing ? formData.gender : user?.gender}
                  </span>
                )}
              </div>
            </div>

            {/* Edit Button */}
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-secondary-50 hover:bg-secondary-100 text-text-main font-medium rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  disabled={updateProfile.isPending}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {updateProfile.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  Lưu
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-secondary-50 hover:bg-secondary-100 text-text-main font-medium rounded-lg flex items-center gap-2 transition-colors"
              >
                <Edit className="size-4" />
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Info */}
          <section className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold text-text-main mb-6 flex items-center gap-2">
              <User className="size-5 text-primary" />
              Thông Tin Cá Nhân
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-text-muted">Họ tên</span>
                <span className="font-medium text-text-main">{user?.firstName} {user?.lastName}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-text-muted">Email</span>
                <span className="font-medium text-text-main">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-text-muted">Điện thoại</span>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input w-40 text-right"
                  />
                ) : (
                  <span className="font-medium text-text-main">{user?.phone || 'Chưa cập nhật'}</span>
                )}
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-text-muted">Giới tính</span>
                {isEditing ? (
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="input w-32"
                  >
                    <option value="">Chọn</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                ) : (
                  <span className="font-medium text-text-main">{user?.gender || 'Chưa cập nhật'}</span>
                )}
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-text-muted">Ngày sinh</span>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="input w-40"
                  />
                ) : (
                  <span className="font-medium text-text-main">
                    {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Measurements */}
          <section className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <Ruler className="size-5 text-primary" />
                Số Đo Cơ Thể
              </h2>
              <Link href="/body-scan" className="text-primary text-sm font-medium flex items-center gap-1">
                Cập nhật <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-secondary-50 rounded-xl">
                <p className="text-xs text-text-muted mb-1">Ngực</p>
                <p className="text-xl font-bold text-primary">{measurements?.bust || '-'} cm</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-xl">
                <p className="text-xs text-text-muted mb-1">Eo</p>
                <p className="text-xl font-bold text-primary">{measurements?.waist || '-'} cm</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-xl">
                <p className="text-xs text-text-muted mb-1">Hông</p>
                <p className="text-xl font-bold text-primary">{measurements?.hips || '-'} cm</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-xl">
                <p className="text-xs text-text-muted mb-1">Chiều cao</p>
                <p className="text-xl font-bold text-primary">{measurements?.height || '-'} cm</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-xl">
                <p className="text-xs text-text-muted mb-1">Cân nặng</p>
                <p className="text-xl font-bold text-primary">{measurements?.weight || '-'} kg</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-xl">
                <p className="text-xs text-text-muted mb-1">Size giày</p>
                <p className="text-xl font-bold text-primary">{measurements?.shoeSize || '-'}</p>
              </div>
            </div>
          </section>

          {/* Style Preferences */}
          <section className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                <Palette className="size-5 text-primary" />
                Sở Thích Phong Cách
              </h2>
              <Link href="/ai-stylist" className="text-primary text-sm font-medium flex items-center gap-1">
                Chỉnh sửa <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-muted mb-2">Phong cách</p>
                <div className="flex flex-wrap gap-2">
                  {stylePreferences.styles?.map((style: string) => (
                    <span key={style} className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2">Bảng màu</p>
                <div className="flex flex-wrap gap-2">
                  {stylePreferences.colors?.map((color: string) => (
                    <span key={color} className="px-3 py-1 bg-secondary-100 text-text-main text-sm font-medium rounded-full">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2">Dịp sử dụng</p>
                <div className="flex flex-wrap gap-2">
                  {stylePreferences.occasions?.map((occ: string) => (
                    <span key={occ} className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                      {occ}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Settings Links */}
          <section className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold text-text-main mb-6 flex items-center gap-2">
              <Shield className="size-5 text-primary" />
              Cài Đặt Tài Khoản
            </h2>
            <div className="space-y-2">
              {settingsLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 text-text-muted" />
                      <span className="font-medium text-text-main">{link.label}</span>
                    </div>
                    <ChevronRight className="size-5 text-text-muted" />
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
