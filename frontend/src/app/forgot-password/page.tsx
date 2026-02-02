/**
 * Fashion AI - Quên Mật Khẩu
 * 
 * Form nhập email để nhận mã OTP
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Diamond, Mail, ArrowLeft, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement send OTP logic
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Diamond className="w-10 h-10 text-primary" />
            <span className="text-2xl font-bold">
              Fashion <span className="text-primary">AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">Quên mật khẩu?</h1>
          <p className="text-secondary">
            Nhập email của bạn, chúng tôi sẽ gửi mã xác thực
          </p>
        </div>

        {/* Form */}
        <div className="card p-8">
          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Nhập email đã đăng ký"
                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Gửi mã xác thực
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              {/* Success icon */}
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-success" />
              </div>
              
              <h3 className="text-lg font-bold mb-2">Đã gửi email!</h3>
              <p className="text-secondary text-sm mb-6">
                Vui lòng kiểm tra hộp thư của bạn và nhập mã xác thực.
              </p>
              
              <Link href="/verify-otp" className="btn-primary w-full">
                Nhập mã OTP
              </Link>
              
              <button 
                onClick={() => setIsSent(false)}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Gửi lại email
              </button>
            </div>
          )}
        </div>

        {/* Back to login */}
        <Link 
          href="/login" 
          className="flex items-center justify-center gap-2 mt-6 text-sm text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
}
