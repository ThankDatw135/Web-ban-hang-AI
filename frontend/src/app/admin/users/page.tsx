/**
 * Fashion AI - Admin Users Management
 * 
 * Quản lý khách hàng
 */

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

// Mock users
const mockUsers = [
  { id: '1', name: 'Nguyễn Văn A', email: 'a@email.com', phone: '0901234567', orders: 12, spent: '15.200.000đ', joined: '15/01/2026' },
  { id: '2', name: 'Trần Thị B', email: 'b@email.com', phone: '0909876543', orders: 8, spent: '9.800.000đ', joined: '10/01/2026' },
  { id: '3', name: 'Lê Văn C', email: 'c@email.com', phone: '0908765432', orders: 3, spent: '2.500.000đ', joined: '05/01/2026' },
  { id: '4', name: 'Phạm Thị D', email: 'd@email.com', phone: '0907654321', orders: 25, spent: '42.000.000đ', joined: '01/12/2025' },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Khách hàng</h1>
        <p className="text-gray-600">{mockUsers.length} khách hàng</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên hoặc email..."
          className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-sm">Khách hàng</th>
              <th className="text-left p-4 font-semibold text-sm">Số điện thoại</th>
              <th className="text-left p-4 font-semibold text-sm">Đơn hàng</th>
              <th className="text-left p-4 font-semibold text-sm">Chi tiêu</th>
              <th className="text-left p-4 font-semibold text-sm">Tham gia</th>
              <th className="text-center p-4 font-semibold text-sm">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                    </div>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{user.phone}</td>
                <td className="p-4">{user.orders}</td>
                <td className="p-4 font-semibold text-primary">{user.spent}</td>
                <td className="p-4 text-gray-600">{user.joined}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">mail</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
