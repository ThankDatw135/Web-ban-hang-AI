/**
 * Fashion AI - Homepage
 * 
 * Sections:
 * - Hero: AI-powered fashion tagline
 * - Featured Products: 4 sản phẩm nổi bật
 * - AI Try-On CTA
 * - Footer
 */

import Link from 'next/link';
import { Sparkles, ArrowRight, View } from 'lucide-react';
import { Header, Footer, ProductCard, AIChatWidget } from '@/components';

// Mock data - sau này sẽ fetch từ API
const featuredProducts = [
  {
    id: '1',
    slug: 'silk-slip-dress',
    name: 'The Silk Slip Dress',
    price: 5990000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    material: 'Lụa Ý cao cấp',
    isNew: true,
  },
  {
    id: '2',
    slug: 'cashmere-sweater',
    name: 'The Cashmere Sweater',
    price: 4390000,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
    material: '100% Cashmere',
  },
  {
    id: '3',
    slug: 'tailored-blazer',
    name: 'The Tailored Blazer',
    price: 7590000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    material: 'Merino Wool Blend',
  },
  {
    id: '4',
    slug: 'pleated-trousers',
    name: 'The Pleated Trousers',
    price: 3290000,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
    material: 'High-waisted fit',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container-custom py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-text-main">
                Redefining Luxury with{' '}
                <span className="text-gradient">Intelligence</span>
              </h1>

              <p className="text-lg text-text-muted md:max-w-lg mx-auto lg:mx-0">
                Trải nghiệm tương lai của thời trang. Thử đồ ảo trên bộ sưu tập mới nhất 
                với công nghệ AI tiên tiến của chúng tôi.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/try-on"
                  className="btn-accent btn-lg flex items-center gap-2"
                >
                  <View className="size-5" />
                  Thử đồ với AI
                </Link>
                <Link
                  href="/products"
                  className="btn-primary btn-lg"
                >
                  Khám phá BST
                </Link>
              </div>

              {/* Social Proof */}
              <div className="pt-8 flex items-center justify-center lg:justify-start gap-4 text-xs font-medium text-text-muted uppercase tracking-widest">
                <span>Featured In</span>
                <div className="h-px w-12 bg-primary/30" />
                <span>Vogue</span>
                <span>•</span>
                <span>Elle</span>
                <span>•</span>
                <span>Harper's Bazaar</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 lg:order-2 w-full relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-2xl transform rotate-3 group-hover:rotate-2 transition-transform duration-500" />
              
              <div className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-square bg-secondary-100 rounded-2xl overflow-hidden shadow-2xl">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800')`,
                  }}
                />

                {/* AI Analysis Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg flex items-center gap-4 animate-slide-up">
                  <div
                    className="size-12 rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1558171813-4c088753af8f?w=100')`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-accent mb-0.5">AI Analysis</p>
                    <p className="text-sm font-semibold truncate text-text-main">
                      Silk Blend • 98% Match
                    </p>
                  </div>
                  <div className="size-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Sparkles className="size-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="container-custom pt-10 pb-4">
          <div className="flex items-end justify-between border-b border-primary/20 pb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">
                Sản Phẩm Nổi Bật
              </h2>
              <p className="text-text-muted mt-1 text-sm">
                Bộ sưu tập được tuyển chọn cho phong cách hiện đại.
              </p>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1 text-sm font-bold text-primary hover:text-accent transition-colors"
            >
              Xem tất cả <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section className="container-custom pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Mobile View All */}
          <div className="mt-10 text-center sm:hidden">
            <Link href="/products" className="btn-outline btn-lg w-full">
              Xem tất cả sản phẩm
            </Link>
          </div>
        </section>

        {/* AI Try-On Banner */}
        <section className="bg-gradient-to-r from-accent/5 to-accent/10 py-16 md:py-24">
          <div className="container-custom text-center">
            <div className="badge-ai mx-auto mb-6">
              <Sparkles className="size-3" />
              Powered by AI
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
              Thử Đồ Ảo Với AI
            </h2>
            <p className="text-text-muted max-w-xl mx-auto mb-8">
              Upload ảnh của bạn, chọn sản phẩm yêu thích và xem ngay outfit trên cơ thể bạn. 
              Trải nghiệm mua sắm chưa từng có!
            </p>
            <Link href="/try-on" className="btn-accent btn-lg inline-flex items-center gap-2">
              <View className="size-5" />
              Bắt đầu thử đồ
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatWidget />
    </div>
  );
}
