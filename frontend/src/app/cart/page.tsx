/**
 * Fashion AI - Giỏ Hàng
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  Tag,
  ChevronRight
} from 'lucide-react';
import { useCart, useUpdateCartItem, useRemoveCartItem } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/utils/format';

export default function CartPage() {
  const { data: cart, isLoading } = useCart();
  const { mutate: updateQuantity } = useUpdateCartItem();
  const { mutate: removeItem } = useRemoveCartItem();
  
  const [couponCode, setCouponCode] = useState('');

  // Loading State
  if (isLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center py-12">
           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  // Empty State
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen py-8">
          <div className="container-app">
            <nav className="flex items-center gap-2 text-sm text-secondary mb-6">
                <Link href="/" className="hover:text-primary">Trang chủ</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-text-main dark:text-white">Giỏ hàng</span>
            </nav>
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-[#2c2822] flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Giỏ hàng trống</h1>
                <p className="text-secondary mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                <Link href="/products" className="btn-primary">
                    Tiếp tục mua sắm
                </Link>
            </div>
          </div>
      </div>
    );
  }

  // Calculate Totals
  const subtotal = cart.items.reduce((sum, item) => sum + (item.quantity * (item.product.salePrice ?? item.product.price)), 0);
  const shipping = subtotal >= 500000 ? 0 : 30000;
  const discount = 0; // TODO: Implement coupon
  const total = subtotal + shipping - discount;

  const handleUpdateQuantity = (itemId: string, current: number, delta: number) => {
      const newQuantity = current + delta;
      if (newQuantity < 1) return;
      updateQuantity({ itemId, quantity: newQuantity });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-app">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-primary">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-main dark:text-white">Giỏ hàng</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">
          Giỏ hàng <span className="text-secondary">({cart.items.length})</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="card p-4 flex gap-4">
                {/* Image */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gray-100 dark:bg-[#2c2822] flex-shrink-0 overflow-hidden">
                    <Image 
                        src={item.product?.images?.[0]?.url || '/images/product-placeholder.jpg'}
                        alt={item.product?.name || 'Product'}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <Link href={`/products/${item.product?.slug || item.productId}`}>
                        <h3 className="font-bold hover:text-primary transition-colors line-clamp-1">
                        {item.product?.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-3 mt-1 text-sm text-secondary">
                        <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">{item.variant?.color}</span>
                        <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">{item.variant?.size}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between mt-3">
                        <p className="text-primary font-bold">
                            {formatCurrency(item.product.salePrice ?? item.product.price)}
                        </p>

                        {/* Quantity & Remove */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full h-8 md:h-9">
                                <button
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                    className="w-8 md:w-9 h-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-full"
                                >
                                    <Minus className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                                <span className="w-8 md:w-10 text-center text-sm md:text-base font-bold">{item.quantity}</span>
                                <button
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                    className="w-8 md:w-9 h-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-full"
                                >
                                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                            </div>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-secondary hover:text-red-500 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Tóm tắt đơn hàng</h2>

              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Mã giảm giá"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary transition-all"
                  />
                </div>
                <button className="btn-outline h-11 px-4">Áp dụng</button>
              </div>

              {/* Summary */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary">Tạm tính</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Phí vận chuyển</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-success">Miễn phí</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Giảm giá</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Free shipping note */}
              {subtotal < 500000 && (
                <p className="text-xs text-secondary mt-4 text-center">
                  Mua thêm <span className="text-primary font-bold">{formatCurrency(500000 - subtotal)}</span> để được miễn phí ship
                </p>
              )}

              {/* Checkout button */}
              <Link href="/checkout" className="btn-primary w-full mt-6 flex items-center justify-center gap-2">
                Tiến hành thanh toán
                <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Continue shopping */}
              <Link 
                href="/products" 
                className="block text-center text-sm text-primary hover:underline mt-4"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
