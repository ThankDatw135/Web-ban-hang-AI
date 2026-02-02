/**
 * Fashion AI - Trang Quên Mật Khẩu
 * 
 * Flow: Nhập email -> Gửi OTP -> Chuyển sang trang nhập OTP
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Diamond, Mail, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { useForgotPassword } from '@/hooks/use-auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const forgotPasswordMutation = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    forgotPasswordMutation.mutate(email, {
      onSuccess: () => {
        setIsSuccess(true);
        // Chuyển hướng sau 2s hoặc để user tự nhấn
        setTimeout(() => {
          router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
        }, 1500);
      },
    });
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
          <p className="text-secondary">Đừng lo, chúng tôi sẽ giúp bạn lấy lại mật khẩu</p>
        </div>

        {/* Form */}
        <div className="card p-8">
          {forgotPasswordMutation.isError && (
             <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>
                  {(forgotPasswordMutation.error as any)?.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.'}
                </span>
             </div>
          )}

          {isSuccess ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold">Kiểm tra email của bạn</h3>
              <p className="text-secondary text-sm">
                Chúng tôi đã gửi mã xác thực đến <strong>{email}</strong>. 
                Vui lòng kiểm tra hộp thư (cả mục spam).
              </p>
              <button 
                onClick={() => router.push(`/verify-otp?email=${encodeURIComponent(email)}`)}
                className="btn-primary w-full mt-4"
              >
                Nhập mã xác thực <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email đăng ký</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={forgotPasswordMutation.isPending}
                className="btn-primary w-full"
              >
                {forgotPasswordMutation.isPending ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  'Gửi mã xác thực'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link 
            href="/login" 
            className="flex items-center justify-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại đăng nhập</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
