/**
 * Fashion AI - Register Page
 * Design: stitch_trang_ch_fashion_ai/đăng_ký_tài_khoản
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { apiClient } from '@/lib/api-client';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Split full name into first and last
    const nameParts = formData.fullName.trim().split(' ');
    const firstName = nameParts.pop() || '';
    const lastName = nameParts.join(' ') || '';

    try {
      const response = await apiClient.post('/auth/register', {
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
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
    <div className="min-h-screen flex flex-col bg-cream font-display">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-secondary-100 px-6 lg:px-10 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-4 text-secondary-800">
          <div className="size-8 text-primary">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-secondary-800 text-xl font-bold leading-tight tracking-[-0.015em]">Fashion AI</h2>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-sm font-medium text-secondary-500">Bạn đã có tài khoản?</span>
          <Link
            href="/login"
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-white border border-secondary-200 text-secondary-800 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-secondary-50 transition-colors"
          >
            Đăng nhập
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-[1280px] grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
          {/* Left: Hero Image - Desktop Only */}
          <div className="hidden lg:flex relative h-[800px] w-full flex-col justify-end overflow-hidden rounded-2xl bg-secondary-200">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"
                alt="Fashion model"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
            <div className="relative z-10 p-10 text-white">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-md border border-white/10 text-primary">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                AI Powered
              </div>
              <h3 className="text-4xl font-bold leading-tight mb-3">
                Định hình phong cách<br />của tương lai.
              </h3>
              <p className="text-white/80 text-lg font-medium">
                Trải nghiệm phòng thử đồ ảo và nhận tư vấn thời trang từ AI chuyên nghiệp.
              </p>
            </div>
          </div>

          {/* Right: Registration Form */}
          <div className="flex flex-col w-full max-w-[520px] mx-auto lg:mx-0 py-4">
            <div className="flex flex-col gap-3 mb-8">
              <h1 className="text-secondary-800 tracking-tight text-[32px] md:text-[40px] font-bold leading-tight">
                Đăng ký tài khoản
              </h1>
              <p className="text-secondary-500 text-base font-normal leading-normal">
                Gia nhập thế giới Fashion AI. Trải nghiệm mua sắm đẳng cấp.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary-800 text-sm font-semibold leading-normal" htmlFor="fullname">
                  Họ và tên
                </label>
                <input
                  id="fullname"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="form-input w-full rounded-xl text-secondary-800 bg-white border border-secondary-200 focus:border-primary focus:ring-0 h-14 placeholder:text-secondary-400 px-[15px] text-base font-normal transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary-800 text-sm font-semibold leading-normal" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="form-input w-full rounded-xl text-secondary-800 bg-white border border-secondary-200 focus:border-primary focus:ring-0 h-14 placeholder:text-secondary-400 px-[15px] text-base font-normal transition-colors"
                  required
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary-800 text-sm font-semibold leading-normal" htmlFor="phone">
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0912 xxx xxx"
                  className="form-input w-full rounded-xl text-secondary-800 bg-white border border-secondary-200 focus:border-primary focus:ring-0 h-14 placeholder:text-secondary-400 px-[15px] text-base font-normal transition-colors"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary-800 text-sm font-semibold leading-normal" htmlFor="password">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="form-input w-full rounded-xl text-secondary-800 bg-white border border-secondary-200 focus:border-primary focus:ring-0 h-14 placeholder:text-secondary-400 pl-[15px] pr-12 text-base font-normal transition-colors"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-500 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                <p className="text-xs text-secondary-500 mt-1">Mật khẩu phải có ít nhất 8 ký tự.</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-4 bg-primary text-white hover:bg-primary/90 transition-colors text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
              </button>

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-secondary-200"></div>
                <span className="flex-shrink-0 mx-4 text-sm text-secondary-500">hoặc đăng ký với</span>
                <div className="flex-grow border-t border-secondary-200"></div>
              </div>

              {/* Social Login */}
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-secondary-200 bg-white hover:bg-secondary-50 transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M12.0003 20.45c-4.6667 0-8.45004-3.7833-8.45004-8.44996C3.55025 7.33337 7.33359 3.55005 12.0003 3.55005c2.1166 0 4.0166.71666 5.5333 1.91666l-1.9333 2.1c-.8167-.65-1.95-1.08333-3.6-1.08333-2.95 0-5.35004 2.4-5.35004 5.34996s2.40004 5.35 5.35004 5.35c2.3833 0 4.2666-1.3333 4.8666-3.4667H12.0003v-2.8h7.9166c.0834.4667.1334.95.1334 1.4834 0 4.65-3.1167 8.05-8.05 8.05z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-sm font-bold text-secondary-800">Đăng nhập bằng Google</span>
                </button>
              </div>

              {/* Terms */}
              <p className="text-center text-xs text-secondary-500 mt-4 leading-relaxed">
                Bằng việc đăng ký, bạn đồng ý với{' '}
                <Link href="/terms" className="text-secondary-800 underline decoration-primary decoration-2 underline-offset-2 font-medium">
                  Điều khoản dịch vụ
                </Link>{' '}
                và{' '}
                <Link href="/privacy" className="text-secondary-800 underline decoration-primary decoration-2 underline-offset-2 font-medium">
                  Chính sách bảo mật
                </Link>{' '}
                của Fashion AI.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
