/**
 * Shipping Info Page - Fashion AI
 * 
 * Thông tin vận chuyển cho khách hàng:
 * - Các vùng vận chuyển
 * - Phí và thời gian giao hàng
 * - Miễn phí vận chuyển threshold
 * - Đối tác vận chuyển
 */

import Link from 'next/link';
import { Truck, Clock, Globe, Gift, MapPin, Package, ChevronRight } from 'lucide-react';
import { Header, Footer } from '@/components';

// Shipping zones data
const shippingZones = [
  {
    name: 'Nội thành TP.HCM & Hà Nội',
    time: '1-2 ngày',
    cost: '30.000₫',
    freeAbove: '500.000₫',
    icon: <MapPin className="size-6" />,
  },
  {
    name: 'Các tỉnh thành khác',
    time: '3-5 ngày',
    cost: '45.000₫',
    freeAbove: '800.000₫',
    icon: <Truck className="size-6" />,
  },
  {
    name: 'Vùng sâu, vùng xa',
    time: '5-7 ngày',
    cost: '60.000₫',
    freeAbove: '1.000.000₫',
    icon: <Globe className="size-6" />,
  },
];

const carriers = [
  { name: 'GHN Express', logo: '🚚', status: 'active' },
  { name: 'GHTK', logo: '📦', status: 'active' },
  { name: 'J&T Express', logo: '🛵', status: 'active' },
  { name: 'Viettel Post', logo: '✈️', status: 'active' },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-text-main font-medium">Thông tin vận chuyển</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            Chính Sách Vận Chuyển
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Fashion AI cam kết giao hàng nhanh chóng, an toàn và chu đáo đến tận tay bạn.
          </p>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center gap-6">
          <div className="size-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
            <Gift className="size-8" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-xl font-bold text-text-main mb-1">
              🎁 Miễn Phí Vận Chuyển
            </h2>
            <p className="text-text-muted">
              Đơn hàng từ <span className="font-bold text-primary">500.000₫</span> trở lên 
              được miễn phí giao hàng nội thành TP.HCM & Hà Nội!
            </p>
          </div>
          <Link
            href="/shop"
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors"
          >
            Mua sắm ngay
          </Link>
        </div>

        {/* Shipping Zones */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
            <Globe className="size-6 text-primary" />
            Vùng Vận Chuyển
          </h2>
          <div className="grid gap-4">
            {shippingZones.map((zone) => (
              <div
                key={zone.name}
                className="bg-white rounded-xl border border-border p-6 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="size-12 bg-secondary-100 rounded-xl flex items-center justify-center text-primary">
                  {zone.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-text-main">{zone.name}</h3>
                  <p className="text-sm text-text-muted">
                    Miễn phí cho đơn từ {zone.freeAbove}
                  </p>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-text-muted" />
                    <span className="text-text-main font-medium">{zone.time}</span>
                  </div>
                  <div className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg">
                    {zone.cost}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Delivery Times */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
            <Clock className="size-6 text-primary" />
            Thời Gian Giao Hàng
          </h2>
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-text-main">
                    Phương thức
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-text-main">
                    Thời gian
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-text-main">
                    Phí
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">⚡</span>
                      <div>
                        <p className="font-medium text-text-main">Giao hỏa tốc</p>
                        <p className="text-xs text-text-muted">Nội thành HCM/HN</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-muted">2-4 giờ</td>
                  <td className="px-6 py-4 text-right font-bold text-text-main">50.000₫</td>
                </tr>
                <tr className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🚀</span>
                      <div>
                        <p className="font-medium text-text-main">Giao nhanh</p>
                        <p className="text-xs text-text-muted">Toàn quốc</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-muted">1-2 ngày</td>
                  <td className="px-6 py-4 text-right font-bold text-text-main">35.000₫</td>
                </tr>
                <tr className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📦</span>
                      <div>
                        <p className="font-medium text-text-main">Giao tiêu chuẩn</p>
                        <p className="text-xs text-text-muted">Toàn quốc</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-muted">3-5 ngày</td>
                  <td className="px-6 py-4 text-right font-bold text-green-600">Miễn phí*</td>
                </tr>
              </tbody>
            </table>
            <div className="px-6 py-3 bg-secondary-50 text-xs text-text-muted">
              * Miễn phí cho đơn hàng từ 500.000₫ trở lên
            </div>
          </div>
        </section>

        {/* Shipping Partners */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
            <Package className="size-6 text-primary" />
            Đối Tác Vận Chuyển
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {carriers.map((carrier) => (
              <div
                key={carrier.name}
                className="bg-white rounded-xl border border-border p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{carrier.logo}</span>
                <span className="font-medium text-text-main text-sm text-center">
                  {carrier.name}
                </span>
                <span className="text-xs text-green-600 font-medium">
                  ✓ Đang hoạt động
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-bold text-text-main mb-6">
            Câu Hỏi Thường Gặp
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-text-main mb-2">
                Làm sao để theo dõi đơn hàng?
              </h3>
              <p className="text-text-muted text-sm">
                Sau khi đặt hàng, bạn sẽ nhận được email xác nhận kèm mã theo dõi. 
                Bạn có thể theo dõi đơn hàng tại trang "Đơn hàng của tôi" hoặc qua SMS.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-text-main mb-2">
                Tôi có thể thay đổi địa chỉ giao hàng không?
              </h3>
              <p className="text-text-muted text-sm">
                Có, bạn có thể thay đổi địa chỉ giao hàng trước khi đơn hàng được xác nhận gửi đi. 
                Vui lòng liên hệ hotline 1900-FASHION hoặc chat với AI hỗ trợ.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-text-main mb-2">
                Chính sách đổi trả như thế nào?
              </h3>
              <p className="text-text-muted text-sm">
                Chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ ngày nhận hàng. 
                Sản phẩm phải còn nguyên tem mác và chưa qua sử dụng.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
