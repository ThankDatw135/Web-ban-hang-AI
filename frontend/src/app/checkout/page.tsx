/**
 * Fashion AI - Checkout Page
 * 
 * Trang thanh toán với form thông tin và tóm tắt đơn hàng
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn, formatCurrency } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { useCreateOrder } from '@/hooks/use-orders';
import { useAddresses } from '@/hooks/use-user';
import type { PaymentMethod } from '@/types/api';
import { Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [note, setNote] = useState('');

  // Fetch cart and addresses from API
  const { data: cart, isLoading: cartLoading } = useCart();
  const { data: addresses, isLoading: addressesLoading } = useAddresses();
  const createOrder = useCreateOrder();

  const cartItems = cart?.items ?? [];
  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.product?.price || 0) * item.quantity, 0);
  const shipping = subtotal >= 1000000 ? 0 : 30000;
  const total = subtotal + shipping;

  // Handle order submission
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) return;
    
    createOrder.mutate(
      {
        addressId: selectedAddressId,
        paymentMethod,
        note: note || undefined,
      },
      {
        onSuccess: (order) => {
          router.push(`/checkout/success?orderId=${order.id}`);
        },
      }
    );
  };

  // Loading state
  if (cartLoading || addressesLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-cream">
          <div className="container-app py-20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-cream">
          <div className="container-app py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
            <Link href="/products" className="text-primary hover:underline">
              ← Tiếp tục mua sắm
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
      
      <main className="flex-1 bg-cream">
        <div className="container-app py-8">
          {/* Progress */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[
              { num: 1, label: 'Thông tin' },
              { num: 2, label: 'Thanh toán' },
              { num: 3, label: 'Xác nhận' },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div 
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                    step >= s.num ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  )}
                >
                  {step > s.num ? (
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  ) : s.num}
                </div>
                <span className={cn(
                  'ml-2 text-sm font-semibold hidden sm:inline',
                  step >= s.num ? 'text-primary' : 'text-gray-500'
                )}>
                  {s.label}
                </span>
                {idx < 2 && (
                  <div className={cn(
                    'w-12 h-1 mx-4 rounded-full',
                    step > s.num ? 'bg-primary' : 'bg-gray-200'
                  )} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Step 1: Shipping Info */}
              {step === 1 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Thông tin giao hàng</h2>
                  <form className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Họ tên</label>
                        <input 
                          type="text" 
                          required
                          className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Số điện thoại</label>
                        <input 
                          type="tel" 
                          required
                          className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                          placeholder="0901234567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input 
                        type="email" 
                        required
                        className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Địa chỉ</label>
                      <input 
                        type="text" 
                        required
                        className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        placeholder="123 Đường ABC"
                      />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Tỉnh/Thành</label>
                        <select className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                          <option>TP. Hồ Chí Minh</option>
                          <option>Hà Nội</option>
                          <option>Đà Nẵng</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Quận/Huyện</label>
                        <select className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                          <option>Quận 1</option>
                          <option>Quận 2</option>
                          <option>Quận 3</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Phường/Xã</label>
                        <select className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                          <option>Phường Bến Nghé</option>
                          <option>Phường Bến Thành</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Ghi chú (tùy chọn)</label>
                      <textarea 
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                        placeholder="Giao hàng giờ hành chính..."
                      />
                    </div>
                  </form>
                  <div className="flex justify-end mt-6">
                    <button 
                      onClick={() => setStep(2)}
                      className="px-8 h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                    >
                      Tiếp tục
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Phương thức thanh toán</h2>
                  <div className="space-y-3">
                    {[
                      { id: 'COD', label: 'Thanh toán khi nhận hàng (COD)', icon: 'local_shipping' },
                      { id: 'BANK', label: 'Chuyển khoản ngân hàng', icon: 'credit_card' },
                      { id: 'MOMO', label: 'Ví MoMo', icon: 'account_balance_wallet' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                        className={cn(
                          'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left',
                          paymentMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <span className="material-symbols-outlined text-[24px]">{method.icon}</span>
                        <span className="font-semibold">{method.label}</span>
                        {paymentMethod === method.id && (
                          <span className="material-symbols-outlined text-primary ml-auto">check_circle</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4 justify-between mt-6">
                    <button 
                      onClick={() => setStep(1)}
                      className="px-8 h-12 rounded-full border border-gray-300 font-bold hover:bg-gray-50 transition-colors"
                    >
                      Quay lại
                    </button>
                    <button 
                      onClick={() => setStep(3)}
                      className="px-8 h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                    >
                      Tiếp tục
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Xác nhận đơn hàng</h2>
                  
                  {/* Shipping info */}
                  <div className="p-4 bg-gray-50 rounded-xl mb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">Nguyễn Văn A</p>
                        <p className="text-sm text-gray-600">0901234567</p>
                        <p className="text-sm text-gray-600">123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM</p>
                      </div>
                      <button onClick={() => setStep(1)} className="text-primary text-sm font-semibold">Sửa</button>
                    </div>
                  </div>

                  {/* Payment method */}
                  <div className="p-4 bg-gray-50 rounded-xl mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined">
                          {paymentMethod === 'COD' ? 'local_shipping' : paymentMethod === 'BANK' ? 'credit_card' : 'account_balance_wallet'}
                        </span>
                        <span className="font-semibold">
                          {paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : paymentMethod === 'BANK' ? 'Chuyển khoản ngân hàng' : 'Ví MoMo'}
                        </span>
                      </div>
                      <button onClick={() => setStep(2)} className="text-primary text-sm font-semibold">Sửa</button>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-4 mt-6">
                    {cartItems.map((item) => {
                      const imageUrl = item.product?.images?.[0]?.url || '/placeholder.jpg';
                      const name = item.product?.name || 'Sản phẩm';
                      const variantLabel = item.variant ? `${item.variant.color} / ${item.variant.size}` : '';
                      const price = Number(item.product?.price || 0);
                      
                      return (
                      <div key={item.id} className="flex gap-4">
                        <div 
                          className="w-16 h-20 rounded-lg bg-cover bg-center shrink-0"
                          style={{ backgroundImage: `url(${imageUrl})` }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{name}</h3>
                          <p className="text-sm text-gray-500">{variantLabel}</p>
                          <p className="text-sm text-gray-500">SL: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-primary">{formatCurrency(price)}</p>
                      </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-4 justify-between mt-6">
                    <button 
                      onClick={() => setStep(2)}
                      className="px-8 h-12 rounded-full border border-gray-300 font-bold hover:bg-gray-50 transition-colors"
                    >
                      Quay lại
                    </button>
                    <button 
                      onClick={handlePlaceOrder}
                      disabled={!selectedAddressId || createOrder.isPending}
                      className="px-8 h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {createOrder.isPending ? 'Đang xử lý...' : 'Đặt hàng'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="font-bold mb-4">Đơn hàng ({cartItems.length} sản phẩm)</h2>
                
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => {
                    const imageUrl = item.product?.images?.[0]?.url || '/placeholder.jpg';
                    const name = item.product?.name || 'Sản phẩm';
                    const price = Number(item.product?.price || 0);
                    
                    return (
                    <div key={item.id} className="flex gap-3">
                      <div 
                        className="w-14 h-16 rounded-lg bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      />
                      <div className="flex-1 text-sm">
                        <p className="font-semibold">{name}</p>
                        <p className="text-gray-500">x{item.quantity}</p>
                      </div>
                      <p className="font-semibold">{formatCurrency(price)}</p>
                    </div>
                    );
                  })}
                </div>

                <div className="border-t pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'Miễn phí' : formatCurrency(shipping)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
