/**
 * Fashion AI - Header Component
 * 
 * Sticky header với glassmorphism effect
 * Bao gồm: Logo, Navigation, AI Studio button, Icons
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  User, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X,
  Sparkles 
} from 'lucide-react';

// Navigation links
const navLinks = [
  { href: '/products', label: 'Sản phẩm' },
  { href: '/about', label: 'Giới thiệu' },
  { href: '/blog', label: 'Tin tức' },
  { href: '/contact', label: 'Liên hệ' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll để thay đổi style header
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-cream/90 dark:bg-[#1e1a14]/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-3 items-center h-28">
          {/* Left - Logo */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-4 group">
              <Image 
                src="/logo.png" 
                alt="Fashion AI Logo" 
                width={80} 
                height={80}
                className="transition-transform group-hover:scale-110"
              />
              <span className="text-4xl font-bold text-text-main dark:text-white">
                Fashion <span className="text-primary">AI</span>
              </span>
            </Link>
          </div>

          {/* Center - Navigation */}
          <div className="flex justify-center">
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xl font-bold text-text-main dark:text-white hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right - AI Studio & Icons */}
          <div className="flex items-center justify-end gap-4">
            {/* AI Studio Button - Desktop */}
            <Link 
              href="/ai-studio"
              className="hidden xl:flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 text-accent text-lg font-bold hover:bg-accent/20 transition-colors"
            >
              <Sparkles className="w-6 h-6" />
              AI Studio
            </Link>

            <div className="flex items-center gap-3">
              {/* Search */}
              <button className="btn-ghost w-14 h-14">
                <Search className="w-8 h-8" />
              </button>

              {/* Wishlist - Desktop only */}
              <Link href="/dashboard/wishlist" className="hidden md:flex btn-ghost w-14 h-14">
                <Heart className="w-8 h-8" />
              </Link>

              {/* Cart */}
              <Link href="/cart" className="btn-ghost w-14 h-14 relative">
                <ShoppingBag className="w-8 h-8" />
                {/* Badge */}
                <span className="absolute top-0 right-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center font-bold">
                  0
                </span>
              </Link>

              {/* User */}
              <Link href="/login" className="hidden md:flex btn-ghost w-14 h-14">
                <User className="w-8 h-8" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden btn-ghost w-14 h-14"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
              >
                {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#25221d] border-t border-gray-200 dark:border-gray-700 animate-slide-down">
          <div className="container-app py-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-text-main dark:text-white hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* AI Studio - Mobile */}
              <Link 
                href="/ai-studio"
                className="flex items-center gap-2 text-lg font-bold text-accent py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="w-5 h-5" />
                AI Studio
              </Link>

              <hr className="border-gray-200 dark:border-gray-700 my-2" />

              {/* User actions - Mobile */}
              <Link 
                href="/login"
                className="flex items-center gap-2 text-lg font-medium text-text-main dark:text-white py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                Đăng nhập
              </Link>
              <Link 
                href="/dashboard/wishlist"
                className="flex items-center gap-2 text-lg font-medium text-text-main dark:text-white py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                Yêu thích
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
