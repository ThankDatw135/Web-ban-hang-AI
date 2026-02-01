/**
 * Fashion AI - Footer Component
 * 
 * Footer với logo, links, newsletter form, và social links
 */

'use client';

import Link from 'next/link';
import { Diamond, Instagram, Facebook, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Footer navigation sections
const footerSections = [
  {
    title: 'Khám phá',
    links: [
      { href: '/products?category=new', label: 'New Arrivals' },
      { href: '/products?category=women', label: 'Women' },
      { href: '/products?category=men', label: 'Men' },
      { href: '/products?category=accessories', label: 'Accessories' },
      { href: '/ai-studio', label: 'AI Studio' },
    ],
  },
  {
    title: 'Hỗ trợ',
    links: [
      { href: '/faq', label: 'FAQ' },
      { href: '/shipping', label: 'Vận chuyển & Đổi trả' },
      { href: '/size-guide', label: 'Hướng dẫn chọn size' },
      { href: '/privacy', label: 'Chính sách bảo mật' },
      { href: '/contact', label: 'Liên hệ' },
    ],
  },
];

// Social links
const socialLinks = [
  { href: 'https://instagram.com', label: 'Instagram', icon: Instagram, abbr: 'IG' },
  { href: 'https://facebook.com', label: 'Facebook', icon: Facebook, abbr: 'FB' },
  { href: 'https://tiktok.com', label: 'TikTok', icon: Twitter, abbr: 'TT' },
];

interface FooterProps {
  className?: string;
}

/**
 * Footer component với navigation, newsletter, và social links
 */
export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'w-full bg-white dark:bg-[#1a1814] pt-16 pb-8',
        'border-t border-border dark:border-[#332f28]',
        className
      )}
    >
      <div className="container-app">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-text-main dark:text-white">
              <Diamond className="w-6 h-6 text-primary" />
              <span className="text-lg font-extrabold tracking-tight">Fashion AI</span>
            </Link>
            <p className="text-sm text-secondary leading-relaxed">
              Tiên phong trong cuộc cách mạng thời trang kỹ thuật số. 
              Mang đến trải nghiệm mua sắm được cá nhân hóa hoàn hảo bởi trí tuệ nhân tạo.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center',
                    'bg-gray-100 dark:bg-gray-800 text-secondary',
                    'hover:bg-primary hover:text-white transition-colors'
                  )}
                  aria-label={social.label}
                >
                  <span className="text-xs font-bold">{social.abbr}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-text-main dark:text-white mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter section */}
          <div>
            <h3 className="font-bold text-text-main dark:text-white mb-6">
              Đăng ký nhận tin
            </h3>
            <p className="text-sm text-secondary mb-4">
              Nhận thông tin về bộ sưu tập mới và ưu đãi độc quyền.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Email của bạn"
                size="md"
              />
              <Button variant="primary" fullWidth>
                Đăng ký
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-[#332f28] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © 2024 Fashion AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
