/**
 * Fashion AI - Loading State
 * 
 * Hiển thị khi đang load trang
 * Sử dụng skeleton UI theo design system
 */

import { Diamond } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-[#1e1a14]">
      <div className="text-center">
        {/* Logo animation */}
        <div className="relative mb-6">
          <Diamond className="w-16 h-16 text-primary animate-pulse mx-auto" />
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
        </div>
        
        {/* Brand name */}
        <h2 className="text-xl font-bold text-text-main dark:text-white mb-2">
          Fashion AI
        </h2>
        
        {/* Loading text */}
        <p className="text-secondary text-sm">Đang tải...</p>
        
        {/* Loading bar */}
        <div className="mt-6 w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-primary animate-shimmer" 
               style={{ width: '50%' }} />
        </div>
      </div>
    </div>
  );
}
