/**
 * Elegant Curated Wishlist - Fashion AI
 * 
 * Wishlist với Zustand store integration:
 * - Lấy items từ wishlist store
 * - Add to cart
 * - Remove items
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Sparkles,
  TrendingDown,
  Share2,
  Loader2
} from 'lucide-react';
import { Header, Footer } from '@/components';
import { useWishlistStore, toastSuccess, toastError } from '@/stores';
import { useAddToCart } from '@/hooks/useCart';
import { useAuthStore } from '@/stores/auth-store';

export default function WishlistPage() {
  const router = useRouter();
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  const addToCart = useAddToCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toastSuccess('Đã xóa', 'Sản phẩm đã được xóa khỏi wishlist');
  };

  const handleAddToCart = async (item: typeof items[0]) => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/wishlist');
      return;
    }

    try {
      await addToCart.mutateAsync({
        productId: item.productId,
        variantId: item.variantId || '',
        quantity: 1,
      });
      toastSuccess('Thành công', 'Đã thêm vào giỏ hàng');
    } catch {
      toastError('Lỗi', 'Không thể thêm vào giỏ');
    }
  };

  const handleMoveAllToCart = async () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/wishlist');
      return;
    }

    for (const item of items) {
      try {
        await addToCart.mutateAsync({
          productId: item.productId,
          variantId: item.variantId || '',
          quantity: 1,
        });
      } catch {
        // Skip failed items
      }
    }
    toastSuccess('Thành công', 'Đã thêm tất cả vào giỏ hàng');
  };

  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  // Check sale items
  const saleItems = items.filter(item => item.originalPrice && item.originalPrice > item.price);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="size-6 text-red-500 fill-red-500" />
              <h1 className="text-3xl font-bold text-text-main">Wishlist Của Tôi</h1>
            </div>
            <p className="text-text-muted">{items.length} sản phẩm yêu thích • Tổng giá trị: {formatPrice(totalValue)}</p>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <>
                <button 
                  onClick={handleMoveAllToCart}
                  disabled={addToCart.isPending}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {addToCart.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ShoppingBag className="size-4" />
                  )}
                  Thêm tất cả vào giỏ
                </button>
                <button 
                  onClick={clearWishlist}
                  className="px-4 py-2 bg-white border border-border hover:bg-red-50 hover:border-red-200 text-text-main hover:text-red-600 font-medium rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Trash2 className="size-4" />
                  Xóa tất cả
                </button>
              </>
            )}
            <button className="px-4 py-2 bg-white border border-border hover:bg-secondary-50 text-text-main font-medium rounded-lg flex items-center gap-2 transition-colors">
              <Share2 className="size-4" />
              Chia sẻ
            </button>
          </div>
        </div>

        {/* AI Insight */}
        {saleItems.length > 0 && (
          <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="size-5 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-text-main mb-1">AI Stylist Insight</h3>
                <p className="text-sm text-text-muted">
                  {saleItems.length} sản phẩm trong wishlist đang giảm giá! {' '}
                  <span className="text-accent font-medium">
                    {saleItems.map(i => i.name).join(', ')}
                  </span> đang có ưu đãi tốt.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Wishlist Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="flex">
                  {/* Image */}
                  <Link href={`/products/${item.productId}`} className="relative w-40 md:w-48 flex-shrink-0">
                    <img
                      src={item.image || 'https://via.placeholder.com/400x500'}
                      alt={item.name}
                      className="w-full h-full object-cover aspect-[3/4]"
                    />
                    {item.originalPrice && item.originalPrice > item.price && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <TrendingDown className="size-3" />
                        Sale
                      </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Link href={`/products/${item.productId}`}>
                          <h3 className="font-bold text-text-main group-hover:text-primary transition-colors line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                      </div>
                      {item.match && (
                        <div className="bg-accent/10 text-accent text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                          <Sparkles className="size-3" />
                          {item.match}%
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-primary">{formatPrice(item.price)}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-sm text-text-muted line-through">{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center gap-2">
                      <button 
                        onClick={() => handleAddToCart(item)}
                        disabled={addToCart.isPending}
                        className="flex-1 py-2 bg-primary hover:bg-primary/90 disabled:bg-secondary-200 disabled:cursor-not-allowed text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        {addToCart.isPending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <ShoppingBag className="size-4" />
                        )}
                        Thêm vào giỏ
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="size-10 bg-secondary-50 hover:bg-red-50 text-text-muted hover:text-red-500 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="size-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="size-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">Wishlist trống</h3>
            <p className="text-text-muted mb-6">Thêm sản phẩm yêu thích để xem tại đây</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ShoppingBag className="size-5" />
              Khám Phá Ngay
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
