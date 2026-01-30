/**
 * Elegant Curated Wishlist - Fashion AI
 * 
 * Wishlist với AI curation:
 * - Grid sản phẩm yêu thích
 * - Price drop alerts
 * - AI match scores
 * - Quick add to cart
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Bell, 
  BellOff,
  Sparkles,
  TrendingDown,
  Share2
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock wishlist items
const wishlistItems = [
  {
    id: '1',
    name: 'Silk Evening Gown',
    brand: 'Fashion AI',
    price: 28800000,
    originalPrice: 32000000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    match: 98,
    inStock: true,
    priceDropAlert: true,
  },
  {
    id: '2',
    name: 'Velvet Midnight Blazer',
    brand: 'Premium Collection',
    price: 21360000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
    match: 95,
    inStock: true,
    priceDropAlert: false,
  },
  {
    id: '3',
    name: 'Cashmere Wool Coat',
    brand: 'Luxury Line',
    price: 45000000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
    match: 92,
    inStock: false,
    priceDropAlert: true,
  },
  {
    id: '4',
    name: 'Pearl Earrings Set',
    brand: 'Accessories',
    price: 1800000,
    originalPrice: 2200000,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    match: 88,
    inStock: true,
    priceDropAlert: false,
  },
];

export default function WishlistPage() {
  const [items, setItems] = useState(wishlistItems);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleAlert = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, priceDropAlert: !item.priceDropAlert } : item
    ));
  };

  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="size-6 text-red-500 fill-red-500" />
              <h1 className="text-3xl font-bold text-text-main">Wishlist Của Tôi</h1>
            </div>
            <p className="text-text-muted">{items.length} sản phẩm yêu thích • Tổng giá trị: {formatPrice(totalValue)}</p>
          </div>
          <button className="px-4 py-2 bg-white border border-border hover:bg-secondary-50 text-text-main font-medium rounded-lg flex items-center gap-2 transition-colors">
            <Share2 className="size-4" />
            Chia sẻ Wishlist
          </button>
        </div>

        {/* AI Insight */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="size-5 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-text-main mb-1">AI Stylist Insight</h3>
              <p className="text-sm text-text-muted">
                2 sản phẩm trong wishlist đang giảm giá! <span className="text-accent font-medium">Silk Evening Gown</span> và <span className="text-accent font-medium">Pearl Earrings Set</span> đang có ưu đãi tốt.
              </p>
            </div>
          </div>
        </div>

        {/* Wishlist Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="flex">
                  {/* Image */}
                  <div className="relative w-40 md:w-48 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover aspect-[3/4]"
                    />
                    {item.originalPrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <TrendingDown className="size-3" />
                        Sale
                      </div>
                    )}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold">Hết hàng</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-text-muted mb-1">{item.brand}</p>
                        <h3 className="font-bold text-text-main group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <div className="bg-accent/10 text-accent text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="size-3" />
                        {item.match}%
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-primary">{formatPrice(item.price)}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-text-muted line-through">{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center gap-2">
                      <button 
                        disabled={!item.inStock}
                        className="flex-1 py-2 bg-primary hover:bg-primary/90 disabled:bg-secondary-200 disabled:cursor-not-allowed text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <ShoppingBag className="size-4" />
                        Thêm vào giỏ
                      </button>
                      <button
                        onClick={() => toggleAlert(item.id)}
                        className={`size-10 rounded-lg flex items-center justify-center transition-colors ${
                          item.priceDropAlert 
                            ? 'bg-amber-100 text-amber-600' 
                            : 'bg-secondary-50 text-text-muted hover:bg-secondary-100'
                        }`}
                        title={item.priceDropAlert ? 'Tắt thông báo giảm giá' : 'Bật thông báo giảm giá'}
                      >
                        {item.priceDropAlert ? <Bell className="size-4" /> : <BellOff className="size-4" />}
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="size-10 bg-secondary-50 hover:bg-red-50 text-text-muted hover:text-red-500 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="size-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="size-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">Wishlist trống</h3>
            <p className="text-text-muted mb-6">Thêm sản phẩm yêu thích để xem tại đây</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ShoppingBag className="size-5" />
              Khám Phá Ngay
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
