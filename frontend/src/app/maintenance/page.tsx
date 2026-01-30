/**
 * Maintenance Page - Fashion AI
 * 
 * Trang bảo trì:
 * - Maintenance message
 * - Countdown timer
 * - Newsletter signup
 * - Social links
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  Clock, 
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Sparkles
} from 'lucide-react';

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream via-white to-primary/5">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 size-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <main className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="size-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-text-main">Fashion AI</span>
          </div>

          {/* Icon */}
          <div className="size-24 mx-auto mb-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Wrench className="size-12 text-primary" />
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            Đang Bảo Trì
          </h1>
          <p className="text-lg text-text-muted mb-8 max-w-lg mx-auto">
            Chúng tôi đang nâng cấp hệ thống để mang đến trải nghiệm tốt hơn. 
            Vui lòng quay lại sau!
          </p>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border min-w-[100px]">
              <p className="text-4xl font-bold text-primary">{formatNumber(timeLeft.hours)}</p>
              <p className="text-sm text-text-muted mt-1">Giờ</p>
            </div>
            <span className="text-3xl font-bold text-primary">:</span>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border min-w-[100px]">
              <p className="text-4xl font-bold text-primary">{formatNumber(timeLeft.minutes)}</p>
              <p className="text-sm text-text-muted mt-1">Phút</p>
            </div>
            <span className="text-3xl font-bold text-primary">:</span>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border min-w-[100px]">
              <p className="text-4xl font-bold text-primary">{formatNumber(timeLeft.seconds)}</p>
              <p className="text-sm text-text-muted mt-1">Giây</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border mb-8">
            <h2 className="text-xl font-bold text-text-main mb-2">
              Nhận thông báo khi hoàn tất
            </h2>
            <p className="text-text-muted mb-4">
              Để lại email, chúng tôi sẽ thông báo ngay khi website hoạt động trở lại
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
              />
              <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors flex items-center gap-2">
                <Mail className="size-5" />
                Gửi
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            <p className="text-text-muted">Theo dõi:</p>
            <a
              href="#"
              className="size-10 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-pink-500 hover:border-pink-300 transition-colors"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href="#"
              className="size-10 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-blue-600 hover:border-blue-300 transition-colors"
            >
              <Facebook className="size-5" />
            </a>
            <a
              href="#"
              className="size-10 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-sky-500 hover:border-sky-300 transition-colors"
            >
              <Twitter className="size-5" />
            </a>
          </div>

          {/* Contact */}
          <p className="text-sm text-text-muted mt-8">
            Cần hỗ trợ? Liên hệ{' '}
            <a href="mailto:support@fashionai.vn" className="text-primary hover:underline">
              support@fashionai.vn
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
