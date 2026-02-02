/**
 * Fashion AI - Đặt Lại Mật Khẩu
 * 
 * Form đặt mật khẩu mới
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Diamond, Lock, Eye, EyeOff, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { useResetPassword } from '@/hooks/use-auth';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const resetPasswordMutation = useResetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Token không hợp lệ hoặc đã hết hạn.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.');
      return;
    }

    resetPasswordMutation.mutate({ token, newPassword: password }, {
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: (err: any) => {
        setError(err.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
      }
    });
  };

  if (!token) {
    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Liên kết không hợp lệ</h1>
            <p className="mb-4">Vui lòng kiểm tra lại liên kết trong email của bạn.</p>
            <Link href="/login" className="text-primary hover:underline">Quay lại đăng nhập</Link>
        </div>
        </div>
    )
  }

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
          <h1 className="text-2xl font-bold mt-6 mb-2">Đặt lại mật khẩu</h1>
          <p className="text-secondary">
            Tạo mật khẩu mới cho tài khoản của bạn
          </p>
        </div>

        {/* Form */}
        <div className="card p-8">
          {(error || resetPasswordMutation.isError) && (
             <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>
                  {error || (resetPasswordMutation.error as any)?.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.'}
                </span>
             </div>
          )}

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium mb-2">Mật khẩu mới</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                    className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-2">Xác nhận mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Password requirements */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#2c2822] text-sm">
                <p className="font-medium mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Yêu cầu mật khẩu:
                </p>
                <ul className="space-y-1 text-secondary text-xs">
                  <li>• Ít nhất 8 ký tự</li>
                  <li>• Ít nhất 1 chữ in hoa</li>
                  <li>• Ít nhất 1 chữ số</li>
                  <li>• Ít nhất 1 ký tự đặc biệt</li>
                </ul>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={resetPasswordMutation.isPending}
                className="btn-primary w-full"
              >
                {resetPasswordMutation.isPending ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Đặt lại mật khẩu
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              {/* Success icon */}
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              
              <h3 className="text-lg font-bold mb-2">Đặt lại mật khẩu thành công!</h3>
              <p className="text-secondary text-sm mb-6">
                Bạn có thể đăng nhập với mật khẩu mới.
              </p>
              
              <Link href="/login" className="btn-primary w-full">
                Đăng nhập ngay
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
