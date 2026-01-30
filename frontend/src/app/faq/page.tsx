/**
 * AI-Enhanced Help Center & FAQ - Fashion AI
 * 
 * Trung tâm trợ giúp với AI:
 * - Search FAQ
 * - Category filtering
 * - AI-powered answers
 * - Expandable FAQ items
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  Shirt,
  HelpCircle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Header, Footer } from '@/components';

// FAQ categories
const categories = [
  { id: 'all', label: 'Tất cả', icon: HelpCircle },
  { id: 'orders', label: 'Đơn hàng', icon: Package },
  { id: 'payments', label: 'Thanh toán', icon: CreditCard },
  { id: 'shipping', label: 'Giao hàng', icon: Truck },
  { id: 'returns', label: 'Đổi trả', icon: RotateCcw },
  { id: 'sizing', label: 'Size & Fit', icon: Shirt },
];

// FAQ data
const faqs = [
  {
    id: '1',
    category: 'orders',
    question: 'Làm sao để theo dõi đơn hàng?',
    answer: 'Bạn có thể theo dõi đơn hàng bằng cách vào mục "Đơn hàng" trong tài khoản. Chọn đơn hàng cần theo dõi và nhấn "Theo dõi". Bạn cũng sẽ nhận được email/SMS cập nhật trạng thái giao hàng.',
    helpful: 156,
  },
  {
    id: '2',
    category: 'orders',
    question: 'Tôi có thể hủy đơn hàng không?',
    answer: 'Bạn có thể hủy đơn hàng trong vòng 30 phút sau khi đặt. Sau thời gian này, vui lòng liên hệ hotline 1900 1234 56 để được hỗ trợ. Nếu đơn hàng đã được xử lý hoặc giao, bạn có thể sử dụng chính sách đổi trả.',
    helpful: 89,
  },
  {
    id: '3',
    category: 'payments',
    question: 'Fashion AI chấp nhận những phương thức thanh toán nào?',
    answer: 'Chúng tôi chấp nhận: Thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB), Ví điện tử (MoMo, ZaloPay, VNPay), Chuyển khoản ngân hàng, và Thanh toán khi nhận hàng (COD).',
    helpful: 234,
  },
  {
    id: '4',
    category: 'shipping',
    question: 'Thời gian giao hàng là bao lâu?',
    answer: 'Thời gian giao hàng: Nội thành HCM, HN: 1-2 ngày. Các tỉnh thành khác: 3-5 ngày. Vùng sâu vùng xa: 5-7 ngày. Đơn hàng đặt trước 14h sẽ được xử lý trong ngày.',
    helpful: 178,
  },
  {
    id: '5',
    category: 'returns',
    question: 'Chính sách đổi trả như thế nào?',
    answer: 'Bạn có 14 ngày để đổi trả sản phẩm kể từ ngày nhận hàng. Sản phẩm cần còn nguyên tag, chưa qua sử dụng. Miễn phí đổi trả với lý do size không phù hợp. Hoàn tiền trong 3-5 ngày làm việc.',
    helpful: 312,
  },
  {
    id: '6',
    category: 'sizing',
    question: 'Làm sao để chọn size phù hợp?',
    answer: 'Sử dụng tính năng AI Body Scan để đo số đo chính xác. Bạn cũng có thể tham khảo bảng size trong mỗi sản phẩm. Tính năng AI Try-On cho phép thử đồ ảo trước khi mua. Nếu không chắc chắn, hãy liên hệ AI Stylist để được tư vấn.',
    helpful: 267,
  },
  {
    id: '7',
    category: 'sizing',
    question: 'AI Body Scan hoạt động như thế nào?',
    answer: 'AI Body Scan sử dụng camera để phân tích hình ảnh và tính toán số đo cơ thể chính xác. Chỉ cần đứng trước camera theo hướng dẫn, AI sẽ tự động đo và lưu thông tin. Dữ liệu được mã hóa và bảo mật tuyệt đối.',
    helpful: 145,
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-text-main mb-4">Trung Tâm Trợ Giúp</h1>
          <p className="text-lg text-text-muted">Tìm câu trả lời cho mọi thắc mắc của bạn</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm câu hỏi..."
            className="w-full pl-14 pr-5 py-4 bg-white border border-border rounded-2xl focus:outline-none focus:border-primary text-text-main text-lg"
          />
          {searchQuery && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 text-accent">
              <Sparkles className="size-4" />
              <span className="text-sm font-medium">AI Search</span>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto mb-8 pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-muted border border-border hover:border-primary'
                }`}
              >
                <Icon className="size-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-secondary-50 transition-colors"
                >
                  <span className="font-bold text-text-main pr-4">{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="size-5 text-text-muted flex-shrink-0" />
                  ) : (
                    <ChevronDown className="size-5 text-text-muted flex-shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-border">
                      <p className="text-text-muted leading-relaxed mb-4">{faq.answer}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-text-muted">
                          <span>Hữu ích?</span>
                          <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-50 hover:bg-green-50 hover:text-green-600 transition-colors">
                            <ThumbsUp className="size-4" />
                            <span>{faq.helpful}</span>
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-50 hover:bg-red-50 hover:text-red-600 transition-colors">
                            <ThumbsDown className="size-4" />
                          </button>
                        </div>
                        <Link
                          href="/chat"
                          className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
                        >
                          <Sparkles className="size-4" />
                          Hỏi thêm AI
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-16">
            <div className="size-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="size-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">Không tìm thấy kết quả</h3>
            <p className="text-text-muted mb-6">Thử tìm với từ khóa khác hoặc hỏi AI Concierge</p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 transition-colors"
            >
              <Sparkles className="size-5" />
              Hỏi AI Concierge
            </Link>
          </div>
        )}

        {/* Still Need Help */}
        <div className="mt-12 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-text-main mb-2">Vẫn cần hỗ trợ?</h3>
          <p className="text-text-muted mb-6">Đội ngũ AI Concierge sẵn sàng giúp đỡ bạn 24/7</p>
          <Link
            href="/support"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Liên hệ hỗ trợ
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
