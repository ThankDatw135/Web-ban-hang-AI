/**
 * Fashion AI - Login Page
 * 
 * Trang đăng nhập với thiết kế centered card và blur effects
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useLogin } from '@/hooks/use-auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const error = loginMutation.error 
    ? (loginMutation.error as Error).message || 'Email hoặc mật khẩu không đúng'
    : '';

  return (
    <div className="bg-cream dark:bg-[#1e1a14] text-text-main dark:text-white font-sans min-h-screen flex flex-col antialiased">
      <div className="relative flex-grow flex items-center justify-center p-4 sm:p-8">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#e3dac9]/40 dark:bg-[#3d362b]/40 rounded-full blur-[100px]" />
        </div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-[480px] bg-white dark:bg-[#2c2824] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] p-8 sm:p-12 border border-[#f0f0f0] dark:border-[#3e3a35]">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-center mb-2">Fashion AI</h1>
            <p className="text-secondary text-center text-sm">Đăng nhập để trải nghiệm phòng thử đồ ảo</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold ml-1" htmlFor="email">
                Email hoặc số điện thoại
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
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-full border border-border dark:border-[#4a453e] bg-white dark:bg-[#1e1a14] py-3.5 pl-11 pr-4 text-sm placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-200"
                  placeholder="example@fashion.ai"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold ml-1" htmlFor="password">
                Mật khẩu
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-full border border-border dark:border-[#4a453e] bg-white dark:bg-[#1e1a14] py-3.5 pl-11 pr-12 text-sm placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-200"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-text-main dark:hover:text-white transition-colors focus:outline-none"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <Link href="/forgot-password" className="text-xs font-medium text-secondary hover:text-primary transition-colors">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="mt-2 w-full bg-primary hover:bg-[#b08d5b] text-text-main font-bold py-3.5 px-4 rounded-full shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border dark:border-[#4a453e]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-[#2c2824] px-4 text-xs text-gray-400 uppercase tracking-wider font-medium">
                Hoặc đăng nhập với
              </span>
            </div>
          </div>

          {/* Google Login */}
          <div className="grid grid-cols-1 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full rounded-full border border-border dark:border-[#4a453e] bg-white dark:bg-[#1e1a14] py-3 px-4 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-[#332f29] transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Đăng nhập bằng Google</span>
            </button>
          </div>

          {/* Register link */}
          <p className="mt-8 text-center text-sm text-secondary">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="font-bold text-primary hover:text-[#b08d5b] transition-colors ml-1">
              Đăng ký ngay
            </Link>
          </p>
        </div>

        {/* Decorative Images - Right */}
        <div className="hidden xl:block absolute right-[15%] top-1/2 -translate-y-1/2 w-64 h-80 z-0 opacity-80 pointer-events-none">
          <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-2xl rotate-6 border-4 border-white dark:border-[#2c2824]">
            <Image
              src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400"
              alt="Fashion model"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
              <div className="flex items-center gap-2 text-white/90 text-xs font-mono">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <span>AI Analysis: 98% Match</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Images - Left */}
        <div className="hidden xl:block absolute left-[15%] top-1/2 -translate-y-1/2 w-56 h-72 z-0 opacity-60 pointer-events-none">
          <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-xl -rotate-6 border-4 border-white dark:border-[#2c2824]">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400"
              alt="Fashion fabric"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
