'use client';

/**
 * Fashion AI - Register Page
 * 
 * Registration form với:
 * - Full Name, Email, Password, Confirm Password
 * - Terms agreement
 * - Link to Login
 */

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { apiClient } from '@/lib/api-client';
import { Header, Footer } from '@/components';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post('/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      const { user, accessToken, refreshToken } = response.data.data;

      // Lưu tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Cập nhật auth store
      setAuth(user, accessToken);

      // Redirect
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 glass border-b border-primary/10 px-6 py-4 md:px-10 lg:px-40">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
              <span className="text-lg">✦</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-text-main">Fashion AI</h2>
          </Link>
          <Link href="/login" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">
            Đã có tài khoản? Đăng nhập
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 md:px-10">
        <div className="w-full max-w-[500px] flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-text-main sm:text-4xl">
              Tạo Tài Khoản
            </h1>
            <p className="text-text-muted">Gia nhập cộng đồng thời trang cao cấp.</p>
          </div>

          {/* Form Card */}
          <section className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm md:p-10">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-text-main">Họ</span>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Nguyễn"
                    className="input"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-text-main">Tên</span>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Văn A"
                    className="input"
                    required
                  />
                </label>
              </div>

              {/* Email */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-text-main">Địa chỉ Email</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="input"
                  required
                />
              </label>

              {/* Password */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-text-main">Mật khẩu</span>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="input pr-12"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </label>

              {/* Confirm Password */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-text-main">Xác nhận mật khẩu</span>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="input"
                  required
                />
              </label>

              {/* Submit Button */}
              <div className="mt-4 flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary btn-lg w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Đang tạo tài khoản...
                    </>
                  ) : (
                    <>
                      <span>Tham gia Fashion AI</span>
                      <ArrowRight className="size-5" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-text-muted">
                  Bằng việc tham gia, bạn đồng ý với{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    Điều khoản sử dụng
                  </Link>{' '}
                  và{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Chính sách bảo mật
                  </Link>
                  .
                </p>
              </div>
            </form>
          </section>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="mt-auto border-t border-primary/10 bg-white py-8">
        <div className="mx-auto flex max-w-[960px] flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-10">
          <p className="text-sm font-medium text-text-muted">© 2024 Fashion AI Inc.</p>
          <div className="flex gap-6">
            <Link href="/help" className="text-sm text-text-muted hover:text-text-main">
              Trợ giúp
            </Link>
            <Link href="/privacy" className="text-sm text-text-muted hover:text-text-main">
              Bảo mật
            </Link>
            <Link href="/terms" className="text-sm text-text-muted hover:text-text-main">
              Điều khoản
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
