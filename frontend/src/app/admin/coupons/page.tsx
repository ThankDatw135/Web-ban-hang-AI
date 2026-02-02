/**
 * Fashion AI - Admin Coupons
 */

'use client';

import Link from 'next/link';
import { 
  Plus, 
  Trash2, 
  Loader2,
  Ticket
} from 'lucide-react';
import { useAllCoupons, useDeleteCoupon } from '@/hooks/use-coupons';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { toast } from 'sonner';

export default function AdminCouponsPage() {
  const { data: couponsData, isLoading } = useAllCoupons({ limit: 50 });
  const { mutate: deleteCoupon } = useDeleteCoupon();
  
  const coupons = couponsData?.data || [];

  const handleDelete = (id: string) => {
      if (confirm('Bạn có chắc chắn muốn xóa mã giảm giá này?')) {
          deleteCoupon(id, {
              onSuccess: () => toast.success('Đã xóa mã giảm giá')
          });
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
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold">Mã giảm giá</h1>
           <p className="text-secondary">Quản lý các chương trình khuyến mãi</p>
        </div>
        <Link href="/admin/coupons/create" className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tạo mã mới
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.length > 0 ? coupons.map((coupon) => (
              <div key={coupon.id} className="card p-6 border border-dashed border-gray-300 dark:border-gray-700 relative group hover:border-primary transition-colors">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDelete(coupon.id)}
                        className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100"
                      >
                          <Trash2 className="w-4 h-4" />
                      </button>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                          <Ticket className="w-6 h-6" />
                      </div>
                      <div>
                          <h3 className="font-bold text-lg">{coupon.code}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                              {coupon.isActive ? 'Đang hoạt động' : 'Hết hạn/Tắt'}
                          </span>
                      </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-secondary">
                      <p className="flex justify-between">
                          <span>Giảm giá:</span>
                          <span className="font-bold text-black dark:text-white">
                              {coupon.type === 'PERCENTAGE' ? `${coupon.value}%` : formatCurrency(coupon.value)}
                          </span>
                      </p>
                      <p className="flex justify-between">
                          <span>Đã dùng:</span>
                          <span>{coupon.usedCount} / {coupon.usageLimit || '∞'}</span>
                      </p>
                      <p className="flex justify-between">
                          <span>Hết hạn:</span>
                          <span>{formatDate(coupon.endDate)}</span>
                      </p>
                  </div>
              </div>
          )) : (
              <div className="col-span-full p-12 text-center text-secondary bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-200">
                  <p>Chưa có mã giảm giá nào.</p>
              </div>
          )}
      </div>
    </div>
  );
}
