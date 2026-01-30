/**
 * Admin Customers Management - Fashion AI
 * 
 * Quản lý khách hàng với API integration
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Crown, Mail, Eye, RefreshCw, Loader2, Users } from 'lucide-react';
import { useAdminCustomers, type AdminCustomerFilters } from '@/hooks/useAdmin';

const tierColors: Record<string, string> = {
  PLATINUM: 'bg-purple-100 text-purple-600',
  GOLD: 'bg-amber-100 text-amber-600',
  SILVER: 'bg-gray-100 text-gray-600',
  BRONZE: 'bg-orange-100 text-orange-600',
};

const tierFilters = [
  { value: '', label: 'Tất cả' },
  { value: 'PLATINUM', label: 'Platinum' },
  { value: 'GOLD', label: 'Gold' },
  { value: 'SILVER', label: 'Silver' },
];

export default function AdminCustomers() {
  const [filters, setFilters] = useState<AdminCustomerFilters>({ page: 1, limit: 10 });
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data, isLoading, refetch } = useAdminCustomers({ ...filters, search: searchQuery });

  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + '₫';
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', { month: '2-digit', year: 'numeric' });
  };

  const customers = data?.items || [];

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <h1 className="text-xl font-bold text-text-main">Quản Lý Khách Hàng</h1>
          </div>
          <button 
            onClick={() => refetch()}
            className="size-10 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-secondary-100"
          >
            <RefreshCw className="size-5 text-text-muted" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Tổng khách hàng</p>
            <p className="text-2xl font-bold text-text-main">{data?.meta.total || 0}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Platinum</p>
            <p className="text-2xl font-bold text-purple-600">
              {customers.filter(c => c.vipTier === 'PLATINUM').length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Gold</p>
            <p className="text-2xl font-bold text-amber-600">
              {customers.filter(c => c.vipTier === 'GOLD').length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Silver</p>
            <p className="text-2xl font-bold text-gray-600">
              {customers.filter(c => c.vipTier === 'SILVER').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên hoặc email..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            {tierFilters.map((tier) => (
              <button
                key={tier.value}
                onClick={() => setFilters({ ...filters, vipTier: tier.value || undefined, page: 1 })}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filters.vipTier === tier.value || (!filters.vipTier && !tier.value)
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-muted border border-border hover:border-primary'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
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
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-border last:border-0 hover:bg-secondary-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            {customer.avatar ? (
                              <img src={customer.avatar} alt="" className="size-10 rounded-full object-cover" />
                            ) : (
                              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {customer.name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-text-main">{customer.name}</p>
                              <p className="text-sm text-text-muted">{customer.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${tierColors[customer.vipTier || 'SILVER']}`}>
                            <Crown className="size-3" />
                            {customer.vipTier || 'Silver'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center text-text-main">{customer.totalOrders}</td>
                        <td className="py-4 px-6 text-right font-bold text-primary">{formatPrice(customer.totalSpent)}</td>
                        <td className="py-4 px-6 text-center text-text-muted">{formatDate(customer.createdAt)}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <Link 
                              href={`/admin/customers/${customer.id}`}
                              className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                            >
                              <Eye className="size-4" />
                            </Link>
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

              {/* Empty state */}
              {customers.length === 0 && (
                <div className="text-center py-16">
                  <Users className="size-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-muted">Không có khách hàng nào</p>
                </div>
              )}

              {/* Pagination */}
              {data && customers.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                  <p className="text-sm text-text-muted">
                    Trang {data.meta.page} / {data.meta.totalPages} ({data.meta.total} khách hàng)
                  </p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setFilters({ ...filters, page: (filters.page || 1) - 1 })}
                      disabled={(filters.page || 1) <= 1}
                      className="px-3 py-1 border border-border rounded-lg text-sm disabled:opacity-50"
                    >
                      Trước
                    </button>
                    <span className="px-3 py-1 bg-primary text-white rounded-lg text-sm">
                      {filters.page || 1}
                    </span>
                    <button 
                      onClick={() => setFilters({ ...filters, page: (filters.page || 1) + 1 })}
                      disabled={(filters.page || 1) >= data.meta.totalPages}
                      className="px-3 py-1 border border-border rounded-lg text-sm disabled:opacity-50"
                    >
                      Sau
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
