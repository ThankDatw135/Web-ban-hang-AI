'use client';

/**
 * Fashion AI - Login Page
 * 
 * Premium login page với:
 * - Decorative blur gradients
 * - Email/Password form
 * - AI Quick Login button
 * - Link to Register
 */

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { apiClient } from '@/lib/api-client';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/login', formData);
      const { user, accessToken, refreshToken } = response.data.data;

      // Lưu tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Cập nhật auth store
      setAuth(user, accessToken);

      // Redirect
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      {/* Decorative Elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-md">
        {/* Auth Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 relative z-10 border border-border">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-8 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <span className="text-primary text-2xl">✦</span>
            </div>
            <h1 className="text-text-main text-3xl font-bold tracking-tight uppercase">
              Fashion AI
            </h1>
            <p className="text-text-muted text-sm font-medium">
              Chào mừng trở lại với tương lai của phong cách
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-text-main text-sm font-semibold">
                Địa chỉ Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="input"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-text-main text-sm font-semibold">
                  Mật khẩu
                </label>
                <Link
                  href="/forgot-password"
                  className="text-primary hover:text-primary-600 text-xs font-medium transition-colors"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="input pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-lg w-full mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-border" />
              <span className="flex-shrink-0 mx-4 text-xs text-text-muted font-medium uppercase tracking-wider">
                Hoặc tiếp tục với
              </span>
              <div className="flex-grow border-t border-border" />
            </div>

            {/* AI Quick Login */}
            <button
              type="button"
              className="group relative w-full h-12 bg-white border border-accent/30 hover:border-accent 
                         text-text-main font-medium rounded-lg transition-all duration-300 
                         flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Sparkles className="size-5 text-accent group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10 group-hover:text-accent transition-colors">
                AI Quick Login
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-text-muted text-sm">
              Chưa có tài khoản?{' '}
              <Link
                href="/register"
                className="text-text-main font-semibold hover:underline decoration-primary decoration-2 underline-offset-4"
              >
                Tạo tài khoản
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom branding */}
        <div className="mt-8 text-center opacity-60">
          <p className="text-xs text-text-muted uppercase tracking-widest">
            Powered by Fashion AI Engine
          </p>
        </div>
      </div>
    </div>
  );
}
