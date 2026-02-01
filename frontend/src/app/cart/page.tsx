/**
 * Fashion AI - Cart Page
 * 
 * Trang giỏ hàng với danh sách sản phẩm, cập nhật số lượng, và checkout
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Sparkles, Tag, Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn, formatCurrency } from '@/lib/utils';
import { useCart, useUpdateCartItem, useRemoveCartItem, useClearCart } from '@/hooks/use-cart';
import { SkeletonProductGrid } from '@/components/ui/Skeleton';

export default function CartPage() {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Fetch cart from API
  const { data: cart, isLoading, error } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  
  const cartItems = cart?.items ?? [];
  
  // Chỉ lấy sản phẩm còn hàng cho tính toán
  const inStockItems = cartItems;
  
  // Calculate totals (backend should handle this, but fallback here)
  const subtotal = inStockItems.reduce((sum, item) => sum + Number(item.product?.price || 0) * item.quantity, 0);
  const discount = appliedCoupon ? subtotal * 0.1 : 0; // 10% discount
  const shippingFee = subtotal >= 1000000 ? 0 : 30000;
  const total = subtotal - discount + shippingFee;

  // Update quantity
  const handleUpdateQuantity = (itemId: string, delta: number, currentQty: number) => {
    const newQty = Math.max(1, Math.min(99, currentQty + delta));
    if (newQty !== currentQty) {
      updateItem.mutate({ itemId, quantity: newQty });
    }
  };

  // Remove item
  const handleRemoveItem = (itemId: string) => {
    removeItem.mutate(itemId);
  };

  // Apply coupon
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'FASHION10') {
      setAppliedCoupon(couponCode);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="container-app py-20">
            <div className="flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="container-app py-20 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-extrabold mb-4">Giỏ hàng trống</h1>
            <p className="text-secondary mb-8">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <Link href="/products">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header cartItemsCount={cartItems.length} />

      <main className="flex-1">
        {/* Page header */}
        <div className="bg-white dark:bg-[#1a1814] border-b border-border py-8">
          <div className="container-app">
            <h1 className="text-3xl font-extrabold">Giỏ hàng</h1>
            <p className="text-secondary mt-1">
              {cartItems.length} sản phẩm trong giỏ hàng
            </p>
          </div>
        </div>

        <div className="container-app py-8">
          <div className="lg:flex lg:gap-12">
            {/* Cart items */}
            <div className="flex-1">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-semibold text-secondary pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-6">Sản phẩm</div>
                <div className="col-span-2 text-center">Đơn giá</div>
                <div className="col-span-2 text-center">Số lượng</div>
                <div className="col-span-2 text-right">Thành tiền</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {cartItems.map(item => {
                  const { product, variant } = item;
                  const imageUrl = product?.images?.[0]?.url || '/placeholder.jpg';
                  const variantLabel = variant ? `${variant.color} / Size ${variant.size}` : '';
                  const price = Number(product?.price || 0);
                  const salePrice = product?.salePrice ? Number(product.salePrice) : undefined;
                  const inStock = variant ? variant.stock > 0 : true;
                  
                  return (
                  <div
                    key={item.id}
                    className={cn(
                      'py-6 grid gap-4 md:grid-cols-12 items-center',
                      !inStock && 'opacity-60'
                    )}
                  >
                    {/* Product info */}
                    <div className="md:col-span-6 flex gap-4">
                      <div className="w-24 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${imageUrl})` }}
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <Link
                          href={`/products/${product?.slug || item.productId}`}
                          className="font-bold hover:text-primary transition-colors line-clamp-2"
                        >
                          {product?.name || 'Sản phẩm'}
                        </Link>
                        <p className="text-sm text-secondary mt-1">{variantLabel}</p>
                        {!inStock && (
                          <p className="text-sm text-red-500 mt-2 font-medium">
                            Hết hàng
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-center">
                      <p className="font-bold">{formatCurrency(salePrice || price)}</p>
                      {salePrice && salePrice < price && (
                        <p className="text-sm text-gray-400 line-through">
                          {formatCurrency(price)}
                        </p>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex items-center justify-center">
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -1, item.quantity)}
                          disabled={item.quantity <= 1 || updateItem.isPending}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, 1, item.quantity)}
                          disabled={updateItem.isPending}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & remove */}
                    <div className="md:col-span-2 flex items-center justify-end gap-4">
                      <p className="font-bold text-primary">
                        {formatCurrency((salePrice || price) * item.quantity)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={removeItem.isPending}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        aria-label="Xóa"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* AI Try-on CTA */}
              <div className="mt-8 p-6 bg-accent/5 border border-accent/20 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Thử đồ trước khi mua?</h3>
                    <p className="text-secondary text-sm mt-1">
                      Sử dụng AI Try-on để xem sản phẩm trông như thế nào trên bạn
                    </p>
                  </div>
                  <Link href="/ai-studio">
                    <Button variant="accent" size="md">
                      Thử ngay
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:w-96 mt-8 lg:mt-0">
              <div className="sticky top-24 bg-white dark:bg-[#1a1814] rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-6">Tóm tắt đơn hàng</h2>

                {/* Coupon input */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Nhập mã giảm giá"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        leftIcon={<Tag className="w-5 h-5" />}
                        size="md"
                      />
                    </div>
                    <Button variant="outline" onClick={applyCoupon}>
                      Áp dụng
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-sm text-green-500 mt-2">
                      ✓ Đã áp dụng mã <strong>{appliedCoupon}</strong>
                    </p>
                  )}
                </div>

                {/* Price breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Tạm tính</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Giảm giá</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-secondary">Phí vận chuyển</span>
                    <span>{shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee)}</span>
                  </div>
                  {shippingFee > 0 && (
                    <p className="text-xs text-secondary">
                      Miễn phí vận chuyển cho đơn hàng từ 1.000.000đ
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="font-bold text-lg">Tổng cộng</span>
                  <span className="font-extrabold text-xl text-primary">
                    {formatCurrency(total)}
                  </span>
                </div>

                {/* Checkout button */}
                <Link href="/checkout">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Tiến hành thanh toán
                  </Button>
                </Link>

                {/* Continue shopping */}
                <Link
                  href="/products"
                  className="block text-center text-sm text-secondary hover:text-primary mt-4"
                >
                  ← Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
