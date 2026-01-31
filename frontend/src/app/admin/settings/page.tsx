/**
 * Admin Settings - Fashion AI
 * 
 * Cấu hình hệ thống với API integration
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, Mail, CreditCard, Truck, Shield, Save, Loader2, RefreshCw } from 'lucide-react';
import { useAdminSettings, useSaveAdminSettings, type AdminSettings } from '@/hooks/useAdmin';
import { toastSuccess, toastError } from '@/stores';

const settingsSections = [
  { id: 'general', label: 'Cài đặt chung', icon: Globe },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'payment', label: 'Thanh toán', icon: CreditCard },
  { id: 'shipping', label: 'Vận chuyển', icon: Truck },
  { id: 'security', label: 'Bảo mật', icon: Shield },
];

const defaultSettings: AdminSettings = {
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

};

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const { data: savedSettings, isLoading, refetch } = useAdminSettings();
  const saveSettings = useSaveAdminSettings();

  useEffect(() => {
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, [savedSettings]);

  const updateSetting = <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => {
    setSettings(s => ({ ...s, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      await saveSettings.mutateAsync(settings);
      toastSuccess('Thành công', 'Đã lưu cài đặt!');
      setHasChanges(false);
    } catch {
      toastError('Lỗi', 'Không thể lưu cài đặt');
    }
  };

  const Toggle = ({ value, onChange, danger = false }: { value: boolean; onChange: () => void; danger?: boolean }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        value 
          ? (danger ? 'bg-red-500' : 'bg-green-500') 
          : 'bg-gray-300'
      }`}
    >
      <div className={`absolute top-1 size-4 bg-white rounded-full transition-transform ${value ? 'left-7' : 'left-1'}`} />
    </button>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

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
          <div className="flex items-center gap-2">
            <button 
              onClick={() => refetch()}
              className="size-10 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-secondary-100"
            >
              <RefreshCw className="size-5 text-text-muted" />
            </button>
            <button 
              onClick={handleSave}
              disabled={saveSettings.isPending || !hasChanges}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50"
            >
              {saveSettings.isPending ? <Loader2 className="size-5 animate-spin" /> : <Save className="size-5" />}
              Lưu thay đổi
            </button>
          </div>
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
                    onChange={(e) => updateSetting('storeName', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Email liên hệ</label>
                  <input
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => updateSetting('storeEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Currency</label>
                    <select 
                      value={settings.currency}
                      onChange={(e) => updateSetting('currency', e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                    >
                      <option value="VND">VND - Việt Nam Đồng</option>
                      <option value="USD">USD - US Dollar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Timezone</label>
                    <select 
                      value={settings.timezone}
                      onChange={(e) => updateSetting('timezone', e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                    >
                      <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7)</option>
                      <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                  <div>
                    <p className="font-medium text-red-600">Chế độ bảo trì</p>
                    <p className="text-sm text-red-500">Tạm ngưng website để bảo trì</p>
                  </div>
                  <Toggle 
                    value={settings.maintenance} 
                    onChange={() => updateSetting('maintenance', !settings.maintenance)}
                    danger
                  />
                </div>
              </div>
            )}

            {activeSection === 'email' && (
              <div className="space-y-4">
                <h2 className="font-bold text-text-main mb-4">Cài Đặt Email</h2>
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                  <div>
                    <p className="font-medium text-text-main">Thông báo qua email</p>
                    <p className="text-sm text-text-muted">Bật/tắt tất cả thông báo email</p>
                  </div>
                  <Toggle 
                    value={settings.emailNotifications} 
                    onChange={() => updateSetting('emailNotifications', !settings.emailNotifications)} 
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                  <div>
                    <p className="font-medium text-text-main">Xác nhận đơn hàng</p>
                    <p className="text-sm text-text-muted">Gửi email khi có đơn hàng mới</p>
                  </div>
                  <Toggle 
                    value={settings.orderConfirmation} 
                    onChange={() => updateSetting('orderConfirmation', !settings.orderConfirmation)} 
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                  <div>
                    <p className="font-medium text-text-main">Cập nhật vận chuyển</p>
                    <p className="text-sm text-text-muted">Thông báo trạng thái đơn hàng</p>
                  </div>
                  <Toggle 
                    value={settings.shippingUpdate} 
                    onChange={() => updateSetting('shippingUpdate', !settings.shippingUpdate)} 
                  />
                </div>
              </div>
            )}

            {activeSection === 'payment' && (
              <div className="space-y-4">
                <h2 className="font-bold text-text-main mb-4">Phương Thức Thanh Toán</h2>
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                      COD
                    </div>
                    <div>
                      <p className="font-medium text-text-main">COD</p>
                      <p className="text-sm text-text-muted">Thanh toán khi nhận hàng</p>
                    </div>
                  </div>
                  <Toggle value={settings.cod} onChange={() => updateSetting('cod', !settings.cod)} />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                      VNPAY
                    </div>
                    <div>
                      <p className="font-medium text-text-main">VNPay</p>
                      <p className="text-sm text-text-muted">Thanh toán qua VNPay</p>
                    </div>
                  </div>
                  <Toggle value={settings.vnpay} onChange={() => updateSetting('vnpay', !settings.vnpay)} />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                      M
                    </div>
                    <div>
                      <p className="font-medium text-text-main">MoMo</p>
                      <p className="text-sm text-text-muted">Thanh toán qua ví MoMo</p>
                    </div>
                  </div>
                  <Toggle value={settings.momo} onChange={() => updateSetting('momo', !settings.momo)} />
                </div>
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
                    onChange={(e) => updateSetting('freeShippingThreshold', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                  />
                  <p className="text-sm text-text-muted mt-2">
                    Đơn hàng từ {settings.freeShippingThreshold.toLocaleString('vi-VN')}₫ sẽ được miễn phí vận chuyển
                  </p>
                </div>
              </div>
            )}


          </div>
        </div>
      </main>
    </div>
  );
}
