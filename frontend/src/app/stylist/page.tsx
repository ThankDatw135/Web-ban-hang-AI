/**
 * Fashion AI Personal Stylist & Care - Fashion AI
 * 
 * Dịch vụ stylist cá nhân:
 * - Book appointment with AI/human stylist
 * - Style consultation preview
 * - Care tips
 * - VIP services
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  Video,
  MessageCircle,
  Star,
  ChevronRight,
  Shirt,
  Gem,
  Crown,
  CheckCircle
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Stylist services
const services = [
  {
    id: 'ai-instant',
    title: 'AI Stylist Instant',
    description: 'Chat trực tiếp với AI Stylist để nhận gợi ý outfit ngay lập tức',
    icon: Sparkles,
    price: 'Miễn phí',
    features: ['Tư vấn 24/7', 'Gợi ý outfit', 'AI Try-On'],
    color: 'from-accent to-purple-500',
    popular: true,
  },
  {
    id: 'video-consult',
    title: 'Video Consultation',
    description: 'Tư vấn 1-1 với stylist chuyên nghiệp qua video call',
    icon: Video,
    price: '500.000₫',
    duration: '30 phút',
    features: ['Stylist chuyên nghiệp', 'Phân tích tủ đồ', 'Lên outfit hoàn chỉnh'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'vip-package',
    title: 'VIP Styling Package',
    description: 'Dịch vụ styling cao cấp với personal shopper riêng',
    icon: Crown,
    price: '2.000.000₫',
    duration: '3 tháng',
    features: ['Personal shopper', 'Tư vấn không giới hạn', 'Early access BST mới', 'Giảm giá độc quyền'],
    color: 'from-amber-500 to-orange-500',
  },
];

// Stylist team
const stylists = [
  {
    id: '1',
    name: 'Minh Anh',
    specialty: 'Minimalist & Korean Style',
    experience: '8 năm',
    rating: 4.9,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
  },
  {
    id: '2',
    name: 'Thanh Hằng',
    specialty: 'Luxury & Evening Wear',
    experience: '12 năm',
    rating: 5.0,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
  },
  {
    id: '3',
    name: 'Hoàng Nam',
    specialty: 'Streetwear & Casual',
    experience: '6 năm',
    rating: 4.8,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  },
];

// Care tips
const careTips = [
  {
    id: '1',
    title: 'Bảo quản đồ lụa',
    description: 'Giặt tay với nước lạnh, phơi trong bóng râm',
    icon: '🧵',
  },
  {
    id: '2',
    title: 'Chăm sóc da thuộc',
    description: 'Dùng kem dưỡng chuyên dụng, tránh nước',
    icon: '👜',
  },
  {
    id: '3',
    title: 'Bảo quản len cashmere',
    description: 'Gấp gọn, không treo, để túi chống ẩm',
    icon: '🧶',
  },
];

export default function StylistPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold tracking-wide mb-4">
            <Gem className="size-5" />
            Personal Styling
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            AI Stylist & Chăm Sóc
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Nâng tầm phong cách với dịch vụ styling cá nhân hóa từ AI và stylist chuyên nghiệp
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`relative bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-xl ${
                  service.popular ? 'border-accent' : 'border-border'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full">
                    Phổ biến
                  </div>
                )}
                <div className={`size-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                  <Icon className="size-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-main mb-2">{service.title}</h3>
                <p className="text-sm text-text-muted mb-4">{service.description}</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                  {service.duration && (
                    <span className="text-sm text-text-muted">/ {service.duration}</span>
                  )}
                </div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-text-muted">
                      <CheckCircle className="size-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 font-bold rounded-xl transition-colors ${
                  service.popular 
                    ? 'bg-accent hover:bg-accent/90 text-white' 
                    : 'bg-primary hover:bg-primary/90 text-white'
                }`}>
                  {service.id === 'ai-instant' ? 'Chat Ngay' : 'Đặt Lịch'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Our Stylists */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-main mb-6">Đội Ngũ Stylist</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stylists.map((stylist) => (
              <div
                key={stylist.id}
                className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={stylist.image}
                    alt={stylist.name}
                    className="size-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-text-main">{stylist.name}</h3>
                    <p className="text-sm text-text-muted">{stylist.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="size-4" />
                    {stylist.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="size-4 text-amber-500 fill-amber-500" />
                    {stylist.rating} ({stylist.reviews})
                  </span>
                </div>
                <button className="w-full py-2 bg-secondary-50 hover:bg-secondary-100 text-text-main font-medium rounded-lg transition-colors">
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Care Tips */}
        <section className="bg-white rounded-2xl border border-border p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-main flex items-center gap-2">
              <Shirt className="size-6 text-primary" />
              Tips Chăm Sóc Trang Phục
            </h2>
            <Link href="/magazine/care-guides" className="text-primary text-sm font-medium flex items-center gap-1">
              Xem tất cả <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {careTips.map((tip) => (
              <div
                key={tip.id}
                className="p-4 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors cursor-pointer"
              >
                <span className="text-3xl mb-3 block">{tip.icon}</span>
                <h3 className="font-bold text-text-main mb-1">{tip.title}</h3>
                <p className="text-sm text-text-muted">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
