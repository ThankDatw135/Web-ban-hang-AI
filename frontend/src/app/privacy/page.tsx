/**
 * Fashion AI - Privacy Policy Page
 * 
 * Chính sách bảo mật và quyền riêng tư
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronDown, Shield, Lock, Eye, Database, Mail, Phone } from 'lucide-react';

interface Section {
  id: string;
  icon: React.ElementType;
  title: string;
  content: string[];
}

const sections: Section[] = [
  {
    id: 'collection',
    icon: Database,
    title: '1. Thu thập thông tin',
    content: [
      'Chúng tôi thu thập thông tin bạn cung cấp trực tiếp, bao gồm: họ tên, email, số điện thoại, địa chỉ giao hàng khi bạn đăng ký tài khoản hoặc đặt hàng.',
      'Thông tin thanh toán được xử lý an toàn qua các đối tác thanh toán được cấp phép và chúng tôi không lưu trữ thông tin thẻ.',
      'Khi sử dụng tính năng AI Try-on, ảnh của bạn được xử lý để tạo hình ảnh thử đồ ảo. Bạn có quyền yêu cầu xóa dữ liệu này bất cứ lúc nào.',
    ],
  },
  {
    id: 'usage',
    icon: Eye,
    title: '2. Sử dụng thông tin',
    content: [
      'Xử lý đơn hàng, giao hàng và cung cấp dịch vụ khách hàng.',
      'Cá nhân hóa trải nghiệm mua sắm và đề xuất sản phẩm phù hợp thông qua AI.',
      'Gửi thông báo về đơn hàng, chương trình khuyến mãi (nếu bạn đồng ý nhận).',
      'Cải thiện website và các tính năng AI dựa trên phản hồi và hành vi sử dụng ẩn danh.',
    ],
  },
  {
    id: 'protection',
    icon: Lock,
    title: '3. Bảo vệ dữ liệu',
    content: [
      'Chúng tôi sử dụng mã hóa SSL/TLS cho tất cả giao dịch và truyền tải dữ liệu.',
      'Dữ liệu được lưu trữ trên máy chủ bảo mật với kiểm soát truy cập nghiêm ngặt.',
      'Thường xuyên kiểm tra và cập nhật các biện pháp bảo mật.',
      'Nhân viên chỉ được phép truy cập thông tin cần thiết để thực hiện công việc.',
    ],
  },
  {
    id: 'sharing',
    icon: Shield,
    title: '4. Chia sẻ thông tin',
    content: [
      'Chúng tôi KHÔNG bán hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba.',
      'Thông tin có thể được chia sẻ với: đối tác vận chuyển (để giao hàng), đối tác thanh toán (để xử lý thanh toán), cơ quan pháp luật (khi được yêu cầu theo quy định).',
      'Các đối tác đều cam kết bảo mật thông tin theo tiêu chuẩn tương đương.',
    ],
  },
  {
    id: 'ai',
    icon: Shield,
    title: '5. Dữ liệu AI và Thử đồ ảo',
    content: [
      'Ảnh tải lên cho tính năng AI Try-on chỉ được sử dụng để tạo hình ảnh thử đồ.',
      'Dữ liệu được xử lý bởi mô hình AI và có thể được lưu tạm thời để cải thiện chất lượng.',
      'Bạn có quyền yêu cầu xóa tất cả dữ liệu AI liên quan đến tài khoản của mình.',
      'Chúng tôi không sử dụng ảnh của bạn cho mục đích quảng cáo mà không có sự đồng ý.',
    ],
  },
  {
    id: 'rights',
    icon: Shield,
    title: '6. Quyền của bạn',
    content: [
      'Truy cập: Yêu cầu xem thông tin cá nhân chúng tôi lưu trữ về bạn.',
      'Chỉnh sửa: Cập nhật hoặc sửa thông tin không chính xác.',
      'Xóa: Yêu cầu xóa tài khoản và dữ liệu cá nhân.',
      'Từ chối: Hủy đăng ký nhận email marketing bất cứ lúc nào.',
      'Để thực hiện quyền, vui lòng liên hệ privacy@fashionai.vn',
    ],
  },
];

const navItems = sections.map(s => ({ id: s.id, title: s.title.replace(/^\d+\.\s*/, '') }));

export default function PrivacyPage() {
  const [openSection, setOpenSection] = useState<string | null>(sections[0].id);
  const [activeNav, setActiveNav] = useState(sections[0].id);

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-background-dark">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-text-main dark:text-white tracking-tight mb-4">
            Chính sách Bảo mật
          </h1>
          <p className="text-secondary max-w-2xl mx-auto">
            Tại Fashion AI, chúng tôi cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của bạn. 
            Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
          </p>
          <p className="text-secondary text-sm mt-4">
            Cập nhật lần cuối: 01/02/2026
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24 bg-white dark:bg-[#1a1a1a] rounded-xl p-4 border border-border dark:border-[#333]">
              <h3 className="font-bold text-text-main dark:text-white mb-4">Mục lục</h3>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                      activeNav === item.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-secondary hover:bg-cream dark:hover:bg-[#252525]'
                    )}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-4">
            {sections.map((section) => {
              const Icon = section.icon;
              const isOpen = openSection === section.id;
              
              return (
                <div
                  key={section.id}
                  id={section.id}
                  className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-border dark:border-[#333] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenSection(isOpen ? null : section.id)}
                    className="w-full flex items-center justify-between p-6 hover:bg-cream dark:hover:bg-[#252525] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="font-bold text-lg text-text-main dark:text-white text-left">
                        {section.title}
                      </h2>
                    </div>
                    <ChevronDown className={cn(
                      'w-5 h-5 text-secondary transition-transform',
                      isOpen && 'rotate-180'
                    )} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-border dark:border-[#333]">
                      <ul className="space-y-3 text-secondary">
                        {section.content.map((item, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="text-primary font-bold shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </main>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-white dark:bg-[#1a1a1a] rounded-xl p-8 border border-border dark:border-[#333] text-center">
          <h2 className="text-xl font-bold text-text-main dark:text-white mb-4">
            Có câu hỏi về bảo mật?
          </h2>
          <p className="text-secondary mb-6 max-w-xl mx-auto">
            Đội ngũ bảo mật của chúng tôi luôn sẵn sàng hỗ trợ. Liên hệ ngay nếu bạn có bất kỳ thắc mắc nào.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:privacy@fashionai.vn" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-text-main font-bold rounded-lg hover:bg-primary-600 transition-colors">
              <Mail className="w-5 h-5" />
              privacy@fashionai.vn
            </a>
            <a href="tel:19001234" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border dark:border-[#333] text-text-main dark:text-white font-bold rounded-lg hover:bg-cream dark:hover:bg-[#252525] transition-colors">
              <Phone className="w-5 h-5" />
              1900 1234
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
