/**
 * Admin Inventory Management - Fashion AI
 * 
 * Quản lý kho hàng với API integration
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, AlertTriangle, Package, TrendingDown, Plus, Minus, Loader2, RefreshCw } from 'lucide-react';
import { useAdminInventory, useAdjustStock, type InventoryFilters } from '@/hooks/useAdmin';
import { toastSuccess, toastError } from '@/stores';

const statusColors: Record<string, string> = {
  ok: 'text-green-600',
  low: 'text-amber-600',
  critical: 'text-orange-600',
  outofstock: 'text-red-600',
};

const statusFilters = [
  { value: '', label: 'Tất cả' },
  { value: 'low', label: 'Sắp hết' },
  { value: 'critical', label: 'Nguy hiểm' },
  { value: 'outofstock', label: 'Hết hàng' },
];

export default function AdminInventory() {
  const [filters, setFilters] = useState<InventoryFilters>({ page: 1, limit: 20 });
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data, isLoading, refetch } = useAdminInventory({ ...filters, search: searchQuery });
  const adjustStock = useAdjustStock();

  const inventory = data?.items || [];
  const stats = data?.stats || { total: 0, low: 0, critical: 0, outOfStock: 0 };

  const handleAdjust = async (id: string, adjustment: number) => {
    try {
      await adjustStock.mutateAsync({ id, adjustment });
      toastSuccess('Thành công', `Đã ${adjustment > 0 ? 'thêm' : 'trừ'} ${Math.abs(adjustment)} sản phẩm`);
    } catch {
      toastError('Lỗi', 'Không thể điều chỉnh tồn kho');
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <h1 className="text-xl font-bold text-text-main">Quản Lý Kho Hàng</h1>
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
          <div className="bg-white rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Package className="size-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-main">{stats.total}</p>
              <p className="text-sm text-text-muted">Tổng SKU</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-amber-50 flex items-center justify-center">
              <TrendingDown className="size-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">{stats.low}</p>
              <p className="text-sm text-text-muted">Sắp hết hàng</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-orange-50 flex items-center justify-center">
              <AlertTriangle className="size-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">{stats.critical}</p>
              <p className="text-sm text-text-muted">Nguy hiểm</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle className="size-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
              <p className="text-sm text-text-muted">Hết hàng</p>
            </div>
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
              placeholder="Tìm theo tên hoặc SKU..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            {statusFilters.map((status) => (
              <button
                key={status.value}
                onClick={() => setFilters({ ...filters, status: status.value as InventoryFilters['status'], page: 1 })}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filters.status === status.value || (!filters.status && !status.value)
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-muted border border-border hover:border-primary'
                }`}
              >
                {status.label}
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
                      <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Sản phẩm</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">SKU</th>
                      <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Size/Màu</th>
                      <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Tồn kho</th>
                      <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Mức đặt lại</th>
                      <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Điều chỉnh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.id} className="border-b border-border last:border-0 hover:bg-secondary-50">
                        <td className="py-4 px-6 font-medium text-text-main">{item.productName}</td>
                        <td className="py-4 px-6 text-text-muted font-mono text-sm">{item.sku}</td>
                        <td className="py-4 px-6 text-center text-text-muted">{item.size} / {item.color}</td>
                        <td className={`py-4 px-6 text-center font-bold ${statusColors[item.status]}`}>
                          {item.stock}
                        </td>
                        <td className="py-4 px-6 text-center text-text-muted">{item.reorderLevel}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => handleAdjust(item.id, -1)}
                              disabled={adjustStock.isPending || item.stock <= 0}
                              className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 disabled:opacity-50"
                            >
                              <Minus className="size-4" />
                            </button>
                            <button 
                              onClick={() => handleAdjust(item.id, 1)}
                              disabled={adjustStock.isPending}
                              className="size-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 disabled:opacity-50"
                            >
                              <Plus className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty state */}
              {inventory.length === 0 && (
                <div className="text-center py-16">
                  <Package className="size-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-muted">Không có sản phẩm nào</p>
                </div>
              )}

              {/* Pagination */}
              {data && inventory.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                  <p className="text-sm text-text-muted">
                    Trang {data.meta.page} / {data.meta.totalPages} ({data.meta.total} SKU)
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
