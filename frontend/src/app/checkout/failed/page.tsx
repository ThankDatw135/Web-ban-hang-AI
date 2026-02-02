/**
 * Fashion AI - Thanh Toán Thất Bại
 * 
 * Trang hiển thị khi thanh toán không thành công
 */

import { XCircle, RefreshCw, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thanh toán thất bại',
};

export default function CheckoutFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg text-center">
        {/* Error icon */}
        <div className="mb-8">
          <div className="w-24 h-24 rounded-full bg-error/10 flex items-center justify-center mx-auto animate-fade-in">
            <XCircle className="w-12 h-12 text-error" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 animate-slide-up">Thanh toán thất bại</h1>
        <p className="text-secondary mb-8 animate-slide-up">
          Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ hỗ trợ.
        </p>

        {/* Error details card */}
        <div className="card p-6 mb-8 text-left animate-slide-up">
          <h3 className="font-bold mb-3">Lý do có thể:</h3>
          <ul className="space-y-2 text-sm text-secondary">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-error mt-2 flex-shrink-0" />
              Thẻ/tài khoản không đủ số dư
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-error mt-2 flex-shrink-0" />
              Thông tin thẻ không chính xác
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-error mt-2 flex-shrink-0" />
              Kết nối mạng không ổn định
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-error mt-2 flex-shrink-0" />
              Ngân hàng từ chối giao dịch
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-slide-up">
          <Link href="/checkout" className="btn-primary">
            <RefreshCw className="w-5 h-5" />
            Thử lại
          </Link>
          <Link href="/cart" className="btn-outline">
            <ArrowLeft className="w-5 h-5" />
            Quay lại giỏ hàng
          </Link>
        </div>

        {/* Support */}
        <div className="animate-slide-up">
          <p className="text-sm text-secondary mb-2">Cần hỗ trợ?</p>
          <a 
            href="tel:19001234" 
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            <Phone className="w-4 h-4" />
            Gọi hotline: 1900 1234
          </a>
        </div>
      </div>
    </div>
  );
}
