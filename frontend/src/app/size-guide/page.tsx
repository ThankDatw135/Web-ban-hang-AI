/**
 * Fashion AI - Size Guide Page
 * 
 * Hướng dẫn chọn size với AI Scan và bảng size chi tiết
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronDown, Ruler, QrCode, MessageCircle, FileText, Sparkles } from 'lucide-react';

type Category = 'women' | 'men' | 'kids';

interface SizeRow {
  size: string;
  height: string;
  weight: string;
  bust: string;
  waist: string;
  hips: string;
  popular?: boolean;
}

const sizeData: Record<Category, SizeRow[]> = {
  women: [
    { size: 'XS', height: '148 - 153', weight: '38 - 42', bust: '74 - 78', waist: '58 - 62', hips: '80 - 84' },
    { size: 'S', height: '153 - 158', weight: '42 - 47', bust: '78 - 82', waist: '62 - 66', hips: '84 - 88' },
    { size: 'M', height: '158 - 163', weight: '47 - 52', bust: '82 - 86', waist: '66 - 70', hips: '88 - 92', popular: true },
    { size: 'L', height: '163 - 168', weight: '52 - 57', bust: '86 - 90', waist: '70 - 74', hips: '92 - 96' },
    { size: 'XL', height: '168 - 173', weight: '57 - 62', bust: '90 - 94', waist: '74 - 78', hips: '96 - 100' },
  ],
  men: [
    { size: 'S', height: '160 - 165', weight: '55 - 60', bust: '88 - 92', waist: '72 - 76', hips: '88 - 92' },
    { size: 'M', height: '165 - 170', weight: '60 - 68', bust: '92 - 96', waist: '76 - 80', hips: '92 - 96', popular: true },
    { size: 'L', height: '170 - 175', weight: '68 - 75', bust: '96 - 100', waist: '80 - 84', hips: '96 - 100' },
    { size: 'XL', height: '175 - 180', weight: '75 - 82', bust: '100 - 104', waist: '84 - 88', hips: '100 - 104' },
    { size: 'XXL', height: '180 - 185', weight: '82 - 90', bust: '104 - 108', waist: '88 - 92', hips: '104 - 108' },
  ],
  kids: [
    { size: '110', height: '105 - 115', weight: '16 - 20', bust: '54 - 58', waist: '50 - 54', hips: '56 - 60' },
    { size: '120', height: '115 - 125', weight: '20 - 25', bust: '58 - 62', waist: '52 - 56', hips: '60 - 64' },
    { size: '130', height: '125 - 135', weight: '25 - 30', bust: '62 - 66', waist: '54 - 58', hips: '64 - 68' },
    { size: '140', height: '135 - 145', weight: '30 - 38', bust: '66 - 72', waist: '58 - 62', hips: '68 - 74' },
    { size: '150', height: '145 - 155', weight: '38 - 45', bust: '72 - 78', waist: '62 - 66', hips: '74 - 80' },
  ],
};

const accordionItems = [
  { title: 'Mẹo chọn size áo sơ mi', content: 'Chọn size áo sơ mi dựa vào vòng ngực và chiều dài tay. Nếu ở giữa 2 size, nên chọn size lớn hơn để thoải mái.' },
  { title: 'Mẹo chọn size quần jeans', content: 'Đo vòng eo và vòng mông. Chọn size theo vòng mông nếu bạn thích quần ôm, theo vòng eo nếu thích quần thoải mái.' },
  { title: 'Bảng quy đổi size giày', content: 'Size giày Việt Nam = Size EU - 1. Ví dụ: EU 40 = VN 39. Nên đo chiều dài bàn chân để chọn chính xác.' },
];

export default function SizeGuidePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('women');
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const categories = [
    { key: 'women' as const, label: 'Nữ (Women)' },
    { key: 'men' as const, label: 'Nam (Men)' },
    { key: 'kids' as const, label: 'Trẻ em (Kids)' },
  ];

  return (
    <div className="min-h-screen bg-cream dark:bg-background-dark">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20 py-8 space-y-10">
        
        {/* Hero Section - AI Scan */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm border border-border dark:border-[#333] p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 aspect-video rounded-lg overflow-hidden relative bg-gradient-to-br from-primary/20 to-accent/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-sm text-secondary">AI Body Scan Technology</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col gap-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 w-fit">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Công nghệ mới</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-text-main dark:text-white">
              Chưa chắc chắn về size của bạn?
            </h1>
            
            <p className="text-secondary text-base md:text-lg leading-relaxed">
              Đừng lo lắng về việc đổi trả. Sử dụng công nghệ{' '}
              <span className="font-bold text-text-main dark:text-white">AI Fashion Scan</span>{' '}
              để phân tích số đo cơ thể chính xác 99% chỉ trong vài giây.
            </p>
            
            <div className="pt-2">
              <Link href="/ai-studio">
                <button className="flex items-center gap-2 bg-primary hover:bg-primary-600 text-text-main font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-primary/20">
                  <QrCode className="w-5 h-5" />
                  Quét cơ thể ngay (AI Scan)
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Manual Guide Header */}
        <div className="flex flex-col gap-2 pt-5">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main dark:text-white">Hướng dẫn đo thủ công</h2>
          <p className="text-secondary">Nếu bạn chưa sẵn sàng dùng AI, hãy tham khảo bảng quy đổi kích cỡ chi tiết dưới đây.</p>
        </div>

        {/* Category Tabs */}
        <div className="border-b border-border dark:border-[#333]">
          <div className="flex gap-8">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  'pb-3 px-2 text-base font-bold border-b-[3px] transition-colors',
                  activeCategory === cat.key
                    ? 'text-text-main dark:text-white border-primary'
                    : 'text-secondary border-transparent hover:border-border'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-10 pb-10">
          {/* Left Column: Visual Guide */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-border dark:border-[#333]">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-text-main dark:text-white">
                <Ruler className="w-5 h-5 text-primary" />
                Cách lấy số đo
              </h3>
              
              {/* Measurement Illustration */}
              <div className="w-full aspect-[3/4] bg-cream dark:bg-[#333] rounded-lg mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-48 border-2 border-dashed border-primary/50 rounded-full relative">
                    <div className="absolute top-[25%] left-0 right-0 border-t-2 border-dashed border-primary text-center">
                      <span className="text-[10px] font-bold text-primary bg-cream dark:bg-[#333] px-1">Vòng 1</span>
                    </div>
                    <div className="absolute top-[40%] left-0 right-0 border-t-2 border-dashed border-primary text-center">
                      <span className="text-[10px] font-bold text-primary bg-cream dark:bg-[#333] px-1">Vòng 2</span>
                    </div>
                    <div className="absolute top-[55%] left-0 right-0 border-t-2 border-dashed border-primary text-center">
                      <span className="text-[10px] font-bold text-primary bg-cream dark:bg-[#333] px-1">Vòng 3</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Measurement Instructions */}
              <div className="flex flex-col gap-4">
                {[
                  { num: 1, title: 'Vòng ngực', desc: 'Đo quanh phần nở nhất của ngực.' },
                  { num: 2, title: 'Vòng eo', desc: 'Đo quanh phần nhỏ nhất, trên rốn 2cm.' },
                  { num: 3, title: 'Vòng mông', desc: 'Đo phần nở nhất khi đứng khép chân.' },
                ].map((item) => (
                  <div key={item.num} className="flex gap-3 items-start">
                    <div className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {item.num}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-text-main dark:text-white">{item.title}</p>
                      <p className="text-sm text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Size Table */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Size Chart Table */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-text-main dark:text-white">Bảng size quần áo</h3>
                <div className="flex items-center gap-2 text-sm text-secondary">
                  <span className="material-symbols-outlined text-lg">info</span>
                  Đơn vị: cm
                </div>
              </div>
              
              <div className="overflow-x-auto rounded-lg border border-border dark:border-[#333]">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-cream dark:bg-[#2a2a2a] text-secondary">
                    <tr>
                      <th className="px-6 py-4 font-bold">Size Quốc Tế</th>
                      <th className="px-6 py-4 font-bold">Chiều cao (cm)</th>
                      <th className="px-6 py-4 font-bold">Cân nặng (kg)</th>
                      <th className="px-6 py-4 font-bold">Vòng 1</th>
                      <th className="px-6 py-4 font-bold">Vòng 2</th>
                      <th className="px-6 py-4 font-bold">Vòng 3</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#1a1a1a] divide-y divide-border dark:divide-[#333]">
                    {sizeData[activeCategory].map((row) => (
                      <tr
                        key={row.size}
                        className={cn(
                          'transition-colors',
                          row.popular
                            ? 'bg-primary/5 hover:bg-primary/10 border-l-4 border-l-primary'
                            : 'hover:bg-cream dark:hover:bg-[#252525]'
                        )}
                      >
                        <th className="px-6 py-4 font-bold text-text-main dark:text-white whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {row.size}
                            {row.popular && (
                              <span className="text-[10px] bg-primary text-black px-1.5 py-0.5 rounded font-bold">
                                Phổ biến
                              </span>
                            )}
                          </div>
                        </th>
                        <td className={cn('px-6 py-4', row.popular ? 'text-text-main dark:text-gray-200 font-medium' : 'text-secondary')}>{row.height}</td>
                        <td className={cn('px-6 py-4', row.popular ? 'text-text-main dark:text-gray-200 font-medium' : 'text-secondary')}>{row.weight}</td>
                        <td className={cn('px-6 py-4', row.popular ? 'text-text-main dark:text-gray-200 font-medium' : 'text-secondary')}>{row.bust}</td>
                        <td className={cn('px-6 py-4', row.popular ? 'text-text-main dark:text-gray-200 font-medium' : 'text-secondary')}>{row.waist}</td>
                        <td className={cn('px-6 py-4', row.popular ? 'text-text-main dark:text-gray-200 font-medium' : 'text-secondary')}>{row.hips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Accordion Tips */}
            <div className="flex flex-col gap-3 mt-4">
              {accordionItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-border dark:border-[#333] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-cream dark:hover:bg-[#252525] transition-colors"
                  >
                    <span className="font-bold text-base text-text-main dark:text-white">{item.title}</span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-secondary transition-transform',
                        openAccordion === index && 'rotate-180'
                      )}
                    />
                  </button>
                  {openAccordion === index && (
                    <div className="px-6 py-4 border-t border-border dark:border-[#333] text-secondary">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ / Support Section */}
        <div className="flex flex-col items-center justify-center py-10 border-t border-border dark:border-[#333]">
          <h2 className="text-xl font-bold mb-6 text-text-main dark:text-white">Bạn vẫn còn thắc mắc?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/chat">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border dark:border-[#333] hover:bg-cream dark:hover:bg-[#333] transition-colors text-text-main dark:text-white">
                <MessageCircle className="w-5 h-5 text-primary" />
                Chat với tư vấn viên
              </button>
            </Link>
            <Link href="/privacy">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border dark:border-[#333] hover:bg-cream dark:hover:bg-[#333] transition-colors text-text-main dark:text-white">
                <FileText className="w-5 h-5 text-primary" />
                Chính sách đổi trả
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#1a1a1a] border-t border-border dark:border-[#333] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden z-50">
        <Link href="/ai-studio" className="block">
          <button className="w-full flex items-center justify-center gap-2 bg-primary text-text-main font-bold py-3 px-4 rounded-lg">
            <QrCode className="w-5 h-5" />
            Thử AI Scan ngay
          </button>
        </Link>
      </div>
    </div>
  );
}
