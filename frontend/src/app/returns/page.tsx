/**
 * AI-Guided Returns & Exchanges - Fashion AI
 * 
 * Hướng dẫn đổi trả với AI:
 * - Select order/item to return
 * - AI reason suggestions
 * - Return shipping options
 * - Refund tracking
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  RotateCcw, 
  Package, 
  ChevronRight, 
  Sparkles,
  Camera,
  MessageSquare,
  Truck,
  Check,
  ArrowRight
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock eligible orders
const eligibleOrders = [
  {
    id: 'ORD-2024002',
    date: '25/01/2024',
    items: [
      { 
        id: '1', 
        name: 'Velvet Blazer', 
        size: 'M', 
        price: 3200000, 
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100',
        eligible: true,
        daysLeft: 12,
      },
    ],
  },
  {
    id: 'ORD-2024003',
    date: '20/01/2024',
    items: [
      { 
        id: '2', 
        name: 'Cashmere Coat', 
        size: 'S', 
        price: 8500000, 
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=100',
        eligible: true,
        daysLeft: 7,
      },
    ],
  },
];

const returnReasons = [
  { id: 'size', label: 'Size không phù hợp', aiSuggestion: true },
  { id: 'color', label: 'Màu sắc khác với hình', aiSuggestion: false },
  { id: 'defect', label: 'Sản phẩm bị lỗi', aiSuggestion: false },
  { id: 'wrong', label: 'Nhận nhầm sản phẩm', aiSuggestion: false },
  { id: 'changed', label: 'Đổi ý không muốn mua nữa', aiSuggestion: false },
  { id: 'other', label: 'Lý do khác', aiSuggestion: false },
];

const returnSteps = [
  { step: 1, title: 'Chọn sản phẩm', description: 'Chọn đơn hàng và sản phẩm cần đổi/trả' },
  { step: 2, title: 'Lý do đổi/trả', description: 'Cho chúng tôi biết lý do' },
  { step: 3, title: 'Gửi hàng', description: 'In nhãn hoặc đặt lịch lấy hàng' },
  { step: 4, title: 'Hoàn tiền', description: 'Nhận hoàn tiền trong 3-5 ngày' },
];

export default function ReturnsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [returnType, setReturnType] = useState<'refund' | 'exchange'>('refund');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <RotateCcw className="size-6 text-primary" />
            <h1 className="text-3xl font-bold text-text-main">Đổi Trả & Hoàn Tiền</h1>
          </div>
          <p className="text-text-muted">Quy trình đổi trả dễ dàng với hỗ trợ từ AI</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between">
            {returnSteps.map((step, idx) => (
              <div key={step.step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`size-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    currentStep >= step.step 
                      ? 'bg-primary text-white' 
                      : 'bg-secondary-100 text-text-muted'
                  }`}>
                    {currentStep > step.step ? <Check className="size-5" /> : step.step}
                  </div>
                  <p className="text-xs font-medium text-text-main mt-2 text-center hidden md:block">{step.title}</p>
                </div>
                {idx < returnSteps.length - 1 && (
                  <div className={`w-12 md:w-24 h-0.5 mx-2 ${
                    currentStep > step.step ? 'bg-primary' : 'bg-secondary-100'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant Tip */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="size-5 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-text-main mb-1">AI Assistant</h3>
              <p className="text-sm text-text-muted">
                {currentStep === 1 && "Bạn có 2 đơn hàng đủ điều kiện đổi/trả trong 14 ngày. Chọn sản phẩm để bắt đầu."}
                {currentStep === 2 && "Size không phù hợp là lý do phổ biến nhất. Bạn có muốn AI gợi ý size phù hợp cho lần mua tiếp theo?"}
                {currentStep === 3 && "Giao hàng miễn phí cho đổi trả! Chọn cách thuận tiện nhất cho bạn."}
              </p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-text-main">Chọn Sản Phẩm Cần Đổi/Trả</h2>
            {eligibleOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                  <div>
                    <span className="font-bold text-text-main">{order.id}</span>
                    <span className="text-sm text-text-muted ml-2">{order.date}</span>
                  </div>
                </div>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                      selectedItem === item.id 
                        ? 'bg-primary/5 border-2 border-primary' 
                        : 'bg-secondary-50 hover:bg-secondary-100 border-2 border-transparent'
                    }`}
                  >
                    <img src={item.image} alt={item.name} className="size-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-bold text-text-main">{item.name}</h3>
                      <p className="text-sm text-text-muted">Size: {item.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{formatPrice(item.price)}</p>
                      <p className="text-xs text-green-600">Còn {item.daysLeft} ngày</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={() => selectedItem && setCurrentStep(2)}
              disabled={!selectedItem}
              className="w-full py-4 bg-primary hover:bg-primary/90 disabled:bg-secondary-200 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              Tiếp tục <ArrowRight className="size-5" />
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-text-main">Lý Do Đổi/Trả</h2>
            
            {/* Return Type */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setReturnType('refund')}
                className={`flex-1 p-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                  returnType === 'refund' ? 'border-primary bg-primary/5' : 'border-border'
                }`}
              >
                <RotateCcw className="size-5" />
                <span className="font-medium">Hoàn tiền</span>
              </button>
              <button
                onClick={() => setReturnType('exchange')}
                className={`flex-1 p-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                  returnType === 'exchange' ? 'border-primary bg-primary/5' : 'border-border'
                }`}
              >
                <Package className="size-5" />
                <span className="font-medium">Đổi size/màu</span>
              </button>
            </div>

            {/* Reasons */}
            <div className="space-y-2">
              {returnReasons.map((reason) => (
                <button
                  key={reason.id}
                  onClick={() => setSelectedReason(reason.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left flex items-center justify-between transition-all ${
                    selectedReason === reason.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span className="font-medium text-text-main">{reason.label}</span>
                  {reason.aiSuggestion && (
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="size-3" />
                      AI gợi ý
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 py-4 bg-white border border-border text-text-main font-bold rounded-xl transition-colors"
              >
                Quay lại
              </button>
              <button
                onClick={() => selectedReason && setCurrentStep(3)}
                disabled={!selectedReason}
                className="flex-1 py-4 bg-primary hover:bg-primary/90 disabled:bg-secondary-200 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Tiếp tục <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-text-main">Chọn Phương Thức Gửi Hàng</h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border-2 border-primary p-6 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Truck className="size-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-text-main mb-1">Đặt lịch lấy hàng tại nhà</h3>
                    <p className="text-sm text-text-muted">Shipper sẽ đến lấy hàng tại địa chỉ của bạn</p>
                    <span className="inline-block mt-2 text-xs bg-green-50 text-green-600 px-2 py-1 rounded">Miễn phí</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border p-6 cursor-pointer hover:border-primary transition-colors">
                <div className="flex items-start gap-4">
                  <div className="size-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                    <Package className="size-6 text-text-muted" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-text-main mb-1">Gửi tại bưu cục</h3>
                    <p className="text-sm text-text-muted">In nhãn và gửi tại bưu cục gần nhất</p>
                    <span className="inline-block mt-2 text-xs bg-green-50 text-green-600 px-2 py-1 rounded">Miễn phí</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex-1 py-4 bg-white border border-border text-text-main font-bold rounded-xl transition-colors"
              >
                Quay lại
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="flex-1 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Xác nhận <Check className="size-5" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center py-12">
            <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="size-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-text-main mb-2">Yêu Cầu Đã Được Gửi!</h2>
            <p className="text-text-muted mb-6 max-w-md mx-auto">
              Chúng tôi sẽ liên hệ bạn trong 24h để xác nhận. Hoàn tiền sẽ được xử lý trong 3-5 ngày làm việc.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/orders"
                className="px-6 py-3 bg-white border border-border text-text-main font-medium rounded-lg hover:bg-secondary-50 transition-colors"
              >
                Xem đơn hàng
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Về Dashboard
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
