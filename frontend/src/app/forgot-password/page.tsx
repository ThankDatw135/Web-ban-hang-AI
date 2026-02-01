/**
 * Fashion AI - Forgot Password Page
 * 
 * Trang quên mật khẩu - nhập email để nhận mã OTP
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Loader2 } from 'lucide-react';
import { useForgotPassword } from '@/hooks/use-auth';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const forgotPasswordMutation = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    forgotPasswordMutation.mutate(email, {
      onSuccess: () => {
        // Redirect to OTP verification page
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      },
    });
  };

  const error = forgotPasswordMutation.error
    ? (forgotPasswordMutation.error as Error).message || 'Có lỗi xảy ra. Vui lòng thử lại.'
    : '';

  return (
    <div className="bg-cream dark:bg-[#1e1a14] text-text-main dark:text-white font-sans min-h-screen flex flex-col antialiased">
      <div className="relative flex-grow flex items-center justify-center p-4 sm:p-8">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#e3dac9]/40 dark:bg-[#3d362b]/40 rounded-full blur-[100px]" />
        </div>

        {/* Card */}
        <div className="relative z-10 w-full max-w-[480px] bg-white dark:bg-[#2c2824] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] p-8 sm:p-12 border border-[#f0f0f0] dark:border-[#3e3a35]">
          {/* Back Button */}
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Quay lại đăng nhập</span>
          </Link>

          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
              <Mail className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-center mb-2">Quên mật khẩu?</h1>
            <p className="text-secondary text-center text-sm max-w-sm">
              Nhập địa chỉ email của bạn và chúng tôi sẽ gửi mã OTP để xác thực.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold ml-1" htmlFor="email">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-full border border-border dark:border-[#4a453e] bg-white dark:bg-[#1e1a14] py-3.5 pl-11 pr-4 text-sm placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-200"
                  placeholder="example@fashion.ai"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={forgotPasswordMutation.isPending}
              className="mt-2 w-full bg-primary hover:bg-[#b08d5b] text-text-main font-bold py-3.5 px-4 rounded-full shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {forgotPasswordMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang gửi mã OTP...
                </>
              ) : (
                'Gửi mã xác thực'
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-8 text-center text-sm text-secondary">
            Nhớ mật khẩu rồi?{' '}
            <Link href="/login" className="font-bold text-primary hover:text-[#b08d5b] transition-colors ml-1">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
