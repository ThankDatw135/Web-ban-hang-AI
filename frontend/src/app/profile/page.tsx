/**
 * Fashion AI User Profile - Fashion AI
 * 
 * Trang profile người dùng:
 * - Avatar và thông tin cá nhân
 * - Body measurements
 * - Style preferences
 * - Account settings links
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Camera, 
  Edit, 
  Mail, 
  Phone, 
  MapPin,
  Ruler,
  Palette,
  Shield,
  ChevronRight,
  Save,
  User,
  Calendar,
  Star
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock user data
const userData = {
  name: 'Ngọc Anh',
  email: 'ngocanh@example.com',
  phone: '+84 912 345 678',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
  memberSince: 'Tháng 3, 2023',
  tier: 'Gold',
  dob: '15/05/1995',
  gender: 'Nữ',
  address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
};

const measurements = {
  bust: 88,
  waist: 66,
  hips: 94,
  height: 165,
  weight: 52,
  shoeSize: 37,
};

const stylePreferences = {
  styles: ['Minimalist', 'Classic'],
  colors: ['Neutral', 'Earth Tones'],
  occasions: ['Công sở', 'Hàng ngày'],
  budget: 'Vừa phải',
};

const settingsLinks = [
  { label: 'Địa chỉ giao hàng', href: '/settings/addresses', icon: MapPin },
  { label: 'Phương thức thanh toán', href: '/settings/payment', icon: Shield },
  { label: 'Thông báo', href: '/notifications', icon: Mail },
  { label: 'Bảo mật tài khoản', href: '/settings/security', icon: Shield },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-border p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="size-32 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute -bottom-2 -right-2 size-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                <Camera className="size-5" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-text-main">{userData.name}</h1>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1">
                  <Star className="size-3" />
                  {userData.tier} Member
                </span>
              </div>
              <p className="text-text-muted mb-4">{userData.email}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-text-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  Thành viên từ {userData.memberSince}
                </span>
                <span className="flex items-center gap-1">
                  <User className="size-4" />
                  {userData.gender}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-secondary-50 hover:bg-secondary-100 text-text-main font-medium rounded-lg flex items-center gap-2 transition-colors"
            >
              <Edit className="size-4" />
              Chỉnh sửa
            </button>
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
                <span className="font-medium text-text-main">{userData.name}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-text-muted">Email</span>
                <span className="font-medium text-text-main">{userData.email}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-text-muted">Điện thoại</span>
                <span className="font-medium text-text-main">{userData.phone}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-text-muted">Ngày sinh</span>
                <span className="font-medium text-text-main">{userData.dob}</span>
              </div>
              <div className="flex items-start justify-between py-3">
                <span className="text-text-muted">Địa chỉ</span>
                <span className="font-medium text-text-main text-right max-w-[200px]">{userData.address}</span>
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
                <p className="text-xl font-bold text-primary">{measurements.bust} cm</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-xl">
                <p className="text-xs text-text-muted mb-1">Eo</p>
                <p className="text-xl font-bold text-primary">{measurements.waist} cm</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-xl">
                <p className="text-xs text-text-muted mb-1">Hông</p>
                <p className="text-xl font-bold text-primary">{measurements.hips} cm</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-xl">
                <p className="text-xs text-text-muted mb-1">Chiều cao</p>
                <p className="text-xl font-bold text-primary">{measurements.height} cm</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-xl">
                <p className="text-xs text-text-muted mb-1">Cân nặng</p>
                <p className="text-xl font-bold text-primary">{measurements.weight} kg</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-xl">
                <p className="text-xs text-text-muted mb-1">Size giày</p>
                <p className="text-xl font-bold text-primary">{measurements.shoeSize}</p>
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
                  {stylePreferences.styles.map((style) => (
                    <span key={style} className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2">Bảng màu</p>
                <div className="flex flex-wrap gap-2">
                  {stylePreferences.colors.map((color) => (
                    <span key={color} className="px-3 py-1 bg-secondary-100 text-text-main text-sm font-medium rounded-full">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2">Dịp sử dụng</p>
                <div className="flex flex-wrap gap-2">
                  {stylePreferences.occasions.map((occ) => (
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
