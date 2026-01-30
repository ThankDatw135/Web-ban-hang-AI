/**
 * Footer Component - Fashion AI
 * 
 * 4-column layout: Brand, Shop, Support, Newsletter
 */

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-primary/20 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-primary text-2xl">✦</span>
              <h3 className="text-xl font-bold text-text-main">Fashion AI</h3>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Tiên phong kết hợp thời trang cao cấp và trí tuệ nhân tạo. 
              Phong cách cá nhân hóa, hoàn hảo bởi công nghệ.
            </p>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-text-main">Mua Sắm</h4>
            <nav className="flex flex-col gap-2 text-sm text-text-muted">
              <Link href="/products" className="hover:text-primary transition-colors">
                Hàng Mới Về
              </Link>
              <Link href="/collections" className="hover:text-primary transition-colors">
                Bộ Sưu Tập
              </Link>
              <Link href="/products?sale=true" className="hover:text-primary transition-colors">
                Khuyến Mãi
              </Link>
              <Link href="/gift-cards" className="hover:text-primary transition-colors">
                Thẻ Quà Tặng
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-text-main">Hỗ Trợ</h4>
            <nav className="flex flex-col gap-2 text-sm text-text-muted">
              <Link href="/faq" className="hover:text-primary transition-colors">
                FAQ
              </Link>
              <Link href="/shipping" className="hover:text-primary transition-colors">
                Vận Chuyển & Đổi Trả
              </Link>
              <Link href="/size-guide" className="hover:text-primary transition-colors">
                Hướng Dẫn Chọn Size
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Liên Hệ
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-text-main">Nhận Thông Tin</h4>
            <p className="text-xs text-text-muted">
              Đăng ký để nhận tips AI styling và ưu đãi độc quyền.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="input flex-1 text-sm py-2"
              />
              <button type="submit" className="btn-primary btn-sm">
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © 2024 Fashion AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-text-muted">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
