/**
 * Fashion AI - Homepage Client Component
 * 
 * Client-side rendering cho trang chủ
 * Khớp với mockup design
 */

'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// Mock products data
const newCollectionProducts = [
  {
    id: '1',
    name: 'Silk Evening Dress',
    price: '$450',
    description: 'Lụa tơ tằm cao cấp',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800',
  },
  {
    id: '2',
    name: 'Linen Blazer',
    price: '$320',
    description: 'Thiết kế Minimalist',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
  },
  {
    id: '3',
    name: 'Signature Bag',
    price: '$890',
    description: 'Da thật 100%',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
  },
  {
    id: '4',
    name: 'Classic Pumps',
    price: '$150',
    description: 'Êm ái mỗi bước đi',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
  },
];

export default function HomePageClient() {
  return (
    <>
      <Header cartItemsCount={2} />
      
      <main className="flex-1">
        {/* ============================================
            Hero Section - Matching Mockup Design
           ============================================ */}
        <section className="relative w-full py-12 md:py-20 lg:py-24">
          <div className="container-app">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left - Content */}
              <div className="flex flex-col gap-6 flex-1 text-center lg:text-left items-center lg:items-start z-10">
                {/* Collection badge */}
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Bộ sưu tập Thu Đông 2024
                </span>

                {/* Heading */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                  Thời trang <br className="hidden lg:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#dcb77d]">
                    Tương lai
                  </span>
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-[540px] leading-relaxed">
                  Trải nghiệm mua sắm đẳng cấp với công nghệ AI. Khám phá phong cách độc bản dành riêng cho bạn.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                  <Link href="/ai-studio">
                    <button className="flex items-center justify-center gap-2 px-8 h-14 rounded-full bg-accent hover:bg-accent/90 text-white text-base font-bold shadow-lg shadow-accent/20 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto">
                      <span className="material-symbols-outlined">view_in_ar</span>
                      Thử đồ ngay với AI
                    </button>
                  </Link>
                  <Link href="/products">
                    <button className="flex items-center justify-center gap-2 px-8 h-14 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-white/5 text-base font-bold transition-all w-full sm:w-auto">
                      Khám phá bộ sưu tập
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right - Hero Image */}
              <div className="flex-1 w-full relative group">
                {/* Background blur effects */}
                <div className="absolute -top-10 -right-10 w-[80%] h-[80%] bg-primary/20 rounded-full blur-3xl opacity-50 dark:opacity-20 pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-[60%] h-[60%] bg-accent/20 rounded-full blur-3xl opacity-50 dark:opacity-20 pointer-events-none" />
                
                {/* Image container */}
                <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                  <div 
                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: 'url(https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200)',
                    }}
                  />
                  
                  {/* Featured card overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="bg-white/80 dark:bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Featured</p>
                        <p className="text-sm font-bold">Áo khoác Cashmere</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-sm cursor-pointer hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            Virtual Try-on Section
           ============================================ */}
        <section className="relative w-full py-16 bg-white dark:bg-[#25221d]">
          <div className="container-app">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Images Grid */}
              <div className="relative order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  {/* Column 1 */}
                  <div className="space-y-4 pt-12">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: 'url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600)',
                        }}
                      />
                    </div>
                    <div className="p-4 bg-cream dark:bg-[#1e1a14] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        </div>
                        <p className="text-sm font-bold">Size M phù hợp 98%</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Column 2 */}
                  <div className="space-y-4">
                    <div className="p-4 bg-cream dark:bg-[#1e1a14] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">magic_button</span>
                        </div>
                        <p className="text-sm font-bold">AI Processing...</p>
                      </div>
                    </div>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-lg relative">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: 'url(https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600)',
                        }}
                      />
                      <div className="absolute bottom-3 right-3 bg-accent text-white text-xs px-2 py-1 rounded-md font-bold">
                        Generated
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="flex flex-col gap-8 order-1 lg:order-2">
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl md:text-4xl font-black">
                    Phòng thử đồ ảo <br />
                    <span className="text-accent">Virtual Try-on</span>
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Không cần đến cửa hàng. Tải ảnh lên và xem trang phục trên người bạn chỉ trong vài giây. 
                    Công nghệ AI tiên tiến giúp bạn chọn size chuẩn xác và phối đồ hoàn hảo.
                  </p>
                </div>

                {/* Steps */}
                <div className="flex flex-col gap-4">
                  {[
                    { step: '1', icon: 'upload_file', title: 'Tải ảnh lên', desc: 'Chọn ảnh toàn thân rõ nét của bạn để AI phân tích.' },
                    { step: '2', icon: 'checkroom', title: 'Chọn trang phục', desc: 'Duyệt qua bộ sưu tập mới nhất và chọn món đồ yêu thích.' },
                    { step: '3', icon: 'auto_awesome', title: 'Xem kết quả', desc: 'AI sẽ ướm thử đồ lên người bạn ngay lập tức với độ chân thực cao.', isAccent: true },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 items-start">
                      <div className={cn(
                        "w-12 h-12 shrink-0 rounded-full border flex items-center justify-center",
                        item.isAccent 
                          ? "bg-cream dark:bg-[#1e1a14] border-gray-200 dark:border-gray-700 text-accent"
                          : "bg-cream dark:bg-[#1e1a14] border-gray-200 dark:border-gray-700 text-primary"
                      )}>
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{item.step}. {item.title}</h3>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/ai-studio">
                  <button className="w-fit flex items-center justify-center gap-2 px-6 h-12 rounded-full bg-accent text-white text-sm font-bold hover:bg-accent/90 transition-colors mt-4">
                    <span className="material-symbols-outlined text-[20px]">camera_alt</span>
                    Thử ngay bây giờ
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            New Collection Section
           ============================================ */}
        <section className="relative w-full pt-16 pb-6">
          <div className="container-app">
            <div className="flex items-end justify-between px-4 pb-3">
              <div>
                <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">New Season</span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">Bộ Sưu Tập Mới</h2>
              </div>
              <Link href="/products" className="hidden sm:flex items-center gap-1 text-sm font-bold hover:text-primary transition-colors">
                Xem tất cả <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Products Carousel */}
        <section className="relative w-full pb-16">
          <div className="container-app">
            <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory no-scrollbar">
              <div className="flex gap-6">
                {newCollectionProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="snap-start shrink-0 w-[280px] md:w-[320px] flex flex-col gap-4 rounded-2xl bg-white dark:bg-[#2c2822] shadow-sm hover:shadow-xl transition-shadow duration-300 group"
                  >
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-2xl">
                      <div 
                        className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${product.imageUrl})` }}
                      />
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>
                    <div className="flex flex-col flex-1 p-5 pt-2 gap-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <p className="text-lg font-bold leading-snug">{product.name}</p>
                          <p className="text-primary font-bold">{product.price}</p>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                      </div>
                      <Link href={`/products/${product.id}`}>
                        <button className="flex w-full cursor-pointer items-center justify-center rounded-full h-11 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors gap-2">
                          <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                          Mua ngay
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            AI Stylist Section
           ============================================ */}
        <section className="relative w-full py-16 lg:py-24 bg-[#1F2937] text-white overflow-hidden">
          {/* Background blurs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
          
          <div className="container-app relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              {/* Left - Content */}
              <div className="flex-1 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
                  <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                  AI Stylist
                </div>
                <h2 className="text-4xl md:text-5xl font-black leading-tight">
                  Bạn cần lời khuyên <br /> phối đồ?
                </h2>
                <p className="text-lg text-gray-300 max-w-[500px] mx-auto lg:mx-0">
                  Trợ lý AI của chúng tôi sẵn sàng 24/7 để tư vấn phong cách, gợi ý outfit cho sự kiện, 
                  hoặc giúp bạn tìm món đồ hoàn hảo.
                </p>
                <button className="flex items-center justify-center gap-2 px-8 h-12 rounded-full bg-white text-[#1F2937] text-base font-bold hover:bg-gray-100 transition-colors mx-auto lg:mx-0">
                  <span className="material-symbols-outlined">chat_bubble</span>
                  Chat với Stylist
                </button>
              </div>

              {/* Right - Chat Demo */}
              <div className="flex-1 w-full max-w-[480px]">
                <div className="bg-white text-[#1F2937] rounded-3xl p-6 shadow-2xl space-y-4">
                  {/* AI Message */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none">
                      <p className="text-sm">Xin chào! Tôi là AI Stylist của bạn. Bạn đang tìm trang phục cho dịp nào?</p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">person</span>
                    </div>
                    <div className="bg-primary/20 p-4 rounded-2xl rounded-tr-none">
                      <p className="text-sm">Tôi cần một bộ đồ cho tiệc tối cocktail, phong cách thanh lịch.</p>
                    </div>
                  </div>

                  {/* AI Response with product */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none">
                        <p className="text-sm">Tuyệt vời! Tôi gợi ý chiếc váy lụa Silk Evening Dress kết hợp với giày cao gót Classic Pumps.</p>
                      </div>
                      {/* Product suggestion card */}
                      <div className="flex gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100 items-center">
                        <div 
                          className="w-12 h-16 bg-gray-200 rounded-lg bg-cover bg-center"
                          style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=200)',
                          }}
                        />
                        <div className="flex-1">
                          <p className="text-xs font-bold">Silk Evening Dress</p>
                          <p className="text-xs text-primary font-bold">$450</p>
                        </div>
                        <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full">
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
