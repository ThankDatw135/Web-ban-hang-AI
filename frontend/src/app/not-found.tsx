/**
 * 404 Not Found Page - Fashion AI
 * 
 * Artistic 404 với:
 * - Stroke text "404"
 * - AI recommendations
 * - CTA back to collection
 */

import Link from 'next/link';
import { Sparkles, Search, ShoppingBag } from 'lucide-react';
import { Header, Footer, ProductCard } from '@/components';

// AI curated products for 404 page
const aiRecommendations = [
  {
    id: '1',
    slug: 'silk-evening-gown',
    name: 'Silk Evening Gown',
    price: 21990000,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600',
    material: 'Evening Collection',
  },
  {
    id: '2',
    slug: 'cashmere-wrap',
    name: 'Cashmere Wrap',
    price: 7890000,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600',
    material: 'Winter Essentials',
  },
  {
    id: '3',
    slug: 'artisan-leather-tote',
    name: 'Artisan Leather Tote',
    price: 13290000,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89c34de7?w=600',
    material: 'Accessories',
  },
  {
    id: '4',
    slug: 'suede-trench',
    name: 'Suede Trench',
    price: 29490000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    material: 'Outerwear',
  },
];

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center py-10 px-4 md:px-10">
        <div className="flex flex-col max-w-[1200px] w-full items-center">
          {/* 404 Hero Section */}
          <div className="text-center mb-16 relative">
            {/* Background aesthetic element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            
            {/* Stroke 404 */}
            <h1 
              className="font-serif text-[120px] md:text-[180px] font-medium leading-none tracking-tight select-none"
              style={{
                WebkitTextStroke: '1.5px #C7A26A',
                color: 'transparent',
              }}
            >
              404
            </h1>

            <div className="max-w-xl mx-auto mt-4 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-text-main">
                Con đường này đã mất dấu,<br />nhưng phong cách thì không bao giờ.
              </h2>
              <p className="text-text-muted text-sm md:text-base font-medium">
                Trang bạn đang tìm kiếm đã được di chuyển hoặc không còn tồn tại. 
                Hãy để AI của chúng tôi hướng dẫn bạn quay lại với phong cách.
              </p>
            </div>
          </div>

          {/* AI Recommendations Section */}
          <div className="w-full mb-12">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Sparkles className="size-4 text-accent animate-pulse" />
              <h4 className="text-text-muted text-xs font-bold uppercase tracking-widest">
                Được AI tuyển chọn cho bạn
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {aiRecommendations.map((product) => (
                <div key={product.id} className="relative">
                  {/* AI Badge */}
                  <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                    <Sparkles className="size-4 text-accent" />
                  </div>
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center pb-12">
            <Link
              href="/products"
              className="btn-primary btn-lg min-w-[200px]"
            >
              Quay lại bộ sưu tập
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
