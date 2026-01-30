/**
 * Shop Page - Fashion AI
 * 
 * Trang shop động với:
 * - API integration cho products
 * - AI Personalized Ranking toggle
 * - Filter chips (Size, Color, Occasion, Mood, Body Fit)
 * - Product Grid với hover effects
 * - Pagination
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, Star, ChevronRight, Heart, ChevronLeft, Loader2 } from 'lucide-react';
import { Header, Footer } from '@/components';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { useWishlistStore } from '@/stores';
import type { ProductFilters } from '@/types';

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const [aiRanking, setAiRanking] = useState(true);
  
  // Get filters from URL
  const filters: ProductFilters = {
    page: Number(searchParams.get('page')) || 1,
    limit: 12,
    category: searchParams.get('category') || undefined,
    search: searchParams.get('search') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    size: searchParams.get('size') || undefined,
    color: searchParams.get('color') || undefined,
    sort: (searchParams.get('sort') as ProductFilters['sort']) || 'newest',
  };

  // Fetch products
  const { data: productsData, isLoading, error } = useProducts(filters);
  const { data: categories } = useCategories(true);

  // Update URL when filters change
  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    
    router.push(`/shop?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (sort: ProductFilters['sort']) => {
    updateFilters({ sort, page: 1 });
  };

  // Mock AI match scores (would come from AI service)
  const getAiMatch = (productId: string) => {
    const matches: Record<string, number> = {
      '1': 98, '2': 92, '6': 95, '8': 88
    };
    return matches[productId];
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 lg:px-12 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="size-4" />
          <span className="text-text-main font-medium">Shop</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight">
              Bộ Sưu Tập
            </h1>
            <p className="text-lg text-text-muted font-light flex items-center gap-2">
              <Sparkles className="size-5 text-accent" />
              {productsData?.meta?.total || 0} sản phẩm
              {aiRanking && ' • AI gợi ý theo phong cách của bạn'}
            </p>
          </div>
          
          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">Sắp xếp:</span>
            <select 
              value={filters.sort}
              onChange={(e) => handleSortChange(e.target.value as ProductFilters['sort'])}
              className="text-sm font-semibold text-text-main bg-transparent border-none cursor-pointer focus:ring-0"
            >
              <option value="newest">Mới nhất</option>
              <option value="popular">Phổ biến</option>
              <option value="price_asc">Giá thấp → cao</option>
              <option value="price_desc">Giá cao → thấp</option>
            </select>
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
          <button 
            onClick={() => updateFilters({ size: filters.size === 'M' ? undefined : 'M' })}
            className={`h-9 px-4 rounded-full border transition-colors text-sm font-medium flex items-center gap-2 ${
              filters.size ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-transparent hover:border-primary hover:text-primary text-text-main'
            }`}
          >
            Size {filters.size && `(${filters.size})`} <ChevronRight className="size-4 rotate-90" />
          </button>
          <button 
            onClick={() => updateFilters({ color: filters.color ? undefined : 'Đen' })}
            className={`h-9 px-4 rounded-full border transition-colors text-sm font-medium flex items-center gap-2 ${
              filters.color ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-transparent hover:border-primary hover:text-primary text-text-main'
            }`}
          >
            Màu {filters.color && `(${filters.color})`} <ChevronRight className="size-4 rotate-90" />
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-primary" />
            <span className="ml-3 text-text-muted">Đang tải sản phẩm...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">Không thể tải sản phẩm. Vui lòng thử lại.</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !error && productsData && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 pb-10">
              {productsData.items.map((product) => {
                const aiMatch = aiRanking ? getAiMatch(product.id) : undefined;
                const inWishlist = isInWishlist(product.id);
                
                return (
                  <div key={product.id} className="group flex flex-col gap-4 cursor-pointer">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-secondary-100">
                      {/* AI Badge */}
                      {aiMatch && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-accent shadow-sm flex items-center gap-1 z-10">
                          <Sparkles className="size-3.5" /> {aiMatch}% Phù hợp
                        </div>
                      )}

                      <img
                        src={product.images?.[0]?.url || 'https://via.placeholder.com/400x500'}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Try-On Button */}
                      <Link 
                        href={`/try-on?product=${product.id}`}
                        className="absolute bottom-3 right-3 h-9 w-9 bg-white text-text-main rounded-full shadow-lg flex items-center justify-center hover:bg-accent hover:text-white transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                        title="Virtual Try-On"
                      >
                        <Sparkles className="size-5" />
                      </Link>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <Link 
                          href={`/products/${product.slug}`} 
                          className="text-text-main font-medium text-lg leading-tight hover:text-primary transition-colors"
                        >
                          {product.name}
                        </Link>
                        <button 
                          onClick={() => toggleItem({
                            productId: product.id,
                            name: product.name,
                            price: product.salePrice || product.price,
                            image: product.images?.[0]?.url || '',
                          })}
                          className={`transition-colors ${inWishlist ? 'text-red-500' : 'text-text-muted hover:text-primary'}`}
                        >
                          <Heart className={`size-5 ${inWishlist ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        {product.salePrice && (
                          <span className="text-text-muted line-through text-sm">
                            {new Intl.NumberFormat('vi-VN').format(product.price)}₫
                          </span>
                        )}
                        <p className="text-primary font-medium">
                          {new Intl.NumberFormat('vi-VN').format(product.salePrice || product.price)}₫
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {productsData.meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 py-8">
                <button
                  onClick={() => handlePageChange(filters.page! - 1)}
                  disabled={filters.page === 1}
                  className="h-10 px-4 rounded-lg border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ChevronLeft className="size-4" /> Trước
                </button>
                
                {Array.from({ length: productsData.meta.totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    const current = filters.page || 1;
                    return page === 1 || page === productsData.meta.totalPages || 
                           (page >= current - 2 && page <= current + 2);
                  })
                  .map((page, idx, arr) => (
                    <span key={page}>
                      {idx > 0 && arr[idx - 1] !== page - 1 && (
                        <span className="px-2 text-text-muted">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`h-10 w-10 rounded-lg font-medium ${
                          page === filters.page
                            ? 'bg-primary text-white'
                            : 'border border-border hover:border-primary'
                        }`}
                      >
                        {page}
                      </button>
                    </span>
                  ))}
                
                <button
                  onClick={() => handlePageChange(filters.page! + 1)}
                  disabled={filters.page === productsData.meta.totalPages}
                  className="h-10 px-4 rounded-lg border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Sau <ChevronRight className="size-4" />
                </button>
              </div>
            )}

            {/* Empty State */}
            {productsData.items.length === 0 && (
              <div className="text-center py-20">
                <p className="text-text-muted text-lg mb-4">Không tìm thấy sản phẩm nào</p>
                <button 
                  onClick={() => router.push('/shop')}
                  className="btn-primary"
                >
                  Xem tất cả sản phẩm
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
