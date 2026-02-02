/**
 * Fashion AI - Admin Users
 */

'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  User as UserIcon,
  Shield,
  Loader2,
  Lock,
  Unlock
} from 'lucide-react';
import { useUsers, useToggleBlockUser } from '@/hooks/use-users';
import { formatDate } from '@/lib/utils/format';
import { useAuthStore } from '@/stores/auth-store';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const { data: usersData, isLoading } = useUsers({ limit: 50, search });
  const { mutate: toggleBlock, isPending: isToggling } = useToggleBlockUser();
  const currentUser = useAuthStore(state => state.user);

  const users = usersData?.data || [];

  const handleToggleBlock = (user: any) => {
     if (user.id === currentUser?.id) {
         alert('Bạn không thể chặn chính mình!');
         return;
     }
     if (confirm(`Bạn có chắc chắn muốn ${user.isActive ? 'chặn' : 'bỏ chặn'} người dùng này?`)) {
         toggleBlock(user.id);
     }
  };

  if (isLoading) {
      return (
          <div className="flex items-center justify-center h-96">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
      );
  }

  return (
    <div className="space-y-6">
      <div>
           <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
           <p className="text-secondary">Danh sách khách hàng và quản trị viên</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#1e1a14] p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input 
                 type="text" 
                 placeholder="Tìm kiếm theo tên, email..." 
                 className="input pl-10 w-full"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
              />
          </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1e1a14] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                          <th className="p-4 font-medium text-secondary text-sm">Người dùng</th>
                          <th className="p-4 font-medium text-secondary text-sm">Email</th>
                          <th className="p-4 font-medium text-secondary text-sm">Vai trò</th>
                          <th className="p-4 font-medium text-secondary text-sm">Ngày tham gia</th>
                          <th className="p-4 font-medium text-secondary text-sm">Trạng thái</th>
                          <th className="p-4 font-medium text-secondary text-sm text-right">Thao tác</th>
                      </tr>
                  </thead>
                  <tbody>
                      {users.length > 0 ? users.map((u) => (
                          <tr key={u.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                              <td className="p-4">
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 overflow-hidden">
                                          {u.avatar ? (
                                              /* eslint-disable-next-line @next/next/no-img-element */
                                              <img src={u.avatar} alt="" className="w-full h-full object-cover" />
                                          ) : (
                                              <UserIcon className="w-5 h-5 text-secondary" />
                                          )}
                                      </div>
                                      <div>
                                          <p className="font-medium text-sm">{u.firstName} {u.lastName}</p>
                                          {u.id === currentUser?.id && <span className="text-xs text-primary font-bold">(Bạn)</span>}
                                      </div>
                                  </div>
                              </td>
                              <td className="p-4 text-sm">{u.email}</td>
                              <td className="p-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                      {u.role}
                                  </span>
                              </td>
                              <td className="p-4 text-sm text-secondary">
                                  {formatDate(u.createdAt)}
                              </td>
                              <td className="p-4">
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                      {u.isActive ? 'Hoạt động' : 'Bị chặn'}
                                  </span>
                              </td>
                              <td className="p-4 text-right">
                                  <button 
                                      onClick={() => handleToggleBlock(u)}
                                      disabled={u.id === currentUser?.id || isToggling}
                                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-secondary hover:text-red-500 transition-colors disabled:opacity-50"
                                      title={u.isActive ? 'Chặn' : 'Mở chặn'}
                                  >
                                      {u.isActive ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                                  </button>
                              </td>
                          </tr>
                      )) : (
                          <tr>
                              <td colSpan={6} className="p-8 text-center text-secondary">
                                  Không tìm thấy người dùng nào.
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}
