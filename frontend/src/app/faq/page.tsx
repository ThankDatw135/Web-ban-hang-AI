/**
 * Fashion AI - FAQ Page
 * 
 * Câu hỏi thường gặp
 */

'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

// FAQ data
const faqs = [
  {
    category: 'Đơn hàng & Vận chuyển',
    questions: [
      { q: 'Thời gian giao hàng là bao lâu?', a: 'Đơn hàng nội thành TP.HCM sẽ được giao trong 1-2 ngày. Các tỉnh thành khác từ 3-5 ngày làm việc.' },
      { q: 'Phí vận chuyển được tính như thế nào?', a: 'Miễn phí vận chuyển cho đơn hàng từ 500.000đ. Đơn hàng dưới 500.000đ phí ship 30.000đ.' },
      { q: 'Tôi có thể theo dõi đơn hàng không?', a: 'Có. Sau khi đặt hàng, bạn sẽ nhận được mã đơn hàng để theo dõi trạng thái tại mục "Đơn hàng của tôi".' },
    ]
  },
  {
    category: 'Đổi trả & Hoàn tiền',
    questions: [
      { q: 'Chính sách đổi trả như thế nào?', a: 'Bạn có thể đổi trả trong vòng 30 ngày kể từ ngày nhận hàng. Sản phẩm phải còn nguyên tag và chưa qua sử dụng.' },
      { q: 'Hoàn tiền trong bao lâu?', a: 'Tiền sẽ được hoàn trong 5-7 ngày làm việc sau khi chúng tôi nhận được sản phẩm đổi trả.' },
    ]
  },
  {
    category: 'AI Try-on',
    questions: [
      { q: 'AI Try-on hoạt động như thế nào?', a: 'Bạn tải lên ảnh toàn thân, chọn sản phẩm muốn thử, và AI sẽ tạo ảnh bạn mặc trang phục đó trong vài giây.' },
      { q: 'Ảnh của tôi có được bảo mật không?', a: 'Có. Ảnh của bạn được mã hóa và xóa ngay sau khi xử lý. Chúng tôi không lưu trữ hay chia sẻ ảnh với bên thứ ba.' },
      { q: 'AI gợi ý size có chính xác không?', a: 'AI phân tích dựa trên số đo và lịch sử mua hàng của bạn với độ chính xác đến 95%.' },
    ]
  },
  {
    category: 'Tài khoản',
    questions: [
      { q: 'Làm sao để tạo tài khoản?', a: 'Click vào nút "Đăng ký" ở góc trên bên phải, điền thông tin và xác nhận email.' },
      { q: 'Quên mật khẩu thì làm sao?', a: 'Click "Quên mật khẩu" ở trang đăng nhập, nhập email và làm theo hướng dẫn để đặt lại mật khẩu.' },
    ]
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (key: string) => {
    setOpenItems(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  return (
    <>
      <Header />
      
      <main className="flex-1 bg-cream">
        <div className="container-app py-12">
          <h1 className="text-3xl font-bold text-center mb-4">Câu hỏi thường gặp</h1>
          <p className="text-gray-600 text-center mb-12">Tìm câu trả lời cho các thắc mắc của bạn</p>

          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="font-bold text-lg mb-4">{section.category}</h2>
                <div className="space-y-3">
                  {section.questions.map((item, idx) => {
                    const key = `${section.category}-${idx}`;
                    const isOpen = openItems.includes(key);
                    return (
                      <div key={key} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full flex items-center justify-between p-5 text-left"
                        >
                          <span className="font-semibold pr-4">{item.q}</span>
                          <span className={cn(
                            'material-symbols-outlined text-gray-400 transition-transform',
                            isOpen && 'rotate-180'
                          )}>expand_more</span>
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 pt-0">
                            <p className="text-gray-600">{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still need help */}
          <div className="text-center mt-12 p-8 bg-white rounded-2xl max-w-xl mx-auto">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">support_agent</span>
            <h3 className="font-bold text-lg mb-2">Vẫn cần hỗ trợ?</h3>
            <p className="text-gray-600 mb-4">Đội ngũ hỗ trợ sẵn sàng giúp đỡ bạn 24/7</p>
            <a href="/contact">
              <button className="px-6 h-11 rounded-full bg-primary text-white font-bold hover:bg-primary/90">
                Liên hệ ngay
              </button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
