/**
 * Collection Detail Page - Fashion AI
 * 
 * Chi tiết bộ sưu tập với API integration:
 * - Collection info
 * - Products trong collection
 * - AI filters
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { 
  Sparkles, ChevronRight, ChevronLeft, Loader2, X, Heart,
  SlidersHorizontal, Grid3X3, List
} from 'lucide-react';
import { Header, Footer } from '@/components';
import { useCollectionDetail, useCollectionProducts } from '@/hooks/useCollections';
import { useWishlistStore } from '@/stores';

export default function CollectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const page = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || 'newest';

  const { data: collection, isLoading: collectionLoading } = useCollectionDetail(slug, page);

  const updateFilters = (newParams: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    router.push(`/collections/${slug}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    updateFilters({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  // Fallback data
  const fallbackCollection = {
    id: '1',
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    slug,
    description: 'Bộ sưu tập được tuyển chọn với những sản phẩm chất lượng cao.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200',
    bannerImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200',
    productCount: 24,
    isFeatured: true,
    isActive: true,
    createdAt: new Date().toISOString(),
    meta: { page: 1, totalPages: 1, total: 4 },
    products: [
      {
        id: '1',
        name: 'The Venetian Blazer',
        slug: 'venetian-blazer',
        price: 11090000,
        salePrice: null,
        images: [{ url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600', isMain: true }],
        isNew: true,
      },
      {
        id: '2',
        name: 'Structured Wool Coat',
        slug: 'structured-wool-coat',
        price: 21890000,
        salePrice: 18590000,
        images: [{ url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600', isMain: true }],
      },
      {
        id: '3',
        name: 'Midnight Silk Gown',
        slug: 'midnight-silk-gown',
        price: 29490000,
        salePrice: null,
        images: [{ url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600', isMain: true }],
        isNew: true,
      },
      {
        id: '4',
        name: 'Aegean Linen Dress',
        slug: 'aegean-linen-dress',
        price: 7890000,
        salePrice: 6290000,
        images: [{ url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', isMain: true }],
      },
    ],
  };

  const displayCollection = collection || fallbackCollection;

  if (collectionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section 
          className="relative h-[40vh] min-h-[300px] bg-cover bg-center"
          style={{ backgroundImage: `url('${displayCollection.bannerImage || displayCollection.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
              <ChevronRight className="size-4" />
              <Link href="/collections" className="hover:text-white transition-colors">Bộ Sưu Tập</Link>
              <ChevronRight className="size-4" />
              <span className="text-white font-medium">{displayCollection.name}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {displayCollection.name}
            </h1>
            <p className="text-white/80 max-w-2xl">
              {displayCollection.description}
            </p>
            <p className="text-white/60 text-sm mt-2">
              {displayCollection.productCount} sản phẩm
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
            <div className="flex items-center gap-4">
              <p className="text-text-muted text-sm">
                Hiển thị {displayCollection.products?.length || 0} sản phẩm
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-muted">Sắp xếp:</span>
                <select 
                  value={sort}
                  onChange={(e) => updateFilters({ sort: e.target.value, page: 1 })}
                  className="bg-transparent border-none text-sm font-bold text-text-main focus:ring-0 cursor-pointer"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="popular">Phổ biến</option>
                  <option value="price_asc">Giá: Thấp → Cao</option>
                  <option value="price_desc">Giá: Cao → Thấp</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`size-9 rounded-lg flex items-center justify-center transition-colors ${
                    viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white border border-border hover:border-primary'
                  }`}
                >
                  <Grid3X3 className="size-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`size-9 rounded-lg flex items-center justify-center transition-colors ${
                    viewMode === 'list' ? 'bg-primary text-white' : 'bg-white border border-border hover:border-primary'
                  }`}
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {displayCollection.products?.map((product: any) => {
              const inWishlist = isInWishlist(product.id);
              
              return viewMode === 'grid' ? (
                <div key={product.id} className="group flex flex-col gap-4">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-secondary-100">
                    {/* Badges */}
                    {product.isNew && (
                      <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded z-10">
                        MỚI
                      </div>
                    )}
                    
                    {/* Wishlist */}
                    <button 
                      onClick={() => toggleItem({
                        productId: product.id,
                        name: product.name,
                        price: product.salePrice || product.price,
                        image: product.images?.[0]?.url || '',
                      })}
                      className={`absolute top-3 right-3 z-10 size-9 rounded-full bg-white/90 shadow flex items-center justify-center transition-colors ${
                        inWishlist ? 'text-red-500' : 'text-text-muted hover:text-primary'
                      }`}
                    >
                      <Heart className={`size-5 ${inWishlist ? 'fill-current' : ''}`} />
                    </button>

                    <Link href={`/products/${product.slug}`}>
                      <img
                        src={product.images?.[0]?.url || 'https://via.placeholder.com/400x500'}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>
                    
                    {/* Try-On Button */}
                    <Link 
                      href={`/try-on?product=${product.id}`}
                      className="absolute bottom-3 left-3 right-3 h-10 bg-white/90 backdrop-blur hover:bg-primary hover:text-white text-text-main text-sm font-bold rounded-xl flex items-center justify-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                    >
                      <Sparkles className="size-4" />
                      Thử Đồ AI
                    </Link>
                  </div>
                  
                  <div>
                    <Link 
                      href={`/products/${product.slug}`} 
                      className="text-text-main font-medium text-base leading-tight hover:text-primary transition-colors block mb-1"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-center gap-2">
                      {product.salePrice && (
                        <span className="text-text-muted line-through text-sm">
                          {formatPrice(product.price)}
                        </span>
                      )}
                      <p className="text-primary font-bold">
                        {formatPrice(product.salePrice || product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // List View
                <div key={product.id} className="flex gap-6 bg-white rounded-xl border border-border p-4 group hover:border-primary transition-colors">
                  <Link href={`/products/${product.slug}`} className="w-32 h-40 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.images?.[0]?.url || 'https://via.placeholder.com/400x500'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link 
                        href={`/products/${product.slug}`}
                        className="text-lg font-bold text-text-main hover:text-primary transition-colors"
                      >
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        {product.salePrice && (
                          <span className="text-text-muted line-through text-sm">
                            {formatPrice(product.price)}
                          </span>
                        )}
                        <p className="text-primary font-bold text-lg">
                          {formatPrice(product.salePrice || product.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link 
                        href={`/try-on?product=${product.id}`}
                        className="px-4 py-2 bg-accent hover:bg-accent/90 text-white text-sm font-bold rounded-lg flex items-center gap-2"
                      >
                        <Sparkles className="size-4" />
                        Thử Đồ AI
                      </Link>
                      <button 
                        onClick={() => toggleItem({
                          productId: product.id,
                          name: product.name,
                          price: product.salePrice || product.price,
                          image: product.images?.[0]?.url || '',
                        })}
                        className={`size-10 rounded-lg border flex items-center justify-center transition-colors ${
                          inWishlist ? 'border-red-500 text-red-500' : 'border-border hover:border-primary hover:text-primary'
                        }`}
                      >
                        <Heart className={`size-5 ${inWishlist ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {displayCollection.meta && displayCollection.meta.totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="size-10 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
                >
                  <ChevronLeft className="size-5" />
                </button>
                
                {Array.from({ length: Math.min(5, displayCollection.meta.totalPages) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`size-10 flex items-center justify-center rounded-lg font-medium ${
                      p === page 
                        ? 'bg-primary text-white' 
                        : 'border border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                
                <button 
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === displayCollection.meta.totalPages}
                  className="size-10 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {(!displayCollection.products || displayCollection.products.length === 0) && (
            <div className="text-center py-20">
              <Grid3X3 className="size-16 text-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-main mb-2">Không có sản phẩm</h3>
              <p className="text-text-muted mb-6">Bộ sưu tập này chưa có sản phẩm nào.</p>
              <Link href="/shop" className="btn-primary">
                Khám phá cửa hàng
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
