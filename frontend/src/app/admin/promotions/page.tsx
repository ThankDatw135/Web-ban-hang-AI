/**
 * Admin Promotions Management - Fashion AI
 * 
 * Quản lý khuyến mãi với API integration
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Tag, Percent, Edit, Trash2, ToggleLeft, ToggleRight, Loader2, RefreshCw, Ticket } from 'lucide-react';
import { useAdminPromotions, useUpdatePromotion, useDeletePromotion, type Promotion } from '@/hooks/useAdmin';
import { toastSuccess, toastError } from '@/stores';

export default function AdminPromotions() {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useAdminPromotions(page);
  const updatePromotion = useUpdatePromotion();
  const deletePromotion = useDeletePromotion();

  const promotions = data?.items || [];

  const formatDiscount = (promo: Promotion) => {
    if (promo.type === 'PERCENTAGE') return `${promo.value}%`;
    if (promo.type === 'FIXED_AMOUNT') return new Intl.NumberFormat('vi-VN').format(promo.value) + '₫';
    return 'Miễn phí ship';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const toggleActive = async (promo: Promotion) => {
    try {
      await updatePromotion.mutateAsync({
        id: promo.id,
        data: { isActive: !promo.isActive },
      });
      toastSuccess('Thành công', promo.isActive ? 'Đã tắt khuyến mãi' : 'Đã bật khuyến mãi');
    } catch {
      toastError('Lỗi', 'Không thể cập nhật trạng thái');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa khuyến mãi này?')) return;
    
    try {
      await deletePromotion.mutateAsync(id);
      toastSuccess('Đã xóa', 'Khuyến mãi đã được xóa');
    } catch {
      toastError('Lỗi', 'Không thể xóa khuyến mãi');
    }
  };

  const activeCount = promotions.filter(p => p.isActive).length;
  const totalUsage = promotions.reduce((sum, p) => sum + p.usedCount, 0);

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
          <div className="flex items-center gap-3">
            <button 
              onClick={() => refetch()}
              className="size-10 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-secondary-100"
            >
              <RefreshCw className="size-5 text-text-muted" />
            </button>
            <Link 
              href="/admin/promotions/new"
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90"
            >
              <Plus className="size-5" />
              Tạo khuyến mãi
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Đang hoạt động</p>
            <p className="text-2xl font-bold text-green-600">{activeCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Tổng lượt dùng</p>
            <p className="text-2xl font-bold text-text-main">{totalUsage}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Tổng khuyến mãi</p>
            <p className="text-2xl font-bold text-text-main">{data?.meta.total || 0}</p>
          </div>
        </div>

        {/* Promotions List */}
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
                    {promotions.map((promo) => (
                      <tr key={promo.id} className="border-b border-border last:border-0 hover:bg-secondary-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`size-10 rounded-xl flex items-center justify-center ${
                              promo.type === 'PERCENTAGE' ? 'bg-purple-50' : 'bg-green-50'
                            }`}>
                              {promo.type === 'PERCENTAGE' ? (
                                <Percent className="size-5 text-purple-600" />
                              ) : (
                                <Tag className="size-5 text-green-600" />
                              )}
                            </div>
                            <span className="font-medium text-text-main">{promo.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <code className="px-2 py-1 bg-secondary-100 rounded text-sm font-mono">{promo.code}</code>
                        </td>
                        <td className="py-4 px-6 text-center font-bold text-primary">{formatDiscount(promo)}</td>
                        <td className="py-4 px-6 text-center text-text-muted text-sm">
                          {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                        </td>
                        <td className="py-4 px-6 text-center text-text-main">
                          {promo.usedCount}{promo.usageLimit ? `/${promo.usageLimit}` : ''}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button 
                            onClick={() => toggleActive(promo)}
                            disabled={updatePromotion.isPending}
                            className="disabled:opacity-50"
                          >
                            {promo.isActive ? (
                              <ToggleRight className="size-8 text-green-600" />
                            ) : (
                              <ToggleLeft className="size-8 text-text-muted" />
                            )}
                          </button>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <Link 
                              href={`/admin/promotions/${promo.id}/edit`}
                              className="size-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100"
                            >
                              <Edit className="size-4" />
                            </Link>
                            <button 
                              onClick={() => handleDelete(promo.id)}
                              disabled={deletePromotion.isPending}
                              className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 disabled:opacity-50"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty state */}
              {promotions.length === 0 && (
                <div className="text-center py-16">
                  <Ticket className="size-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-muted">Không có khuyến mãi nào</p>
                </div>
              )}

              {/* Pagination */}
              {data && promotions.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                  <p className="text-sm text-text-muted">
                    Trang {data.meta.page} / {data.meta.totalPages} ({data.meta.total} khuyến mãi)
                  </p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      className="px-3 py-1 border border-border rounded-lg text-sm disabled:opacity-50"
                    >
                      Trước
                    </button>
                    <span className="px-3 py-1 bg-primary text-white rounded-lg text-sm">{page}</span>
                    <button 
                      onClick={() => setPage(p => p + 1)}
                      disabled={page >= data.meta.totalPages}
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
