/**
 * Fashion AI - Error Boundary
 * 
 * Xử lý lỗi runtime
 */

'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error occurred:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-16">
      <div className="text-center px-4">
        {/* Error Icon */}
        <div className="w-32 h-32 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-6xl text-red-600">error</span>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold mb-4">Đã xảy ra lỗi</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Xin lỗi, đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={reset}
            className="px-8 h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            Thử lại
          </button>
          <Link href="/">
            <button className="px-8 h-12 rounded-full border border-gray-300 font-bold hover:bg-white transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">home</span>
              Về trang chủ
            </button>
          </Link>
        </div>

        {/* Error code */}
        {error.digest && (
          <p className="mt-8 text-sm text-gray-400">
            Mã lỗi: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
