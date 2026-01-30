/**
 * AI Virtual Try-On History Gallery - Fashion AI
 * 
 * Trang xem lịch sử các lần thử đồ ảo với AI:
 * - Grid gallery các ảnh đã tạo
 * - Filter theo ngày/sản phẩm
 * - Download/Share/Delete options
 * - AI recommendations dựa trên lịch sử
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Calendar, 
  Download, 
  Share2, 
  Trash2, 
  Heart,
  ChevronRight,
  Filter,
  Grid,
  LayoutGrid,
  Clock,
  ShoppingBag,
  ArrowLeft
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock history data
const historyItems = [
  {
    id: '1',
    date: '2024-01-30',
    product: 'Silk Evening Gown',
    productPrice: 28800000,
    originalImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    resultImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
    liked: true,
  },
  {
    id: '2',
    date: '2024-01-29',
    product: 'Velvet Midnight Blazer',
    productPrice: 21360000,
    originalImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300',
    resultImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    liked: false,
  },
  {
    id: '3',
    date: '2024-01-28',
    product: 'Cashmere Coat',
    productPrice: 45000000,
    originalImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300',
    resultImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600',
    liked: true,
  },
  {
    id: '4',
    date: '2024-01-27',
    product: 'Linen Summer Dress',
    productPrice: 12500000,
    originalImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    resultImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
    liked: false,
  },
  {
    id: '5',
    date: '2024-01-26',
    product: 'Pleated Midi Skirt',
    productPrice: 8900000,
    originalImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300',
    resultImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?w=600',
    liked: true,
  },
  {
    id: '6',
    date: '2024-01-25',
    product: 'Tailored Wool Blazer',
    productPrice: 18500000,
    originalImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300',
    resultImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
    liked: false,
  },
];

const filterOptions = ['Tất cả', 'Tuần này', 'Tháng này', 'Đã thích'];

export default function TryOnHistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(
    new Set(historyItems.filter(item => item.liked).map(item => item.id))
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const toggleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredItems = historyItems.filter(item => {
    if (selectedFilter === 'Đã thích') {
      return likedItems.has(item.id);
    }
    // Add more filter logic as needed
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/try-on"
              className="size-10 rounded-full bg-white border border-border flex items-center justify-center hover:border-primary transition-colors"
            >
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <div>
              <nav className="flex items-center gap-2 text-sm text-text-muted">
                <Link href="/try-on" className="hover:text-primary transition-colors">
                  Virtual Atelier
                </Link>
                <ChevronRight className="size-4" />
                <span className="text-text-main font-medium">Lịch sử</span>
              </nav>
              <h1 className="text-2xl md:text-3xl font-bold text-text-main mt-1">
                Lịch Sử Thử Đồ AI
              </h1>
            </div>
          </div>

          <Link
            href="/try-on"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
          >
            <Sparkles className="size-4" />
            Thử Đồ Mới
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Grid className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">{historyItems.length}</p>
                <p className="text-xs text-text-muted">Tổng số lần thử</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="size-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">{likedItems.size}</p>
                <p className="text-xs text-text-muted">Đã yêu thích</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Sparkles className="size-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">98%</p>
                <p className="text-xs text-text-muted">Độ chính xác AI</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">3</p>
                <p className="text-xs text-text-muted">Đã mua</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & View Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedFilter === filter
                    ? 'bg-text-main text-white'
                    : 'bg-white text-text-muted border border-border hover:border-primary'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-text-muted border border-border'
              }`}
            >
              <LayoutGrid className="size-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-text-muted border border-border'
              }`}
            >
              <Grid className="size-5" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:border-primary/30 transition-all"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={item.resultImage}
                  alt={item.product}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      <button className="size-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-text-main hover:bg-white transition-colors">
                        <Download className="size-5" />
                      </button>
                      <button className="size-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-text-main hover:bg-white transition-colors">
                        <Share2 className="size-5" />
                      </button>
                    </div>
                    <button className="size-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 hover:bg-white transition-colors">
                      <Trash2 className="size-5" />
                    </button>
                  </div>
                </div>

                {/* AI Badge */}
                <div className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Sparkles className="size-3" />
                  AI Generated
                </div>

                {/* Like Button */}
                <button
                  onClick={() => toggleLike(item.id)}
                  className={`absolute top-3 right-3 size-10 rounded-full flex items-center justify-center transition-all ${
                    likedItems.has(item.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/90 backdrop-blur text-text-muted hover:text-red-500'
                  }`}
                >
                  <Heart className={`size-5 ${likedItems.has(item.id) ? 'fill-current' : ''}`} />
                </button>

                {/* Original Photo Thumbnail */}
                <div className="absolute bottom-3 left-3 size-16 rounded-lg overflow-hidden border-2 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <img
                    src={item.originalImage}
                    alt="Original"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">Gốc</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-text-main group-hover:text-primary transition-colors">
                      {item.product}
                    </h3>
                    <p className="text-sm text-text-muted flex items-center gap-1 mt-1">
                      <Clock className="size-3" />
                      {formatDate(item.date)}
                    </p>
                  </div>
                  <span className="text-primary font-bold">{formatPrice(item.productPrice)}</span>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Link
                    href="/try-on"
                    className="flex-1 py-2 bg-cream text-text-main font-medium rounded-lg text-center text-sm hover:bg-secondary-100 transition-colors"
                  >
                    Thử Lại
                  </Link>
                  <button className="flex-1 py-2 bg-primary text-white font-medium rounded-lg text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-1">
                    <ShoppingBag className="size-4" />
                    Mua Ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="size-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="size-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">Chưa có lịch sử</h3>
            <p className="text-text-muted mb-6">Bắt đầu thử đồ để xem lịch sử của bạn tại đây</p>
            <Link
              href="/try-on"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Sparkles className="size-5" />
              Thử Đồ Ngay
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
