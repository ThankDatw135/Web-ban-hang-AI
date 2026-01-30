/**
 * AI Body Measurement Guide - Fashion AI
 * 
 * Hướng dẫn đo body với AI:
 * - 3 bước: Lighting, Camera, Posture
 * - Progress stepper
 * - Privacy notice
 * - Sticky CTA: Start Scanning
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sun, 
  Camera, 
  User, 
  AlertCircle, 
  Check, 
  XCircle,
  Sparkles,
  Info,
  ScanLine,
  HelpCircle,
  Shirt
} from 'lucide-react';
import { Header, Footer } from '@/components';

const steps = [
  { id: 1, name: 'Ánh sáng', icon: Sun },
  { id: 2, name: 'Camera', icon: Camera },
  { id: 3, name: 'Tư thế', icon: User },
];

export default function SizeGuidePage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Side Navigation (Desktop Stepper) */}
        <aside className="hidden lg:flex w-64 flex-col gap-8 p-8 border-r border-border overflow-y-auto bg-white">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-primary font-bold mb-6">
              Tiến Độ Hướng Dẫn
            </h3>
            <div className="flex flex-col gap-1 relative">
              {/* Connecting Line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-primary/20 -z-10" />
              
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                
                return (
                  <div
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center gap-4 py-3 cursor-pointer transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`size-8 rounded-full flex items-center justify-center ${
                        isActive
                          ? 'bg-primary text-white shadow-lg shadow-primary/20'
                          : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-white border border-primary/30 text-primary'
                      }`}
                    >
                      {isCompleted ? <Check className="size-4" /> : <span className="text-sm font-bold">{step.id}</span>}
                    </div>
                    <span className={`text-sm font-medium ${isActive ? 'font-bold text-text-main' : 'text-text-main'}`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="mt-auto p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-start gap-3">
              <Info className="size-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-text-main mb-1">Quyền Riêng Tư</p>
                <p className="text-xs text-text-muted leading-relaxed">
                  Ảnh quét của bạn được xử lý an toàn và xóa sau khi phân tích số đo.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative scroll-smooth bg-cream pb-32">
          <div className="max-w-[800px] mx-auto px-6 py-10 md:px-12 md:py-16 flex flex-col gap-16">
            {/* Hero Section */}
            <div className="flex flex-col gap-4 text-center md:text-left">
              <div className="inline-flex self-center md:self-start items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-2">
                <Sparkles className="size-3" />
                Bắt Đầu
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-text-main leading-[1.1] tracking-tight">
                Hướng Dẫn <span className="text-primary">Đo Body AI</span>
              </h1>
              <p className="text-lg text-text-muted font-medium max-w-2xl leading-relaxed">
                Vừa vặn hoàn hảo, được hỗ trợ bởi AI. Làm theo ba bước đơn giản này để đảm bảo quét 3D chính xác cho việc may đo tùy chỉnh.
              </p>
            </div>

            {/* Step 01: Lighting */}
            <section className="group">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-6xl font-light text-primary/40">01</span>
                <h2 className="text-2xl font-bold text-text-main">Ánh Sáng & Môi Trường</h2>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col justify-center gap-4">
                  <div className="flex items-start gap-3">
                    <Sun className="size-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold text-text-main">Ánh Sáng Phía Trước</h4>
                      <p className="text-sm text-text-muted mt-1">
                        Đảm bảo nguồn sáng chính ở phía trước bạn, không phải phía sau.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="size-5 flex items-center justify-center text-primary mt-1">
                      <div className="size-4 bg-gradient-to-r from-black to-white rounded-sm" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-main">Độ Tương Phản Rõ Ràng</h4>
                      <p className="text-sm text-text-muted mt-1">
                        Mặc quần áo có màu tương phản với tường nền.
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 p-3 bg-red-50 rounded-lg border border-red-100 flex items-center gap-2">
                    <XCircle className="size-4 text-red-500" />
                    <span className="text-xs font-medium text-red-700">
                      Tránh bóng đậm hoặc ánh sáng từ phía sau
                    </span>
                  </div>
                </div>
                <div className="flex-1 aspect-video rounded-xl overflow-hidden bg-secondary-100">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                    alt="Ánh sáng tự nhiên trong phòng"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Step 02: Camera */}
            <section className="group">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-6xl font-light text-primary/40">02</span>
                <h2 className="text-2xl font-bold text-text-main">Vị Trí Camera</h2>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex flex-col md:flex-row-reverse gap-6">
                <div className="flex-1 flex flex-col justify-center gap-4">
                  <p className="text-text-muted leading-relaxed mb-2">
                    Đặt thiết bị trên bề mặt ổn định như bàn hoặc kệ. Camera nên ở khoảng ngang thắt lưng.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm font-medium text-text-main">
                      <Check className="size-5 text-green-600" />
                      Hướng dọc (Vertical)
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-text-main">
                      <Check className="size-5 text-green-600" />
                      Cao ngang thắt lưng (~1m)
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-text-main">
                      <Check className="size-5 text-green-600" />
                      Điện thoại đứng thẳng (90°)
                    </li>
                  </ul>
                </div>
                <div className="flex-1 aspect-video rounded-xl overflow-hidden bg-secondary-100">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600"
                    alt="Điện thoại đặt trên bàn"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Step 03: Posture */}
            <section className="group">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-6xl font-light text-primary/40">03</span>
                <h2 className="text-2xl font-bold text-text-main">Tư Thế & Trang Phục</h2>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col justify-center gap-4">
                  <div className="flex items-start gap-3">
                    <User className="size-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold text-text-main">Tư Thế Chữ A</h4>
                      <p className="text-sm text-text-muted mt-1">
                        Hai chân rộng bằng vai, hai tay hơi xa người.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shirt className="size-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold text-text-main">Quần Áo Ôm</h4>
                      <p className="text-sm text-text-muted mt-1">
                        Mặc đồ ôm sát (như đồ gym) để có độ chính xác tốt nhất.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="size-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold text-text-main">Bỏ Phụ Kiện</h4>
                      <p className="text-sm text-text-muted mt-1">
                        Cởi áo khoác, khăn quàng hoặc lớp áo rộng.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 aspect-video rounded-xl overflow-hidden bg-secondary-100">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600"
                    alt="Tư thế đo"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Sticky Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-white/80 backdrop-blur-md border-t border-border flex justify-center z-40">
        <div className="w-full max-w-[800px] flex items-center justify-between gap-4">
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Sẵn sàng đo?</span>
            <span className="text-sm text-text-main">Thời gian ước tính: 2 phút</span>
          </div>
          <Link
            href="/body-scan"
            className="flex-1 md:flex-none md:min-w-[320px] bg-primary hover:bg-primary/90 text-white h-14 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <ScanLine className="size-5" />
            Bắt Đầu Quét
          </Link>
        </div>
      </div>
    </div>
  );
}
