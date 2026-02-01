/**
 * Fashion AI - Search Page
 * 
 * Trang tìm kiếm sản phẩm
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { searchProducts } from '@/lib/api/products';
import type { Product } from '@/types/api';

// Format price for Vietnamese market
function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

interface SearchResult {
  id: string;
  slug: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const searchMutation = useMutation({
    mutationFn: (searchQuery: string) => searchProducts(searchQuery, 20),
    onSuccess: (products) => {
      setResults(products.map((p: Product) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        price: formatPrice(p.salePrice || p.price),
        category: p.category?.name || 'Sản phẩm',
        image: p.images?.[0]?.url || 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400',
      })));
      setHasSearched(true);
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchMutation.mutate(query);
    }
  };

  return (
    <>
      <Header cartItemsCount={2} />
      
      <main className="flex-1 bg-cream">
        <div className="container-app py-12">
          {/* Search form */}
          <div className="max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl font-bold text-center mb-6">Tìm kiếm sản phẩm</h1>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nhập tên sản phẩm, danh mục..."
                className="w-full h-14 pl-6 pr-14 rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-lg"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90"
              >
                <span className="material-symbols-outlined">search</span>
              </button>
            </form>
          </div>

          {/* Results */}
          {hasSearched ? (
            results.length > 0 ? (
              <div>
                <p className="text-gray-600 mb-6">Tìm thấy {results.length} kết quả cho "{query}"</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.map((product) => (
                    <Link key={product.id} href={`/products/${product.slug}`} className="group">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="aspect-[3/4] overflow-hidden">
                          <div 
                            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url(${product.image})` }}
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-primary font-bold">{product.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
                <p className="text-gray-500 mb-4">Không tìm thấy kết quả cho "{query}"</p>
                <Link href="/products">
                  <button className="px-6 h-11 rounded-full bg-primary text-white font-bold hover:bg-primary/90">
                    Xem tất cả sản phẩm
                  </button>
                </Link>
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search</span>
              <p className="text-gray-500">Nhập từ khóa để tìm kiếm sản phẩm</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
