/**
 * Fashion AI - Verify OTP Page
 * 
 * Trang xác thực mã OTP 6 số
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Loader2, Timer } from 'lucide-react';
import { useVerifyOtp, useForgotPassword } from '@/hooks/use-auth';

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useForgotPassword();

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only keep last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
      setOtp(newOtp);
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      return;
    }

    verifyOtpMutation.mutate({ email, otp: otpCode });
  };

  const handleResend = async () => {
    resendOtpMutation.mutate(email, {
      onSuccess: () => {
        setCountdown(120);
        setOtp(['', '', '', '', '', '']);
      },
    });
  };

  const error = verifyOtpMutation.error
    ? (verifyOtpMutation.error as Error).message || 'Mã OTP không đúng'
    : '';

  return (
    <div className="bg-cream dark:bg-[#1e1a14] text-text-main dark:text-white font-sans min-h-screen flex flex-col antialiased">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-border dark:border-white/10 px-6 md:px-10 py-4 bg-white/80 dark:bg-[#1e1a14]/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 text-primary transition-transform group-hover:scale-110 duration-300">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 48 48">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight">Fashion AI</h2>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center p-4 md:p-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px]" />
        </div>

        {/* Card Container */}
        <div className="flex flex-col lg:flex-row max-w-[1100px] w-full bg-white dark:bg-[#25211b] rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden z-10 min-h-[600px] border border-white/50 dark:border-white/5">
          {/* Left Side: Visual */}
          <div className="hidden lg:flex flex-1 relative group">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
              alt="Fashion model"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 text-white border border-white/30">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <h3 className="text-white text-3xl font-bold mb-3 leading-tight">Thời trang tích hợp AI</h3>
              <p className="text-white/80 text-lg font-light leading-relaxed max-w-sm">
                Bảo mật tài khoản của bạn để trải nghiệm tính năng thử đồ ảo độc quyền và nhận tư vấn phong cách cá nhân hóa.
              </p>
            </div>
          </div>

          {/* Right Side: OTP Form */}
          <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 lg:p-16 relative">
            <div className="w-full max-w-[420px]">
              {/* Header */}
              <div className="mb-8 text-center">
                <div className="inline-flex w-14 h-14 rounded-full bg-primary/10 items-center justify-center text-primary mb-4 ring-1 ring-primary/20">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                  </svg>
                </div>
                <h1 className="text-[32px] font-bold leading-tight tracking-tight mb-3">
                  Xác thực OTP
                </h1>
                <p className="text-secondary text-base leading-relaxed">
                  Vui lòng nhập mã xác thực gồm 6 chữ số chúng tôi vừa gửi đến email<br/>
                  <span className="font-semibold text-text-main dark:text-white">{email}</span>
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              {/* OTP Inputs */}
              <div className="flex justify-between gap-2 md:gap-3 mb-8" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="flex h-12 w-10 md:h-16 md:w-14 text-center rounded-xl border border-border dark:border-white/10 bg-white dark:bg-white/5 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none text-2xl font-bold transition-all shadow-sm placeholder-transparent hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="-"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {/* Timer & Resend */}
              <div className="flex flex-col items-center gap-3 mb-10">
                <div className="flex items-center gap-2 px-4 py-2 bg-cream dark:bg-white/5 rounded-full">
                  <Timer className="w-5 h-5 text-primary" />
                  <p className="text-sm font-medium text-secondary">
                    Mã sẽ hết hạn sau <span className="text-text-main dark:text-white font-bold font-mono">{formatTime(countdown)}</span>
                  </p>
                </div>
                <div className="text-sm">
                  <span className="text-secondary">Bạn chưa nhận được mã?</span>
                  <button 
                    onClick={handleResend}
                    disabled={countdown > 0 || resendOtpMutation.isPending}
                    className="ml-1 text-primary font-bold hover:text-[#b08d5b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resendOtpMutation.isPending ? 'Đang gửi...' : 'Gửi lại mã'}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={verifyOtpMutation.isPending || otp.join('').length !== 6}
                  className="group w-full h-14 bg-primary hover:bg-[#b08d5b] text-white text-lg font-bold rounded-full transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-2 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {verifyOtpMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Đang xác thực...</span>
                    </>
                  ) : (
                    <>
                      <span>Xác nhận</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <Link 
                  href="/forgot-password"
                  className="w-full h-12 flex items-center justify-center gap-2 text-secondary font-semibold text-sm hover:text-text-main dark:hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
