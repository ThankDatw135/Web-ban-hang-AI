/**
 * Search Results Page - Fashion AI
 * 
 * Kết quả tìm kiếm với API integration:
 * - AI Analysis Box
 * - Sidebar Filters (Category, Color, Fabric, Price)
 * - Product Grid với AI Match badges
 * - Real-time search
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Sparkles, Search, Camera, ChevronRight, ChevronLeft, 
  Loader2, X, Heart, SlidersHorizontal 
} from 'lucide-react';
import { Header, Footer } from '@/components';
import { useSearch, useSearchSuggestions, useTrendingSearches, addRecentSearch, getRecentSearches, clearRecentSearches } from '@/hooks/useSearch';
import { useCategories } from '@/hooks/useProducts';
import { useWishlistStore } from '@/stores';
import type { SearchFilters } from '@/hooks/useSearch';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filters from URL
  const filters: SearchFilters = {
    query: searchParams.get('q') || '',
    category: searchParams.get('category') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    size: searchParams.get('size') || undefined,
    color: searchParams.get('color') || undefined,
    sort: (searchParams.get('sort') as SearchFilters['sort']) || 'relevance',
    page: Number(searchParams.get('page')) || 1,
    limit: 12,
  };

  // Queries
  const { data: searchResults, isLoading } = useSearch(filters);
  const { data: suggestions } = useSearchSuggestions(searchInput);
  const { data: trending } = useTrendingSearches();
  const { data: categories } = useCategories(true);

  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Update URL with filters
  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newFilters).forEach(([key, value]) => {
      const paramKey = key === 'query' ? 'q' : key;
      if (value !== undefined && value !== null && value !== '') {
        params.set(paramKey, String(value));
      } else {
        params.delete(paramKey);
      }
    });
    
    router.push(`/search?${params.toString()}`);
  }, [router, searchParams]);

  // Handle search submit
  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    addRecentSearch(query);
    setRecentSearches(getRecentSearches());
    updateFilters({ query, page: 1 });
    setShowSuggestions(false);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    updateFilters({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all filters
  const clearFilters = () => {
    router.push(`/search?q=${encodeURIComponent(filters.query)}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const hasActiveFilters = filters.category || filters.minPrice || filters.maxPrice || filters.size || filters.color;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 container mx-auto px-4 md:px-8 py-8">
        {/* Search Input */}
        <section className="flex flex-col items-center justify-center mb-12">
          <div className="w-full max-w-2xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="size-5 text-text-muted" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchInput)}
              onFocus={() => setShowSuggestions(true)}
              className="block w-full pl-12 pr-14 py-4 bg-white border-0 ring-1 ring-border rounded-2xl text-base placeholder:text-text-muted focus:ring-2 focus:ring-primary shadow-soft transition-all"
              placeholder="Tìm theo phong cách, dịp, hoặc hình ảnh..."
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
              {searchInput && (
                <button 
                  onClick={() => setSearchInput('')}
                  className="p-2 text-text-muted hover:text-text-main"
                >
                  <X className="size-4" />
                </button>
              )}
              <button 
                onClick={() => handleSearch(searchInput)}
                className="p-2 text-text-muted hover:text-primary transition-colors rounded-xl hover:bg-secondary-50"
              >
                <Camera className="size-5" />
              </button>
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && (searchInput.length >= 2 || recentSearches.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-border z-50 overflow-hidden">
                {/* Recent Searches */}
                {!searchInput && recentSearches.length > 0 && (
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-text-muted uppercase">Tìm kiếm gần đây</span>
                      <button 
                        onClick={() => {
                          clearRecentSearches();
                          setRecentSearches([]);
                        }}
                        className="text-xs text-primary hover:underline"
                      >
                        Xóa
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.slice(0, 5).map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSearch(term)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-secondary-50 rounded-lg"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {suggestions && suggestions.length > 0 && (
                  <div className="p-4">
                    <span className="text-xs font-bold text-text-muted uppercase mb-2 block">Gợi ý</span>
                    <div className="space-y-1">
                      {suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSearch(suggestion.text)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-secondary-50 rounded-lg flex items-center gap-3"
                        >
                          {suggestion.image && (
                            <img src={suggestion.image} alt="" className="size-8 rounded object-cover" />
                          )}
                          <span>{suggestion.text}</span>
                          {suggestion.type === 'category' && (
                            <span className="text-xs text-text-muted ml-auto">Danh mục</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending */}
                {trending && trending.length > 0 && (
                  <div className="p-4 border-t border-border bg-secondary-50/50">
                    <span className="text-xs font-bold text-text-muted uppercase mb-2 block">Xu hướng</span>
                    <div className="flex flex-wrap gap-2">
                      {trending.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSearch(term)}
                          className="px-3 py-1 bg-white border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Trending Tags (mobile fallback) */}
          {!showSuggestions && (
            <div className="mt-3 flex gap-2 text-xs font-medium text-text-muted flex-wrap justify-center">
              <span>Xu hướng:</span>
              {(trending || ['Old Money Aesthetic', 'Summer Linen', 'Minimalist']).slice(0, 3).map((term) => (
                <button 
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="hover:text-primary underline decoration-primary/30"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Results */}
        {filters.query && (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Filters */}
            <aside className={`w-full lg:w-64 flex-shrink-0 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Category */}
              {categories && categories.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-text-main uppercase tracking-wider">Danh Mục</h3>
                  <div className="space-y-2">
                    {categories.slice(0, 6).map((cat) => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.category === cat.slug}
                          onChange={() => updateFilters({ category: filters.category === cat.slug ? undefined : cat.slug, page: 1 })}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-text-muted group-hover:text-text-main">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Size */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-text-main uppercase tracking-wider">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => updateFilters({ size: filters.size === size ? undefined : size, page: 1 })}
                      className={`w-10 h-10 rounded-lg border font-medium text-sm transition-colors ${
                        filters.size === size 
                          ? 'border-primary bg-primary text-white' 
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-text-main uppercase tracking-wider">Khoảng Giá</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Từ"
                    value={filters.minPrice || ''}
                    onChange={(e) => updateFilters({ minPrice: e.target.value ? Number(e.target.value) : undefined, page: 1 })}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-white focus:ring-primary focus:border-primary"
                  />
                  <span className="text-text-muted">-</span>
                  <input
                    type="number"
                    placeholder="Đến"
                    value={filters.maxPrice || ''}
                    onChange={(e) => updateFilters({ maxPrice: e.target.value ? Number(e.target.value) : undefined, page: 1 })}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-white focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-sm text-primary hover:underline"
                >
                  Xóa tất cả bộ lọc
                </button>
              )}
            </aside>

            {/* Main Results */}
            <div className="flex-1 min-w-0">
              {/* AI Insights Box */}
              {searchResults && searchResults.items.length > 0 && (
                <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 mb-8 relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
                  <div className="flex flex-col sm:flex-row gap-5 items-start relative z-10">
                    <div className="flex-shrink-0 size-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-accent">
                      <Sparkles className="size-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-text-main mb-1">Phân Tích AI</h3>
                      <p className="text-sm text-text-muted leading-relaxed max-w-3xl">
                        Tìm thấy <span className="font-semibold text-accent">{searchResults.meta.total}</span> sản phẩm 
                        phù hợp với "{filters.query}". Kết quả được sắp xếp theo mức độ liên quan và sở thích của bạn.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Results Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 text-sm font-medium"
                  >
                    <SlidersHorizontal className="size-4" />
                    Bộ lọc
                  </button>
                  <p className="text-sm font-medium text-text-muted">
                    {isLoading ? 'Đang tìm...' : `Hiển thị ${searchResults?.items.length || 0} / ${searchResults?.meta.total || 0} kết quả`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text-main">Sắp xếp:</span>
                  <select 
                    value={filters.sort}
                    onChange={(e) => updateFilters({ sort: e.target.value as SearchFilters['sort'], page: 1 })}
                    className="bg-transparent border-none text-sm font-bold text-text-main focus:ring-0 cursor-pointer"
                  >
                    <option value="relevance">AI Gợi Ý</option>
                    <option value="price_asc">Giá: Thấp → Cao</option>
                    <option value="price_desc">Giá: Cao → Thấp</option>
                    <option value="newest">Mới nhất</option>
                  </select>
                </div>
              </div>

              {/* Loading */}
              {isLoading && (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="size-8 animate-spin text-primary" />
                  <span className="ml-3 text-text-muted">Đang tìm kiếm...</span>
                </div>
              )}

              {/* Product Grid */}
              {!isLoading && searchResults && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {searchResults.items.map((product) => {
                      const inWishlist = isInWishlist(product.id);
                      
                      return (
                        <div key={product.id} className="group flex flex-col gap-3">
                          <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-secondary-100">
                            {product.isNew && (
                              <div className="absolute top-3 left-3 z-20 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                Mới
                              </div>
                            )}
                            
                            <img
                              src={product.images?.[0]?.url || 'https://via.placeholder.com/400x500'}
                              alt={product.name}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Wishlist */}
                            <button 
                              onClick={() => toggleItem({
                                productId: product.id,
                                name: product.name,
                                price: product.salePrice || product.price,
                                image: product.images?.[0]?.url || '',
                              })}
                              className={`absolute top-3 right-3 z-20 size-9 rounded-full bg-white/90 shadow flex items-center justify-center transition-colors ${
                                inWishlist ? 'text-red-500' : 'text-text-muted hover:text-primary'
                              }`}
                            >
                              <Heart className={`size-5 ${inWishlist ? 'fill-current' : ''}`} />
                            </button>
                            
                            {/* Try-On Button */}
                            <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                              <Link 
                                href={`/try-on?product=${product.id}`}
                                className="w-full h-11 bg-white/90 backdrop-blur-md hover:bg-primary hover:text-white text-text-main text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors"
                              >
                                <Sparkles className="size-4" />
                                Thử Đồ AI
                              </Link>
                            </div>
                          </div>
                          
                          <div className="px-1">
                            <Link 
                              href={`/products/${product.slug}`}
                              className="flex justify-between items-start"
                            >
                              <div>
                                <h3 className="font-bold text-text-main text-base leading-tight group-hover:text-primary transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-text-muted text-xs mt-1">{product.brand || product.category?.name}</p>
                              </div>
                              <div className="text-right">
                                {product.salePrice && (
                                  <span className="text-text-muted line-through text-sm block">
                                    {formatPrice(product.price)}
                                  </span>
                                )}
                                <span className="font-bold text-primary">
                                  {formatPrice(product.salePrice || product.price)}
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {searchResults.meta.totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handlePageChange(filters.page! - 1)}
                          disabled={filters.page === 1}
                          className="size-10 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
                        >
                          <ChevronLeft className="size-5" />
                        </button>
                        
                        {Array.from({ length: Math.min(5, searchResults.meta.totalPages) }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`size-10 flex items-center justify-center rounded-lg font-medium ${
                              page === filters.page 
                                ? 'bg-primary text-white' 
                                : 'border border-border hover:border-primary hover:text-primary'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        
                        {searchResults.meta.totalPages > 5 && (
                          <>
                            <span className="px-2 text-text-muted">...</span>
                            <button
                              onClick={() => handlePageChange(searchResults.meta.totalPages)}
                              className="size-10 flex items-center justify-center rounded-lg border border-border hover:border-primary font-medium"
                            >
                              {searchResults.meta.totalPages}
                            </button>
                          </>
                        )}
                        
                        <button 
                          onClick={() => handlePageChange(filters.page! + 1)}
                          disabled={filters.page === searchResults.meta.totalPages}
                          className="size-10 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
                        >
                          <ChevronRight className="size-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {searchResults.items.length === 0 && (
                    <div className="text-center py-20">
                      <Search className="size-16 text-text-muted mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-text-main mb-2">Không tìm thấy kết quả</h3>
                      <p className="text-text-muted mb-6">Thử tìm với từ khóa khác hoặc bỏ bớt bộ lọc</p>
                      {hasActiveFilters && (
                        <button onClick={clearFilters} className="btn-primary">
                          Xóa bộ lọc
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Initial State - No Query */}
        {!filters.query && (
          <div className="text-center py-20">
            <Search className="size-16 text-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-main mb-2">Tìm kiếm sản phẩm</h3>
            <p className="text-text-muted">Nhập từ khóa để tìm sản phẩm phù hợp với bạn</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
