/**
 * Fashion AI - Checkout Page
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  CreditCard, 
  Truck, 
  ChevronRight, 
  Plus, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useAddresses, useCreateAddress } from '@/hooks/use-address';
import { useCreateOrder } from '@/hooks/use-order';
import { formatCurrency } from '@/lib/utils/format';
import { PaymentMethod } from '@/types/api';

import { useInitiatePayment } from '@/hooks/use-payment';

export default function CheckoutPage() {
  const router = useRouter();
  
  // Data Hooks
  const { data: cart, isLoading: isCartLoading } = useCart();
  const { data: addresses, isLoading: isAddressLoading } = useAddresses();
  const { mutate: createOrder, isPending: isOrdering } = useCreateOrder();
  const { mutate: createAddress, isPending: isCreatingAddress } = useCreateAddress();
  const { mutate: initiatePayment, isPending: isPaying } = useInitiatePayment();

  // State
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [note, setNote] = useState('');
  const [showAddAddress, setShowAddAddress] = useState(false);
  
  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    district: '',
    city: '',
    province: '', // Simple inputs for now
    isDefault: false
  });

  // Effect to select default address
  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find(a => a.isDefault);
      setSelectedAddressId(defaultAddr?.id || addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  // Handle Order
  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      alert('Vui lòng chọn địa chỉ giao hàng');
      return;
    }
    
    createOrder({
      addressId: selectedAddressId,
      paymentMethod,
      note,
      // couponCode // TODO
    }, {
      onSuccess: (order) => {
        if (paymentMethod === 'COD') {
            router.push(`/dashboard/orders/${order.id}`);
        } else {
            // Initiate Online Payment
            initiatePayment({ orderId: order.id, method: paymentMethod });
        }
      }
    });
  };

  // Handle Create Address
  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    createAddress({
       ...newAddress,
       province: newAddress.city // Simplification
    }, {
      onSuccess: (data) => {
        setSelectedAddressId(data.id);
        setShowAddAddress(false);
        // Reset form
        setNewAddress({ fullName: '', phone: '', street: '', district: '', city: '', province: '', isDefault: false });
      }
    });
  };

  if (isCartLoading || isAddressLoading) {
    return (
        <div className="min-h-screen py-8 flex items-center justify-center">
           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
     return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="mb-4">Giỏ hàng trống</p>
                <Link href="/products" className="btn-primary">Mua sắm ngay</Link>
            </div>
        </div>
     );
  }

  // Calculate Totals
  const subtotal = cart.items.reduce((sum, item) => sum + (item.quantity * (item.product.salePrice ?? item.product.price)), 0);
  const shippingFee = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-[#1e1a14]">
      <div className="container-app">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
            <Link href="/cart" className="text-secondary hover:text-primary">Giỏ hàng</Link>
            <ChevronRight className="w-4 h-4 text-secondary" />
            <span className="font-bold">Thanh toán</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Left Column: Address & Payment */}
           <div className="lg:col-span-2 space-y-6">
              
              {/* Address Section */}
              <div className="card p-6">
                 <div className="flex items-center justify-between mb-4">
                    <h2 className="flex items-center gap-2 text-lg font-bold">
                        <MapPin className="w-5 h-5 text-primary" />
                        Địa chỉ giao hàng
                    </h2>
                    <button 
                        onClick={() => setShowAddAddress(!showAddAddress)}
                        className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm địa chỉ
                    </button>
                 </div>

                 {showAddAddress && (
                     <form onSubmit={handleCreateAddress} className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-dashed border-primary">
                         <h3 className="font-bold mb-3">Thêm địa chỉ mới</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <input 
                                required
                                placeholder="Họ tên" 
                                className="input"
                                value={newAddress.fullName}
                                onChange={e => setNewAddress({...newAddress, fullName: e.target.value})}
                             />
                             <input 
                                required
                                placeholder="Số điện thoại" 
                                className="input"
                                value={newAddress.phone}
                                onChange={e => setNewAddress({...newAddress, phone: e.target.value})}
                             />
                             <input 
                                required
                                placeholder="Địa chỉ (Số nhà, đường)" 
                                className="input md:col-span-2"
                                value={newAddress.street}
                                onChange={e => setNewAddress({...newAddress, street: e.target.value})}
                             />
                             <input 
                                required
                                placeholder="Phường/Xã/Quận/Huyện" 
                                className="input"
                                value={newAddress.district}
                                onChange={e => setNewAddress({...newAddress, district: e.target.value})}
                             />
                             <input 
                                required
                                placeholder="Tỉnh/Thành phố" 
                                className="input"
                                value={newAddress.city}
                                onChange={e => setNewAddress({...newAddress, city: e.target.value})}
                             />
                         </div>
                         <div className="flex justify-end gap-3 mt-4">
                             <button type="button" onClick={() => setShowAddAddress(false)} className="btn-ghost">Hủy</button>
                             <button type="submit" disabled={isCreatingAddress} className="btn-primary">
                                 {isCreatingAddress ? 'Đang lưu...' : 'Lưu địa chỉ'}
                             </button>
                         </div>
                     </form>
                 )}

                 {addresses && addresses.length > 0 ? (
                     <div className="space-y-3">
                         {addresses.map(addr => (
                             <label key={addr.id} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                                 <input 
                                    type="radio" 
                                    name="address" 
                                    className="mt-1 w-4 h-4 text-primary focus:ring-primary"
                                    checked={selectedAddressId === addr.id}
                                    onChange={() => setSelectedAddressId(addr.id)}
                                 />
                                 <div className="flex-1">
                                     <div className="flex items-center gap-2 mb-1">
                                         <span className="font-bold">{addr.fullName}</span>
                                         <span className="text-secondary text-sm">| {addr.phone}</span>
                                         {addr.isDefault && <span className="text-[10px] bg-gray-200 dark:bg-gray-700 px-1.5 rounded text-secondary">Mặc định</span>}
                                     </div>
                                     <p className="text-sm text-secondary">
                                         {addr.street}, {addr.ward ? `${addr.ward}, ` : ''}{addr.district}, {addr.city}
                                     </p>
                                 </div>
                             </label>
                         ))}
                     </div>
                 ) : (
                     <div className="text-center py-6 text-secondary bg-gray-50 dark:bg-gray-800 rounded-xl">
                         Chưa có địa chỉ nào. Vui lòng thêm địa chỉ.
                     </div>
                 )}
              </div>

              {/* Payment Method */}
              <div className="card p-6">
                 <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Phương thức thanh toán
                 </h2>
                 <div className="space-y-3">
                     <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}>
                         <input 
                            type="radio" 
                            name="payment" 
                            value="COD"
                            checked={paymentMethod === 'COD'}
                            onChange={() => setPaymentMethod('COD')}
                            className="w-5 h-5 text-primary focus:ring-primary"
                         />
                         <div className="flex-1">
                             <div className="font-bold">Thanh toán khi nhận hàng (COD)</div>
                             <p className="text-sm text-secondary">Thanh toán tiền mặt khi giao hàng</p>
                         </div>
                         <Truck className="w-6 h-6 text-gray-400" />
                     </label>

                     <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'BANK' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}>
                         <input 
                            type="radio" 
                            name="payment" 
                            value="BANK"
                            checked={paymentMethod === 'BANK'}
                            onChange={() => setPaymentMethod('BANK')}
                            className="w-5 h-5 text-primary focus:ring-primary"
                         />
                         <div className="flex-1">
                             <div className="font-bold">Chuyển khoản ngân hàng</div>
                             <p className="text-sm text-secondary">Quét mã QR VietQR</p>
                         </div>
                         <CreditCard className="w-6 h-6 text-gray-400" />
                     </label>
                 </div>
              </div>
           </div>

           {/* Right Column: Summary */}
           <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                  <h2 className="text-lg font-bold mb-4">Đơn hàng của bạn</h2>
                  
                  {/* Item List (Collapsed/Simple) */}
                  <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
                      {cart.items.map(item => (
                          <div key={item.id} className="flex gap-3">
                              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0 relative overflow-hidden">
                                  {/* Just reuse logic or simple img */}
                                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700" /> 
                              </div>
                              <div className="flex-1 text-sm">
                                  <p className="font-medium line-clamp-1">{item.product.name}</p>
                                  <p className="text-secondary text-xs">{item.variant.size} / {item.variant.color} x {item.quantity}</p>
                              </div>
                              <div className="text-sm font-medium">
                                  {formatCurrency((item.product.salePrice ?? item.product.price) * item.quantity)}
                              </div>
                          </div>
                      ))}
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700 my-4" />

                  <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                          <span className="text-secondary">Tạm tính</span>
                          <span>{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-secondary">Phí vận chuyển</span>
                          <span>{shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2">
                          <span>Tổng cộng</span>
                          <span className="text-primary">{formatCurrency(total)}</span>
                      </div>
                  </div>

                  <div className="mt-4">
                      <label className="text-sm font-medium mb-2 block">Ghi chú</label>
                      <textarea 
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] p-3 text-sm focus:border-primary outline-none resize-none"
                        rows={2}
                        placeholder="Ghi chú cho đơn hàng (Ví dụ: Giao giờ hành chính)"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                      />
                  </div>

                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isOrdering || !selectedAddressId}
                    className="btn-primary w-full mt-6 py-3 font-bold text-base disabled:opacity-70"
                  >
                      {isOrdering ? 'Đang xử lý...' : 'Đặt hàng'}
                  </button>

                  <p className="text-xs text-secondary text-center mt-4">
                      Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý với <Link href="/terms" className="text-primary hover:underline">điều khoản dịch vụ</Link>
                  </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
