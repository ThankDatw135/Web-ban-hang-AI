/**
 * Fashion AI - Trang Liên Hệ
 * 
 * Form liên hệ và thông tin liên lạc
 */

import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Liên hệ với Fashion AI. Chúng tôi luôn sẵn sàng hỗ trợ bạn.',
};

// Thông tin liên hệ
const contactInfo = [
  {
    icon: Phone,
    title: 'Hotline',
    content: '1900 1234',
    subContent: 'Miễn phí cuộc gọi',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'support@fashionai.vn',
    subContent: 'Phản hồi trong 24h',
  },
  {
    icon: MapPin,
    title: 'Địa chỉ',
    content: '123 Đường ABC, Quận 1',
    subContent: 'TP. Hồ Chí Minh',
  },
  {
    icon: Clock,
    title: 'Giờ làm việc',
    content: '8:00 - 22:00',
    subContent: 'Thứ 2 - Chủ nhật',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container-app">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Liên hệ với chúng tôi</h1>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Bạn có câu hỏi hoặc cần hỗ trợ? Đội ngũ của chúng tôi luôn sẵn sàng giúp đỡ bạn.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6">Gửi tin nhắn</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Họ và tên *</label>
                  <input
                    type="text"
                    placeholder="Nhập họ và tên"
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Số điện thoại *</label>
                  <input
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Chủ đề</label>
                <select className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary transition-all appearance-none">
                  <option value="">Chọn chủ đề</option>
                  <option value="order">Đơn hàng</option>
                  <option value="product">Sản phẩm</option>
                  <option value="return">Đổi/Trả hàng</option>
                  <option value="ai">AI Try-On</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Nội dung tin nhắn *</label>
                <textarea
                  rows={5}
                  placeholder="Nhập nội dung tin nhắn..."
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary w-full sm:w-auto">
                <Send className="w-5 h-5" />
                Gửi tin nhắn
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info) => (
                <div 
                  key={info.title}
                  className="card p-6 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary mb-1">{info.title}</p>
                    <p className="font-bold">{info.content}</p>
                    <p className="text-sm text-secondary">{info.subContent}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="card aspect-video flex items-center justify-center bg-gray-100 dark:bg-[#2c2822]">
              <div className="text-center text-secondary">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Google Maps sẽ được hiển thị ở đây</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
