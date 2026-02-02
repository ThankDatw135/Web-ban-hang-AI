/**
 * Fashion AI - Xác Thực OTP
 * 
 * Form nhập mã OTP 6 số
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Diamond, ArrowLeft, CheckCircle } from 'lucide-react';

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Đếm ngược thời gian gửi lại OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Xử lý nhập OTP
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Chỉ cho phép số

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Chỉ lấy ký tự cuối
    setOtp(newOtp);

    // Tự động focus ô tiếp theo
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Xử lý phím Backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Xử lý paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some(digit => !digit)) return;

    setIsLoading(true);
    // TODO: Implement verify OTP logic
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);
    }, 2000);
  };

  const handleResend = () => {
    setTimer(60);
    // TODO: Implement resend OTP logic
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
          <h1 className="text-2xl font-bold mt-6 mb-2">Xác thực OTP</h1>
          <p className="text-secondary">
            Nhập mã 6 số đã gửi đến email của bạn
          </p>
        </div>

        {/* Form */}
        <div className="card p-8">
          {!isVerified ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Inputs */}
              <div className="flex justify-center gap-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                ))}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || otp.some(d => !d)}
                className="btn-primary w-full"
              >
                {isLoading ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Xác nhận
                  </>
                )}
              </button>

              {/* Resend */}
              <div className="text-center">
                {timer > 0 ? (
                  <p className="text-sm text-secondary">
                    Gửi lại sau <span className="text-primary font-bold">{timer}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    Gửi lại mã OTP
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="text-center py-4">
              {/* Success icon */}
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              
              <h3 className="text-lg font-bold mb-2">Xác thực thành công!</h3>
              <p className="text-secondary text-sm mb-6">
                Bạn có thể đặt lại mật khẩu ngay bây giờ.
              </p>
              
              <Link href="/reset-password" className="btn-primary w-full">
                Đặt lại mật khẩu
              </Link>
            </div>
          )}
        </div>

        {/* Back to login */}
        <Link 
          href="/login" 
          className="flex items-center justify-center gap-2 mt-6 text-sm text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
}
