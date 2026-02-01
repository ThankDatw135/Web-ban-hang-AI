/**
 * Fashion AI - My Coupons Page
 * 
 * Quản lý mã giảm giá của người dùng
 */

'use client';

import { useState } from 'react';
import { cn, formatCurrency } from '@/lib/utils';
import { useMyCoupons, useApplyCoupon } from '@/hooks/use-coupons';
import { Truck, Tag, Copy, Check, Loader2, Sparkles } from 'lucide-react';
import type { UserCoupon, CouponStatus } from '@/types/api';

const tabs = [
  { key: 'available' as const, label: 'Sẵn sàng dùng' },
  { key: 'used' as const, label: 'Đã dùng' },
  { key: 'expired' as const, label: 'Hết hạn' },
];

export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState<CouponStatus>('available');
  const [promoCode, setPromoCode] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // API hooks
  const { data: apiCoupons, isLoading, error } = useMyCoupons();
  const applyCouponMutation = useApplyCoupon();

  // Use API data only - no mock fallback
  const coupons = apiCoupons || [];
  const filteredCoupons = coupons.filter(c => c.status === activeTab);
  const availableCount = coupons.filter(c => c.status === 'available').length;

  const handleCopyCode = (coupon: UserCoupon) => {
    navigator.clipboard.writeText(coupon.code);
    setCopiedId(coupon.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getDiscountDisplay = (coupon: UserCoupon): { value?: string; label: string; icon?: React.ElementType } => {
    switch (coupon.type) {
      case 'PERCENTAGE':
        return { value: `${coupon.value}%`, label: 'GIẢM GIÁ' };
      case 'FIXED_AMOUNT':
        return { value: `${coupon.value / 1000}k`, label: 'VND OFF' };
      case 'FREE_SHIPPING':
        return { icon: Truck, label: 'Miễn phí' };
    }
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    applyCouponMutation.mutate(promoCode, {
      onSuccess: () => {
        setPromoCode('');
        alert('Áp dụng mã thành công!');
      },
      onError: () => {
        alert('Mã không hợp lệ hoặc đã hết hạn.');
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-text-main dark:text-white">
          Mã giảm giá của tôi
        </h1>
        <p className="text-secondary mt-2">
          Quản lý và sử dụng các ưu đãi đặc quyền dành riêng cho bạn từ Fashion AI
        </p>
      </div>

      {/* Promo Code Input */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-sm border border-border dark:border-[#333]">
        <div className="flex flex-col md:flex-row items-end gap-4">
          <label className="flex flex-col flex-1">
            <p className="text-text-main dark:text-white text-sm font-bold uppercase tracking-wider pb-2">
              Nhập mã khuyến mãi
            </p>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              className="w-full h-14 px-4 rounded-lg text-text-main dark:text-white border border-primary/30 bg-cream dark:bg-[#252525] placeholder:text-secondary focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-base font-medium"
              placeholder="Ví dụ: FASHIONAI2024"
            />
          </label>
          <button
            onClick={handleApplyPromo}
            disabled={applyCouponMutation.isPending}
            className="min-w-[140px] h-14 px-6 bg-primary text-text-main text-base font-bold uppercase tracking-widest rounded-lg hover:bg-primary-600 transition-all disabled:opacity-50"
          >
            {applyCouponMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Áp dụng'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border dark:border-[#333]">
        <div className="flex gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'pb-3 pt-4 text-sm font-bold tracking-wide border-b-[3px] transition-colors whitespace-nowrap',
                activeTab === tab.key
                  ? 'text-text-main dark:text-white border-primary'
                  : 'text-secondary border-transparent hover:text-primary'
              )}
            >
              {tab.label}
              {tab.key === 'available' && ` (${availableCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* Voucher Grid */}
      {filteredCoupons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCoupons.map((coupon) => {
            const discount = getDiscountDisplay(coupon);
            const isAvailable = coupon.status === 'available';
            const IconComponent = discount.icon;
            
            return (
              <div
                key={coupon.id}
                className={cn(
                  'relative flex border-2 border-dashed rounded-xl overflow-hidden shadow-sm transition-shadow',
                  isAvailable 
                    ? 'border-primary/40 bg-white dark:bg-[#252525] hover:shadow-md' 
                    : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1a1a1a] opacity-60'
                )}
              >
                {/* Discount Badge Side */}
                <div className={cn(
                  'flex-none w-28 flex flex-col items-center justify-center border-r-2 border-dashed px-4',
                  isAvailable 
                    ? 'bg-primary/10 dark:bg-primary/20 border-primary/20' 
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-300'
                )}>
                  {IconComponent ? (
                    <IconComponent className={cn('w-10 h-10', isAvailable ? 'text-primary' : 'text-gray-400')} />
                  ) : (
                    <span className={cn('text-2xl font-black', isAvailable ? 'text-primary' : 'text-gray-400')}>
                      {discount.value}
                    </span>
                  )}
                  <span className={cn(
                    'text-[10px] font-bold uppercase mt-1',
                    isAvailable ? 'text-primary/70' : 'text-gray-400'
                  )}>
                    {discount.label}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-text-main dark:text-white font-bold text-lg leading-tight mb-1">
                      {coupon.name}
                    </h3>
                    <p className="text-secondary text-xs">{coupon.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div className="text-secondary text-[11px]">
                      <p>HSD: {new Date(coupon.endDate).toLocaleDateString('vi-VN')}</p>
                      {coupon.minOrderValue && (
                        <p className="mt-0.5">Đơn tối thiểu: {formatCurrency(coupon.minOrderValue)}</p>
                      )}
                    </div>
                    
                    {isAvailable ? (
                      <button
                        onClick={() => handleCopyCode(coupon)}
                        className="bg-primary text-text-main px-4 py-2 rounded-lg text-sm font-bold hover:scale-105 transition-transform flex items-center gap-2"
                      >
                        {copiedId === coupon.id ? (
                          <>
                            <Check className="w-4 h-4" />
                            Đã copy
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            {coupon.code}
                          </>
                        )}
                      </button>
                    ) : (
                      <span className="text-secondary text-xs">
                        {coupon.status === 'used' ? 'Đã sử dụng' : 'Hết hạn'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <Tag className="w-16 h-16 text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
            Không có mã giảm giá
          </h3>
          <p className="text-secondary">
            {activeTab === 'available' 
              ? 'Bạn chưa có mã giảm giá nào. Hãy nhập mã khuyến mãi ở trên!'
              : activeTab === 'used'
                ? 'Bạn chưa sử dụng mã giảm giá nào.'
                : 'Không có mã giảm giá hết hạn.'
            }
          </p>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="mt-16 bg-text-main dark:bg-primary/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md text-center md:text-left">
          <h2 className="text-white text-2xl font-bold mb-2">Bạn cần thêm ưu đãi?</h2>
          <p className="text-gray-400">
            Tham gia chương trình Fashion AI Insider để nhận những mã giảm giá đặc biệt qua email hàng tháng.
          </p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <input
            type="email"
            className="rounded-lg bg-white/10 border-white/20 text-white placeholder:text-gray-500 flex-1 md:w-64 focus:ring-primary focus:border-primary px-4 py-2"
            placeholder="Email của bạn"
          />
          <button className="bg-primary text-text-main px-6 py-2 rounded-lg font-bold hover:bg-primary-600 transition-colors">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}
