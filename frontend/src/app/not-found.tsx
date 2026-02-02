/**
 * Fashion AI - 404 Not Found
 * 
 * Trang hiển thị khi không tìm thấy route
 */

'use client';

import { Search, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-[#1e1a14] px-4">
      <div className="text-center max-w-md">
        {/* 404 illustration */}
        <div className="mb-8">
          <div className="relative">
            {/* Large 404 text */}
            <h1 className="text-[150px] md:text-[200px] font-black text-gray-100 dark:text-gray-800 leading-none select-none">
              404
            </h1>
            {/* Search icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="w-12 h-12 text-primary" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-text-main dark:text-white mb-4">
          Không tìm thấy trang
        </h2>
        <p className="text-secondary mb-8">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển. 
          Hãy kiểm tra lại đường dẫn hoặc quay về trang chủ.
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home className="w-5 h-5" />
            Về trang chủ
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="btn-outline"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>
        </div>
        
        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-secondary mb-4">Hoặc xem các trang phổ biến:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/products" className="text-sm text-primary hover:underline">
              Sản phẩm
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/ai-studio" className="text-sm text-primary hover:underline">
              AI Studio
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/contact" className="text-sm text-primary hover:underline">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
