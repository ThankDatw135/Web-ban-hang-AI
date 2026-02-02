/**
 * Fashion AI - Cài Đặt
 * 
 * Trang cài đặt tài khoản user
 */

'use client';

import { useState } from 'react';
import { Lock, Bell, Moon, Globe, Shield, Save, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cài đặt</h1>

      {/* Change Password */}
      <div className="card p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Đổi mật khẩu
        </h2>

        <form className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-2">Mật khẩu hiện tại</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu hiện tại"
                className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mật khẩu mới</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu mới"
                className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <button type="submit" className="btn-primary">
            <Save className="w-5 h-5" />
            Cập nhật mật khẩu
          </button>
        </form>
      </div>

      {/* Notifications */}
      <div className="card p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Thông báo
        </h2>

        <div className="space-y-4 max-w-md">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">Thông báo Email</p>
              <p className="text-sm text-secondary">Nhận thông báo qua email</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
              className="w-5 h-5 rounded text-primary focus:ring-primary"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">Thông báo đẩy</p>
              <p className="text-sm text-secondary">Nhận thông báo trên trình duyệt</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
              className="w-5 h-5 rounded text-primary focus:ring-primary"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">Thông báo SMS</p>
              <p className="text-sm text-secondary">Nhận thông báo qua tin nhắn</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
              className="w-5 h-5 rounded text-primary focus:ring-primary"
            />
          </label>
        </div>
      </div>

      {/* Appearance */}
      <div className="card p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Moon className="w-5 h-5 text-primary" />
          Giao diện
        </h2>

        <div className="flex items-center justify-between max-w-md">
          <div>
            <p className="font-medium">Chế độ tối</p>
            <p className="text-sm text-secondary">Bật/tắt dark mode</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-14 h-8 rounded-full transition-colors relative ${
              darkMode ? 'bg-primary' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                darkMode ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Language */}
      <div className="card p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Ngôn ngữ
        </h2>

        <div className="max-w-md">
          <select className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary appearance-none cursor-pointer">
            <option value="vi">🇻🇳 Tiếng Việt</option>
            <option value="en">🇺🇸 English</option>
          </select>
        </div>
      </div>

      {/* Privacy */}
      <div className="card p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Bảo mật
        </h2>

        <div className="space-y-4 max-w-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Xác thực 2 yếu tố</p>
              <p className="text-sm text-secondary">Tăng cường bảo mật tài khoản</p>
            </div>
            <button className="btn-outline h-10 text-sm">Thiết lập</button>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-red-500">Xóa tài khoản</p>
              <p className="text-sm text-secondary">Xóa vĩnh viễn tài khoản của bạn</p>
            </div>
            <button className="h-10 px-4 rounded-full border border-red-500 text-red-500 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
