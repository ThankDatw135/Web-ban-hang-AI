/**
 * Shop Page - Fashion AI
 * 
 * Trang shop với:
 * - AI Personalized Ranking toggle
 * - Filter chips (Size, Color, Occasion, Mood, Body Fit)
 * - Product Grid với hover effects
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Star, ChevronRight, Heart } from 'lucide-react';
import { Header, Footer, ProductCard } from '@/components';

// Mock data
const products = [
  {
    id: '1',
    slug: 'lumiere-silk-blouse',
    name: 'Lumière Silk Blouse',
    price: 6030000,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600',
    aiMatch: 98,
  },
  {
    id: '2',
    slug: 'noir-evening-slip',
    name: 'Noir Evening Slip',
    price: 7880000,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600',
  },
  {
    id: '3',
    slug: 'ivory-classic-shirt',
    name: 'Ivory Classic Shirt',
    price: 4800000,
    image: 'https://images.unsplash.com/photo-1598554793905-075068c6c933?w=600',
    trending: true,
  },
  {
    id: '4',
    slug: 'blush-midi-wrap',
    name: 'Blush Midi Wrap',
    price: 6890000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
  },
  {
    id: '5',
    slug: 'sapphire-night-gown',
    name: 'Sapphire Night Gown',
    price: 10090000,
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600',
  },
  {
    id: '6',
    slug: 'scarlet-cocktail-dress',
    name: 'Scarlet Cocktail Dress',
    price: 7260000,
    image: 'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=600',
    aiMatch: 95,
  },
  {
    id: '7',
    slug: 'emerald-loungewear',
    name: 'Emerald Loungewear',
    price: 4430000,
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600',
  },
  {
    id: '8',
    slug: 'champagne-gala-gown',
    name: 'Champagne Gala Gown',
    price: 13530000,
    image: 'https://images.unsplash.com/photo-1597586124394-fbd6ef244026?w=600',
  },
];

export default function ShopPage() {
  const [aiRanking, setAiRanking] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 lg:px-12 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="size-4" />
          <Link href="/shop" className="hover:text-primary transition-colors">Nữ</Link>
          <ChevronRight className="size-4" />
          <span className="text-text-main font-medium">Silk Collection</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight">
              The Silk Collection
            </h1>
            <p className="text-lg text-text-muted font-light flex items-center gap-2">
              <Sparkles className="size-5 text-accent" />
              AI gợi ý theo bảng màu Thu của bạn
            </p>
          </div>
          
          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">Sắp xếp:</span>
            <button className="text-sm font-semibold text-text-main flex items-center gap-1 hover:text-primary">
              AI Gợi Ý <ChevronRight className="size-4 rotate-90" />
            </button>
          </div>
        </div>

        {/* AI Ranking Toggle */}
        <div className="p-5 rounded-xl border border-accent/20 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <Star className="size-5" />
            </div>
            <div>
              <p className="text-text-main font-bold text-base">AI Xếp Hạng Cá Nhân</p>
              <p className="text-text-muted text-sm">Sắp xếp sản phẩm dựa trên sở thích và phong cách của bạn</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={aiRanking}
              onChange={() => setAiRanking(!aiRanking)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent" />
          </label>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Standard Filters */}
          <button className="h-9 px-4 rounded-full border border-border bg-transparent hover:border-primary hover:text-primary transition-colors text-sm font-medium text-text-main flex items-center gap-2">
            Size <ChevronRight className="size-4 rotate-90" />
          </button>
          <button className="h-9 px-4 rounded-full border border-border bg-transparent hover:border-primary hover:text-primary transition-colors text-sm font-medium text-text-main flex items-center gap-2">
            Màu <ChevronRight className="size-4 rotate-90" />
          </button>
          
          <div className="w-px h-6 bg-border mx-1" />
          
          {/* AI Filters */}
          <button className="h-9 px-4 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors text-sm font-medium text-accent flex items-center gap-2">
            🎉 Dịp
          </button>
          <button className="h-9 px-4 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors text-sm font-medium text-accent flex items-center gap-2">
            😊 Tâm trạng
          </button>
          <button className="h-9 px-4 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors text-sm font-medium text-accent flex items-center gap-2">
            👗 Body Fit
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 pb-20">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col gap-4 cursor-pointer">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-secondary-100">
                {/* AI Badge */}
                {product.aiMatch && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-accent shadow-sm flex items-center gap-1 z-10">
                    <Sparkles className="size-3.5" /> {product.aiMatch}% Phù hợp
                  </div>
                )}
                {product.trending && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-accent shadow-sm flex items-center gap-1 z-10">
                    📈 Trending
                  </div>
                )}

                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Try-On Button */}
                <button className="absolute bottom-3 right-3 h-9 w-9 bg-white text-text-main rounded-full shadow-lg flex items-center justify-center hover:bg-accent hover:text-white transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100" title="Virtual Try-On">
                  <Sparkles className="size-5" />
                </button>
              </div>
              
              <div>
                <div className="flex justify-between items-start mb-1">
                  <Link href={`/products/${product.slug}`} className="text-text-main font-medium text-lg leading-tight hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                  <button className="text-text-muted hover:text-primary transition-colors">
                    <Heart className="size-5" />
                  </button>
                </div>
                <p className="text-primary font-medium">
                  {new Intl.NumberFormat('vi-VN').format(product.price)}₫
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
