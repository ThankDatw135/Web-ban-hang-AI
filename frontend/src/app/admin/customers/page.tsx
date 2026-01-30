/**
 * Admin Customers Management - Fashion AI
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Users, Crown, Mail, Eye, Ban } from 'lucide-react';

const customers = [
  { id: '1', name: 'Ngọc Anh', email: 'ngocanh@email.com', tier: 'Platinum', orders: 24, spent: 45000000, joinDate: '01/2023' },
  { id: '2', name: 'Minh Tuấn', email: 'minhtuan@email.com', tier: 'Gold', orders: 12, spent: 18000000, joinDate: '06/2023' },
  { id: '3', name: 'Thanh Hằng', email: 'thanhhang@email.com', tier: 'Silver', orders: 5, spent: 7500000, joinDate: '10/2023' },
  { id: '4', name: 'Hoàng Nam', email: 'hoangnam@email.com', tier: 'Silver', orders: 3, spent: 4500000, joinDate: '12/2023' },
  { id: '5', name: 'Lan Anh', email: 'lananh@email.com', tier: 'Gold', orders: 15, spent: 22000000, joinDate: '03/2023' },
];

const tierColors: Record<string, string> = {
  Platinum: 'bg-purple-100 text-purple-600',
  Gold: 'bg-amber-100 text-amber-600',
  Silver: 'bg-gray-100 text-gray-600',
};

export default function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState('');

  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + '₫';

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
            <ArrowLeft className="size-5 text-text-muted" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">Quản Lý Khách Hàng</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Tổng khách hàng</p>
            <p className="text-2xl font-bold text-text-main">{customers.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Platinum</p>
            <p className="text-2xl font-bold text-purple-600">{customers.filter(c => c.tier === 'Platinum').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Gold</p>
            <p className="text-2xl font-bold text-amber-600">{customers.filter(c => c.tier === 'Gold').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Silver</p>
            <p className="text-2xl font-bold text-gray-600">{customers.filter(c => c.tier === 'Silver').length}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên hoặc email..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:border-primary"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary-50 border-b border-border">
                <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Khách hàng</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Hạng</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Đơn hàng</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-text-muted">Tổng chi tiêu</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Ngày tham gia</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer.id} className="border-b border-border last:border-0">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-text-main">{customer.name}</p>
                      <p className="text-sm text-text-muted">{customer.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${tierColors[customer.tier]}`}>
                      <Crown className="size-3" />
                      {customer.tier}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center text-text-main">{customer.orders}</td>
                  <td className="py-4 px-6 text-right font-bold text-primary">{formatPrice(customer.spent)}</td>
                  <td className="py-4 px-6 text-center text-text-muted">{customer.joinDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100">
                        <Eye className="size-4" />
                      </button>
                      <button className="size-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100">
                        <Mail className="size-4" />
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
