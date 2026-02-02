/**
 * Fashion AI - Footer Component
 * 
 * Footer 4 columns với:
 * - Logo & description
 * - Quick links
 * - Support links
 * - Newsletter signup
 */

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

// Footer links data
const quickLinks = [
  { href: '/products', label: 'Sản phẩm' },
  { href: '/about', label: 'Giới thiệu' },
  { href: '/blog', label: 'Tin tức' },
  { href: '/ai-studio', label: 'AI Studio' },
];

const supportLinks = [
  { href: '/contact', label: 'Liên hệ' },
  { href: '/return-policy', label: 'Chính sách đổi trả' },
  { href: '/size-guide', label: 'Hướng dẫn chọn size' },
  { href: '#', label: 'Câu hỏi thường gặp' },
];

const socialLinks = [
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Youtube, label: 'Youtube' },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#25221d] border-t border-gray-200 dark:border-gray-700">
      {/* Main footer content */}
      <div className="container-app py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image 
                src="/logo.png" 
                alt="Fashion AI Logo" 
                width={64} 
                height={64}
              />
              <span className="text-3xl font-bold text-text-main dark:text-white">
                Fashion <span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-secondary text-sm mb-6">
              Khám phá phong cách của riêng bạn với Fashion AI. 
              Thử đồ trực tuyến với công nghệ AI tiên tiến.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider mb-4">
              Khám phá
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-secondary hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h4 className="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider mb-4">
              Hỗ trợ
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-secondary hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact & Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider mb-4">
              Liên hệ
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-secondary text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Đường ABC, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3 text-secondary text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>1900 1234</span>
              </li>
              <li className="flex items-center gap-3 text-secondary text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>support@fashionai.vn</span>
              </li>
            </ul>

            {/* Newsletter mini */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 h-10 px-4 rounded-full border border-gray-300 dark:border-gray-600 bg-transparent text-sm outline-none focus:border-primary transition-colors"
              />
              <button className="h-10 px-4 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary-600 transition-colors">
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="container-app py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary">
            <p>© 2026 Fashion AI. Tất cả quyền được bảo lưu.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
