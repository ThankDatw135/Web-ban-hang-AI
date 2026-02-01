/**
 * Fashion AI - Products Listing Page
 * 
 * Trang danh sách sản phẩm với filters, sorting, và pagination
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Grid3X3, List, ChevronDown, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { SkeletonProductGrid } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { useProducts } from '@/hooks/use-products';
import { useAddToCart } from '@/hooks/use-cart';
import type { ProductFilter } from '@/types/api';

// Filter options
const categories = [
  { value: 'all', label: 'Tất cả' },
  { value: 'women', label: 'Nữ' },
  { value: 'men', label: 'Nam' },
  { value: 'new', label: 'Hàng mới' },
  { value: 'sale', label: 'Giảm giá' },
];

const sortOptions = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price_asc', label: 'Giá tăng dần' },
  { value: 'price_desc', label: 'Giá giảm dần' },
  { value: 'popular', label: 'Phổ biến' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = [
  { name: 'Đen', value: '#000000' },
  { name: 'Trắng', value: '#FFFFFF' },
  { name: 'Be', value: '#F5F5DC' },
  { name: 'Xanh navy', value: '#000080' },
  { name: 'Xám', value: '#808080' },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSort, setSelectedSort] = useState<ProductFilter['sort']>('newest');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [page, setPage] = useState(1);

  const currentCategory = searchParams.get('category') || 'all';
  
  // Build filter object for API
  const filter: ProductFilter = useMemo(() => ({
    page,
    limit: 12,
    categoryId: currentCategory !== 'all' ? currentCategory : undefined,
    minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
    maxPrice: priceRange[1] < 10000000 ? priceRange[1] : undefined,
    sort: selectedSort,
  }), [page, currentCategory, priceRange, selectedSort]);

  // Fetch products from API
  const { data, isLoading, error } = useProducts(filter);
  const addToCart = useAddToCart();

  const products = data?.data ?? [];
  const totalProducts = data?.meta?.total ?? 0;

  // Toggle size filter
  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  // Toggle color filter
  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 10000000]);
  };

  const hasActiveFilters = selectedSizes.length > 0 || selectedColors.length > 0;

  return (
    <>
      <Header cartItemsCount={2} />

      <main className="flex-1">
        {/* Page header */}
        <div className="bg-white dark:bg-[#1a1814] border-b border-border py-8">
          <div className="container-app">
            {/* Breadcrumb */}
            <nav className="text-sm text-secondary mb-4">
              <Link href="/" className="hover:text-primary">Trang chủ</Link>
              <span className="mx-2">/</span>
              <span className="text-text-main dark:text-white">Sản phẩm</span>
            </nav>

            <h1 className="text-3xl font-extrabold">
              {categories.find(c => c.value === currentCategory)?.label || 'Sản phẩm'}
            </h1>
          </div>
        </div>

        <div className="container-app py-8">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            {/* Left: Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Link
                  key={cat.value}
                  href={`/products${cat.value === 'all' ? '' : `?category=${cat.value}`}`}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-semibold transition-colors',
                    currentCategory === cat.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  )}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {/* Right: View mode, filters, sort */}
            <div className="flex items-center gap-3">
              {/* View mode toggle */}
              <div className="hidden sm:flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 transition-colors',
                    viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 transition-colors',
                    viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Filter button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                leftIcon={<SlidersHorizontal className="w-4 h-4" />}
              >
                Bộ lọc
                {hasActiveFilters && (
                  <span className="ml-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                    {selectedSizes.length + selectedColors.length}
                  </span>
                )}
              </Button>

              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value as ProductFilter['sort'])}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium cursor-pointer"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-secondary" />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters sidebar */}
            {showFilters && (
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 bg-white dark:bg-[#1a1814] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold">Bộ lọc</h3>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-primary hover:underline"
                      >
                        Xóa tất cả
                      </button>
                    )}
                  </div>

                  {/* Size filter */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Kích thước</h4>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={cn(
                            'px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors',
                            selectedSizes.includes(size)
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-gray-200 dark:border-gray-700 hover:border-primary'
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color filter */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Màu sắc</h4>
                    <div className="flex flex-wrap gap-2">
                      {colors.map(color => (
                        <button
                          key={color.value}
                          onClick={() => toggleColor(color.value)}
                          className={cn(
                            'w-8 h-8 rounded-full border-2 transition-all',
                            selectedColors.includes(color.value)
                              ? 'border-primary ring-2 ring-primary/30'
                              : 'border-gray-200 dark:border-gray-600'
                          )}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                          aria-label={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price range - simplified */}
                  <div>
                    <h4 className="font-semibold mb-3">Giá</h4>
                    <div className="space-y-2 text-sm">
                      {[
                        { label: 'Dưới 1 triệu', range: [0, 1000000] },
                        { label: '1 - 3 triệu', range: [1000000, 3000000] },
                        { label: '3 - 5 triệu', range: [3000000, 5000000] },
                        { label: 'Trên 5 triệu', range: [5000000, 50000000] },
                      ].map(({ label, range }) => (
                        <label key={label} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="price"
                            className="text-primary"
                            onChange={() => setPriceRange(range as [number, number])}
                            checked={priceRange[0] === range[0] && priceRange[1] === range[1]}
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            )}

            {/* Products grid */}
            <div className="flex-1">
              {/* Results count */}
              <p className="text-sm text-secondary mb-4">
                Hiển thị <strong>{products.length}</strong> trong <strong>{totalProducts}</strong> sản phẩm
              </p>

              {isLoading ? (
                <SkeletonProductGrid count={8} />
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-secondary">Không tìm thấy sản phẩm nào</p>
                </div>
              ) : (
                <div className={cn(
                  'grid gap-6',
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                )}>
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={Number(product.price)}
                      originalPrice={product.salePrice ? Number(product.salePrice) : undefined}
                      imageUrl={product.images?.[0]?.url || '/placeholder.jpg'}
                      description={product.description || ''}
                      isAIRecommended={product.isFeatured}
                      onAddToCart={() => addToCart.mutate({ productId: product.id, variantId: product.variants?.[0]?.id || '', quantity: 1 })}
                      onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
                    />
                  ))}
                </div>
              )}

              {/* Load more */}
              <div className="mt-12 text-center">
                <Button variant="outline" size="lg">
                  Xem thêm sản phẩm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
