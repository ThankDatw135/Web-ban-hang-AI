/**
 * Fashion AI - Contact Page
 * 
 * Trang liên hệ
 */

'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      
      <main className="flex-1 bg-cream">
        <div className="container-app py-12">
          <h1 className="text-3xl font-bold text-center mb-12">Liên hệ với chúng tôi</h1>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Gửi tin nhắn</h2>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Họ tên</label>
                    <input 
                      type="text" 
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Chủ đề</label>
                  <select className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                    <option>Hỗ trợ đơn hàng</option>
                    <option>Đổi trả sản phẩm</option>
                    <option>Hợp tác kinh doanh</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Nội dung</label>
                  <textarea 
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    placeholder="Nhập nội dung tin nhắn..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold mb-4">Thông tin liên hệ</h3>
                <div className="space-y-4">
                  {[
                    { icon: 'location_on', label: 'Địa chỉ', value: '123 Nguyễn Huệ, Quận 1, TP.HCM' },
                    { icon: 'phone', label: 'Hotline', value: '1900 1234' },
                    { icon: 'mail', label: 'Email', value: 'support@fashionai.vn' },
                    { icon: 'schedule', label: 'Giờ làm việc', value: '8:00 - 22:00 (T2 - CN)' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary text-[20px]">{item.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="font-semibold">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold mb-4">Theo dõi chúng tôi</h3>
                <div className="flex gap-3">
                  {['facebook', 'instagram', 'youtube', 'tiktok'].map((social) => (
                    <button 
                      key={social}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <span className="text-sm font-bold uppercase">{social[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
