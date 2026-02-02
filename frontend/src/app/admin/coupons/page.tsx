/**
 * Fashion AI - Admin Mã Giảm Giá
 * 
 * Quản lý coupons
 */

'use client';

import { Plus, Search, Edit2, Trash2, Tag, Copy, Check } from 'lucide-react';

// Mock coupons data
const coupons = [
  { id: 1, code: 'TET2026', discount: '20%', type: 'percent', minOrder: 500000, maxDiscount: 200000, used: 156, limit: 500, status: 'active', expiry: '28/02/2026' },
  { id: 2, code: 'WELCOME10', discount: '10%', type: 'percent', minOrder: 0, maxDiscount: 100000, used: 1234, limit: null, status: 'active', expiry: '31/12/2026' },
  { id: 3, code: 'FREESHIP', discount: '30,000đ', type: 'fixed', minOrder: 300000, maxDiscount: null, used: 89, limit: 200, status: 'active', expiry: '15/02/2026' },
  { id: 4, code: 'SALE50', discount: '50%', type: 'percent', minOrder: 1000000, maxDiscount: 500000, used: 50, limit: 50, status: 'expired', expiry: '01/02/2026' },
];

// Format giá tiền
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export default function AdminCouponsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Mã giảm giá</h1>
        <button className="btn-primary">
          <Plus className="w-5 h-5" />
          Tạo mã mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <p className="text-2xl font-bold">12</p>
          <p className="text-sm text-secondary">Đang hoạt động</p>
        </div>
        <div className="card p-4">
          <p className="text-2xl font-bold">1,529</p>
          <p className="text-sm text-secondary">Đã sử dụng</p>
        </div>
        <div className="card p-4">
          <p className="text-2xl font-bold text-primary">45.5M</p>
          <p className="text-sm text-secondary">Tổng giảm giá</p>
        </div>
        <div className="card p-4">
          <p className="text-2xl font-bold">5</p>
          <p className="text-sm text-secondary">Hết hạn</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm mã..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary transition-all"
          />
        </div>
        <select className="h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary appearance-none cursor-pointer">
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="expired">Hết hạn</option>
        </select>
      </div>

      {/* Coupons Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {coupons.map((coupon) => (
          <div key={coupon.id} className={`card p-5 border-l-4 ${coupon.status === 'active' ? 'border-l-green-500' : 'border-l-gray-400'}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Tag className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-lg">{coupon.code}</p>
                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Copy className="w-4 h-4 text-secondary" />
                    </button>
                  </div>
                  <p className="text-sm text-secondary">Giảm {coupon.discount}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                coupon.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'
              }`}>
                {coupon.status === 'active' ? 'Hoạt động' : 'Hết hạn'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div>
                <p className="text-secondary">Đơn tối thiểu</p>
                <p className="font-medium">{coupon.minOrder ? formatPrice(coupon.minOrder) : 'Không'}</p>
              </div>
              <div>
                <p className="text-secondary">Giảm tối đa</p>
                <p className="font-medium">{coupon.maxDiscount ? formatPrice(coupon.maxDiscount) : 'Không giới hạn'}</p>
              </div>
              <div>
                <p className="text-secondary">Đã sử dụng</p>
                <p className="font-medium">{coupon.used}{coupon.limit ? `/${coupon.limit}` : ''}</p>
              </div>
              <div>
                <p className="text-secondary">Hết hạn</p>
                <p className="font-medium">{coupon.expiry}</p>
              </div>
            </div>

            {/* Progress bar */}
            {coupon.limit && (
              <div className="mb-4">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(coupon.used / coupon.limit) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button className="btn-outline flex-1 h-9 text-sm">
                <Edit2 className="w-4 h-4" />
                Sửa
              </button>
              <button className="h-9 px-3 rounded-full border border-red-500 text-red-500 text-sm hover:bg-red-50 dark:hover:bg-red-900/20">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
