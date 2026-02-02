/**
 * Fashion AI - Trang Giới Thiệu
 * 
 * Giới thiệu về thương hiệu Fashion AI
 */

import { Diamond, Sparkles, Users, ShieldCheck, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description: 'Tìm hiểu về Fashion AI - Thương hiệu thời trang cao cấp kết hợp công nghệ AI tiên tiến.',
};

// Giá trị cốt lõi
const values = [
  {
    icon: Diamond,
    title: 'Chất lượng cao cấp',
    description: 'Sản phẩm được chọn lọc kỹ lưỡng, đảm bảo chất liệu và thiết kế đẳng cấp.',
  },
  {
    icon: Sparkles,
    title: 'Công nghệ AI',
    description: 'Ứng dụng AI tiên tiến giúp bạn thử đồ trực tuyến và nhận gợi ý phong cách.',
  },
  {
    icon: Users,
    title: 'Khách hàng là trọng tâm',
    description: 'Luôn lắng nghe và đặt trải nghiệm khách hàng lên hàng đầu.',
  },
  {
    icon: Truck,
    title: 'Giao hàng nhanh chóng',
    description: 'Giao hàng toàn quốc, đổi trả dễ dàng trong 30 ngày.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-cream to-accent/5">
        <div className="container-app text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
            <Diamond className="w-4 h-4" />
            Về chúng tôi
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="gradient-text">Fashion AI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto">
            Thương hiệu thời trang cao cấp tiên phong ứng dụng công nghệ AI 
            để mang đến trải nghiệm mua sắm hoàn hảo cho bạn.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white dark:bg-[#25221d]">
        <div className="container-app">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="aspect-square rounded-3xl bg-gray-100 dark:bg-[#2c2822] flex items-center justify-center">
              <Diamond className="w-24 h-24 text-primary/20" />
            </div>
            
            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Câu chuyện của chúng tôi</h2>
              <div className="space-y-4 text-secondary">
                <p>
                  Fashion AI được thành lập với sứ mệnh thay đổi cách mọi người mua sắm thời trang. 
                  Chúng tôi tin rằng công nghệ có thể giúp mỗi người tìm được phong cách của riêng mình 
                  một cách dễ dàng và thú vị hơn.
                </p>
                <p>
                  Với tính năng thử đồ AI độc đáo, bạn có thể xem trước sản phẩm trên chính mình 
                  mà không cần đến cửa hàng. Đội ngũ của chúng tôi không ngừng cải tiến công nghệ 
                  để mang đến trải nghiệm chân thực nhất.
                </p>
                <p>
                  Mỗi sản phẩm tại Fashion AI đều được chọn lọc kỹ lưỡng, đảm bảo chất lượng 
                  và phong cách đẳng cấp. Chúng tôi cam kết đồng hành cùng bạn trên hành trình 
                  khám phá và thể hiện cá tính riêng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Giá trị cốt lõi</h2>
            <p className="text-secondary max-w-xl mx-auto">
              Những nguyên tắc định hướng mọi hoạt động của chúng tôi
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div 
                key={value.title}
                className="card p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-secondary text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container-app text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sẵn sàng trải nghiệm?</h2>
          <p className="text-secondary mb-8 max-w-xl mx-auto">
            Khám phá bộ sưu tập mới nhất và thử đồ trực tuyến với công nghệ AI
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products" className="btn-primary">
              Xem sản phẩm
            </Link>
            <Link href="/ai-studio" className="btn-accent">
              <Sparkles className="w-5 h-5" />
              Thử AI Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
