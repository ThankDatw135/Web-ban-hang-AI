/**
 * AI Data & Privacy Policy - Fashion AI
 * 
 * Chính sách bảo mật dữ liệu:
 * - Privacy policy content
 * - AI data usage explanation
 * - User data controls
 * - Cookie settings
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database,
  Trash2,
  Download,
  ChevronDown,
  ChevronUp,
  Bot,
  Camera,
  MapPin,
  ShoppingBag
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Privacy sections
const privacySections = [
  {
    id: 'collection',
    title: 'Dữ Liệu Chúng Tôi Thu Thập',
    icon: Database,
    content: `Chúng tôi thu thập các loại dữ liệu sau để cung cấp trải nghiệm tốt nhất:

**Thông tin cá nhân:**
- Họ tên, email, số điện thoại khi đăng ký tài khoản
- Địa chỉ giao hàng và thanh toán
- Lịch sử đơn hàng và giao dịch

**Dữ liệu AI:**
- Số đo cơ thể từ AI Body Scan (được mã hóa và bảo mật)
- Sở thích phong cách và màu sắc
- Lịch sử thử đồ ảo

**Dữ liệu kỹ thuật:**
- Địa chỉ IP, loại trình duyệt
- Cookies và dữ liệu phiên làm việc`,
  },
  {
    id: 'usage',
    title: 'Cách Chúng Tôi Sử Dụng Dữ Liệu',
    icon: Eye,
    content: `Dữ liệu của bạn được sử dụng để:

**Dịch vụ cốt lõi:**
- Xử lý đơn hàng và giao hàng
- Cung cấp gợi ý sản phẩm cá nhân hóa
- Hỗ trợ tính năng AI Try-On và AI Stylist

**Cải thiện trải nghiệm:**
- Phân tích để cải thiện sản phẩm và dịch vụ
- Gửi thông báo về đơn hàng và ưu đãi (nếu bạn đồng ý)
- Nghiên cứu và phát triển tính năng mới

**Bảo mật:**
- Phát hiện và ngăn chặn gian lận
- Bảo vệ tài khoản người dùng`,
  },
  {
    id: 'ai-data',
    title: 'Dữ Liệu AI & Machine Learning',
    icon: Bot,
    content: `Chúng tôi cam kết minh bạch về cách AI sử dụng dữ liệu của bạn:

**AI Body Scan:**
- Hình ảnh được xử lý tức thì và không lưu trữ
- Chỉ lưu số đo dạng text, được mã hóa AES-256
- Bạn có thể xóa dữ liệu số đo bất kỳ lúc nào

**AI Try-On:**
- Ảnh thử đồ được lưu trong 30 ngày trừ khi bạn lưu vĩnh viễn
- Không sử dụng ảnh của bạn để huấn luyện AI mà không có sự đồng ý

**AI Recommendations:**
- Dựa trên lịch sử duyệt và mua hàng
- Bạn có thể tắt cá nhân hóa trong cài đặt`,
  },
  {
    id: 'protection',
    title: 'Bảo Vệ Dữ Liệu',
    icon: Lock,
    content: `Chúng tôi áp dụng các biện pháp bảo mật cao nhất:

**Mã hóa:**
- Tất cả dữ liệu được mã hóa khi truyền tải (TLS 1.3)
- Dữ liệu nhạy cảm được mã hóa AES-256 khi lưu trữ

**Tuân thủ:**
- Tuân thủ GDPR cho khách hàng EU
- Tuân thủ PDPA cho khách hàng Singapore
- Đạt chứng nhận ISO 27001

**Kiểm soát truy cập:**
- Chỉ nhân viên được ủy quyền mới có quyền truy cập
- Ghi log tất cả các truy cập dữ liệu`,
  },
  {
    id: 'rights',
    title: 'Quyền Của Bạn',
    icon: Shield,
    content: `Bạn có toàn quyền kiểm soát dữ liệu của mình:

**Quyền truy cập:**
- Xem tất cả dữ liệu chúng tôi có về bạn
- Tải xuống bản sao dữ liệu của bạn

**Quyền chỉnh sửa:**
- Cập nhật thông tin cá nhân bất kỳ lúc nào
- Chỉnh sửa sở thích và cài đặt AI

**Quyền xóa:**
- Xóa tài khoản và tất cả dữ liệu liên quan
- Xóa riêng dữ liệu AI (số đo, ảnh thử đồ)

**Quyền từ chối:**
- Tắt email marketing
- Tắt cá nhân hóa AI`,
  },
];

// Data controls
const dataControls = [
  {
    id: 'body-scan',
    title: 'Dữ liệu AI Body Scan',
    description: 'Số đo cơ thể từ quét AI',
    icon: Camera,
    hasData: true,
  },
  {
    id: 'location',
    title: 'Lịch sử địa chỉ',
    description: 'Địa chỉ giao hàng đã lưu',
    icon: MapPin,
    hasData: true,
  },
  {
    id: 'purchase',
    title: 'Lịch sử mua hàng',
    description: 'Đơn hàng và giao dịch',
    icon: ShoppingBag,
    hasData: true,
  },
];

export default function PrivacyPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['collection']);

  const toggleSection = (id: string) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide mb-4">
            <Shield className="size-5" />
            Bảo Mật & Quyền Riêng Tư
          </div>
          <h1 className="text-4xl font-bold text-text-main mb-4">
            Chính Sách Bảo Mật
          </h1>
          <p className="text-text-muted">
            Cập nhật lần cuối: 15/01/2024
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 mb-10">
          <h2 className="font-bold text-text-main mb-3">Tóm Tắt Nhanh</h2>
          <ul className="space-y-2 text-sm text-text-muted">
            <li className="flex items-start gap-2">
              <Lock className="size-4 text-primary mt-0.5 flex-shrink-0" />
              Dữ liệu của bạn được mã hóa và bảo mật theo tiêu chuẩn cao nhất
            </li>
            <li className="flex items-start gap-2">
              <Eye className="size-4 text-primary mt-0.5 flex-shrink-0" />
              Chúng tôi minh bạch về cách AI sử dụng dữ liệu của bạn
            </li>
            <li className="flex items-start gap-2">
              <Shield className="size-4 text-primary mt-0.5 flex-shrink-0" />
              Bạn có toàn quyền kiểm soát và xóa dữ liệu bất kỳ lúc nào
            </li>
          </ul>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-4 mb-12">
          {privacySections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.includes(section.id);
            return (
              <div
                key={section.id}
                className="bg-white rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-secondary-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <span className="font-bold text-text-main">{section.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="size-5 text-text-muted" />
                  ) : (
                    <ChevronDown className="size-5 text-text-muted" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-border prose prose-sm max-w-none text-text-muted">
                      <div className="whitespace-pre-line">{section.content}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Data Controls */}
        <section className="bg-white rounded-2xl border border-border p-8 mb-8">
          <h2 className="text-xl font-bold text-text-main mb-6">Quản Lý Dữ Liệu Của Bạn</h2>
          <div className="space-y-4">
            {dataControls.map((control) => {
              const Icon = control.icon;
              return (
                <div
                  key={control.id}
                  className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-white flex items-center justify-center">
                      <Icon className="size-5 text-text-muted" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-main">{control.title}</h3>
                      <p className="text-sm text-text-muted">{control.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-white border border-border rounded-lg text-sm font-medium text-text-main hover:border-primary transition-colors flex items-center gap-1">
                      <Download className="size-4" />
                      Tải xuống
                    </button>
                    <button className="px-3 py-1.5 bg-white border border-border rounded-lg text-sm font-medium text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center gap-1">
                      <Trash2 className="size-4" />
                      Xóa
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact */}
        <div className="text-center text-sm text-text-muted">
          <p>Có câu hỏi về quyền riêng tư?</p>
          <p>
            Liên hệ:{' '}
            <a href="mailto:privacy@fashionai.vn" className="text-primary hover:underline">
              privacy@fashionai.vn
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
