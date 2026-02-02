/**
 * Fashion AI - Danh Sách Sản Phẩm
 * 
 * Trang hiển thị sản phẩm với filter và sort
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, Grid3X3, List, ChevronDown, X } from 'lucide-react';
import { useProducts } from '@/hooks/use-products';
import { useCategories } from '@/hooks/use-categories';
import ProductCard from '@/components/products/product-card';
import { ProductFilter } from '@/types/api';

const sortOptions = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price_asc', label: 'Giá thấp đến cao' },
  { value: 'price_desc', label: 'Giá cao đến thấp' },
  { value: 'popular', label: 'Bán chạy' },
];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Data Fetching
  const { data: categories = [] } = useCategories();

  // Filter State
  const [filter, setFilter] = useState<ProductFilter>({
    page: 1,
    limit: 12,
    categoryId: searchParams.get('category') || undefined,
    sort: (searchParams.get('sort') as any) || 'newest',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    search: searchParams.get('search') || undefined,
  });

  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Sync URL with Filter
  const updateFilter = (newFilter: Partial<ProductFilter>) => {
    const updated = { ...filter, ...newFilter, page: 1 }; // Reset page when filter changes
    setFilter(updated);
    
    // Update URL params
    const params = new URLSearchParams();
    if (updated.categoryId) params.set('category', updated.categoryId);
    if (updated.sort) params.set('sort', updated.sort);
    if (updated.minPrice) params.set('minPrice', String(updated.minPrice));
    if (updated.maxPrice) params.set('maxPrice', String(updated.maxPrice));
    if (updated.search) params.set('search', updated.search);
    
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  // Query Data
  const { data: productsData, isLoading, isError } = useProducts(filter);
  const products = productsData?.data || [];
  const meta = productsData?.meta;

  const handlePageChange = (newPage: number) => {
    setFilter({ ...filter, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-app">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Sản phẩm</h1>
            <p className="text-secondary">
              Hiển thị {meta?.total || 0} sản phẩm
              {filter.search && ` cho từ khóa "${filter.search}"`}
            </p>
          </div>
          
          {/* Sort & View */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={filter.sort}
                onChange={(e) => updateFilter({ sort: e.target.value as any })}
                className="h-10 pl-4 pr-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#25221d] text-sm outline-none focus:border-primary appearance-none cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-[#1e1a14] p-6 shadow-2xl transform transition-transform duration-300 lg:translate-x-0 lg:static lg:w-64 lg:p-0 lg:bg-transparent lg:shadow-none ${showMobileFilter ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h3 className="text-xl font-bold">Bộ lọc</h3>
              <button onClick={() => setShowMobileFilter(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                </h3>
                <button 
                  onClick={() => {
                    setFilter({ page: 1, limit: 12, sort: 'newest' });
                    router.push('/products');
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Xóa tất cả
                </button>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Danh mục</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="category"
                        checked={filter.categoryId === cat.id}
                        onChange={() => updateFilter({ categoryId: cat.id })}
                        className="w-4 h-4 border-gray-300 text-primary focus:ring-primary" 
                      />
                      <span className="text-sm">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Khoảng giá</h4>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    placeholder="Từ" 
                    value={filter.minPrice || ''}
                    onChange={(e) => setFilter({ ...filter, minPrice: Number(e.target.value) })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary"
                  />
                  <span className="text-secondary">-</span>
                  <input 
                    type="number" 
                    placeholder="Đến" 
                    value={filter.maxPrice || ''}
                    onChange={(e) => setFilter({ ...filter, maxPrice: Number(e.target.value) })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary"
                  />
                </div>
                <button 
                  onClick={() => updateFilter({ minPrice: filter.minPrice, maxPrice: filter.maxPrice })}
                  className="btn-outline w-full mt-2 h-9 text-xs"
                >
                  Áp dụng giá
                </button>
              </div>
            </div>
          </aside>

          {/* Overlay for mobile filter */}
          {showMobileFilter && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setShowMobileFilter(false)}
            />
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {/* Mobile filter button */}
            <button 
              onClick={() => setShowMobileFilter(true)}
              className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              Bộ lọc
            </button>
            
            {isLoading ? (
               <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                 {[...Array(8)].map((_, i) => (
                   <div key={i} className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
                 ))}
               </div>
            ) : isError ? (
              <div className="text-center py-20">
                <p className="text-red-500">Có lỗi xảy ra khi tải sản phẩm.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 text-primary hover:underline"
                >
                  Thử lại
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-secondary text-lg">Không tìm thấy sản phẩm nào.</p>
                <button 
                  onClick={() => {
                    setFilter({ page: 1, limit: 12, sort: 'newest' });
                    router.push('/products');
                  }}
                  className="mt-4 text-primary hover:underline"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {meta && meta.totalPages > 1 && (
                  <div className="flex justify-center mt-12 gap-2">
                    <button
                      disabled={meta.page === 1}
                      onClick={() => handlePageChange(meta.page - 1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center disabled:opacity-50 hover:border-primary hover:text-primary transition-colors"
                    >
                      &lt;
                    </button>
                    {[...Array(meta.totalPages)].map((_, i) => {
                      const page = i + 1;
                      // Logic hiển thị trang thông minh hơn (TODO)
                      if (page !== 1 && page !== meta.totalPages && Math.abs(page - meta.page) > 2) return null;
                      
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-lg border ${
                            meta.page === page 
                              ? 'bg-primary text-white border-primary' 
                              : 'border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary'
                          } transition-colors`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      disabled={meta.page === meta.totalPages}
                      onClick={() => handlePageChange(meta.page + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center disabled:opacity-50 hover:border-primary hover:text-primary transition-colors"
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
