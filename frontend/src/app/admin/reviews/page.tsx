/**
 * Admin Reviews Management - Fashion AI
 * 
 * Quản lý đánh giá với API integration
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Check, X, MessageSquare, Loader2, RefreshCw, Filter } from 'lucide-react';
import { useAdminReviews, useUpdateReviewStatus, useReplyReview, type ReviewFilters as ReviewFilterType, type Review } from '@/hooks/useAdmin';
import { toastSuccess, toastError } from '@/stores';

const statusFilters = [
  { value: '', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ duyệt' },
  { value: 'approved', label: 'Đã duyệt' },
  { value: 'rejected', label: 'Từ chối' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-600',
  approved: 'bg-green-100 text-green-600',
  rejected: 'bg-red-100 text-red-600',
};

const statusLabels: Record<string, string> = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
};

export default function AdminReviews() {
  const [filters, setFilters] = useState<ReviewFilterType>({ page: 1, limit: 10 });
  const [replyModalOpen, setReplyModalOpen] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const { data, isLoading, refetch } = useAdminReviews(filters);
  const updateStatus = useUpdateReviewStatus();
  const replyReview = useReplyReview();

  const reviews = data?.items || [];
  const stats = data?.stats || { pending: 0, approved: 0, rejected: 0, avgRating: 0 };

  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toastSuccess('Thành công', status === 'approved' ? 'Đã duyệt đánh giá' : 'Đã từ chối đánh giá');
    } catch {
      toastError('Lỗi', 'Không thể cập nhật trạng thái');
    }
  };

  const handleReply = async (id: string) => {
    if (!replyContent.trim()) return;
    
    try {
      await replyReview.mutateAsync({ id, reply: replyContent });
      toastSuccess('Thành công', 'Đã gửi phản hồi');
      setReplyModalOpen(null);
      setReplyContent('');
    } catch {
      toastError('Lỗi', 'Không thể gửi phản hồi');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <h1 className="text-xl font-bold text-text-main">Quản Lý Đánh Giá</h1>
          </div>
          <button 
            onClick={() => refetch()}
            className="size-10 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-secondary-100"
          >
            <RefreshCw className="size-5 text-text-muted" />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-border p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
            <p className="text-sm text-text-muted">Chờ duyệt</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            <p className="text-sm text-text-muted">Đã duyệt</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-sm text-text-muted">Từ chối</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="size-5 text-amber-400 fill-amber-400" />
              <span className="text-2xl font-bold text-text-main">{stats.avgRating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-text-muted">Điểm TB</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {statusFilters.map((status) => (
            <button
              key={status.value}
              onClick={() => setFilters({ ...filters, status: status.value as ReviewFilterType['status'], page: 1 })}
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

        {/* Reviews List */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="divide-y divide-border">
                {reviews.map((review) => (
                  <div key={review.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {review.userAvatar ? (
                          <img src={review.userAvatar} alt="" className="size-10 rounded-full object-cover" />
                        ) : (
                          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {review.userName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-text-main">{review.userName}</p>
                          <p className="text-sm text-text-muted">{review.productName} • {formatDate(review.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`size-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[review.status]}`}>
                          {statusLabels[review.status]}
                        </span>
                      </div>
                    </div>
                    
                    {review.title && (
                      <h4 className="font-bold text-text-main mb-1">{review.title}</h4>
                    )}
                    <p className="text-text-main mb-3">{review.content}</p>
                    
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {review.images.map((img, i) => (
                          <img key={i} src={img} alt="" className="size-16 rounded-lg object-cover" />
                        ))}
                      </div>
                    )}

                    {review.adminReply && (
                      <div className="bg-secondary-50 p-3 rounded-lg mb-3">
                        <p className="text-sm font-medium text-primary mb-1">Phản hồi từ Admin:</p>
                        <p className="text-sm text-text-main">{review.adminReply}</p>
                      </div>
                    )}

                    {review.status === 'pending' && (
                      <div className="flex items-center gap-2 pt-2">
                        <button 
                          onClick={() => handleUpdateStatus(review.id, 'approved')}
                          disabled={updateStatus.isPending}
                          className="px-3 py-1.5 bg-green-100 text-green-600 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-green-200 disabled:opacity-50"
                        >
                          <Check className="size-4" />
                          Duyệt
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(review.id, 'rejected')}
                          disabled={updateStatus.isPending}
                          className="px-3 py-1.5 bg-red-100 text-red-500 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-red-200 disabled:opacity-50"
                        >
                          <X className="size-4" />
                          Từ chối
                        </button>
                        <button 
                          onClick={() => setReplyModalOpen(review.id)}
                          className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-blue-200"
                        >
                          <MessageSquare className="size-4" />
                          Phản hồi
                        </button>
                      </div>
                    )}

                    {/* Reply Modal */}
                    {replyModalOpen === review.id && (
                      <div className="mt-4 p-4 bg-secondary-50 rounded-lg">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Nhập phản hồi..."
                          className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:border-primary"
                          rows={3}
                        />
                        <div className="flex justify-end gap-2 mt-3">
                          <button 
                            onClick={() => {
                              setReplyModalOpen(null);
                              setReplyContent('');
                            }}
                            className="px-4 py-2 border border-border rounded-lg text-sm"
                          >
                            Hủy
                          </button>
                          <button 
                            onClick={() => handleReply(review.id)}
                            disabled={replyReview.isPending || !replyContent.trim()}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm disabled:opacity-50"
                          >
                            Gửi phản hồi
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Empty state */}
              {reviews.length === 0 && (
                <div className="text-center py-16">
                  <Star className="size-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-muted">Không có đánh giá nào</p>
                </div>
              )}

              {/* Pagination */}
              {data && reviews.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                  <p className="text-sm text-text-muted">
                    Trang {data.meta.page} / {data.meta.totalPages} ({data.meta.total} đánh giá)
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
