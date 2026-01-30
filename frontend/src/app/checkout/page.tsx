/**
 * Checkout Page - Fashion AI
 * 
 * Trang thanh toán động với API integration:
 * - Fetch cart và addresses từ API
 * - Create order
 * - Payment method selection
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, CreditCard, ChevronRight, ArrowRight, Sparkles, ShieldCheck, Loader2, Plus, MapPin, Truck, Wallet } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAddresses, useCreateOrder, useInitiatePayment, useCreateAddress } from '@/hooks/useOrders';
import { useCurrentUser } from '@/hooks/useAuth';
import { toastError, toastSuccess } from '@/stores';
import type { PaymentMethod, AddressInput } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  
  // Fetch data
  const { data: cart, isLoading: cartLoading } = useCart();
  const { data: addresses, isLoading: addressLoading } = useAddresses();
  const { data: user } = useCurrentUser();
  
  // Mutations
  const createOrder = useCreateOrder();
  const initiatePayment = useInitiatePayment();
  const createAddress = useCreateAddress();
  
  // State
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<AddressInput>({
    fullName: '',
    phone: '',
    street: '',
    ward: '',
    district: '',
    city: '',
    province: '',
    isDefault: false,
  });

  // Set default address
  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses, selectedAddressId]);

  // Pre-fill user info
  useEffect(() => {
    if (user && !newAddress.fullName) {
      setNewAddress(prev => ({
        ...prev,
        fullName: `${user.firstName} ${user.lastName}`,
        phone: user.phone || '',
      }));
    }
  }, [user]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  // Create new address
  const handleCreateAddress = async () => {
    if (!newAddress.fullName || !newAddress.phone || !newAddress.street || !newAddress.district || !newAddress.city) {
      toastError('Lỗi', 'Vui lòng điền đầy đủ thông tin địa chỉ');
      return;
    }

    try {
      const addr = await createAddress.mutateAsync(newAddress);
      setSelectedAddressId(addr.id);
      setShowNewAddressForm(false);
      toastSuccess('Thành công', 'Đã thêm địa chỉ mới');
    } catch {
      toastError('Lỗi', 'Không thể thêm địa chỉ');
    }
  };

  // Submit order
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAddressId) {
      toastError('Lỗi', 'Vui lòng chọn địa chỉ giao hàng');
      return;
    }

    if (!cart || cart.items.length === 0) {
      toastError('Lỗi', 'Giỏ hàng trống');
      return;
    }

    setIsProcessing(true);

    try {
      // Create order
      const order = await createOrder.mutateAsync({
        addressId: selectedAddressId,
        paymentMethod,
        couponCode: cart.coupon?.code,
      });

      // If COD, redirect to success (already handled in hook)
      if (paymentMethod === 'COD') {
        return;
      }

      // For online payment, initiate payment
      await initiatePayment.mutateAsync({
        orderId: order.id,
        method: paymentMethod,
        returnUrl: `${window.location.origin}/order-success?orderId=${order.id}`,
      });

    } catch (error: any) {
      toastError('Lỗi', error.message || 'Không thể tạo đơn hàng');
      setIsProcessing(false);
    }
  };

  // Loading state
  if (cartLoading || addressLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary-50">
        <header className="flex items-center justify-between border-b border-border px-6 py-4 md:px-12 lg:px-40 bg-white sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">✦</div>
            <h1 className="text-xl font-bold tracking-tight text-text-main">Fashion AI</h1>
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
          <span className="ml-3 text-text-muted">Đang tải...</span>
        </main>
      </div>
    );
  }

  // Empty cart redirect
  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary-50">
        <header className="flex items-center justify-between border-b border-border px-6 py-4 md:px-12 lg:px-40 bg-white sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">✦</div>
            <h1 className="text-xl font-bold tracking-tight text-text-main">Fashion AI</h1>
          </Link>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center">
          <p className="text-text-muted mb-4">Giỏ hàng trống</p>
          <Link href="/shop" className="btn-primary">
            Tiếp tục mua sắm
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      {/* Minimal Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4 md:px-12 lg:px-40 bg-white sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">✦</div>
          <h1 className="text-xl font-bold tracking-tight text-text-main">Fashion AI</h1>
        </Link>
        <div className="flex items-center gap-1 text-text-muted">
          <Lock className="size-4" />
          <span className="text-sm font-medium hidden sm:inline">Thanh Toán Bảo Mật</span>
        </div>
      </header>

      <main className="flex-grow flex justify-center w-full px-4 py-8 md:px-12 lg:px-40 lg:py-12">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12 max-w-[1200px] w-full">
          {/* Left Column: Forms */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
              <Link href="/cart" className="text-primary hover:text-primary/80 transition-colors">
                Giỏ hàng
              </Link>
              <ChevronRight className="size-4 text-text-muted" />
              <span className="text-text-main font-bold">Thanh toán</span>
            </nav>

            {/* Shipping Address */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                  <MapPin className="size-5" />
                  Địa Chỉ Giao Hàng
                </h2>
                <button
                  type="button"
                  onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                  className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                >
                  <Plus className="size-4" />
                  Thêm địa chỉ mới
                </button>
              </div>

              {/* Address List */}
              {addresses && addresses.length > 0 && (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-white hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="address"
                          value={addr.id}
                          checked={selectedAddressId === addr.id}
                          onChange={(e) => setSelectedAddressId(e.target.value)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-text-main">{addr.fullName}</span>
                            {addr.isDefault && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Mặc định</span>
                            )}
                          </div>
                          <p className="text-sm text-text-muted mt-1">{addr.phone}</p>
                          <p className="text-sm text-text-muted">
                            {addr.street}, {addr.ward}, {addr.district}, {addr.city}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* New Address Form */}
              {(showNewAddressForm || !addresses || addresses.length === 0) && (
                <div className="bg-white rounded-lg border border-border p-6 space-y-4">
                  <h3 className="font-medium text-text-main">Địa chỉ mới</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Họ tên"
                      value={newAddress.fullName}
                      onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                      className="input"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Số điện thoại"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Địa chỉ (số nhà, tên đường)"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    className="input w-full"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Phường/Xã"
                      value={newAddress.ward}
                      onChange={(e) => setNewAddress({ ...newAddress, ward: e.target.value })}
                      className="input"
                    />
                    <input
                      type="text"
                      placeholder="Quận/Huyện"
                      value={newAddress.district}
                      onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Tỉnh/Thành phố"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="input"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Mã bưu điện (optional)"
                      value={newAddress.postalCode || ''}
                      onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                      className="input"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCreateAddress}
                    disabled={createAddress.isPending}
                    className="btn-primary w-full"
                  >
                    {createAddress.isPending ? 'Đang lưu...' : 'Lưu địa chỉ'}
                  </button>
                </div>
              )}
            </section>

            {/* Payment Method */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                <Wallet className="size-5" />
                Phương Thức Thanh Toán
              </h2>

              <div className="space-y-3">
                {/* COD */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-white hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                  />
                  <Truck className="size-6 text-text-muted" />
                  <div>
                    <p className="font-medium text-text-main">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-sm text-text-muted">Thanh toán bằng tiền mặt khi nhận hàng</p>
                  </div>
                </label>

                {/* Bank Transfer */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'BANK'
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-white hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="BANK"
                    checked={paymentMethod === 'BANK'}
                    onChange={() => setPaymentMethod('BANK')}
                  />
                  <CreditCard className="size-6 text-text-muted" />
                  <div>
                    <p className="font-medium text-text-main">Chuyển khoản ngân hàng</p>
                    <p className="text-sm text-text-muted">Chuyển khoản qua tài khoản ngân hàng</p>
                  </div>
                </label>

                {/* MoMo */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'MOMO'
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-white hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="MOMO"
                    checked={paymentMethod === 'MOMO'}
                    onChange={() => setPaymentMethod('MOMO')}
                  />
                  <div className="size-6 rounded bg-pink-500 text-white flex items-center justify-center text-xs font-bold">M</div>
                  <div>
                    <p className="font-medium text-text-main">Ví MoMo</p>
                    <p className="text-sm text-text-muted">Thanh toán qua ví điện tử MoMo</p>
                  </div>
                </label>

                {/* ZaloPay */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'ZALOPAY'
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-white hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="ZALOPAY"
                    checked={paymentMethod === 'ZALOPAY'}
                    onChange={() => setPaymentMethod('ZALOPAY')}
                  />
                  <div className="size-6 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold">Z</div>
                  <div>
                    <p className="font-medium text-text-main">ZaloPay</p>
                    <p className="text-sm text-text-muted">Thanh toán qua ví điện tử ZaloPay</p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="sticky top-24 bg-white rounded-xl border border-border p-6 shadow-sm">
              <h2 className="text-xl font-bold text-text-main mb-6">Đơn Hàng</h2>

              {/* Items */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {cart.items.map((item: any) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.product?.image || 'https://via.placeholder.com/64'}
                      alt={item.product?.name}
                      className="w-16 h-16 rounded-lg object-cover bg-secondary-100"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-text-main text-sm line-clamp-1">
                        {item.product?.name}
                      </p>
                      <p className="text-xs text-text-muted">
                        {item.variant?.size} • {item.variant?.color} • x{item.quantity}
                      </p>
                      <p className="text-sm font-medium text-text-main mt-1">
                        {formatPrice(item.totalPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-border mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Tạm tính</span>
                  <span className="text-text-main">{formatPrice(cart.summary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Phí vận chuyển</span>
                  <span className="text-green-600">
                    {cart.summary.shipping > 0 ? formatPrice(cart.summary.shipping) : 'Miễn phí'}
                  </span>
                </div>
                {cart.summary.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted flex items-center gap-1">
                      <Sparkles className="size-3" />
                      Giảm giá
                    </span>
                    <span className="text-green-600">-{formatPrice(cart.summary.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span className="text-text-main">Tổng cộng</span>
                  <span className="text-primary">{formatPrice(cart.summary.total)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || !selectedAddressId}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Lock className="size-5" />
                    Đặt Hàng
                  </>
                )}
              </button>

              {/* Trust */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
                <ShieldCheck className="size-4" />
                Thông tin được bảo mật an toàn
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
