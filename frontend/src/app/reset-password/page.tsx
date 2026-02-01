/**
 * Fashion AI - Reset Password Page
 * 
 * Trang đặt lại mật khẩu mới
 */

'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft, Loader2, Check, CheckCircle } from 'lucide-react';
import { useResetPassword } from '@/hooks/use-auth';

const passwordRequirements = [
  { id: 'length', label: 'Ít nhất 8 ký tự', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'Bao gồm chữ in hoa', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'number', label: 'Bao gồm số hoặc ký tự đặc biệt', test: (p: string) => /[0-9!@#$%^&*]/.test(p) },
];

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');
  
  const resetPasswordMutation = useResetPassword();

  const passwordStrength = useMemo(() => {
    return passwordRequirements.filter(req => req.test(password)).length;
  }, [password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError('');

    // Validate
    if (password !== confirmPassword) {
      setValidationError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (passwordStrength < 3) {
      setValidationError('Mật khẩu chưa đủ mạnh');
      return;
    }

    resetPasswordMutation.mutate(
      { token, newPassword: password },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      }
    );
  };

  const error = validationError || (resetPasswordMutation.error
    ? (resetPasswordMutation.error as Error).message || 'Có lỗi xảy ra. Token có thể đã hết hạn.'
    : '');

  if (isSuccess) {
    return (
      <div className="bg-cream dark:bg-[#1e1a14] text-text-main dark:text-white font-sans min-h-screen flex flex-col antialiased">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap px-6 py-4 lg:px-10 border-b border-transparent">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 text-primary">
              <svg fill="currentColor" viewBox="0 0 48 48">
                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-tight">Fashion AI</h2>
          </Link>
        </header>

        {/* Success State */}
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-10">
          <div className="flex flex-col w-full max-w-[480px]">
            <div className="bg-white dark:bg-[#2c2824] p-6 sm:p-10 rounded-[2rem] shadow-sm ring-1 ring-black/5 dark:ring-white/10 text-center">
              <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h1 className="text-3xl font-bold mb-3">Đổi mật khẩu thành công!</h1>
              <p className="text-secondary mb-8">
                Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập với mật khẩu mới.
              </p>
              <Link 
                href="/login"
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary hover:bg-[#b08d5b] text-text-main text-base font-bold leading-normal tracking-wide transition-all duration-300 shadow-lg shadow-primary/20"
              >
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-cream dark:bg-[#1e1a14] text-text-main dark:text-white font-sans min-h-screen flex flex-col antialiased">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap px-6 py-4 lg:px-10 border-b border-transparent">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 text-primary">
            <svg fill="currentColor" viewBox="0 0 48 48">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">Fashion AI</h2>
        </Link>
        <div className="hidden sm:flex items-center gap-4">
          <Link href="/help" className="text-sm font-bold hover:text-primary transition-colors">
            Trợ giúp
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6">
        <div className="flex flex-col w-full max-w-[480px]">
          {/* Card */}
          <div className="bg-white dark:bg-[#2c2824] p-6 sm:p-10 rounded-[2rem] shadow-sm ring-1 ring-black/5 dark:ring-white/10">
            {/* Heading */}
            <div className="flex flex-col gap-3 mb-8 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                Đặt lại mật khẩu
              </h1>
              <p className="text-secondary text-base font-normal leading-normal">
                Vui lòng nhập mật khẩu mới cho tài khoản của bạn. Để bảo mật, hãy chọn mật khẩu mạnh.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* New Password */}
              <div className="flex flex-col gap-2">
                <label className="text-base font-medium leading-normal" htmlFor="new-password">
                  Mật khẩu mới
                </label>
                <div className="group flex w-full items-center rounded-xl border border-border dark:border-[#444] bg-white dark:bg-[#1e1a14] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all duration-200">
                  <input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex w-full min-w-0 flex-1 bg-transparent px-4 py-3.5 text-base placeholder:text-secondary focus:outline-none border-none focus:ring-0 rounded-xl"
                    placeholder="Nhập mật khẩu mới"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="pr-4 text-secondary cursor-pointer hover:text-primary transition-colors"
                  >
                    {showPassword ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <label className="text-base font-medium leading-normal" htmlFor="confirm-password">
                  Xác nhận mật khẩu
                </label>
                <div className="group flex w-full items-center rounded-xl border border-border dark:border-[#444] bg-white dark:bg-[#1e1a14] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all duration-200">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="flex w-full min-w-0 flex-1 bg-transparent px-4 py-3.5 text-base placeholder:text-secondary focus:outline-none border-none focus:ring-0 rounded-xl"
                    placeholder="Nhập lại mật khẩu mới"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="pr-4 text-secondary cursor-pointer hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
                  </button>
                </div>
              </div>

              {/* Password Requirements Checklist */}
              <div className="py-2">
                <div className="flex flex-col gap-3">
                  {passwordRequirements.map((req) => (
                    <label key={req.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        req.test(password) 
                          ? 'bg-primary border-primary' 
                          : 'border-border'
                      }`}>
                        {req.test(password) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <p className={`text-sm font-medium leading-normal transition-colors ${
                        req.test(password)
                          ? 'text-text-main dark:text-white'
                          : 'text-secondary'
                      }`}>
                        {req.label}
                      </p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={resetPasswordMutation.isPending}
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary hover:bg-[#b08d5b] text-text-main text-base font-bold leading-normal tracking-wide transition-all duration-300 mt-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resetPasswordMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Đang cập nhật...
                  </>
                ) : (
                  <span>Cập nhật mật khẩu</span>
                )}
              </button>
            </form>

            {/* Back Link */}
            <div className="mt-8 text-center">
              <Link 
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại Đăng nhập
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-secondary/60">
              © 2024 Fashion AI. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
