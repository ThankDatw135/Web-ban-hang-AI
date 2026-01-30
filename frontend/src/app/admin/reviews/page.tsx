/**
 * Admin Reviews Management - Fashion AI
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Check, X, Eye, MessageSquare } from 'lucide-react';

const reviews = [
  { id: '1', product: 'Silk Evening Dress', customer: 'Ngọc Anh', rating: 5, comment: 'Sản phẩm rất đẹp, chất liệu mềm mại', date: '30/01/2024', status: 'pending' },
  { id: '2', product: 'Cashmere Sweater', customer: 'Minh Tuấn', rating: 4, comment: 'Áo ấm và thoải mái, giao hàng nhanh', date: '29/01/2024', status: 'approved' },
  { id: '3', product: 'Leather Handbag', customer: 'Thanh Hằng', rating: 5, comment: 'Túi da thật đẹp, đúng như mô tả', date: '28/01/2024', status: 'approved' },
  { id: '4', product: 'Velvet Blazer', customer: 'Hoàng Nam', rating: 3, comment: 'Blazer đẹp nhưng size hơi nhỏ', date: '27/01/2024', status: 'pending' },
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
  const [reviewList, setReviewList] = useState(reviews);

  const updateStatus = (id: string, status: string) => {
    setReviewList(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
            <ArrowLeft className="size-5 text-text-muted" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">Quản Lý Đánh Giá</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-border p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">{reviewList.filter(r => r.status === 'pending').length}</p>
            <p className="text-sm text-text-muted">Chờ duyệt</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{reviewList.filter(r => r.status === 'approved').length}</p>
            <p className="text-sm text-text-muted">Đã duyệt</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 text-center">
            <p className="text-2xl font-bold text-text-main">4.5</p>
            <p className="text-sm text-text-muted">Điểm TB</p>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="space-y-4 p-6">
            {reviewList.map((review) => (
              <div key={review.id} className="p-4 bg-secondary-50 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-text-main">{review.product}</p>
                    <p className="text-sm text-text-muted">{review.customer} • {review.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
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
                <p className="text-text-main mb-3">{review.comment}</p>
                {review.status === 'pending' && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateStatus(review.id, 'approved')}
                      className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-green-200"
                    >
                      <Check className="size-4" />
                      Duyệt
                    </button>
                    <button 
                      onClick={() => updateStatus(review.id, 'rejected')}
                      className="px-3 py-1 bg-red-100 text-red-500 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-red-200"
                    >
                      <X className="size-4" />
                      Từ chối
                    </button>
                    <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-blue-200">
                      <MessageSquare className="size-4" />
                      Phản hồi
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
