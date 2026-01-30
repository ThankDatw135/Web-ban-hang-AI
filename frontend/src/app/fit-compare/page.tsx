/**
 * AI Style & Fit Comparison - Fashion AI
 * 
 * So sánh size và fit của các sản phẩm:
 * - Split view so sánh sản phẩm
 * - AI Fit Score
 * - Size recommendation badges
 * - Add to cart CTAs
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Heart, 
  ShoppingBag, 
  ChevronDown,
  ArrowRight,
  Scale,
  Ruler,
  Check,
  X
} from 'lucide-react';
import { Header, Footer } from '@/components';

type FitStatus = 'perfect' | 'loose' | 'tight' | 'short';

interface FitData {
  status: FitStatus;
  note: string;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  fitScore: number;
  recommendedSize: string;
  fit: Record<string, FitData>;
}

// Mock products for comparison
const products: Product[] = [
  {
    id: '1',
    name: 'Silk Evening Gown',
    brand: 'Fashion AI',
    price: 28800000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    fitScore: 98,
    recommendedSize: 'M',
    fit: {
      bust: { status: 'perfect', note: 'Vừa vặn hoàn hảo' },
      waist: { status: 'perfect', note: 'Vừa vặn hoàn hảo' },
      hips: { status: 'loose', note: 'Hơi rộng 1cm' },
      length: { status: 'perfect', note: 'Độ dài lý tưởng' },
    },
  },
  {
    id: '2',
    name: 'Velvet Midi Dress',
    brand: 'Premium Collection',
    price: 21600000,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
    fitScore: 92,
    recommendedSize: 'M',
    fit: {
      bust: { status: 'tight', note: 'Có thể hơi ôm' },
      waist: { status: 'perfect', note: 'Vừa vặn hoàn hảo' },
      hips: { status: 'perfect', note: 'Vừa vặn hoàn hảo' },
      length: { status: 'short', note: 'Ngắn hơn 2cm' },
    },
  },
];

const fitStatusColors: Record<FitStatus, string> = {
  perfect: 'text-green-600 bg-green-50',
  loose: 'text-blue-600 bg-blue-50',
  tight: 'text-orange-600 bg-orange-50',
  short: 'text-purple-600 bg-purple-50',
};

const fitStatusIcons: Record<FitStatus, typeof Check> = {
  perfect: Check,
  loose: ArrowRight,
  tight: ArrowRight,
  short: ArrowRight,
};

export default function FitComparePage() {
  const [selectedProducts, setSelectedProducts] = useState(products);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold tracking-wide uppercase mb-4">
            <Scale className="size-4" />
            AI So Sánh
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            So Sánh Size & Fit
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            AI phân tích và so sánh cách các sản phẩm khác nhau sẽ vừa với body của bạn
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {selectedProducts.map((product, index) => (
            <div key={product.id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
              {/* Product Image */}
              <div className="relative aspect-[4/5] bg-secondary-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Fit Score Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
                  <Sparkles className="size-4 text-accent" />
                  <span className="font-bold text-text-main">{product.fitScore}%</span>
                  <span className="text-xs text-text-muted">Fit Score</span>
                </div>

                {/* Like Button */}
                <button className="absolute top-4 right-4 size-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-text-muted hover:text-red-500 transition-colors">
                  <Heart className="size-5" />
                </button>

                {/* Size Badge */}
                <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                  Size: {product.recommendedSize}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-text-muted">{product.brand}</p>
                    <h3 className="text-xl font-bold text-text-main">{product.name}</h3>
                  </div>
                  <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                </div>

                {/* Fit Analysis */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-bold text-text-main uppercase tracking-wide flex items-center gap-2">
                    <Ruler className="size-4" />
                    Phân Tích Fit
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(product.fit).map(([area, data]) => {
                      const StatusIcon = fitStatusIcons[data.status];
                      const colorClass = fitStatusColors[data.status];
                      return (
                        <div
                          key={area}
                          className={`p-3 rounded-lg ${colorClass} flex items-center gap-2`}
                        >
                          <StatusIcon className="size-4" />
                          <div>
                            <p className="text-xs font-bold capitalize">{area === 'bust' ? 'Ngực' : area === 'waist' ? 'Eo' : area === 'hips' ? 'Hông' : 'Chiều dài'}</p>
                            <p className="text-[10px] opacity-80">{data.note}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <ShoppingBag className="size-5" />
                  Thêm Vào Giỏ
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Summary */}
        <div className="bg-white rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
            <Sparkles className="size-6 text-accent" />
            AI Tổng Kết
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <h3 className="font-bold text-green-800 mb-2">Phù Hợp Nhất</h3>
              <p className="text-green-700">{products[0].name}</p>
              <p className="text-sm text-green-600 mt-2">
                Với Fit Score 98%, sản phẩm này sẽ vừa vặn nhất với body của bạn. Tất cả các số đo đều nằm trong phạm vi lý tưởng.
              </p>
            </div>
            <div className="p-6 bg-secondary-50 rounded-xl border border-border">
              <h3 className="font-bold text-text-main mb-2">Lựa Chọn Thay Thế</h3>
              <p className="text-text-main">{products[1].name}</p>
              <p className="text-sm text-text-muted mt-2">
                Fit Score 92% cũng là lựa chọn tốt. Chỉ cần lưu ý phần ngực có thể hơi ôm và chiều dài ngắn hơn 2cm.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
