/**
 * Admin Promotions Management - Fashion AI
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Tag, Calendar, Percent, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const promotions = [
  { id: '1', name: 'Flash Sale Tết', code: 'TET2024', discount: '30%', type: 'percent', startDate: '01/02/2024', endDate: '10/02/2024', usage: 156, limit: 500, active: true },
  { id: '2', name: 'Giảm 100K', code: 'GIAM100K', discount: '100.000₫', type: 'fixed', startDate: '20/01/2024', endDate: '31/01/2024', usage: 89, limit: 200, active: true },
  { id: '3', name: 'VIP Exclusive', code: 'VIP50', discount: '50%', type: 'percent', startDate: '01/01/2024', endDate: '31/12/2024', usage: 45, limit: null, active: true },
  { id: '4', name: 'First Order', code: 'WELCOME', discount: '15%', type: 'percent', startDate: '01/01/2024', endDate: '31/12/2024', usage: 234, limit: null, active: false },
];

export default function AdminPromotions() {
  const [promos, setPromos] = useState(promotions);

  const toggleActive = (id: string) => {
    setPromos(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <h1 className="text-xl font-bold text-text-main">Quản Lý Khuyến Mãi</h1>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90">
            <Plus className="size-5" />
            Tạo khuyến mãi
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Đang hoạt động</p>
            <p className="text-2xl font-bold text-green-600">{promos.filter(p => p.active).length}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Tổng lượt dùng</p>
            <p className="text-2xl font-bold text-text-main">{promos.reduce((sum, p) => sum + p.usage, 0)}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Tổng khuyến mãi</p>
            <p className="text-2xl font-bold text-text-main">{promos.length}</p>
          </div>
        </div>

        {/* Promotions List */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary-50 border-b border-border">
                <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Tên</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Code</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Giảm</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Thời gian</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Đã dùng</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Trạng thái</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo) => (
                <tr key={promo.id} className="border-b border-border last:border-0">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-xl flex items-center justify-center ${promo.type === 'percent' ? 'bg-purple-50' : 'bg-green-50'}`}>
                        {promo.type === 'percent' ? <Percent className="size-5 text-purple-600" /> : <Tag className="size-5 text-green-600" />}
                      </div>
                      <span className="font-medium text-text-main">{promo.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <code className="px-2 py-1 bg-secondary-100 rounded text-sm font-mono">{promo.code}</code>
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-primary">{promo.discount}</td>
                  <td className="py-4 px-6 text-center text-text-muted text-sm">
                    {promo.startDate} - {promo.endDate}
                  </td>
                  <td className="py-4 px-6 text-center text-text-main">
                    {promo.usage}{promo.limit ? `/${promo.limit}` : ''}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button onClick={() => toggleActive(promo.id)}>
                      {promo.active ? (
                        <ToggleRight className="size-8 text-green-600" />
                      ) : (
                        <ToggleLeft className="size-8 text-text-muted" />
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="size-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100">
                        <Edit className="size-4" />
                      </button>
                      <button className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
