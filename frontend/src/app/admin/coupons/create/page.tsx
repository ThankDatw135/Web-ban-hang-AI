/**
 * Fashion AI - Create Coupon
 */

'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateCouponPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
           <Link href="/admin/coupons" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
               <ArrowLeft className="w-5 h-5" />
           </Link>
           <h1 className="text-2xl font-bold">Tạo mã giảm giá mới</h1>
       </div>

       <div className="bg-white dark:bg-[#1e1a14] p-6 rounded-xl border border-gray-100 dark:border-gray-800">
           <p className="text-center text-secondary p-12">
               Form tạo mã giảm giá sẽ được phát triển ở đây.
               <br />
               (Bao gồm: Mã, Loại, Giá trị, Ngày bắt đầu/kết thúc, Giới hạn)
           </p>
       </div>
    </div>
  );
}
