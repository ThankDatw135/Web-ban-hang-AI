/**
 * Fashion AI - Featured Products Component
 */

'use client';

import { useFeaturedProducts } from '@/hooks/use-products';
import ProductCard from './product-card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  const { data: products, isLoading, isError } = useFeaturedProducts(8);

  // Loading state (Skeleton)
  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container-app">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-4" />
              <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return null; // Hoặc hiển thị thông báo lỗi nhẹ nhàng
  }

  // Empty state
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container-app">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-secondary">Những thiết kế được yêu thích nhất mùa này</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-primary hover:underline font-medium">
            Xem tất cả
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="btn-outline inline-flex">
            Xem tất cả sản phẩm
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
