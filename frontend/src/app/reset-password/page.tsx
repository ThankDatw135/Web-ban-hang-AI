'use client';

/**
 * Reset Password Page - Fashion AI
 * 
 * Form đặt lại mật khẩu với:
 * - Password validation checklist
 * - Show/hide password toggle
 * - Confirm password
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft, Loader2, Check } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password validation
  const validations = {
    minLength: formData.password.length >= 8,
    hasNumber: /\d/.test(formData.password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  useEffect(() => {
    if (!token) {
      router.push('/forgot-password');
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (!validations.minLength || !validations.hasNumber || !validations.hasSpecial) {
      setError('Mật khẩu chưa đáp ứng đủ yêu cầu');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await apiClient.post('/auth/reset-password', {
        token,
        password: formData.password,
      });
      router.push('/reset-success');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể đặt lại mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
      {/* Logo Header */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="text-xl">✦</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text-main">Fashion AI</h1>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[480px] rounded-2xl bg-white p-8 shadow-xl sm:px-10 sm:py-12 border border-border">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-main mb-2">
            Đặt lại mật khẩu
          </h2>
          <p className="text-text-muted text-sm">
            Vui lòng tạo mật khẩu mới an toàn để truy cập tài khoản.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* New Password Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="new-password" className="text-sm font-semibold text-text-main">
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="new-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Nhập mật khẩu mới"
                className="input pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-text-main rounded-full hover:bg-secondary-100 transition-colors"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          {/* Validation Checklist */}
          <div className="rounded-lg bg-cream px-4 py-3">
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3">
                <div className={`size-4 rounded border-2 flex items-center justify-center ${
                  validations.minLength ? 'bg-primary border-primary text-white' : 'border-border'
                }`}>
                  {validations.minLength && <Check className="size-3" />}
                </div>
                <span className={`text-sm ${validations.minLength ? 'font-medium text-text-main' : 'text-text-muted'}`}>
                  Ít nhất 8 ký tự
                </span>
              </label>
              <label className="flex items-center gap-3">
                <div className={`size-4 rounded border-2 flex items-center justify-center ${
                  validations.hasNumber ? 'bg-primary border-primary text-white' : 'border-border'
                }`}>
                  {validations.hasNumber && <Check className="size-3" />}
                </div>
                <span className={`text-sm ${validations.hasNumber ? 'font-medium text-text-main' : 'text-text-muted'}`}>
                  Chứa ít nhất một số
                </span>
              </label>
              <label className="flex items-center gap-3">
                <div className={`size-4 rounded border-2 flex items-center justify-center ${
                  validations.hasSpecial ? 'bg-primary border-primary text-white' : 'border-border'
                }`}>
                  {validations.hasSpecial && <Check className="size-3" />}
                </div>
                <span className={`text-sm ${validations.hasSpecial ? 'font-medium text-text-main' : 'text-text-muted'}`}>
                  Chứa ít nhất một ký tự đặc biệt
                </span>
              </label>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirm-password" className="text-sm font-semibold text-text-main">
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              id="confirm-password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Nhập lại mật khẩu mới"
              className="input"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary btn-lg w-full mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Đang cập nhật...
              </>
            ) : (
              'Cập nhật mật khẩu'
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/login"
            className="group flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-text-main transition-colors"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Quay lại đăng nhập
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-text-muted opacity-60">© 2024 Fashion AI. Hệ thống bảo mật.</p>
      </div>
    </div>
  );
}
