/**
 * Fashion AI - Giỏ Hàng
 * 
 * Trang hiển thị sản phẩm trong giỏ hàng
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  Tag,
  ChevronRight
} from 'lucide-react';

// Mock cart data
const initialCartItems = [
  { 
    id: 1, 
    name: 'Áo sơ mi trắng Premium', 
    price: 850000, 
    quantity: 2, 
    size: 'M', 
    color: 'Trắng',
    image: null 
  },
  { 
    id: 2, 
    name: 'Quần tây navy công sở', 
    price: 750000, 
    quantity: 1, 
    size: 'L', 
    color: 'Navy',
    image: null 
  },
];

// Format giá tiền
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');

  // Tính tổng tiền
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 500000 ? 0 : 30000;
  const discount = 0;
  const total = subtotal + shipping - discount;

  // Cập nhật số lượng
  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Xóa sản phẩm
  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Giỏ hàng trống
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-[#2c2822] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-300 dark:text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Giỏ hàng trống</h1>
          <p className="text-secondary mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link href="/products" className="btn-primary">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

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
          Giỏ hàng <span className="text-secondary">({cartItems.length})</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="card p-4 flex gap-4">
                {/* Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gray-100 dark:bg-[#2c2822] flex-shrink-0 flex items-center justify-center">
                  <span className="text-4xl">👕</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-bold hover:text-primary transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-secondary mt-1">
                    {item.color} / {item.size}
                  </p>
                  <p className="text-primary font-bold mt-2">
                    {formatPrice(item.price)}
                  </p>

                  {/* Mobile: Quantity & Remove */}
                  <div className="md:hidden flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Desktop: Quantity & Total */}
                <div className="hidden md:flex items-center gap-6">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-full"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-full"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Total */}
                  <div className="w-28 text-right">
                    <p className="font-bold text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-secondary hover:text-red-500 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
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
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Phí vận chuyển</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-success">Miễn phí</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Giảm giá</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Free shipping note */}
              {subtotal < 500000 && (
                <p className="text-xs text-secondary mt-4 text-center">
                  Mua thêm <span className="text-primary font-bold">{formatPrice(500000 - subtotal)}</span> để được miễn phí ship
                </p>
              )}

              {/* Checkout button */}
              <Link href="/checkout" className="btn-primary w-full mt-6">
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
