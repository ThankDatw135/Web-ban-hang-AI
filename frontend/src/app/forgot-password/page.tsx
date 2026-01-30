'use client';

/**
 * Forgot Password Page - Fashion AI
 * 
 * Bước 1: Nhập email để nhận OTP
 * Sau khi gửi thành công chuyển sang bước OTP
 */

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Loader2, Lock } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiClient.post('/auth/forgot-password', { email });
      setStep('otp');
      startResendTimer();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể gửi mã. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Vui lòng nhập đủ 6 số');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Verify OTP và redirect to reset password page
      const response = await apiClient.post('/auth/verify-otp', { email, otp: otpCode });
      const { token } = response.data.data;
      window.location.href = `/reset-password?token=${token}`;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Mã OTP không hợp lệ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-8 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2 text-text-main">
          <span className="text-primary text-3xl">✦</span>
          <h1 className="text-2xl font-extrabold tracking-tight uppercase">Fashion AI</h1>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Step 1: Email */}
          <div className="flex flex-col items-center">
            <div className={`mb-4 flex items-center gap-2 font-bold text-sm uppercase tracking-wider ${
              step === 'email' ? 'text-primary' : 'text-text-muted opacity-60'
            }`}>
              <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${
                step === 'email' ? 'border-primary' : 'border-secondary-300'
              }`}>1</span>
              <span>Xác định</span>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-border">
              <div className="mb-8 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <Lock className="size-6" />
                </div>
                <h2 className="text-2xl font-bold text-text-main mb-2">Khôi phục tài khoản</h2>
                <p className="text-text-muted text-sm leading-relaxed">
                  Nhập email liên kết với tài khoản của bạn để nhận mã xác thực.
                </p>
              </div>

              {step === 'email' && (
                <>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSendCode} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-text-main">
                        Địa chỉ Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                          <Mail className="size-5" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="input pl-10"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary btn-lg w-full"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          Đang gửi...
                        </>
                      ) : (
                        'Gửi mã xác thực'
                      )}
                    </button>
                  </form>
                </>
              )}

              <div className="mt-8 pt-6 border-t border-border text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-sm font-medium text-text-muted hover:text-primary transition-colors"
                >
                  <ArrowLeft className="size-4" />
                  Quay lại đăng nhập
                </Link>
              </div>
            </div>
          </div>

          {/* Step 2: OTP */}
          <div className="flex flex-col items-center">
            <div className={`mb-4 flex items-center gap-2 font-bold text-sm uppercase tracking-wider ${
              step === 'otp' ? 'text-primary' : 'text-text-muted opacity-60'
            }`}>
              <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${
                step === 'otp' ? 'border-primary' : 'border-secondary-300'
              }`}>2</span>
              <span>Xác thực</span>
            </div>

            <div className={`w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-border ${
              step !== 'otp' ? 'opacity-50 pointer-events-none' : ''
            }`}>
              <div className="mb-8 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <span className="text-2xl">🔐</span>
                </div>
                <h2 className="text-2xl font-bold text-text-main mb-2">Xác thực danh tính</h2>
                <p className="text-text-muted text-sm leading-relaxed">
                  Nhập mã 6 số đã gửi đến<br />
                  <span className="font-semibold text-text-main">{email}</span>
                </p>
              </div>

              {step === 'otp' && (
                <>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleVerifyOtp} className="space-y-8">
                    <div className="flex justify-between gap-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-14 text-center text-xl font-bold text-text-main bg-secondary-50 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary btn-lg w-full"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          Đang xác thực...
                        </>
                      ) : (
                        'Xác thực & Tiếp tục'
                      )}
                    </button>
                  </form>

                  <div className="mt-8 flex flex-col items-center gap-4 text-sm text-center">
                    <p className="text-text-muted">
                      Không nhận được mã?{' '}
                      <button
                        onClick={() => {
                          if (resendTimer === 0) {
                            handleSendCode({ preventDefault: () => {} } as React.FormEvent);
                          }
                        }}
                        disabled={resendTimer > 0}
                        className="font-semibold text-text-main hover:text-primary transition-colors disabled:opacity-50"
                      >
                        Gửi lại
                      </button>
                      {resendTimer > 0 && (
                        <span className="text-xs text-text-muted ml-1">({resendTimer}s)</span>
                      )}
                    </p>
                    <button
                      onClick={() => setStep('email')}
                      className="text-text-muted text-xs hover:text-primary transition-colors flex items-center gap-1"
                    >
                      ✏️ Thay đổi địa chỉ email
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center">
        <p className="text-text-muted text-xs font-medium opacity-60">
          © 2024 Fashion AI. Bảo mật & Bảo vệ danh tính.
        </p>
      </footer>
    </div>
  );
}
