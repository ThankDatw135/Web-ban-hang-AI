/**
 * AI Concierge & Support Hub - Fashion AI
 * 
 * Trung tâm hỗ trợ với AI:
 * - AI chatbot quick actions
 * - Support categories
 * - Contact options
 * - FAQ shortcuts
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock,
  ChevronRight,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  Shirt,
  HelpCircle,
  Bot,
  Send
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Support categories
const categories = [
  { 
    id: 'orders', 
    icon: Package, 
    title: 'Đơn Hàng', 
    description: 'Theo dõi, thay đổi, hủy đơn',
    color: 'text-blue-600 bg-blue-50',
  },
  { 
    id: 'payments', 
    icon: CreditCard, 
    title: 'Thanh Toán', 
    description: 'Phương thức, hoàn tiền, hóa đơn',
    color: 'text-green-600 bg-green-50',
  },
  { 
    id: 'shipping', 
    icon: Truck, 
    title: 'Giao Hàng', 
    description: 'Thời gian, phí ship, địa chỉ',
    color: 'text-purple-600 bg-purple-50',
  },
  { 
    id: 'returns', 
    icon: RotateCcw, 
    title: 'Đổi Trả', 
    description: 'Chính sách, quy trình, hoàn tiền',
    color: 'text-orange-600 bg-orange-50',
  },
  { 
    id: 'sizing', 
    icon: Shirt, 
    title: 'Size & Fit', 
    description: 'Hướng dẫn chọn size, đo số đo',
    color: 'text-pink-600 bg-pink-50',
  },
  { 
    id: 'other', 
    icon: HelpCircle, 
    title: 'Khác', 
    description: 'Tài khoản, khuyến mãi, góp ý',
    color: 'text-gray-600 bg-gray-50',
  },
];

// Quick questions for AI
const quickQuestions = [
  'Đơn hàng của tôi đang ở đâu?',
  'Làm sao để đổi size?',
  'Chính sách hoàn tiền như thế nào?',
  'Có được thử đồ trước khi mua không?',
];

export default function SupportPage() {
  const [chatMessage, setChatMessage] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold tracking-wide mb-4">
            <Bot className="size-5" />
            AI Concierge
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            Chúng Tôi Có Thể Giúp Gì?
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            AI Concierge sẵn sàng hỗ trợ bạn 24/7. Chọn chủ đề hoặc chat trực tiếp với AI!
          </p>
        </div>

        {/* AI Chat Quick Start */}
        <div className="bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 rounded-3xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 size-60 bg-accent/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                <Sparkles className="size-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-main">Chat với AI Concierge</h2>
                <p className="text-sm text-text-muted">Trả lời tức thì, hỗ trợ thông minh</p>
              </div>
            </div>

            {/* Quick Questions */}
            <div className="flex flex-wrap gap-2 mb-6">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setChatMessage(q)}
                  className="px-4 py-2 bg-white/80 hover:bg-white rounded-full text-sm font-medium text-text-main border border-border hover:border-primary transition-all"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 px-5 py-4 bg-white border border-border rounded-2xl focus:outline-none focus:border-primary text-text-main"
              />
              <Link
                href={`/chat?q=${encodeURIComponent(chatMessage)}`}
                className="px-6 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-2xl flex items-center gap-2 transition-colors"
              >
                <Send className="size-5" />
                Gửi
              </Link>
            </div>
          </div>
        </div>

        {/* Support Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text-main mb-6">Chọn Chủ Đề Cần Hỗ Trợ</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={`/faq?category=${cat.id}`}
                  className="bg-white rounded-2xl p-6 border border-border hover:border-primary hover:shadow-lg transition-all group"
                >
                  <div className={`size-12 rounded-xl ${cat.color} flex items-center justify-center mb-4`}>
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-bold text-text-main mb-1 group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-text-muted">{cat.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Contact Options */}
        <div className="bg-white rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-bold text-text-main mb-6">Liên Hệ Trực Tiếp</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary-50">
              <div className="size-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-text-main mb-1">Live Chat</h3>
                <p className="text-sm text-text-muted mb-2">Chat với nhân viên hỗ trợ</p>
                <Link href="/chat" className="text-primary text-sm font-medium flex items-center gap-1">
                  Bắt đầu chat <ChevronRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary-50">
              <div className="size-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                <Phone className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-text-main mb-1">Hotline</h3>
                <p className="text-sm text-text-muted mb-2">1900 1234 56</p>
                <p className="text-xs text-text-muted flex items-center gap-1">
                  <Clock className="size-3" />
                  8:00 - 22:00 hàng ngày
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary-50">
              <div className="size-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                <Mail className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-text-main mb-1">Email</h3>
                <p className="text-sm text-text-muted mb-2">support@fashionai.vn</p>
                <p className="text-xs text-text-muted">Phản hồi trong 24h</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
