/**
 * About Us - Fashion AI
 * 
 * Giới thiệu thương hiệu:
 * - Hero banner
 * - Brand story
 * - Mission & Vision
 * - Team section
 * - Stats
 */

'use client';

import Link from 'next/link';
import { 
  Sparkles, 
  Heart, 
  Leaf, 
  Globe,
  Award,
  Users,
  ShoppingBag,
  Star
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Brand values
const values = [
  {
    icon: Sparkles,
    title: 'AI-Powered Fashion',
    description: 'Công nghệ AI tiên tiến giúp bạn tìm kiếm phong cách hoàn hảo',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Khách hàng là trung tâm của mọi quyết định chúng tôi đưa ra',
  },
  {
    icon: Leaf,
    title: 'Sustainable Fashion',
    description: 'Cam kết với thời trang bền vững và thân thiện môi trường',
  },
  {
    icon: Globe,
    title: 'Global Standards',
    description: 'Tiêu chuẩn quốc tế trong thiết kế và chất lượng sản phẩm',
  },
];

// Stats
const stats = [
  { value: '500K+', label: 'Khách hàng hài lòng' },
  { value: '50+', label: 'Thương hiệu đối tác' },
  { value: '10K+', label: 'Sản phẩm' },
  { value: '98%', label: 'AI Accuracy' },
];

// Team members
const team = [
  {
    name: 'Nguyễn Minh Anh',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
  },
  {
    name: 'Trần Hoàng Nam',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
  },
  {
    name: 'Lê Thanh Hằng',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300',
  },
  {
    name: 'Phạm Đức Trí',
    role: 'Head of AI',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10" />
          <div className="absolute -right-40 top-20 size-80 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute -left-20 bottom-10 size-60 bg-primary/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-5xl mx-auto px-4 md:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-border text-sm font-bold text-primary mb-6">
              <Sparkles className="size-4" />
              Về Fashion AI
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-main mb-6 leading-tight">
              Nơi Công Nghệ Gặp Gỡ <br />
              <span className="text-primary">Phong Cách</span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
              Fashion AI là nền tảng thời trang thông minh, kết hợp trí tuệ nhân tạo 
              với thời trang cao cấp để mang đến trải nghiệm mua sắm cá nhân hóa hoàn hảo.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-border bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-20 max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-main mb-6">Câu Chuyện Của Chúng Tôi</h2>
              <div className="space-y-4 text-text-muted">
                <p>
                  Fashion AI được thành lập năm 2020 với một sứ mệnh đơn giản: làm cho thời trang 
                  trở nên dễ tiếp cận và cá nhân hóa hơn cho mọi người.
                </p>
                <p>
                  Chúng tôi tin rằng mỗi người đều xứng đáng có phong cách riêng của mình, 
                  và công nghệ AI có thể giúp bạn khám phá điều đó một cách dễ dàng hơn bao giờ hết.
                </p>
                <p>
                  Từ một startup nhỏ, hôm nay Fashion AI đã phục vụ hơn 500,000 khách hàng 
                  với tỷ lệ hài lòng 98%.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                alt="Fashion AI Office"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-2">
                  <Award className="size-8 text-primary" />
                  <div>
                    <p className="font-bold text-text-main">Best AI Fashion</p>
                    <p className="text-xs text-text-muted">Vietnam Tech Awards 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-text-main text-center mb-12">Giá Trị Cốt Lõi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-cream border border-border text-center">
                    <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="size-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-text-main mb-2">{value.title}</h3>
                    <p className="text-sm text-text-muted">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-text-main text-center mb-4">Đội Ngũ Lãnh Đạo</h2>
          <p className="text-text-muted text-center mb-12 max-w-xl mx-auto">
            Những người đứng sau thành công của Fashion AI
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="size-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
                />
                <h3 className="font-bold text-text-main">{member.name}</h3>
                <p className="text-sm text-text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white text-center">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold mb-4">Sẵn Sàng Khám Phá?</h2>
            <p className="text-white/80 mb-8">
              Trải nghiệm mua sắm thời trang thông minh với Fashion AI ngay hôm nay
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-colors"
            >
              <ShoppingBag className="size-5" />
              Shop Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
