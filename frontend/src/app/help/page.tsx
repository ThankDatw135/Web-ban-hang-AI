/**
 * Fashion AI - Help Center Page
 * 
 * Trung tâm hỗ trợ khách hàng với FAQ và danh mục
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  Search, ChevronDown, Mail, Phone, ShoppingBag, Sparkles, 
  RefreshCw, User, HelpCircle, ArrowRight, MessageCircle
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Category {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const categories: Category[] = [
  { id: 'order', icon: ShoppingBag, title: 'Đơn hàng & Giao hàng', description: 'Theo dõi, hủy đơn, thời gian giao', color: 'bg-blue-500' },
  { id: 'ai', icon: Sparkles, title: 'Hướng dẫn Thử đồ AI', description: 'Sử dụng AI Try-on, quét cơ thể', color: 'bg-accent' },
  { id: 'return', icon: RefreshCw, title: 'Đổi trả & Hoàn tiền', description: 'Chính sách, quy trình đổi trả', color: 'bg-green-500' },
  { id: 'account', icon: User, title: 'Tài khoản thành viên', description: 'Đăng ký, điểm thưởng, ưu đãi', color: 'bg-primary' },
];

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Làm thế nào để sử dụng tính năng thử đồ AI?',
    answer: 'Để sử dụng AI Try-on, bạn vào trang sản phẩm và nhấn nút "Thử đồ AI". Tải lên ảnh chân dung của bạn hoặc sử dụng camera. AI sẽ phân tích và tạo hình ảnh bạn mặc sản phẩm đó trong vài giây.',
    category: 'ai',
  },
  {
    id: '2',
    question: 'Chính sách đổi trả trong vòng bao nhiêu ngày?',
    answer: 'Fashion AI cho phép đổi trả trong vòng 30 ngày kể từ ngày nhận hàng. Sản phẩm phải còn nguyên tem mác, chưa qua sử dụng và giặt ủi. Miễn phí đổi trả cho lỗi từ nhà sản xuất.',
    category: 'return',
  },
  {
    id: '3',
    question: 'Làm sao để theo dõi đơn hàng của tôi?',
    answer: 'Bạn có thể theo dõi đơn hàng bằng cách vào Tài khoản > Đơn hàng của tôi > Chọn đơn hàng cần theo dõi. Hoặc sử dụng mã vận đơn được gửi qua email/SMS để tra cứu trên website đơn vị vận chuyển.',
    category: 'order',
  },
  {
    id: '4',
    question: 'Phương thức thanh toán nào được chấp nhận?',
    answer: 'Chúng tôi chấp nhận: Thanh toán khi nhận hàng (COD), Thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB), Ví điện tử (MoMo, ZaloPay, VNPay), Chuyển khoản ngân hàng.',
    category: 'order',
  },
  {
    id: '5',
    question: 'Tôi có thể hủy đơn hàng không?',
    answer: 'Bạn có thể hủy đơn hàng miễn phí trước khi đơn hàng được giao cho đơn vị vận chuyển (trạng thái "Đang chuẩn bị"). Sau khi đơn đã vận chuyển, bạn cần từ chối nhận hàng khi giao.',
    category: 'order',
  },
  {
    id: '6',
    question: 'Làm thế nào để tích điểm thành viên?',
    answer: 'Mỗi 10.000đ mua hàng = 1 điểm. Điểm được tích lũy tự động sau khi đơn hàng hoàn tất. Sử dụng điểm để đổi voucher giảm giá hoặc quà tặng tại mục Ưu đãi của tôi.',
    category: 'account',
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = !activeCategory || faq.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-cream dark:bg-background-dark">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-cream dark:from-primary/5 dark:to-background-dark py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Trung tâm hỗ trợ khách hàng
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-text-main dark:text-white tracking-tight mb-6">
            Chúng tôi có thể giúp gì cho bạn?
          </h1>
          
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm câu hỏi, từ khóa..."
              className="w-full pl-12 pr-24 py-4 rounded-xl bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#333] text-text-main dark:text-white placeholder:text-secondary focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-lg"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-text-main font-bold rounded-lg hover:bg-primary-600 transition-colors">
              AI Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20 py-12 space-y-12">
        
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(isActive ? null : cat.id)}
                className={cn(
                  'p-6 rounded-xl border transition-all text-left',
                  isActive
                    ? 'bg-white dark:bg-[#1a1a1a] border-primary shadow-lg'
                    : 'bg-white dark:bg-[#1a1a1a] border-border dark:border-[#333] hover:border-primary/50'
                )}
              >
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', cat.color)}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-text-main dark:text-white mb-1">{cat.title}</h3>
                <p className="text-xs text-secondary">{cat.description}</p>
              </button>
            );
          })}
        </div>

        {/* FAQs */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-main dark:text-white">
              Câu hỏi thường gặp
            </h2>
            {activeCategory && (
              <button 
                onClick={() => setActiveCategory(null)}
                className="text-primary text-sm font-medium hover:underline"
              >
                Xem tất cả
              </button>
            )}
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-border dark:border-[#333] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 hover:bg-cream dark:hover:bg-[#252525] transition-colors"
                  >
                    <span className="font-medium text-text-main dark:text-white text-left pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown className={cn(
                      'w-5 h-5 text-secondary shrink-0 transition-transform',
                      openFaq === faq.id && 'rotate-180'
                    )} />
                  </button>
                  
                  {openFaq === faq.id && (
                    <div className="px-5 pb-5 pt-0 border-t border-border dark:border-[#333]">
                      <p className="text-secondary leading-relaxed pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
                Không tìm thấy kết quả
              </h3>
              <p className="text-secondary">
                Thử tìm kiếm với từ khóa khác hoặc liên hệ hỗ trợ trực tiếp.
              </p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 border border-border dark:border-[#333]">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-text-main dark:text-white mb-2">
              Vẫn cần sự trợ giúp?
            </h2>
            <p className="text-secondary">
              Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@fashionai.vn" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-text-main font-bold rounded-lg hover:bg-primary-600 transition-colors">
              <Mail className="w-5 h-5" />
              Gửi Email
            </a>
            <Link href="/chat">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent/80 transition-colors w-full sm:w-auto">
                <MessageCircle className="w-5 h-5" />
                Chat với AI
              </button>
            </Link>
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
