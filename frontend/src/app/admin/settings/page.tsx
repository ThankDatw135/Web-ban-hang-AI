/**
 * Admin Settings - Fashion AI
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings, Globe, Mail, CreditCard, Truck, Shield, Save } from 'lucide-react';

const settingsSections = [
  { id: 'general', label: 'Cài đặt chung', icon: Globe },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'payment', label: 'Thanh toán', icon: CreditCard },
  { id: 'shipping', label: 'Vận chuyển', icon: Truck },
  { id: 'security', label: 'Bảo mật', icon: Shield },
];

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    storeName: 'Fashion AI',
    storeEmail: 'contact@fashionai.vn',
    currency: 'VND',
    timezone: 'Asia/Ho_Chi_Minh',
    maintenance: false,
    emailNotifications: true,
    orderConfirmation: true,
    shippingUpdate: true,
    cod: true,
    vnpay: true,
    momo: true,
    freeShippingThreshold: 500000,
    twoFactor: true,
  });

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <h1 className="text-xl font-bold text-text-main">Cài Đặt Hệ Thống</h1>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90">
            <Save className="size-5" />
            Lưu thay đổi
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-56 space-y-1">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeSection === section.id ? 'bg-primary text-white' : 'text-text-muted hover:bg-white'
                  }`}
                >
                  <Icon className="size-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-2xl border border-border p-6">
            {activeSection === 'general' && (
              <div className="space-y-6">
                <h2 className="font-bold text-text-main mb-4">Cài Đặt Chung</h2>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Tên cửa hàng</label>
                  <input
                    type="text"
                    value={settings.storeName}
                    onChange={(e) => setSettings(s => ({ ...s, storeName: e.target.value }))}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Email liên hệ</label>
                  <input
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => setSettings(s => ({ ...s, storeEmail: e.target.value }))}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                  <div>
                    <p className="font-medium text-text-main">Chế độ bảo trì</p>
                    <p className="text-sm text-text-muted">Tạm ngưng website để bảo trì</p>
                  </div>
                  <button
                    onClick={() => setSettings(s => ({ ...s, maintenance: !s.maintenance }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${settings.maintenance ? 'bg-red-500' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 size-4 bg-white rounded-full transition-transform ${settings.maintenance ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'email' && (
              <div className="space-y-4">
                <h2 className="font-bold text-text-main mb-4">Cài Đặt Email</h2>
                {[
                  { key: 'orderConfirmation', label: 'Xác nhận đơn hàng', desc: 'Gửi email khi có đơn hàng mới' },
                  { key: 'shippingUpdate', label: 'Cập nhật vận chuyển', desc: 'Thông báo trạng thái đơn hàng' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                    <div>
                      <p className="font-medium text-text-main">{item.label}</p>
                      <p className="text-sm text-text-muted">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setSettings(s => ({ ...s, [item.key]: !s[item.key as keyof typeof s] }))}
                      className={`relative w-12 h-6 rounded-full transition-colors ${settings[item.key as keyof typeof settings] ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 size-4 bg-white rounded-full transition-transform ${settings[item.key as keyof typeof settings] ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'payment' && (
              <div className="space-y-4">
                <h2 className="font-bold text-text-main mb-4">Phương Thức Thanh Toán</h2>
                {[
                  { key: 'cod', label: 'COD', desc: 'Thanh toán khi nhận hàng' },
                  { key: 'vnpay', label: 'VNPay', desc: 'Thanh toán qua VNPay' },
                  { key: 'momo', label: 'MoMo', desc: 'Thanh toán qua ví MoMo' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                    <div>
                      <p className="font-medium text-text-main">{item.label}</p>
                      <p className="text-sm text-text-muted">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setSettings(s => ({ ...s, [item.key]: !s[item.key as keyof typeof s] }))}
                      className={`relative w-12 h-6 rounded-full transition-colors ${settings[item.key as keyof typeof settings] ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 size-4 bg-white rounded-full transition-transform ${settings[item.key as keyof typeof settings] ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'shipping' && (
              <div className="space-y-6">
                <h2 className="font-bold text-text-main mb-4">Cài Đặt Vận Chuyển</h2>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Miễn phí ship từ (VNĐ)</label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => setSettings(s => ({ ...s, freeShippingThreshold: Number(e.target.value) }))}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-4">
                <h2 className="font-bold text-text-main mb-4">Bảo Mật</h2>
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                  <div>
                    <p className="font-medium text-text-main">Xác thực 2 bước</p>
                    <p className="text-sm text-text-muted">Yêu cầu OTP khi đăng nhập admin</p>
                  </div>
                  <button
                    onClick={() => setSettings(s => ({ ...s, twoFactor: !s.twoFactor }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${settings.twoFactor ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 size-4 bg-white rounded-full transition-transform ${settings.twoFactor ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
