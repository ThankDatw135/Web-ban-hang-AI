/**
 * Fashion AI - Homepage
 * 
 * Trang chủ với các sections:
 * - Hero Banner
 * - Featured Categories
 * - AI Try-On CTA
 * - Best Sellers
 * - New Arrivals
 * - Newsletter
 */

import { Diamond, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-cream to-accent/5" />
        
        {/* Decorative glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        
        {/* Content */}
        <div className="container-app relative z-10 text-center py-20">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            Powered by AI
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-slide-up">
            <span className="gradient-text">KHÁM PHÁ</span>
            <br />
            <span className="text-text-main dark:text-white">PHONG CÁCH CỦA RIÊNG BẠN</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 animate-slide-up">
            Trải nghiệm mua sắm thời trang cao cấp với công nghệ AI tiên tiến. 
            Thử đồ trực tuyến, nhận gợi ý phong cách cá nhân hóa.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link href="/products" className="btn-primary">
              <ShoppingBag className="w-5 h-5" />
              Mua sắm ngay
            </Link>
            <Link href="/ai-studio" className="btn-accent">
              <Sparkles className="w-5 h-5" />
              Thử đồ với AI
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white dark:bg-[#25221d]">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Danh mục nổi bật</h2>
            <p className="text-secondary">Khám phá bộ sưu tập đa dạng của chúng tôi</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Cards */}
            {[
              { name: 'Nữ', count: '200+ sản phẩm', image: '/logo.png' },
              { name: 'Nam', count: '150+ sản phẩm', image: '/logo.png' },
              { name: 'Phụ kiện', count: '80+ sản phẩm', image: '/logo.png' },
            ].map((category) => (
              <Link 
                key={category.name}
                href={`/products?category=${category.name.toLowerCase()}`}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#2c2822]"
              >
                {/* Image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Diamond className="w-20 h-20 text-primary/20" />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Try-On CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Purple glow background */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px]" />
        
        <div className="container-app relative z-10">
          <div className="bg-white/80 dark:bg-[#25221d]/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-accent/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left - Demo placeholder */}
              <div className="aspect-square rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-accent mx-auto mb-4 animate-pulse-slow" />
                  <p className="text-accent font-bold">AI Try-On Demo</p>
                </div>
              </div>
              
              {/* Right - Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-4">
                  <Sparkles className="w-3 h-3" />
                  Công nghệ AI
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Thử đồ trực tuyến với AI
                </h2>
                <p className="text-secondary mb-6">
                  Không cần đến cửa hàng, bạn vẫn có thể xem trước sản phẩm trên người mình. 
                  Công nghệ AI của Fashion AI giúp bạn tự tin lựa chọn outfit hoàn hảo.
                </p>
                <Link href="/ai-studio" className="btn-accent inline-flex">
                  Thử ngay
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary/5">
        <div className="container-app">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Đăng ký nhận ưu đãi</h2>
            <p className="text-secondary mb-8">
              Nhận ngay voucher giảm 10% cho đơn hàng đầu tiên và cập nhật xu hướng thời trang mới nhất.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 h-14 px-6 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#25221d] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
