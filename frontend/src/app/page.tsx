import Link from 'next/link';
import { ShoppingBag, Sparkles, Shirt, MessageSquare } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gradient">
              Fashion AI
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/products" className="text-gray-600 hover:text-primary-600">
                Sản phẩm
              </Link>
              <Link href="/try-on" className="text-gray-600 hover:text-primary-600">
                Thử đồ ảo
              </Link>
              <Link href="/size-guide" className="text-gray-600 hover:text-primary-600">
                Gợi ý size
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative">
                <ShoppingBag className="h-6 w-6 text-gray-600" />
              </Link>
              <Link href="/login" className="btn btn-primary btn-md">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-24">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Thời Trang
              <span className="text-gradient"> Thông Minh</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-slide-up">
              Trải nghiệm mua sắm thời trang với công nghệ AI tiên tiến.
              Thử đồ ảo, gợi ý kích thước, hỗ trợ 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/products" className="btn btn-primary btn-lg">
                Khám phá ngay
              </Link>
              <Link href="/try-on" className="btn btn-outline btn-lg">
                Thử đồ ảo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tính Năng Nổi Bật
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shirt className="h-8 w-8" />}
              title="Thử Đồ Ảo"
              description="Xem trước sản phẩm trên chính bản thân bạn với công nghệ AI"
            />
            <FeatureCard
              icon={<Sparkles className="h-8 w-8" />}
              title="Gợi Ý Size"
              description="AI phân tích số đo và gợi ý kích thước phù hợp nhất"
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8" />}
              title="Hỗ Trợ 24/7"
              description="Trợ lý AI sẵn sàng giải đáp mọi thắc mắc của bạn"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Fashion AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="card p-8 text-center hover:shadow-lg transition-shadow">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
