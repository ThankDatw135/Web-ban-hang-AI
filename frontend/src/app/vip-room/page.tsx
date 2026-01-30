/**
 * VIP Room - Fashion AI
 * 
 * Phòng VIP:
 * - Personalized concierge
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
  Mail
} from 'lucide-react';
import { Header, Footer } from '@/components';

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
    id: '1',
    title: 'Personal Shopping Appointment',
    description: 'Đặt lịch mua sắm riêng với stylist tại showroom',
    available: true,
  },
  {
    id: '2',
    title: 'Home Try-On Service',
    description: 'Thử đồ tại nhà với gói 10 sản phẩm',
    available: true,
  },
  {
    id: '3',
    title: 'Wardrobe Audit',
    description: 'Đánh giá và tư vấn tủ đồ trực tiếp tại nhà',
    available: true,
  },
  {
    id: '4',
    title: 'Priority Alterations',
    description: 'Dịch vụ sửa đồ ưu tiên trong 24h',
    available: true,
  },
];

export default function VIPRoomPage() {
  const [memberSince] = useState('01/2023');
  const [totalSpent] = useState(45000000);
  const [tier] = useState('Platinum');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold tracking-wide mb-6">
                <Crown className="size-5" />
                Platinum Member
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
                Chào Mừng Đến <span className="text-primary">VIP Room</span>
              </h1>
              <p className="text-lg text-text-muted mb-8">
                Trải nghiệm dịch vụ cao cấp dành riêng cho bạn
              </p>
            </div>

            {/* Member Stats */}
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-border grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{tier}</p>
                <p className="text-sm text-text-muted">Hạng thành viên</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-3xl font-bold text-text-main">{memberSince}</p>
                <p className="text-sm text-text-muted">Thành viên từ</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">{formatPrice(totalSpent)}</p>
                <p className="text-sm text-text-muted">Tổng mua sắm</p>
              </div>
            </div>
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

        {/* VIP Services */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-bold text-text-main mb-8 text-center">Dịch Vụ Đặc Quyền</h2>
            <div className="space-y-4">
              {vipServices.map((service) => (
                <div 
                  key={service.id}
                  className="flex items-center justify-between p-6 bg-cream rounded-2xl border border-border hover:border-primary transition-colors"
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
                  <button className="px-5 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg flex items-center gap-2 transition-colors">
                    Đặt lịch
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

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
