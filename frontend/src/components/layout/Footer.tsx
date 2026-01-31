import Link from 'next/link';

/**
 * Footer Component - Fashion AI
 * Chân trang với các liên kết, newsletter và mạng xã hội
 */
export default function Footer() {
  return (
    <footer className="w-full bg-white pt-16 pb-8 border-t border-secondary-200">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-secondary-800">
              <span className="material-symbols-outlined text-[24px] text-primary">diamond</span>
              <h2 className="text-lg font-extrabold tracking-tight">Fashion AI</h2>
            </div>
            <p className="text-sm text-secondary-500 leading-relaxed">
              Tiên phong trong cuộc cách mạng thời trang kỹ thuật số. Mang đến trải nghiệm mua sắm
              được cá nhân hóa hoàn hảo bởi trí tuệ nhân tạo.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-600 hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <span className="font-bold text-xs">IG</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-600 hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <span className="font-bold text-xs">FB</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-600 hover:bg-primary hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <span className="font-bold text-xs">TT</span>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-bold text-secondary-800 mb-6">Khám phá</h3>
            <ul className="space-y-3 text-sm text-secondary-500">
              <li>
                <Link href="/collections" className="hover:text-primary transition-colors">
                  Hàng mới về
                </Link>
              </li>
              <li>
                <Link href="/shop?category=women" className="hover:text-primary transition-colors">
                  Nữ
                </Link>
              </li>
              <li>
                <Link href="/shop?category=men" className="hover:text-primary transition-colors">
                  Nam
                </Link>
              </li>
              <li>
                <Link href="/try-on" className="hover:text-primary transition-colors">
                  AI Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-secondary-800 mb-6">Hỗ trợ</h3>
            <ul className="space-y-3 text-sm text-secondary-500">
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary transition-colors">
                  Vận chuyển & Đổi trả
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-primary transition-colors">
                  Hướng dẫn chọn size
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-primary transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-secondary-800 mb-6">Đăng ký nhận tin</h3>
            <p className="text-sm text-secondary-500 mb-4">
              Nhận thông tin về bộ sưu tập mới và ưu đãi độc quyền.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full h-11 px-4 rounded-full border border-secondary-300 bg-transparent text-sm outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="w-full h-11 rounded-full bg-secondary-800 text-white text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-secondary-400">© 2024 Fashion AI. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-secondary-400">
            <Link href="/privacy" className="hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/privacy" className="hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
