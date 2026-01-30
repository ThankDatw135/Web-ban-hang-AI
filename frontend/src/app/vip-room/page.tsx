/**
 * VIP Room - Fashion AI
 * 
 * Phòng VIP với API integration:
 * - Personal concierge
 * - Exclusive services
 * - Priority benefits
 * - VIP perks
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Crown, 
  Sparkles, 
  Gift, 
  Truck,
  Calendar,
  MessageCircle,
  Star,
  ShieldCheck,
  Gem,
  ChevronRight,
  Phone,
  Mail,
  Loader2,
  Check,
  Clock
} from 'lucide-react';
import { Header, Footer } from '@/components';
import { 
  useVIPProfile, 
  useVIPTiers, 
  useVIPRewards, 
  useVIPActivity,
  useRedeemReward,
  useBookVIPService,
  type VIPReward
} from '@/hooks/useVIP';
import { toastSuccess, toastError } from '@/stores';

// VIP Benefits
const vipBenefits = [
  {
    icon: Truck,
    title: 'Giao Hàng Ưu Tiên',
    description: 'Miễn phí giao hàng nhanh trong 24h cho tất cả đơn hàng',
    color: 'text-blue-500 bg-blue-50',
  },
  {
    icon: Gift,
    title: 'Quà Sinh Nhật',
    description: 'Voucher 500K và quà tặng độc quyền trong tháng sinh nhật',
    color: 'text-pink-500 bg-pink-50',
  },
  {
    icon: Calendar,
    title: 'Early Access',
    description: 'Truy cập sớm 48h trước các bộ sưu tập và flash sale',
    color: 'text-purple-500 bg-purple-50',
  },
  {
    icon: MessageCircle,
    title: 'Personal Concierge',
    description: 'Đường dây nóng riêng với thời gian chờ 0',
    color: 'text-green-500 bg-green-50',
  },
  {
    icon: Sparkles,
    title: 'AI Stylist Premium',
    description: 'Tư vấn phong cách 1-1 với AI stylist nâng cao',
    color: 'text-amber-500 bg-amber-50',
  },
  {
    icon: ShieldCheck,
    title: 'Đổi Trả VIP',
    description: '30 ngày đổi trả miễn phí, lấy hàng tận nơi',
    color: 'text-cyan-500 bg-cyan-50',
  },
];

// VIP Services
const vipServices = [
  {
    id: 'personal-shopping',
    title: 'Personal Shopping Appointment',
    description: 'Đặt lịch mua sắm riêng với stylist tại showroom',
  },
  {
    id: 'home-tryon',
    title: 'Home Try-On Service',
    description: 'Thử đồ tại nhà với gói 10 sản phẩm',
  },
  {
    id: 'wardrobe-audit',
    title: 'Wardrobe Audit',
    description: 'Đánh giá và tư vấn tủ đồ trực tiếp tại nhà',
  },
  {
    id: 'priority-alterations',
    title: 'Priority Alterations',
    description: 'Dịch vụ sửa đồ ưu tiên trong 24h',
  },
];

const tierColors: Record<string, string> = {
  Platinum: 'from-purple-500 to-purple-600',
  Gold: 'from-amber-500 to-amber-600',
  Silver: 'from-gray-400 to-gray-500',
  Bronze: 'from-orange-400 to-orange-500',
};

export default function VIPRoomPage() {
  const [selectedReward, setSelectedReward] = useState<VIPReward | null>(null);
  const [bookingService, setBookingService] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState('');

  const { data: profile, isLoading: profileLoading } = useVIPProfile();
  const { data: rewards } = useVIPRewards();
  const { data: activities } = useVIPActivity(5);
  const redeemReward = useRedeemReward();
  const bookService = useBookVIPService();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleRedeem = async (reward: VIPReward) => {
    if (!profile || profile.points < reward.pointsCost) {
      toastError('Lỗi', 'Không đủ điểm để đổi thưởng này');
      return;
    }
    
    try {
      await redeemReward.mutateAsync(reward.id);
      toastSuccess('Thành công', `Đã đổi ${reward.name}!`);
      setSelectedReward(null);
    } catch {
      toastError('Lỗi', 'Không thể đổi thưởng');
    }
  };

  const handleBookService = async (serviceId: string) => {
    if (!bookingDate) {
      toastError('Lỗi', 'Vui lòng chọn ngày');
      return;
    }

    try {
      await bookService.mutateAsync({ serviceId, date: bookingDate });
      toastSuccess('Thành công', 'Đã đặt lịch! Chúng tôi sẽ liên hệ xác nhận.');
      setBookingService(null);
      setBookingDate('');
    } catch {
      toastError('Lỗi', 'Không thể đặt lịch');
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  // Non-VIP user
  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <Crown className="size-16 text-amber-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-text-main mb-4">Tham Gia VIP Club</h1>
            <p className="text-text-muted mb-6">
              Mua sắm nhiều hơn để nhận ưu đãi độc quyền. Chi tiêu từ 5.000.000₫ để trở thành thành viên Bronze!
            </p>
            <Link 
              href="/shop"
              className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Khám Phá Cửa Hàng
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-primary/10 to-purple-500/20" />
          <div className="absolute -right-40 top-0 size-80 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute -left-20 bottom-0 size-60 bg-purple-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${tierColors[profile.tier]} text-white text-sm font-bold tracking-wide mb-6`}>
                <Crown className="size-5" />
                {profile.tier} Member
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
                Chào Mừng Đến <span className="text-primary">VIP Room</span>
              </h1>
              <p className="text-lg text-text-muted mb-8">
                Trải nghiệm dịch vụ cao cấp dành riêng cho bạn
              </p>
            </div>

            {/* Member Stats */}
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-border grid grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{profile.tier}</p>
                <p className="text-sm text-text-muted">Hạng thành viên</p>
              </div>
              <div className="text-center border-l border-border">
                <p className="text-3xl font-bold text-accent">{profile.points.toLocaleString()}</p>
                <p className="text-sm text-text-muted">Điểm tích lũy</p>
              </div>
              <div className="text-center border-l border-border">
                <p className="text-3xl font-bold text-text-main">{formatDate(profile.memberSince)}</p>
                <p className="text-sm text-text-muted">Thành viên từ</p>
              </div>
              <div className="text-center border-l border-border">
                <p className="text-3xl font-bold text-green-600">{formatPrice(profile.totalSpent)}</p>
                <p className="text-sm text-text-muted">Tổng mua sắm</p>
              </div>
            </div>

            {/* Progress to next tier */}
            {profile.nextTier && profile.pointsToNextTier && (
              <div className="max-w-md mx-auto mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted">Đến hạng {profile.nextTier}</span>
                  <span className="font-medium text-primary">{profile.pointsToNextTier.toLocaleString()} điểm nữa</span>
                </div>
                <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                    style={{ width: `${Math.min(100, (profile.points / (profile.points + profile.pointsToNextTier)) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* VIP Benefits */}
        <section className="py-16 max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl font-bold text-text-main mb-8 text-center">Quyền Lợi VIP</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vipBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow">
                  <div className={`size-12 rounded-xl ${benefit.color} flex items-center justify-center mb-4`}>
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-bold text-text-main mb-2">{benefit.title}</h3>
                  <p className="text-sm text-text-muted">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Rewards Section */}
        {rewards && rewards.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <h2 className="text-2xl font-bold text-text-main mb-8 text-center">Đổi Thưởng</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.filter(r => r.available).map((reward) => (
                  <div key={reward.id} className="bg-cream rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        reward.type === 'voucher' ? 'bg-green-100 text-green-600' :
                        reward.type === 'gift' ? 'bg-pink-100 text-pink-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {reward.type === 'voucher' ? 'Voucher' : reward.type === 'gift' ? 'Quà tặng' : 'Dịch vụ'}
                      </span>
                      <span className="text-lg font-bold text-accent">{reward.pointsCost.toLocaleString()} điểm</span>
                    </div>
                    <h3 className="font-bold text-text-main mb-2">{reward.name}</h3>
                    <p className="text-sm text-text-muted mb-4">{reward.description}</p>
                    <button 
                      onClick={() => handleRedeem(reward)}
                      disabled={redeemReward.isPending || (profile && profile.points < reward.pointsCost)}
                      className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                    >
                      {redeemReward.isPending ? <Loader2 className="size-4 animate-spin" /> : <Gift className="size-4" />}
                      {profile && profile.points >= reward.pointsCost ? 'Đổi Ngay' : 'Không đủ điểm'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* VIP Services */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-bold text-text-main mb-8 text-center">Dịch Vụ Đặc Quyền</h2>
            <div className="space-y-4">
              {vipServices.map((service) => (
                <div 
                  key={service.id}
                  className="bg-white flex items-center justify-between p-6 rounded-2xl border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Gem className="size-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-main">{service.title}</h3>
                      <p className="text-sm text-text-muted">{service.description}</p>
                    </div>
                  </div>
                  {bookingService === service.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <button 
                        onClick={() => handleBookService(service.id)}
                        disabled={bookService.isPending}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
                      >
                        {bookService.isPending ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                      </button>
                      <button 
                        onClick={() => setBookingService(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg"
                      >
                        Hủy
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setBookingService(service.id)}
                      className="px-5 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
                    >
                      Đặt lịch
                      <ChevronRight className="size-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        {activities && activities.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
              <h2 className="text-2xl font-bold text-text-main mb-6">Hoạt Động Gần Đây</h2>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-cream rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-lg flex items-center justify-center ${
                        activity.type === 'points_earned' ? 'bg-green-100 text-green-600' :
                        activity.type === 'tier_upgrade' ? 'bg-purple-100 text-purple-600' :
                        'bg-amber-100 text-amber-600'
                      }`}>
                        {activity.type === 'points_earned' ? <Star className="size-5" /> :
                         activity.type === 'tier_upgrade' ? <Crown className="size-5" /> :
                         <Gift className="size-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-text-main">{activity.description}</p>
                        <p className="text-xs text-text-muted flex items-center gap-1">
                          <Clock className="size-3" />
                          {formatDate(activity.createdAt)}
                        </p>
                      </div>
                    </div>
                    {activity.points && (
                      <span className={`font-bold ${activity.points > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {activity.points > 0 ? '+' : ''}{activity.points.toLocaleString()} điểm
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* VIP Concierge */}
        <section className="py-16 max-w-5xl mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute -right-10 -top-10 size-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -left-10 -bottom-10 size-40 bg-white/10 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="size-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
                <Crown className="size-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">VIP Concierge</h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                Đội ngũ concierge riêng sẵn sàng hỗ trợ bạn mọi lúc. 
                Liên hệ trực tiếp qua hotline VIP hoặc email.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a
                  href="tel:19009999"
                  className="px-6 py-3 bg-white text-primary font-bold rounded-xl flex items-center gap-2 hover:bg-white/90 transition-colors"
                >
                  <Phone className="size-5" />
                  1900 9999 (VIP Line)
                </a>
                <a
                  href="mailto:vip@fashionai.vn"
                  className="px-6 py-3 bg-white/20 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-white/30 transition-colors"
                >
                  <Mail className="size-5" />
                  vip@fashionai.vn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
