/**
 * Fashion AI - Register Page
 * 
 * Trang đăng ký tài khoản với hero image bên trái
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRegister } from '@/hooks/use-auth';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const registerMutation = useRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Parse full name into first and last name
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts.pop() || '';
    const lastName = nameParts.join(' ');
    
    registerMutation.mutate({
      email,
      password,
      firstName,
      lastName,
      phone: phone || undefined,
    });
  };

  const error = registerMutation.error
    ? (registerMutation.error as Error).message || 'Đăng ký thất bại'
    : '';

  return (
    <div className="bg-cream dark:bg-[#1e1a14] font-sans text-text-main dark:text-white overflow-x-hidden min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-border dark:border-[#332f2a] px-6 lg:px-10 py-4 bg-white/80 dark:bg-[#1e1a14]/90 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-4">
          <div className="w-8 h-8 text-primary">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 48 48">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight">Fashion AI</h2>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-sm font-medium text-secondary">Bạn đã có tài khoản?</span>
          <Link href="/login">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-white dark:bg-white/5 border border-border dark:border-zinc-700 text-sm font-bold leading-normal tracking-wide hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
              <span>Đăng nhập</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-[1280px] grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
          {/* Left side - Hero Image */}
          <div className="hidden lg:flex relative h-[700px] w-full flex-col justify-end overflow-hidden rounded-2xl bg-gray-200">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200"
                alt="Fashion model with digital effects"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
            <div className="relative z-10 p-10 text-white">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-md border border-white/10 text-primary">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                AI Powered
              </div>
              <h3 className="text-4xl font-bold leading-tight mb-3">
                Định hình phong cách<br/>của tương lai.
              </h3>
              <p className="text-white/80 text-lg font-medium">
                Trải nghiệm phòng thử đồ ảo và nhận tư vấn thời trang từ AI chuyên nghiệp.
              </p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex flex-col w-full max-w-[520px] mx-auto lg:mx-0 py-4">
            <div className="flex flex-col gap-3 mb-8">
              <h1 className="tracking-tight text-[32px] md:text-[40px] font-bold leading-tight">
                Đăng ký tài khoản
              </h1>
              <p className="text-secondary text-base font-normal leading-normal">
                Gia nhập thế giới Fashion AI. Trải nghiệm mua sắm đẳng cấp.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold leading-normal" htmlFor="fullname">
                  Họ và tên
                </label>
                <input
                  id="fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-[#2a2620] border border-border dark:border-zinc-700 focus:border-primary focus:ring-0 h-14 placeholder:text-secondary px-4 text-base font-normal transition-colors"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold leading-normal" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-[#2a2620] border border-border dark:border-zinc-700 focus:border-primary focus:ring-0 h-14 placeholder:text-secondary px-4 text-base font-normal transition-colors"
                  placeholder="name@example.com"
                  required
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold leading-normal" htmlFor="phone">
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-[#2a2620] border border-border dark:border-zinc-700 focus:border-primary focus:ring-0 h-14 placeholder:text-secondary px-4 text-base font-normal transition-colors"
                  placeholder="0912 xxx xxx"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold leading-normal" htmlFor="password">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl bg-white dark:bg-[#2a2620] border border-border dark:border-zinc-700 focus:border-primary focus:ring-0 h-14 placeholder:text-secondary pl-4 pr-12 text-base font-normal transition-colors"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                  >
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-secondary mt-1">Mật khẩu phải có ít nhất 8 ký tự.</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-4 bg-primary text-text-main hover:bg-[#b08d5b] transition-colors text-base font-bold leading-normal tracking-wide shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Đang tạo tài khoản...
                  </>
                ) : (
                  <span>Tạo tài khoản</span>
                )}
              </button>

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-border dark:border-zinc-700" />
                <span className="flex-shrink-0 mx-4 text-sm text-secondary">hoặc đăng ký với</span>
                <div className="flex-grow border-t border-border dark:border-zinc-700" />
              </div>

              {/* Google Login */}
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border dark:border-zinc-700 bg-white dark:bg-[#2a2620] hover:bg-gray-50 dark:hover:bg-[#332f2a] transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-sm font-bold">Đăng nhập bằng Google</span>
                </button>
              </div>

              {/* Terms */}
              <p className="text-center text-xs text-secondary mt-4 leading-relaxed">
                Bằng việc đăng ký, bạn đồng ý với{' '}
                <Link href="/terms" className="underline decoration-primary decoration-2 underline-offset-2 font-medium hover:text-primary transition-colors">
                  Điều khoản dịch vụ
                </Link>{' '}
                và{' '}
                <Link href="/privacy" className="underline decoration-primary decoration-2 underline-offset-2 font-medium hover:text-primary transition-colors">
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
