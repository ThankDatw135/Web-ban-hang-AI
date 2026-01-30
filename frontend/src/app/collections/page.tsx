/**
 * Collections Page - Fashion AI
 * 
 * Trang bộ sưu tập với:
 * - AI Intelligent Filter sidebar
 * - Product Grid với AI Match badges
 * - Virtual Try-On toggle
 * - Pagination
 */

import Link from 'next/link';
import { Sparkles, Search, ChevronRight, X, SlidersHorizontal } from 'lucide-react';
import { Header, Footer, ProductCard } from '@/components';

// Mock data - sẽ được thay bằng API
const products = [
  {
    id: '1',
    slug: 'venetian-blazer',
    name: 'The Venetian Blazer',
    price: 11090000,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
    material: 'Italian Silk Blend',
    aiMatch: 98,
  },
  {
    id: '2',
    slug: 'structured-wool-coat',
    name: 'Structured Wool Coat',
    price: 21890000,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600',
    material: 'Merino Wool',
    trending: true,
  },
  {
    id: '3',
    slug: 'midnight-silk-gown',
    name: 'Midnight Silk Gown',
    price: 29490000,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600',
    material: '100% Mulberry Silk',
    aiMatch: 92,
  },
  {
    id: '4',
    slug: 'aegean-linen-dress',
    name: 'Aegean Linen Dress',
    price: 7890000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    material: 'Sustainable Linen',
    aiMatch: 85,
  },
  {
    id: '5',
    slug: 'modern-executive-set',
    name: 'Modern Executive Set',
    price: 13550000,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
    material: 'Viscose Blend',
    aiMatch: 95,
  },
  {
    id: '6',
    slug: 'weekend-denim-edit',
    name: 'Weekend Denim Edit',
    price: 4790000,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
    material: 'Organic Cotton',
  },
];

const styleFilters = ['Modern', 'Romantic', 'Minimalist', 'Bohemian'];
const occasionFilters = ['Gala & Events', 'Business Professional', 'Weekend Casual'];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row">
        {/* Sidebar - AI Filter */}
        <aside className="w-full lg:w-80 lg:shrink-0 p-6 lg:p-8 border-r border-border bg-white lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-y-auto">
          {/* AI Filter Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2 text-accent">
              <Sparkles className="size-4 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Lọc Thông Minh</span>
            </div>
            <h3 className="font-serif text-2xl font-medium text-text-main mb-2">
              Tìm Phong Cách
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              AI phân tích sở thích của bạn để gợi ý size và style hoàn hảo.
            </p>
          </div>

          {/* AI Action Button */}
          <button className="w-full mb-8 group relative overflow-hidden rounded-xl bg-text-main text-white p-[1px] shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative flex items-center justify-center gap-3 bg-text-main px-4 py-3 rounded-[11px]">
              <SlidersHorizontal className="size-5" />
              <span className="font-medium text-sm">Phân Tích Tủ Đồ</span>
            </div>
          </button>

          {/* Style Identity */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-text-main mb-4 flex justify-between items-center">
              Phong Cách
              <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                AI Gợi Ý
              </span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {styleFilters.map((style, i) => (
                <button
                  key={style}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    i === 0
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'bg-secondary-50 text-text-muted border border-transparent hover:bg-secondary-100'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-text-main mb-4">Dịp Sử Dụng</h4>
            <div className="space-y-3">
              {occasionFilters.map((occasion, i) => (
                <label key={occasion} className="flex items-center gap-3 group cursor-pointer">
                  <div className={`relative flex items-center justify-center w-5 h-5 rounded border transition-colors ${
                    i === 1 ? 'border-accent bg-accent text-white' : 'border-border bg-white group-hover:border-accent'
                  }`}>
                    {i === 1 && <span className="text-xs">✓</span>}
                  </div>
                  <span className={`text-sm ${i === 1 ? 'font-medium text-text-main' : 'text-text-muted group-hover:text-accent'}`}>
                    {occasion}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Personalized Fit */}
          <div className="p-4 rounded-xl bg-cream border border-border mb-8">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-bold text-text-main">AI Fit Cá Nhân</h4>
              <span className="text-accent">📐</span>
            </div>
            <p className="text-xs text-text-muted mb-3">Dựa trên scan 3D gần nhất.</p>
            <div className="w-full bg-secondary-200 rounded-full h-1.5 mb-2">
              <div className="bg-accent h-1.5 rounded-full" style={{ width: '75%' }} />
            </div>
            <div className="flex justify-between text-[10px] font-medium text-text-muted uppercase tracking-wide">
              <span>Bó</span>
              <span className="text-accent">Vừa</span>
              <span>Rộng</span>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-sm font-bold text-text-main mb-4">Khoảng Giá</h4>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2 text-text-muted text-xs">₫</span>
                <input
                  type="text"
                  defaultValue="5.000.000"
                  className="w-full pl-6 py-1.5 bg-secondary-50 border-none rounded-lg text-sm text-text-main"
                />
              </div>
              <span className="text-text-muted">-</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-2 text-text-muted text-xs">₫</span>
                <input
                  type="text"
                  defaultValue="50.000.000"
                  className="w-full pl-6 py-1.5 bg-secondary-50 border-none rounded-lg text-sm text-text-main"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 px-6 lg:px-10 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <ChevronRight className="size-4" />
            <Link href="/collections" className="hover:text-primary transition-colors">Nữ</Link>
            <ChevronRight className="size-4" />
            <span className="text-text-main font-medium">Bộ Sưu Tập Xuân/Hè</span>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="font-serif text-4xl lg:text-5xl font-medium text-text-main mb-3">
                Bộ Sưu Tập Xuân/Hè
              </h1>
              <p className="text-text-muted max-w-xl">
                Tuyển chọn vải thoáng mát và dáng thanh lịch, cá nhân hóa cho phong cách riêng của bạn.
              </p>
            </div>

            {/* Sort */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm hover:border-primary transition-colors group">
                <span className="text-sm font-medium text-text-main group-hover:text-primary">
                  Sắp xếp: AI Gợi Ý
                </span>
                <ChevronRight className="size-4 text-text-muted rotate-90" />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium">
              <span>Business Professional</span>
              <button className="hover:text-accent/70"><X className="size-3" /></button>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border text-text-muted text-xs font-medium">
              <span>Size: M (AI Fit)</span>
              <button className="hover:text-red-500"><X className="size-3" /></button>
            </div>
            <button className="text-xs font-medium text-text-muted hover:text-text-main underline underline-offset-2">
              Xóa tất cả
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
            {products.map((product) => (
              <div key={product.id} className="relative group">
                {/* AI Badge */}
                {product.aiMatch && (
                  <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-white/20">
                    <Sparkles className="size-3.5 text-accent" />
                    <span className="text-xs font-bold text-text-main">{product.aiMatch}% Phù hợp</span>
                  </div>
                )}
                {product.trending && (
                  <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                    <span className="text-xs">📈</span>
                    <span className="text-xs font-bold text-text-main">Trending</span>
                  </div>
                )}
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                <ChevronRight className="size-5 rotate-180" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-medium shadow-lg">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors text-text-muted">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors text-text-muted">
                3
              </button>
              <span className="px-2 text-text-muted">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                <ChevronRight className="size-5" />
              </button>
            </nav>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
