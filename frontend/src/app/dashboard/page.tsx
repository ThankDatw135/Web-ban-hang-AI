/**
 * Fashion AI - Thông Tin Cá Nhân
 * 
 * Trang hiển thị và chỉnh sửa thông tin user
 */

'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Save } from 'lucide-react';

export default function DashboardProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Thông tin cá nhân</h1>

      {/* Avatar section */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold">Nguyễn Văn A</h2>
            <p className="text-secondary text-sm">Thành viên từ 01/2026</p>
            <p className="text-xs text-accent font-medium mt-1">✨ Gold Member</p>
          </div>
        </div>
      </div>

      {/* Profile form */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Thông tin chi tiết</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-primary font-medium hover:underline"
          >
            {isEditing ? 'Hủy' : 'Chỉnh sửa'}
          </button>
        </div>

        <form className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Full name */}
            <div>
              <label className="block text-sm font-medium mb-2">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  defaultValue="Nguyễn Văn A"
                  disabled={!isEditing}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:bg-gray-50 dark:disabled:bg-[#25221d] disabled:text-secondary"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  defaultValue="user@example.com"
                  disabled={!isEditing}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:bg-gray-50 dark:disabled:bg-[#25221d] disabled:text-secondary"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">Số điện thoại</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  defaultValue="0901234567"
                  disabled={!isEditing}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:bg-gray-50 dark:disabled:bg-[#25221d] disabled:text-secondary"
                />
              </div>
            </div>

            {/* Birthday */}
            <div>
              <label className="block text-sm font-medium mb-2">Ngày sinh</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  defaultValue="1995-01-15"
                  disabled={!isEditing}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:bg-gray-50 dark:disabled:bg-[#25221d] disabled:text-secondary"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-2">Địa chỉ</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <textarea
                defaultValue="123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh"
                disabled={!isEditing}
                rows={2}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:bg-gray-50 dark:disabled:bg-[#25221d] disabled:text-secondary resize-none"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-2">Giới tính</label>
            <div className="flex gap-4">
              {['Nam', 'Nữ', 'Khác'].map((gender) => (
                <label key={gender} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="gender" 
                    value={gender}
                    defaultChecked={gender === 'Nam'}
                    disabled={!isEditing}
                    className="w-4 h-4 text-primary focus:ring-primary" 
                  />
                  <span className="text-sm">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Save button */}
          {isEditing && (
            <button type="submit" className="btn-primary">
              <Save className="w-5 h-5" />
              Lưu thay đổi
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
