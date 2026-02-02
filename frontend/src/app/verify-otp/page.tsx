/**
 * Fashion AI - Trang Xác Thực OTP
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Diamond, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { useVerifyOtp } from '@/hooks/use-auth';

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const verifyOtpMutation = useVerifyOtp();

  useEffect(() => {
    if (!email) {
      router.push('/forgot-password');
    }
    inputsRef.current[0]?.focus();
  }, [email, router]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.split('');
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);
    inputsRef.current[Math.min(digits.length, 5)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return;
    
    verifyOtpMutation.mutate({ email, otp: otpValue });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Diamond className="w-10 h-10 text-primary" />
            <span className="text-2xl font-bold">
              Fashion <span className="text-primary">AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">Nhập mã xác thực</h1>
          <p className="text-secondary">
            Mã xác thực đã gửi tới <strong>{email}</strong>
          </p>
        </div>

        {/* Form */}
        <div className="card p-8">
          {verifyOtpMutation.isError && (
             <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>
                  {(verifyOtpMutation.error as any)?.response?.data?.message || 'Mã xác thực không đúng hoặc đã hết hạn.'}
                </span>
             </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputsRef.current[index] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-2xl font-bold rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={verifyOtpMutation.isPending || otp.join('').length !== 6}
              className="btn-primary w-full"
            >
              {verifyOtpMutation.isPending ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Xác thực
                </>
              )}
            </button>
          </form>

          {/* Resend */}
          <div className="text-center mt-6">
            <p className="text-sm text-secondary">
              Không nhận được mã?{' '}
              <button className="text-primary font-medium hover:underline">
                Gửi lại
              </button>
            </p>
          </div>
        </div>
        
        {/* Back to login */}
        <div className="text-center mt-6">
          <Link 
            href="/login" 
            className="flex items-center justify-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại đăng nhập</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
