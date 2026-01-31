'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * Header Component - Fashion AI
 * Điều hướng chính của ứng dụng
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-cream/90 backdrop-blur-md border-b border-secondary-200">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-secondary-800">
            <span className="material-symbols-outlined text-[28px] text-primary">diamond</span>
            <h2 className="text-xl font-extrabold tracking-tight">Fashion AI</h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center gap-8">
            <Link
              href="/collections"
              className="text-sm font-semibold hover:text-primary transition-colors"
            >
              Hàng mới về
            </Link>
            <Link
              href="/shop?category=women"
              className="text-sm font-semibold hover:text-primary transition-colors"
            >
              Nữ
            </Link>
            <Link
              href="/shop?category=men"
              className="text-sm font-semibold hover:text-primary transition-colors"
            >
              Nam
            </Link>
            <Link
              href="/try-on"
              className="text-sm font-semibold text-accent hover:text-accent-600 transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              AI Studio
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center justify-center rounded-full w-10 h-10 hover:bg-black/5 transition-colors"
              aria-label="Tìm kiếm"
            >
              <span className="material-symbols-outlined text-[24px]">search</span>
            </button>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="flex items-center justify-center rounded-full w-10 h-10 hover:bg-black/5 transition-colors relative"
            >
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
            </Link>

            {/* User Button - Desktop */}
            <Link
              href="/profile"
              className="hidden sm:flex items-center justify-center rounded-full w-10 h-10 hover:bg-black/5 transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">account_circle</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center rounded-full w-10 h-10 hover:bg-black/5 transition-colors"
              aria-label="Menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Search Bar - Expandable */}
        {isSearchOpen && (
          <div className="pb-4 animate-fade-in">
            <div className="flex items-center bg-white rounded-full px-4 h-12 border border-secondary-200">
              <span className="material-symbols-outlined text-secondary-400">search</span>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm ml-2 placeholder-secondary-400"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link
                href="/collections"
                className="px-4 py-3 rounded-xl hover:bg-white text-sm font-semibold transition-colors"
              >
                Hàng mới về
              </Link>
              <Link
                href="/shop?category=women"
                className="px-4 py-3 rounded-xl hover:bg-white text-sm font-semibold transition-colors"
              >
                Nữ
              </Link>
              <Link
                href="/shop?category=men"
                className="px-4 py-3 rounded-xl hover:bg-white text-sm font-semibold transition-colors"
              >
                Nam
              </Link>
              <Link
                href="/try-on"
                className="px-4 py-3 rounded-xl hover:bg-white text-sm font-semibold text-accent flex items-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                AI Studio
              </Link>
              <hr className="my-2 border-secondary-200" />
              <Link
                href="/profile"
                className="px-4 py-3 rounded-xl hover:bg-white text-sm font-semibold transition-colors"
              >
                Tài khoản
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
