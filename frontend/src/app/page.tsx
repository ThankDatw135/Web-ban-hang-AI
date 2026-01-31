/**
 * Fashion AI - Homepage
 * 
 * Design: stitch_trang_ch_fashion_ai/trang_chủ_fashion_ai
 * 
 * Sections:
 * - Hero: Collection badge + "Thời trang Tương lai" gradient text
 * - Virtual Try-On: Step-by-step guide
 * - New Collection: Product carousel
 * - AI Stylist: Chat demo section
 * - Footer
 */

'use client';

import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Header, Footer, ProductCard, AIChatWidget } from '@/components';
import { useFeaturedProducts, useNewArrivals, useFeaturedCollections } from '@/hooks/useHome';

export default function HomePage() {
  const { data: featuredProducts, isLoading: featuredLoading } = useFeaturedProducts(4);
  const { data: newArrivals, isLoading: arrivalsLoading } = useNewArrivals(4);
  const { data: collections, isLoading: collectionsLoading } = useFeaturedCollections(4);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-20 lg:py-24">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Hero Content */}
              <div className="flex flex-col gap-6 flex-1 text-center lg:text-left items-center lg:items-start z-10">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Bộ sưu tập Thu Đông 2024
                </span>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-secondary-800">
                  Thời trang <br className="hidden lg:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#dcb77d]">
                    Tương lai
                  </span>
                </h1>
                
                <p className="text-lg text-secondary-500 max-w-[540px] leading-relaxed">
                  Trải nghiệm mua sắm đẳng cấp với công nghệ AI. Khám phá phong cách độc bản dành riêng cho bạn.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                  <Link
                    href="/try-on"
                    className="flex items-center justify-center gap-2 px-8 h-14 rounded-full bg-accent hover:bg-accent/90 text-white text-base font-bold shadow-lg shadow-accent/20 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto"
                  >
                    <span className="material-symbols-outlined">view_in_ar</span>
                    Thử đồ ngay với AI
                  </Link>
                  <Link
                    href="/shop"
                    className="flex items-center justify-center gap-2 px-8 h-14 rounded-full border border-secondary-300 hover:bg-white text-secondary-800 text-base font-bold transition-all w-full sm:w-auto"
                  >
                    Khám phá bộ sưu tập
                  </Link>
                </div>
              </div>

              {/* Hero Image */}
              <div className="flex-1 w-full relative group">
                <div className="absolute -top-10 -right-10 w-[80%] h-[80%] bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-[60%] h-[60%] bg-accent/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                
                <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
                  <div 
                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800')` }}
                  />
                  
                  {/* Featured Product Card */}
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-secondary-500 uppercase tracking-wide">Featured</p>
                        <p className="text-sm font-bold text-secondary-800">Áo khoác Cashmere</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm cursor-pointer hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Virtual Try-On Section */}
        <section className="relative w-full py-16 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Demo Images */}
              <div className="relative order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-12">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary-100 shadow-lg">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400')` }}
                      />
                    </div>
                    <div className="p-4 bg-cream rounded-xl border border-secondary-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        </div>
                        <p className="text-sm font-bold">Size M phù hợp 98%</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-cream rounded-xl border border-secondary-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">magic_button</span>
                        </div>
                        <p className="text-sm font-bold">AI Processing...</p>
                      </div>
                    </div>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary-100 shadow-lg relative">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400')` }}
                      />
                      <div className="absolute bottom-3 right-3 bg-accent text-white text-xs px-2 py-1 rounded-md font-bold">
                        Generated
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-8 order-1 lg:order-2">
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl md:text-4xl font-black text-secondary-800">
                    Phòng thử đồ ảo <br />
                    <span className="text-accent">Virtual Try-on</span>
                  </h2>
                  <p className="text-lg text-secondary-500">
                    Không cần đến cửa hàng. Tải ảnh lên và xem trang phục trên người bạn chỉ trong vài giây. 
                    Công nghệ AI tiên tiến giúp bạn chọn size chuẩn xác và phối đồ hoàn hảo.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    { icon: 'upload_file', title: '1. Tải ảnh lên', desc: 'Chọn ảnh toàn thân rõ nét của bạn để AI phân tích.' },
                    { icon: 'checkroom', title: '2. Chọn trang phục', desc: 'Duyệt qua bộ sưu tập mới nhất và chọn món đồ yêu thích.' },
                    { icon: 'auto_awesome', title: '3. Xem kết quả', desc: 'AI sẽ ướm thử đồ lên người bạn ngay lập tức với độ chân thực cao.' },
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className={`w-12 h-12 shrink-0 rounded-full bg-cream border border-secondary-200 flex items-center justify-center ${idx === 2 ? 'text-accent' : 'text-primary'}`}>
                        <span className="material-symbols-outlined">{step.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-secondary-800">{step.title}</h3>
                        <p className="text-sm text-secondary-500">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/try-on"
                  className="w-fit flex items-center justify-center gap-2 px-6 h-12 rounded-full bg-accent text-white text-sm font-bold hover:bg-accent/90 transition-colors mt-4"
                >
                  <span className="material-symbols-outlined text-[20px]">camera_alt</span>
                  Thử ngay bây giờ
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* New Collection Section */}
        <section className="relative w-full pt-16 pb-6">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40">
            <div className="flex items-end justify-between px-4 pb-3">
              <div>
                <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">New Season</span>
                <h2 className="text-secondary-800 text-3xl md:text-4xl font-bold leading-tight">Bộ Sưu Tập Mới</h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex items-center gap-1 text-sm font-bold text-secondary-800 hover:text-primary transition-colors"
              >
                Xem tất cả <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative w-full pb-16">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40">
            {featuredLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide gap-6">
                {(featuredProducts || []).map((product) => (
                  <div key={product.id} className="snap-start shrink-0 w-[280px] md:w-[320px]">
                    <ProductCard 
                      id={product.id}
                      slug={product.slug}
                      name={product.name}
                      price={product.salePrice || product.price}
                      originalPrice={product.salePrice ? product.price : undefined}
                      image={product.images?.[0]?.url || product.image || ''}
                      isNew={product.isNew}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* AI Stylist Section */}
        <section className="relative w-full py-16 lg:py-24 bg-secondary-800 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              <div className="flex-1 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
                  <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                  AI Stylist
                </div>
                <h2 className="text-4xl md:text-5xl font-black leading-tight">
                  Bạn cần lời khuyên <br /> phối đồ?
                </h2>
                <p className="text-lg text-secondary-300 max-w-[500px] mx-auto lg:mx-0">
                  Trợ lý AI của chúng tôi sẵn sàng 24/7 để tư vấn phong cách, gợi ý outfit cho sự kiện, hoặc giúp bạn tìm món đồ hoàn hảo.
                </p>
                <Link
                  href="/ai-stylist"
                  className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-full bg-white text-secondary-800 text-base font-bold hover:bg-secondary-100 transition-colors mx-auto lg:mx-0"
                >
                  <span className="material-symbols-outlined">chat_bubble</span>
                  Chat với Stylist
                </Link>
              </div>

              {/* Chat Demo */}
              <div className="flex-1 w-full max-w-[480px]">
                <div className="bg-white text-secondary-800 rounded-3xl p-6 shadow-2xl space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                    </div>
                    <div className="bg-secondary-100 p-4 rounded-2xl rounded-tl-none">
                      <p className="text-sm">Xin chào! Tôi là AI Stylist của bạn. Bạn đang tìm trang phục cho dịp nào?</p>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-secondary-200 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">person</span>
                    </div>
                    <div className="bg-primary/20 p-4 rounded-2xl rounded-tr-none">
                      <p className="text-sm">Tôi cần một bộ đồ cho tiệc tối cocktail, phong cách thanh lịch.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-secondary-100 p-4 rounded-2xl rounded-tl-none">
                        <p className="text-sm">Tuyệt vời! Tôi gợi ý chiếc váy lụa Silk Evening Dress kết hợp với giày cao gót Classic Pumps.</p>
                      </div>
                      <div className="flex gap-3 bg-secondary-50 p-2 rounded-xl border border-secondary-100 items-center">
                        <div 
                          className="w-12 h-16 bg-secondary-200 rounded-lg bg-cover bg-center"
                          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100')` }}
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
      <AIChatWidget />
    </div>
  );
}
