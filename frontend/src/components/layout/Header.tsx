/**
 * Fashion AI - Header Component
 * 
 * Navigation header với logo, nav links, và actions
 * Sticky, responsive, backdrop blur
 * Sử dụng Material Symbols để đồng bộ với mockup
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// Navigation items - khớp với mockup
const navItems = [
  { href: '/products?category=new', label: 'Hàng mới về' },
  { href: '/products?category=women', label: 'Nữ' },
  { href: '/products?category=men', label: 'Nam' },
  { href: '/ai-studio', label: 'AI Studio', isAI: true },
];

interface HeaderProps {
  cartItemsCount?: number;
  isLoggedIn?: boolean;
  className?: string;
}

/**
 * Header component với navigation, search, cart, và user actions
 */
export function Header({ cartItemsCount = 0, isLoggedIn = false, className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full',
          'bg-cream/90 dark:bg-[#1e1a14]/90 backdrop-blur-md',
          'border-b border-[#e5e0d8] dark:border-[#332f28]',
          className
        )}
      >
        <div className="container-app">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Material Symbol diamond */}
            <Link
              href="/"
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[28px] text-primary">diamond</span>
              <h2 className="text-xl font-extrabold tracking-tight">Fashion AI</h2>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 justify-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-semibold transition-colors',
                    item.isAI
                      ? 'text-accent hover:text-accent/80 flex items-center gap-1'
                      : 'hover:text-primary',
                    pathname === item.href && 'text-primary'
                  )}
                >
                  {item.isAI && <span className="material-symbols-outlined text-[18px]">auto_awesome</span>}
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search button */}
              <Link
                href="/search"
                className="flex items-center justify-center rounded-full w-10 h-10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Tìm kiếm"
              >
                <span className="material-symbols-outlined text-[24px]">search</span>
              </Link>

              {/* Cart button */}
              <Link
                href="/cart"
                className="relative flex items-center justify-center rounded-full w-10 h-10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Giỏ hàng"
              >
                <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                {cartItemsCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                )}
              </Link>

              {/* User button - Desktop */}
              <Link
                href={isLoggedIn ? '/dashboard' : '/login'}
                className="hidden sm:flex items-center justify-center rounded-full w-10 h-10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label={isLoggedIn ? 'Tài khoản' : 'Đăng nhập'}
              >
                <span className="material-symbols-outlined text-[24px]">account_circle</span>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden flex items-center justify-center rounded-full w-10 h-10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Menu"
              >
                <span className="material-symbols-outlined text-[24px]">menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white dark:bg-[#1e1a14] shadow-2xl animate-slide-down">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#e5e0d8] dark:border-[#332f28]">
              <span className="font-bold text-lg">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Đóng menu"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Navigation links */}
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                    item.isAI
                      ? 'text-accent bg-accent/10'
                      : 'hover:bg-gray-100 dark:hover:bg-white/5',
                    pathname === item.href && 'bg-primary/10 text-primary'
                  )}
                >
                  {item.isAI && <span className="material-symbols-outlined">auto_awesome</span>}
                  <span className="font-semibold">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* User section */}
            <div className="p-4 border-t border-[#e5e0d8] dark:border-[#332f28]">
              <Link
                href={isLoggedIn ? '/dashboard' : '/login'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-bold"
              >
                <span className="material-symbols-outlined">person</span>
                {isLoggedIn ? 'Tài khoản của tôi' : 'Đăng nhập'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
