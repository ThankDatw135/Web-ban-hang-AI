/**
 * Fashion AI - About Page
 * 
 * Giới thiệu về Fashion AI
 */

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main className="flex-1 bg-cream">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-b from-primary/10 to-cream">
          <div className="container-app text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Về Fashion AI</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chúng tôi kết hợp thời trang cao cấp với công nghệ AI tiên tiến để mang đến trải nghiệm mua sắm độc đáo.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="container-app">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Câu chuyện của chúng tôi</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Fashion AI được thành lập với sứ mệnh thay đổi cách bạn trải nghiệm thời trang. 
                    Chúng tôi tin rằng mọi người đều xứng đáng được mặc đẹp mà không cần phải lo lắng 
                    về kích cỡ hay phong cách.
                  </p>
                  <p>
                    Với công nghệ Virtual Try-on, bạn có thể thử bất kỳ trang phục nào ngay tại nhà. 
                    AI Stylist của chúng tôi sẽ gợi ý những outfit hoàn hảo dựa trên phong cách và 
                    sở thích của bạn.
                  </p>
                </div>
              </div>
              <div 
                className="aspect-square rounded-3xl bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800)' }}
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="container-app">
            <h2 className="text-3xl font-bold text-center mb-12">Giá trị cốt lõi</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: 'auto_awesome', title: 'Đổi mới', desc: 'Luôn tiên phong trong ứng dụng AI vào thời trang' },
                { icon: 'verified', title: 'Chất lượng', desc: 'Chỉ cung cấp sản phẩm từ các thương hiệu uy tín' },
                { icon: 'favorite', title: 'Tận tâm', desc: 'Đặt trải nghiệm khách hàng lên hàng đầu' },
              ].map((value) => (
                <div key={value.title} className="text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-3xl text-primary">{value.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container-app text-center">
            <h2 className="text-3xl font-bold mb-4">Sẵn sàng trải nghiệm?</h2>
            <p className="text-gray-600 mb-8">Khám phá bộ sưu tập và thử đồ với AI ngay hôm nay</p>
            <div className="flex justify-center gap-4">
              <Link href="/products">
                <button className="px-8 h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90">
                  Xem sản phẩm
                </button>
              </Link>
              <Link href="/ai-studio">
                <button className="px-8 h-12 rounded-full bg-accent text-white font-bold hover:bg-accent/90 flex items-center gap-2">
                  <span className="material-symbols-outlined">view_in_ar</span>
                  Thử đồ AI
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
