/**
 * Fashion AI - Login Page
 * Design: stitch_trang_ch_fashion_ai/đăng_nhập_fashion_ai
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLogin } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="relative flex-grow flex items-center justify-center p-4 sm:p-8 min-h-screen bg-cream">
      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-secondary-200/40 rounded-full blur-[100px]"></div>
      </div>

      {/* Login Form Card */}
      <div className="relative z-10 w-full max-w-[480px] bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-secondary-100">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
            <span className="material-symbols-outlined text-4xl">checkroom</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-center mb-2">Fashion AI</h1>
          <p className="text-secondary-500 text-center text-sm">
            Đăng nhập để trải nghiệm phòng thử đồ ảo
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-secondary-800 ml-1" htmlFor="email">
              Email hoặc số điện thoại
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-secondary-400 group-focus-within:text-primary transition-colors">mail</span>
              </div>
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@fashion.ai"
                className="block w-full rounded-full border border-secondary-200 bg-white py-3.5 pl-11 pr-4 text-sm placeholder-secondary-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-secondary-800" htmlFor="password">
                Mật khẩu
              </label>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-secondary-400 group-focus-within:text-primary transition-colors">lock</span>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="block w-full rounded-full border border-secondary-200 bg-white py-3.5 pl-11 pr-12 text-sm placeholder-secondary-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-secondary-400 hover:text-secondary-800 transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <Link 
                href="/forgot-password" 
                className="text-xs font-medium text-secondary-500 hover:text-primary transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {(error as any)?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="mt-2 w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-full shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-secondary-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-xs text-secondary-400 uppercase tracking-wider font-medium">
              Hoặc đăng nhập với
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-1 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full rounded-full border border-secondary-200 bg-white py-3 px-4 text-sm font-semibold text-secondary-800 hover:bg-secondary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12.0003 20.45c-4.6667 0-8.45004-3.7833-8.45004-8.44996C3.55025 7.33337 7.33359 3.55005 12.0003 3.55005c2.1166 0 4.0166.71666 5.5333 1.91666l-1.9333 2.1c-.8167-.65-1.95-1.08333-3.6-1.08333-2.95 0-5.35004 2.4-5.35004 5.34996s2.40004 5.35 5.35004 5.35c2.3833 0 4.2666-1.3333 4.8666-3.4667H12.0003v-2.8h7.9166c.0834.4667.1334.95.1334 1.4834 0 4.65-3.1167 8.05-8.05 8.05z"
                fill="#EA4335"
              />
            </svg>
            <span>Đăng nhập bằng Google</span>
          </button>
        </div>

        {/* Register Link */}
        <p className="mt-8 text-center text-sm text-secondary-500">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="font-bold text-primary hover:text-primary/80 transition-colors ml-1">
            Đăng ký ngay
          </Link>
        </p>
      </div>

      {/* Decorative Images - Desktop Only */}
      <div className="hidden xl:block absolute right-[15%] top-1/2 -translate-y-1/2 w-64 h-80 z-0 opacity-80 pointer-events-none">
        <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-2xl rotate-6 border-4 border-white">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
            <div className="flex items-center gap-2 text-white/90 text-xs font-mono">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>AI Analysis: 98% Match</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden xl:block absolute left-[15%] top-1/2 -translate-y-1/2 w-56 h-72 z-0 opacity-60 pointer-events-none">
        <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-xl -rotate-6 border-4 border-white">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400')` }}
          />
        </div>
      </div>
    </div>
  );
}
