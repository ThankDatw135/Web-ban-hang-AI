/**
 * Reset Success Page - Fashion AI
 * 
 * Thông báo đặt lại mật khẩu thành công
 * Với icon check và CTA buttons
 */

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ResetSuccessPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-center py-6 px-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-primary text-2xl">✦</span>
          <h2 className="text-text-main text-xl font-bold tracking-tight">Fashion AI</h2>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col items-center text-center border border-border animate-fade-in">
          {/* Icon */}
          <div className="mb-8 rounded-full bg-primary/10 p-4 flex items-center justify-center">
            <CheckCircle className="size-12 text-primary" />
          </div>

          {/* Text Content */}
          <div className="space-y-3 mb-10">
            <h1 className="text-text-main text-2xl md:text-3xl font-bold leading-tight tracking-tight">
              Mật khẩu đã được cập nhật
            </h1>
            <p className="text-text-muted text-base leading-relaxed max-w-[360px] mx-auto">
              Tài khoản của bạn đã được bảo mật. Khám phá bộ sưu tập mới nhất của chúng tôi.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 w-full">
            <Link href="/" className="btn-primary btn-lg w-full">
              Về trang chủ
            </Link>
            <Link
              href="/login"
              className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center px-4">
        <p className="text-text-muted text-sm">© 2024 Fashion AI. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-6 text-xs text-text-muted/70">
          <Link href="/privacy" className="hover:text-primary">Chính sách bảo mật</Link>
          <Link href="/terms" className="hover:text-primary">Điều khoản sử dụng</Link>
          <Link href="/support" className="hover:text-primary">Hỗ trợ</Link>
        </div>
      </footer>
    </div>
  );
}
