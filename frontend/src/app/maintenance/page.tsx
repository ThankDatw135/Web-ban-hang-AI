/**
 * Fashion AI - Maintenance Page
 * 
 * Trang thông báo bảo trì hệ thống
 */

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-primary/20 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center text-white">
        {/* Logo */}
        <div className="mb-8">
          <span className="text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Fashion AI
          </span>
        </div>

        {/* Maintenance icon */}
        <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 border border-white/20">
          <span className="material-symbols-outlined text-7xl text-white animate-pulse">
            build_circle
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hệ thống đang bảo trì
        </h1>
        <p className="text-xl text-white/80 mb-8 max-w-md mx-auto">
          Chúng tôi đang nâng cấp hệ thống để mang đến trải nghiệm tốt hơn cho bạn.
        </p>

        {/* Countdown timer */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <p className="text-sm text-white/70 mb-4">Thời gian dự kiến hoàn thành:</p>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                <span className="text-4xl font-bold">{formatNumber(timeLeft.hours)}</span>
              </div>
              <span className="text-sm text-white/70">Giờ</span>
            </div>
            <div className="text-4xl font-bold self-start mt-5">:</div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                <span className="text-4xl font-bold">{formatNumber(timeLeft.minutes)}</span>
              </div>
              <span className="text-sm text-white/70">Phút</span>
            </div>
            <div className="text-4xl font-bold self-start mt-5">:</div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                <span className="text-4xl font-bold">{formatNumber(timeLeft.seconds)}</span>
              </div>
              <span className="text-sm text-white/70">Giây</span>
            </div>
          </div>
        </div>

        {/* What's being updated */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 text-left border border-white/10">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">update</span>
            Những gì đang được cập nhật:
          </h3>
          <ul className="space-y-2 text-white/80">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
              Nâng cấp AI Engine cho Virtual Try-On chính xác hơn
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
              Cải thiện hiệu suất hệ thống
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-yellow-400 text-sm animate-pulse">pending</span>
              Cập nhật tính năng mới
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-400 text-sm">radio_button_unchecked</span>
              Bảo mật và sửa lỗi
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">mail</span>
            <span>support@fashion-ai.vn</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>1900-6789</span>
          </div>
        </div>

        {/* Refresh button */}
        <button 
          onClick={() => window.location.reload()}
          className="mt-8 px-8 py-3 rounded-full bg-white text-gray-900 font-bold hover:bg-white/90 transition-colors inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">refresh</span>
          Kiểm tra lại
        </button>

        {/* Social links */}
        <div className="mt-12 flex justify-center gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <span className="text-lg">📘</span>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <span className="text-lg">📸</span>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <span className="text-lg">🐦</span>
          </a>
        </div>
      </div>
    </div>
  );
}
