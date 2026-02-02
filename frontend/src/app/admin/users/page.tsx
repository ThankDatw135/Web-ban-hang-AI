/**
 * Fashion AI - Admin Quản Lý Người Dùng
 * 
 * Danh sách users với filter và actions
 */

'use client';

import { Search, Eye, Edit2, Ban, Users, UserCheck, UserX } from 'lucide-react';

// Mock users data
const users = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@email.com', phone: '0901234567', orders: 5, status: 'active', joined: '15/01/2026' },
  { id: 2, name: 'Trần Thị B', email: 'b@email.com', phone: '0912345678', orders: 3, status: 'active', joined: '20/01/2026' },
  { id: 3, name: 'Lê Văn C', email: 'c@email.com', phone: '0923456789', orders: 0, status: 'inactive', joined: '25/01/2026' },
  { id: 4, name: 'Phạm Thị D', email: 'd@email.com', phone: '0934567890', orders: 12, status: 'active', joined: '01/01/2026' },
  { id: 5, name: 'Hoàng Văn E', email: 'e@email.com', phone: '0945678901', orders: 1, status: 'banned', joined: '10/01/2026' },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý người dùng</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-xl font-bold">5,678</p>
            <p className="text-xs text-secondary">Tổng người dùng</p>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-xl font-bold">5,432</p>
            <p className="text-xs text-secondary">Đang hoạt động</p>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <UserX className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-xl font-bold">23</p>
            <p className="text-xs text-secondary">Bị cấm</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary transition-all"
          />
        </div>
        <select className="h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary appearance-none cursor-pointer">
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Không hoạt động</option>
          <option value="banned">Bị cấm</option>
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-secondary bg-gray-50 dark:bg-[#2c2822]">
                <th className="p-4 font-medium">Người dùng</th>
                <th className="p-4 font-medium">Điện thoại</th>
                <th className="p-4 font-medium">Đơn hàng</th>
                <th className="p-4 font-medium">Trạng thái</th>
                <th className="p-4 font-medium">Ngày tham gia</th>
                <th className="p-4 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-secondary">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{user.phone}</td>
                  <td className="p-4 text-sm">{user.orders}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      user.status === 'active' ? 'bg-green-500/10 text-green-500' :
                      user.status === 'inactive' ? 'bg-gray-500/10 text-gray-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {user.status === 'active' ? 'Hoạt động' : 
                       user.status === 'inactive' ? 'Không hoạt động' : 'Bị cấm'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-secondary">{user.joined}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Eye className="w-4 h-4 text-secondary" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Edit2 className="w-4 h-4 text-secondary" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Ban className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
