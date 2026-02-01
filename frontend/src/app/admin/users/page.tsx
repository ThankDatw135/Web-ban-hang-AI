/**
 * Fashion AI - Admin Users Management
 * 
 * Quản lý khách hàng
 */

'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { getAdminUsers } from '@/lib/api/admin/users';
import { Loader2 } from 'lucide-react';

// Format currency for Vietnamese market
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');

  // Fetch users from API
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['admin-users', search],
    queryFn: () => getAdminUsers({ search: search || undefined, limit: 50 }),
  });

  const users = usersData?.items || [];
  const totalCount = usersData?.meta?.total || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Khách hàng</h1>
        <p className="text-gray-600">{totalCount} khách hàng</p>
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
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  Không tìm thấy khách hàng
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {user.avatar ? (
                          <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{user.phone || '-'}</td>
                  <td className="p-4">{user._count?.orders || 0}</td>
                  <td className="p-4 font-semibold text-primary">-</td>
                  <td className="p-4 text-gray-600">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
