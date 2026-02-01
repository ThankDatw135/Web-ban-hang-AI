/**
 * Fashion AI - 404 Not Found Page
 * 
 * Trang lỗi khi không tìm thấy nội dung
 */

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      
      <main className="flex-1 bg-cream flex items-center justify-center py-16">
        <div className="text-center px-4">
          {/* 404 Icon */}
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-6xl text-primary">search_off</span>
          </div>

          {/* Text */}
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy trang</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đến địa chỉ khác.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <button className="px-8 h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">home</span>
                Về trang chủ
              </button>
            </Link>
            <Link href="/products">
              <button className="px-8 h-12 rounded-full border border-gray-300 font-bold hover:bg-white transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                Xem sản phẩm
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
