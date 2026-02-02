/**
 * Fashion AI - Error Boundary
 * 
 * Hiển thị khi có lỗi xảy ra
 * Cung cấp nút retry để thử lại
 */

'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log lỗi ra console để debug
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-[#1e1a14] px-4">
      <div className="text-center max-w-md">
        {/* Error icon */}
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-10 h-10 text-error" />
          </div>
        </div>
        
        {/* Error message */}
        <h1 className="text-2xl md:text-3xl font-bold text-text-main dark:text-white mb-4">
          Đã xảy ra lỗi
        </h1>
        <p className="text-secondary mb-8">
          Rất tiếc, đã có lỗi xảy ra khi tải trang này. 
          Vui lòng thử lại hoặc quay về trang chủ.
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="btn-primary"
          >
            <RefreshCw className="w-5 h-5" />
            Thử lại
          </button>
          <Link href="/" className="btn-outline">
            <Home className="w-5 h-5" />
            Về trang chủ
          </Link>
        </div>
        
        {/* Error details (dev only) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="text-sm text-secondary cursor-pointer hover:text-primary">
              Chi tiết lỗi (development)
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 dark:bg-[#25221d] rounded-xl text-xs overflow-auto">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
