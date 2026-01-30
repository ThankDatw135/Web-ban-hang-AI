/**
 * Product Detail Page - Fashion AI
 * 
 * Chi tiết sản phẩm động với:
 * - API integration
 * - AI insights
 * - Add to cart functionality
 * - Wishlist integration
 * - Size recommendation
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Sparkles, Heart, ShoppingBag, ChevronRight, ChevronLeft, Minus, Plus, Loader2 } from 'lucide-react';
import { Header, Footer } from '@/components';
import { useProduct } from '@/hooks/useProducts';
import { useRelatedProducts, addToRecentlyViewed } from '@/hooks/useRelatedProducts';
import { useAddToCart } from '@/hooks/useCart';
import { useSizeRecommend } from '@/hooks/useAI';
import { useWishlistStore, toastSuccess, toastError } from '@/stores';
import { useAuthStore } from '@/stores/auth-store';
import { useUserStore } from '@/stores/user-store';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  // Fetch product data
  const { data: product, isLoading, error } = useProduct(slug);
  const { data: relatedProducts } = useRelatedProducts(product?.id || '', 4);
  
  // Track recently viewed
  useEffect(() => {
    if (product?.id) {
      addToRecentlyViewed(product.id);
    }
  }, [product?.id]);
  
  // Mutations
  const addToCart = useAddToCart();
  const sizeRecommend = useSizeRecommend();
  
  // Stores
  const { isAuthenticated } = useAuthStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { measurements } = useUserStore();
  
  // Local state
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  // Get unique sizes and colors from variants
  const sizes = product?.variants 
    ? Array.from(new Set(product.variants.map(v => v.size)))
    : [];
  
  const colors = product?.variants 
    ? product.variants.reduce((acc: { name: string; hex: string }[], v) => {
        if (!acc.find(c => c.name === v.color)) {
          acc.push({ name: v.color, hex: v.colorCode });
        }
        return acc;
      }, [])
    : [];
  
  // Find selected variant based on size and color
  const findVariant = (size: string, color: string) => {
    return product?.variants.find(v => v.size === size && v.color === color);
  };

  // Get AI size recommendation
  const handleGetSizeRecommendation = async () => {
    if (!product) return;
    
    try {
      const result = await sizeRecommend.mutateAsync({
        productId: product.id,
        measurements,
      });
      setRecommendedSize(result.recommendedSize);
      setSelectedSize(result.recommendedSize);
      toastSuccess('Gợi ý size', `AI gợi ý bạn nên chọn size ${result.recommendedSize}`);
    } catch {
      toastError('Lỗi', 'Không thể lấy gợi ý size');
    }
  };

  // Add to cart
  const handleAddToCart = async () => {
    if (!product || !selectedSize) {
      toastError('Lỗi', 'Vui lòng chọn size');
      return;
    }

    const variant = product.variants.find(v => v.size === selectedSize);
    if (!variant) {
      toastError('Lỗi', 'Không tìm thấy biến thể');
      return;
    }

    if (!isAuthenticated) {
      // For non-auth users, could use local cart
      router.push('/login?redirect=/products/' + slug);
      return;
    }

    try {
      await addToCart.mutateAsync({
        productId: product.id,
        variantId: variant.id,
        quantity,
      });
      toastSuccess('Thành công', `Đã thêm ${product.name} vào giỏ hàng`);
    } catch {
      toastError('Lỗi', 'Không thể thêm vào giỏ hàng');
    }
  };

  // Toggle wishlist
  const handleToggleWishlist = () => {
    if (!product) return;
    toggleItem({
      productId: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images?.[0]?.url || '',
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
          <span className="ml-3 text-text-muted">Đang tải...</span>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <p className="text-red-500 mb-4">Không tìm thấy sản phẩm</p>
          <Link href="/shop" className="btn-primary">
            Quay lại Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discount = product.salePrice 
    ? Math.round((1 - product.salePrice / product.price) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-10 lg:px-20 py-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="size-4" />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight className="size-4" />
          <span className="text-text-main font-medium">{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16">
          {/* Image Gallery */}
          <div className="relative group overflow-hidden rounded-xl shadow-2xl">
            <div className="aspect-[4/5] w-full">
              <img
                src={product.images[selectedImage]?.url || 'https://via.placeholder.com/800x1000'}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* AI Insight Badge */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent backdrop-blur-sm shadow-sm mb-3">
                <Sparkles className="size-3.5" />
                AI Insights
              </div>
              <div className="bg-white/95 backdrop-blur p-4 rounded-lg shadow-lg border-l-4 border-accent">
                <p className="text-text-main text-sm leading-relaxed">
                  Sản phẩm này phù hợp với phong cách Modern Classic. Kết hợp với quần và phụ kiện tông màu trung tính.
                </p>
              </div>
            </div>

            {/* Image Navigation */}
            {product.images.length > 1 && (
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="size-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="size-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            )}

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`size-2 rounded-full transition-all ${
                      i === selectedImage ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-8">
            {/* Category Badge */}
            {product.category && (
              <Link 
                href={`/shop?category=${product.category.slug}`}
                className="text-primary text-sm font-bold uppercase tracking-widest hover:underline"
              >
                {product.category.name}
              </Link>
            )}

            <div className="space-y-4">
              <h1 className="text-text-main text-4xl lg:text-5xl font-bold leading-tight">
                {product.name}
              </h1>
              <p className="text-text-muted text-lg font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-text-main">
                {new Intl.NumberFormat('vi-VN').format(product.salePrice || product.price)}₫
              </span>
              {product.salePrice && (
                <>
                  <span className="text-lg text-text-muted line-through">
                    {new Intl.NumberFormat('vi-VN').format(product.price)}₫
                  </span>
                  <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Reviews */}
            {product.reviews && (
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.round(product.reviews!.average) ? '' : 'opacity-30'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-text-muted text-sm">
                  {product.reviews.average.toFixed(1)} ({product.reviews.count} đánh giá)
                </span>
              </div>
            )}

            {/* Material */}
            {product.material && (
              <div className="text-sm text-text-muted">
                Chất liệu: <span className="text-text-main font-medium">{product.material}</span>
              </div>
            )}

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="space-y-3">
                <span className="text-sm font-medium text-text-main">Màu sắc</span>
                <div className="flex gap-3">
                  {colors.map((color, i) => (
                    <button
                      key={color.name}
                      onClick={() => {}}
                      className="size-10 rounded-full border-4 transition-all border-white shadow-md hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-main">
                    Kích thước: {selectedSize || 'Chưa chọn'}
                    {recommendedSize && selectedSize === recommendedSize && (
                      <span className="ml-2 text-accent text-xs">(AI gợi ý)</span>
                    )}
                  </span>
                  <button 
                    onClick={handleGetSizeRecommendation}
                    disabled={sizeRecommend.isPending}
                    className="text-sm text-accent hover:underline flex items-center gap-1"
                  >
                    {sizeRecommend.isPending ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : (
                      <Sparkles className="size-3" />
                    )}
                    AI gợi ý size
                  </button>
                </div>
                <div className="flex gap-3">
                  {sizes.map((size) => {
                    const variant = product.variants.find(v => v.size === size);
                    const inStock = variant && variant.stock > 0;
                    
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        disabled={!inStock}
                        className={`size-12 rounded-lg border font-medium transition-all ${
                          size === selectedSize
                            ? 'border-primary bg-primary text-white'
                            : inStock
                              ? 'border-border bg-white text-text-main hover:border-primary'
                              : 'border-border bg-gray-100 text-gray-400 cursor-not-allowed'
                        } ${size === recommendedSize ? 'ring-2 ring-accent ring-offset-2' : ''}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-text-main">Số lượng:</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="size-10 flex items-center justify-center hover:bg-secondary-50 transition-colors"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="size-10 flex items-center justify-center hover:bg-secondary-50 transition-colors"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={addToCart.isPending || !selectedSize}
                className="flex-1 group flex items-center justify-center gap-3 rounded-full bg-text-main px-8 py-4 text-white transition-all hover:bg-primary hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addToCart.isPending ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <ShoppingBag className="size-5" />
                )}
                <span className="font-bold tracking-wide">Thêm vào giỏ</span>
              </button>
              <button 
                onClick={handleToggleWishlist}
                className={`size-14 rounded-full border flex items-center justify-center transition-colors ${
                  inWishlist 
                    ? 'border-red-300 bg-red-50 text-red-500' 
                    : 'border-border hover:border-primary hover:text-primary'
                }`}
              >
                <Heart className={`size-6 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* AI Try-On */}
            <Link 
              href={`/try-on?product=${product.id}`}
              className="w-full flex items-center justify-center gap-3 rounded-full bg-accent/10 border border-accent/20 px-8 py-4 text-accent transition-all hover:bg-accent hover:text-white"
            >
              <Sparkles className="size-5" />
              <span className="font-bold tracking-wide">Thử Đồ AI</span>
            </Link>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="flex flex-col gap-6 py-6">
            <div className="flex items-end justify-between px-2">
              <h3 className="text-3xl font-bold text-text-main">AI Gợi Ý Phối Đồ</h3>
              <Link href="/shop" className="hidden sm:flex items-center gap-1 text-sm font-bold text-primary hover:text-primary/80">
                Xem tất cả
                <ChevronRight className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/products/${item.slug}`}
                  className="group flex flex-col gap-3 rounded-lg bg-white p-3 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-secondary-100">
                    <img
                      src={item.images?.[0]?.url || 'https://via.placeholder.com/400x500'}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-3 left-3">
                      <div className="inline-flex items-center justify-center rounded-full bg-accent/90 p-1.5 text-white shadow-lg backdrop-blur-sm">
                        <Sparkles className="size-3.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col px-1">
                    <h4 className="font-bold text-text-main line-clamp-1">{item.name}</h4>
                    <span className="font-medium text-primary">
                      {new Intl.NumberFormat('vi-VN').format(item.salePrice || item.price)}₫
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
