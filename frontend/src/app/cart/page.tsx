/**
 * Cart Page - Fashion AI
 * 
 * Giỏ hàng động với API integration:
 * - Fetch cart từ API
 * - Update/Remove items
 * - Apply coupon
 * - AI recommendations
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Trash2, Minus, Plus, ArrowRight, Lock, Bot, Loader2 } from 'lucide-react';
import { Header, Footer } from '@/components';
import { useCart, useUpdateCartItem, useRemoveCartItem, useApplyCoupon, useRemoveCoupon } from '@/hooks/useCart';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { useAddToCart } from '@/hooks/useCart';
import { useAuthStore } from '@/stores/auth-store';
import { useCartStore } from '@/stores/cart-store';
import { toastSuccess, toastError } from '@/stores';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const localCart = useCartStore();
  
  // API cart (for authenticated users)
  const { data: apiCart, isLoading: cartLoading } = useCart();
  
  // Mutations
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const applyCoupon = useApplyCoupon();
  const removeCoupon = useRemoveCoupon();
  const addToCart = useAddToCart();
  
  // AI recommendations
  const { data: recommendations } = useFeaturedProducts(4);
  
  // Local state
  const [promoCode, setPromoCode] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  // Use API cart for authenticated users, local cart otherwise
  const cartItems = isAuthenticated 
    ? (apiCart?.items || [])
    : localCart.items;
  
  const cartSummary = isAuthenticated && apiCart?.summary
    ? apiCart.summary
    : {
        subtotal: localCart.getTotal(),
        shipping: 0,
        discount: 0,
        total: localCart.getTotal(),
        itemCount: localCart.items.length,
      };

  const coupon = isAuthenticated ? apiCart?.coupon : null;

  // Update quantity
  const handleUpdateQuantity = async (itemId: string, delta: number) => {
    if (!isAuthenticated) {
      // Local cart update
      const item = localCart.items.find(i => i.id === itemId);
      if (item) {
        const newQuantity = Math.max(1, item.quantity + delta);
        localCart.updateQuantity(itemId, newQuantity);
      }
      return;
    }

    const item = apiCart?.items.find(i => i.id === itemId);
    if (!item) return;
    
    const newQuantity = Math.max(1, item.quantity + delta);
    try {
      await updateItem.mutateAsync({ 
        itemId, 
        data: { quantity: newQuantity } 
      });
    } catch {
      toastError('Lỗi', 'Không thể cập nhật số lượng');
    }
  };

  // Remove item
  const handleRemoveItem = async (itemId: string) => {
    if (!isAuthenticated) {
      localCart.removeItem(itemId);
      toastSuccess('Đã xóa', 'Sản phẩm đã được xóa khỏi giỏ hàng');
      return;
    }

    try {
      await removeItem.mutateAsync(itemId);
      toastSuccess('Đã xóa', 'Sản phẩm đã được xóa khỏi giỏ hàng');
    } catch {
      toastError('Lỗi', 'Không thể xóa sản phẩm');
    }
  };

  // Apply coupon
  const handleApplyCoupon = async () => {
    if (!promoCode.trim()) {
      toastError('Lỗi', 'Vui lòng nhập mã giảm giá');
      return;
    }

    if (!isAuthenticated) {
      router.push('/login?redirect=/cart');
      return;
    }

    setApplyingCoupon(true);
    try {
      await applyCoupon.mutateAsync({ code: promoCode });
      toastSuccess('Thành công', 'Đã áp dụng mã giảm giá');
      setPromoCode('');
    } catch {
      toastError('Lỗi', 'Mã giảm giá không hợp lệ');
    } finally {
      setApplyingCoupon(false);
    }
  };

  // Remove coupon
  const handleRemoveCoupon = async () => {
    try {
      await removeCoupon.mutateAsync();
      toastSuccess('Đã xóa', 'Đã xóa mã giảm giá');
    } catch {
      toastError('Lỗi', 'Không thể xóa mã giảm giá');
    }
  };

  // Add recommendation to cart
  const handleAddRecommendation = async (product: any) => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/cart');
      return;
    }

    const variant = product.variants?.[0];
    if (!variant) {
      toastError('Lỗi', 'Sản phẩm không có biến thể');
      return;
    }

    try {
      await addToCart.mutateAsync({
        productId: product.id,
        variantId: variant.id,
        quantity: 1,
      });
      toastSuccess('Thành công', `Đã thêm ${product.name} vào giỏ`);
    } catch {
      toastError('Lỗi', 'Không thể thêm vào giỏ');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  // Checkout handler
  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout');
      return;
    }
    router.push('/checkout');
  };

  // Loading state
  if (isAuthenticated && cartLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
          <span className="ml-3 text-text-muted">Đang tải giỏ hàng...</span>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 w-full px-4 md:px-10 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Page Heading */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-light text-text-main tracking-tight">
                Giỏ Hàng Của Bạn
              </h1>
              <p className="text-text-muted">
                {cartItems.length} sản phẩm trong giỏ hàng
              </p>
            </div>

            {/* Cart Items List */}
            <div className="flex flex-col gap-6">
              {cartItems.map((item: any) => (
                <div
                  key={item.id}
                  className="group bg-white p-5 rounded-xl shadow-sm border border-transparent hover:border-border transition-all"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image */}
                    <div className="shrink-0">
                      <img
                        src={item.product?.image || item.image || 'https://via.placeholder.com/128'}
                        alt={item.product?.name || item.name}
                        className="w-full sm:w-32 aspect-[3/4] sm:aspect-square rounded-lg object-cover bg-secondary-100"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-text-main">
                            {item.product?.name || item.name}
                          </h3>
                          <p className="text-sm text-text-muted mt-1">
                            {item.variant?.size || item.size} • {item.variant?.color || item.color}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-text-main">
                          {formatPrice(item.unitPrice || item.price)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex items-center justify-between">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={removeItem.isPending}
                          className="text-sm text-text-muted hover:text-red-500 transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                          {removeItem.isPending ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Trash2 className="size-4" />
                          )}
                          <span className="underline underline-offset-2">
                            Xóa
                          </span>
                        </button>

                        {/* Quantity Selector */}
                        <div className="flex items-center border border-border rounded-lg h-9">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            disabled={updateItem.isPending}
                            className="w-9 h-full flex items-center justify-center text-text-muted hover:text-text-main hover:bg-secondary-50 rounded-l-lg transition-colors disabled:opacity-50"
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-text-main">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            disabled={updateItem.isPending}
                            className="w-9 h-full flex items-center justify-center text-text-muted hover:text-text-main hover:bg-secondary-50 rounded-r-lg transition-colors disabled:opacity-50"
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {cartItems.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl">
                  <p className="text-text-muted mb-4">Giỏ hàng của bạn đang trống</p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    Tiếp tục mua sắm <ArrowRight className="size-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* AI Recommendations Section */}
            {cartItems.length > 0 && recommendations && recommendations.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="size-8 text-accent" />
                  <h2 className="text-2xl font-bold text-text-main tracking-tight">
                    AI Stylist Gợi Ý
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {recommendations.slice(0, 2).map((item: any) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-4 flex gap-4 border border-accent/20 shadow-[0_0_15px_rgba(168,85,247,0.05)] hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-shadow"
                    >
                      <img
                        src={item.images?.[0]?.url || 'https://via.placeholder.com/96'}
                        alt={item.name}
                        className="w-24 aspect-square rounded-lg object-cover bg-secondary-100"
                      />
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-medium text-text-main line-clamp-1">
                              {item.name}
                            </h4>
                            <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                              AI Gợi ý
                            </span>
                          </div>
                          <p className="text-sm text-text-muted mt-1">
                            {formatPrice(item.salePrice || item.price)}
                          </p>
                        </div>
                        <button 
                          onClick={() => handleAddRecommendation(item)}
                          disabled={addToCart.isPending}
                          className="mt-2 text-sm font-semibold text-accent hover:text-white hover:bg-accent border border-accent rounded-lg py-1.5 px-3 transition-colors w-max disabled:opacity-50"
                        >
                          {addToCart.isPending ? 'Đang thêm...' : 'Thêm vào giỏ'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-xl shadow-lg border border-primary/40 p-6 flex flex-col gap-6 relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-accent/5 to-primary/5 opacity-50" />

                <h2 className="text-xl font-bold text-text-main pb-2 border-b border-border z-10 relative">
                  Tóm Tắt Đơn Hàng
                </h2>

                {/* Coupon Applied Badge */}
                {coupon && (
                  <div className="z-10 relative bg-white border border-primary rounded-lg p-3 shadow-md flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      <Sparkles className="size-5 text-accent animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-green-700 leading-tight mb-1">
                        Đã áp dụng mã: {coupon.code}
                      </h4>
                      <p className="text-xs text-text-muted">
                        Bạn tiết kiệm{' '}
                        <span className="font-bold text-green-700">
                          {formatPrice(cartSummary.discount)}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Xóa
                    </button>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="flex flex-col gap-3 z-10 relative">
                  <div className="flex justify-between text-base">
                    <span className="text-text-muted">Tạm tính</span>
                    <span className="font-medium text-text-main">
                      {formatPrice(cartSummary.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-text-muted">Phí vận chuyển</span>
                    <span className="text-green-600 font-medium">
                      {cartSummary.shipping > 0 ? formatPrice(cartSummary.shipping) : 'Miễn phí'}
                    </span>
                  </div>
                  {cartSummary.discount > 0 && (
                    <div className="flex justify-between text-base">
                      <span className="text-text-muted">Giảm giá</span>
                      <span className="text-green-700 font-medium">
                        -{formatPrice(cartSummary.discount)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Coupon Input */}
                {!coupon && (
                  <div className="mt-2 pt-4 border-t border-border z-10 relative">
                    <div className="bg-gradient-to-r from-cream to-white border border-accent/30 rounded-lg p-3 shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] relative overflow-hidden group">
                      <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/20 blur-xl rounded-full" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="size-5 text-accent" />
                          <h3 className="text-sm font-bold text-text-main">
                            Mã Giảm Giá
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Nhập mã"
                            className="w-full bg-white border border-border rounded text-xs px-2 py-2 placeholder:text-text-muted focus:border-primary focus:ring-0 transition-all"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            disabled={applyingCoupon}
                            className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3 py-2 rounded transition-colors whitespace-nowrap disabled:opacity-50"
                          >
                            {applyingCoupon ? 'Đang...' : 'ÁP DỤNG'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="pt-4 border-t border-border z-10 relative">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-lg font-bold text-text-main">
                      Tổng cộng
                    </span>
                    <div className="flex flex-col items-end">
                      {cartSummary.discount > 0 && (
                        <span className="text-sm line-through text-text-muted">
                          {formatPrice(cartSummary.subtotal)}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(cartSummary.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full bg-primary hover:bg-primary/90 text-white text-base font-bold py-3.5 px-4 rounded-lg shadow-md transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 z-10 relative disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Tiến Hành Thanh Toán</span>
                  <ArrowRight className="size-5" />
                </button>

                {/* Trust Badges */}
                <div className="flex flex-col items-center gap-3 pt-2 z-10 relative">
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <Lock className="size-3.5" />
                    Thanh toán bảo mật
                  </div>
                  <div className="flex gap-2 opacity-60">
                    <div className="h-6 w-10 bg-secondary-200 rounded" />
                    <div className="h-6 w-10 bg-secondary-200 rounded" />
                    <div className="h-6 w-10 bg-secondary-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
