/**
 * Exclusive Access - Fashion AI
 * 
 * Trang truy cập VIP:
 * - Early access products
 * - Limited edition items
 * - Exclusive collections
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Crown, 
  Lock, 
  Clock, 
  Star,
  Sparkles,
  ShoppingBag,
  Heart,
  Bell
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Exclusive products
const exclusiveProducts = [
  {
    id: '1',
    name: 'Limited Edition Silk Dress',
    brand: 'Fashion AI Exclusive',
    price: 12500000,
    originalPrice: 15000000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    stock: 5,
    isNew: true,
    dropDate: null,
  },
  {
    id: '2',
    name: 'Hand-crafted Leather Bag',
    brand: 'Artisan Collection',
    price: 8900000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
    stock: 12,
    isNew: false,
    dropDate: null,
  },
  {
    id: '3',
    name: 'Cashmere Winter Coat',
    brand: 'Premium Line',
    price: 25000000,
    originalPrice: 30000000,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
    stock: 3,
    isNew: true,
    dropDate: null,
  },
];

// Upcoming drops
const upcomingDrops = [
  {
    id: '1',
    name: 'Spring Blossom Collection',
    brand: 'Fashion AI x Floral',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    dropDate: '05/02/2024',
    description: 'Bộ sưu tập hoa xuân với 25 items độc quyền',
  },
  {
    id: '2',
    name: 'Midnight Velvet Series',
    brand: 'Luxury Collection',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400',
    dropDate: '14/02/2024',
    description: 'Đặc biệt cho Valentine với chất liệu nhung cao cấp',
  },
];

export default function ExclusivePage() {
  const [isVIP] = useState(true);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  if (!isVIP) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="size-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="size-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-text-main mb-4">Exclusive Access</h1>
            <p className="text-text-muted mb-8">
              Trang này chỉ dành cho thành viên VIP. Nâng cấp tài khoản để truy cập các sản phẩm độc quyền.
            </p>
            <Link
              href="/loyalty"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Crown className="size-5" />
              Nâng cấp VIP
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-primary text-white text-sm font-bold tracking-wide mb-4">
            <Crown className="size-5" />
            VIP Exclusive
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            Exclusive Access
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Sản phẩm giới hạn và bộ sưu tập độc quyền chỉ dành cho thành viên VIP
          </p>
        </div>

        {/* VIP Badge */}
        <div className="bg-gradient-to-r from-amber-500/20 via-primary/10 to-amber-500/20 rounded-2xl p-6 mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Crown className="size-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-main">Platinum Member</h2>
              <p className="text-text-muted">Early access + Free shipping + 20% off</p>
            </div>
          </div>
          <Link
            href="/loyalty"
            className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium text-text-main hover:border-primary transition-colors"
          >
            Xem quyền lợi
          </Link>
        </div>

        {/* Exclusive Products */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-main flex items-center gap-2">
              <Sparkles className="size-6 text-primary" />
              Sản Phẩm Độc Quyền
            </h2>
            <span className="text-sm text-text-muted">{exclusiveProducts.length} sản phẩm</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exclusiveProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-border overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                        Mới
                      </span>
                    )}
                    <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <Crown className="size-3" />
                      VIP Only
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 size-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-text-muted hover:text-red-500 transition-colors">
                    <Heart className="size-5" />
                  </button>
                  {product.stock <= 5 && (
                    <div className="absolute bottom-4 left-4 right-4 px-3 py-2 bg-red-500/90 text-white text-xs font-bold rounded-lg text-center">
                      Chỉ còn {product.stock} sản phẩm
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-sm text-text-muted mb-1">{product.brand}</p>
                  <h3 className="font-bold text-text-main mb-3">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <button className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <ShoppingBag className="size-5" />
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Drops */}
        <section>
          <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-2">
            <Clock className="size-6 text-accent" />
            Sắp Ra Mắt
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingDrops.map((drop) => (
              <div key={drop.id} className="bg-white rounded-2xl border border-border overflow-hidden flex">
                <div className="w-1/3 aspect-square">
                  <img
                    src={drop.image}
                    alt={drop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-5 flex flex-col">
                  <span className="text-sm text-text-muted">{drop.brand}</span>
                  <h3 className="font-bold text-text-main mb-2">{drop.name}</h3>
                  <p className="text-sm text-text-muted mb-4 flex-1">{drop.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-accent text-sm font-medium">
                      <Clock className="size-4" />
                      {drop.dropDate}
                    </div>
                    <button className="px-4 py-2 bg-accent/10 text-accent font-medium rounded-lg flex items-center gap-2 hover:bg-accent/20 transition-colors">
                      <Bell className="size-4" />
                      Nhắc tôi
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
