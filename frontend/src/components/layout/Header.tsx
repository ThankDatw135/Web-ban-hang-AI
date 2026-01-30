'use client';

/**
 * Header Component - Fashion AI
 * 
 * Sticky header with glass effect
 * Nav: New Arrivals, Collections, AI Styling
 * Icons: Search, Profile, Cart
 */

import Link from 'next/link';
import { Search, User, ShoppingBag, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const { isAuthenticated, user } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 glass border-b border-primary/20">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-lg">✦</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-text-main">
              Fashion AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            <Link
              href="/products"
              className="text-sm font-semibold text-text-main hover:text-primary transition-colors"
            >
              New Arrivals
            </Link>
            <Link
              href="/collections"
              className="text-sm font-semibold text-text-main hover:text-primary transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/try-on"
              className="text-sm font-semibold text-accent hover:text-accent-600 transition-colors flex items-center gap-1"
            >
              <Sparkles className="size-4" />
              AI Styling
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              aria-label="Search"
              className="p-2 text-text-main hover:bg-primary/10 rounded-full transition-colors"
            >
              <Search className="size-5" />
            </button>

            <Link
              href={isAuthenticated ? '/profile' : '/login'}
              className="p-2 text-text-main hover:bg-primary/10 rounded-full transition-colors"
            >
              <User className="size-5" />
            </Link>

            <Link
              href="/cart"
              className="p-2 text-text-main hover:bg-primary/10 rounded-full transition-colors relative"
            >
              <ShoppingBag className="size-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 size-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-text-main"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              <Link
                href="/products"
                className="text-sm font-semibold text-text-main hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link
                href="/collections"
                className="text-sm font-semibold text-text-main hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/try-on"
                className="text-sm font-semibold text-accent flex items-center gap-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles className="size-4" />
                AI Styling
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
