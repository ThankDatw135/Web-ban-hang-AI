'use client';

/**
 * 2FA Verification Page - Fashion AI
 * 
 * Xác thực 2 bước với 6 digit OTP input
 * Purple accent cho bảo mật AI
 */

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/stores/auth-store';

export default function TwoFactorPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`2fa-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`2fa-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    
    if (code.length !== 6) {
      setError('Vui lòng nhập đủ 6 số');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/verify-2fa', { code });
      const { user, accessToken, refreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setAuth(user, accessToken);

      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Mã xác thực không hợp lệ');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await apiClient.post('/auth/resend-2fa');
      setError('');
    } catch (err: any) {
      setError('Không thể gửi lại mã. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="size-8 bg-text-main rounded-full flex items-center justify-center">
            <span className="text-white text-sm">👔</span>
          </div>
          <h2 className="text-text-main text-lg font-bold tracking-tight">Fashion AI</h2>
        </Link>
        <Link href="/help" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">
          Cần trợ giúp?
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
          {/* Modal Content */}
          <div className="p-8 md:p-12 flex flex-col items-center text-center">
            {/* Icon - Purple Shield */}
            <div className="mb-6 rounded-full bg-accent/10 p-4">
              <Shield className="size-8 text-accent" />
            </div>

            {/* Text Content */}
            <h1 className="text-2xl md:text-3xl font-bold text-text-main mb-3">
              Truy cập bảo mật
            </h1>
            <p className="text-text-muted text-base leading-relaxed max-w-[320px] mb-8">
              Nhập mã 6 số đã gửi đến thiết bị của bạn để mở khóa tài khoản.
            </p>

            {/* Error */}
            {error && (
              <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* OTP Form */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
              <div className="flex justify-center gap-2 md:gap-3 w-full">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`2fa-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-12 md:w-12 md:h-14 text-center bg-white border border-border rounded-lg text-lg md:text-xl font-semibold text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <div className="w-full flex flex-col gap-4 mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary btn-lg w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <Lock className="size-5" />
                  )}
                  {loading ? 'Đang xác thực...' : 'Xác thực bảo mật'}
                </button>

                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-text-muted hover:text-primary underline underline-offset-4 transition-colors"
                >
                  Không nhận được mã? Gửi lại
                </button>
              </div>
            </form>
          </div>

          {/* Bottom decorative bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-xs text-text-muted opacity-60 flex items-center justify-center gap-2">
          <Lock className="size-3" />
          Mã hóa đầu cuối bảo vệ quyền riêng tư của bạn
        </p>
      </footer>
    </div>
  );
}
