/**
 * Fashion AI - Thanh Toán
 * 
 * Trang nhập thông tin và thanh toán
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  CreditCard, 
  Truck, 
  ChevronRight,
  ChevronDown,
  Lock
} from 'lucide-react';

// Mock cart items
const cartItems = [
  { id: 1, name: 'Áo sơ mi trắng Premium', price: 850000, quantity: 2, size: 'M', color: 'Trắng' },
  { id: 2, name: 'Quần tây navy công sở', price: 750000, quantity: 1, size: 'L', color: 'Navy' },
];

// Payment methods
const paymentMethods = [
  { id: 'cod', name: 'Thanh toán khi nhận hàng (COD)', icon: '💵' },
  { id: 'bank', name: 'Chuyển khoản ngân hàng', icon: '🏦' },
  { id: 'momo', name: 'Ví MoMo', icon: '📱' },
  { id: 'vnpay', name: 'VNPay', icon: '💳' },
];

// Format giá tiền
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isLoading, setIsLoading] = useState(false);

  // Tính tổng tiền
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement checkout logic
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/checkout/success';
    }, 2000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-app">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-primary">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/cart" className="hover:text-primary">Giỏ hàng</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-main dark:text-white">Thanh toán</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Info */}
              <div className="card p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Địa chỉ giao hàng
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Họ và tên *</label>
                    <input
                      type="text"
                      placeholder="Nhập họ và tên"
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Số điện thoại *</label>
                    <input
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      placeholder="Nhập email"
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tỉnh/Thành phố *</label>
                    <div className="relative">
                      <select className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary appearance-none" required>
                        <option value="">Chọn tỉnh/thành phố</option>
                        <option value="hcm">TP. Hồ Chí Minh</option>
                        <option value="hn">Hà Nội</option>
                        <option value="dn">Đà Nẵng</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Quận/Huyện *</label>
                    <div className="relative">
                      <select className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary appearance-none" required>
                        <option value="">Chọn quận/huyện</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Địa chỉ chi tiết *</label>
                    <input
                      type="text"
                      placeholder="Số nhà, tên đường, phường/xã"
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Ghi chú</label>
                    <textarea
                      placeholder="Ghi chú cho đơn hàng (không bắt buộc)"
                      rows={3}
                      className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="card p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Phương thức vận chuyển
                </h2>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" checked readOnly className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-medium">Giao hàng tiêu chuẩn</p>
                        <p className="text-sm text-secondary">Nhận hàng trong 3-5 ngày</p>
                      </div>
                    </div>
                    <span className="font-bold text-primary">
                      {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
                    </span>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Phương thức thanh toán
                </h2>
                
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label 
                      key={method.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                        paymentMethod === method.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-primary" 
                      />
                      <span className="text-2xl">{method.icon}</span>
                      <span className="font-medium">{method.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="text-lg font-bold mb-4">Đơn hàng của bạn</h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-[#2c2822] flex-shrink-0 flex items-center justify-center relative">
                        <span className="text-2xl">👕</span>
                        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-secondary">{item.color} / {item.size}</p>
                        <p className="text-sm font-bold text-primary mt-1">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="border-gray-200 dark:border-gray-700 mb-4" />

                {/* Summary */}
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-secondary">Tạm tính</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Phí vận chuyển</span>
                    <span className="font-medium">
                      {shipping === 0 ? <span className="text-success">Miễn phí</span> : formatPrice(shipping)}
                    </span>
                  </div>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Submit */}
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn-primary w-full"
                >
                  {isLoading ? (
                    <span className="animate-spin">⏳</span>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Đặt hàng
                    </>
                  )}
                </button>

                {/* Security note */}
                <p className="text-xs text-secondary text-center mt-4 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Thông tin của bạn được bảo mật
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
