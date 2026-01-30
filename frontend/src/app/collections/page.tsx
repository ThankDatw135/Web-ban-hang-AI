/**
 * Collections Page - Fashion AI
 * 
 * Trang bộ sưu tập với API integration:
 * - List all collections
 * - Dynamic routing
 * - AI Intelligent Filter sidebar
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, ChevronRight, Loader2, SlidersHorizontal, 
  Grid3X3, LayoutGrid, ArrowRight 
} from 'lucide-react';
import { Header, Footer } from '@/components';
import { useCollections } from '@/hooks/useCollections';

export default function CollectionsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { data: collections, isLoading } = useCollections();

  // Fallback collections if API is not available
  const fallbackCollections = [
    {
      id: '1',
      name: 'Xuân Hè 2026',
      slug: 'xuan-he-2026',
      description: 'Bộ sưu tập mới nhất với gam màu tươi sáng và chất liệu thoáng mát.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
      productCount: 48,
      isFeatured: true,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Thu Đông 2025',
      slug: 'thu-dong-2025',
      description: 'Những thiết kế ấm áp và sang trọng cho mùa lạnh.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      productCount: 36,
      isFeatured: true,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Essentials',
      slug: 'essentials',
      description: 'Những item cơ bản không thể thiếu trong tủ đồ.',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
      productCount: 24,
      isFeatured: false,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Limited Edition',
      slug: 'limited-edition',
      description: 'Phiên bản giới hạn với số lượng có hạn.',
      image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800',
      productCount: 12,
      isFeatured: true,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Office Wear',
      slug: 'office-wear',
      description: 'Thời trang công sở thanh lịch và chuyên nghiệp.',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
      productCount: 32,
      isFeatured: false,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'Evening Gowns',
      slug: 'evening-gowns',
      description: 'Đầm dạ hội lộng lẫy cho các dịp đặc biệt.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
      productCount: 18,
      isFeatured: false,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ];

  const displayCollections = collections || fallbackCollections;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="size-4" />
          <span className="text-text-main font-medium">Bộ Sưu Tập</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-text-main mb-3">
              Bộ Sưu Tập
            </h1>
            <p className="text-text-muted max-w-xl">
              Khám phá các bộ sưu tập được thiết kế bởi AI, cá nhân hóa theo phong cách của bạn.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`size-10 rounded-lg flex items-center justify-center transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white border border-border hover:border-primary'
              }`}
            >
              <Grid3X3 className="size-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`size-10 rounded-lg flex items-center justify-center transition-colors ${
                viewMode === 'list' ? 'bg-primary text-white' : 'bg-white border border-border hover:border-primary'
              }`}
            >
              <LayoutGrid className="size-5" />
            </button>
          </div>
        </div>

        {/* AI Banner */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center gap-6">
          <div className="size-14 rounded-xl bg-white flex items-center justify-center shadow-sm text-accent">
            <Sparkles className="size-7" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-text-main mb-1">AI Personalized Collections</h3>
            <p className="text-sm text-text-muted">
              Dựa trên lịch sử mua sắm và phong cách của bạn, chúng tôi đề xuất các bộ sưu tập phù hợp nhất.
            </p>
          </div>
          <button className="px-6 py-3 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl flex items-center gap-2 transition-colors">
            <SlidersHorizontal className="size-4" />
            Cá Nhân Hóa
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-primary" />
            <span className="ml-3 text-text-muted">Đang tải bộ sưu tập...</span>
          </div>
        )}

        {/* Collections Grid */}
        {!isLoading && (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {displayCollections.map((collection) => (
              <Link 
                key={collection.id} 
                href={`/collections/${collection.slug}`}
                className={`group relative overflow-hidden rounded-2xl ${
                  viewMode === 'grid' ? 'aspect-[4/5]' : 'flex items-center gap-6 bg-white border border-border p-4'
                }`}
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Grid View */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${collection.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Featured badge */}
                    {collection.isFeatured && (
                      <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                        Nổi bật
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{collection.name}</h3>
                      <p className="text-white/80 text-sm mb-4 line-clamp-2">{collection.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">{collection.productCount} sản phẩm</span>
                        <span className="text-white flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                          Khám phá <ArrowRight className="size-4" />
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div 
                      className="w-32 h-32 rounded-xl bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url('${collection.image}')` }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                          {collection.name}
                        </h3>
                        {collection.isFeatured && (
                          <span className="bg-accent/10 text-accent text-xs font-bold px-2 py-0.5 rounded-full">
                            Nổi bật
                          </span>
                        )}
                      </div>
                      <p className="text-text-muted text-sm mb-2">{collection.description}</p>
                      <span className="text-sm text-primary font-medium">{collection.productCount} sản phẩm</span>
                    </div>
                    <ArrowRight className="size-5 text-text-muted group-hover:text-primary transition-colors" />
                  </>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && displayCollections.length === 0 && (
          <div className="text-center py-20">
            <Grid3X3 className="size-16 text-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-main mb-2">Không có bộ sưu tập</h3>
            <p className="text-text-muted">Hiện chưa có bộ sưu tập nào.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
