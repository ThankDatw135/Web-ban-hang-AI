/**
 * Fashion AI - AI Processing Status Page
 * 
 * Trang hiển thị trạng thái xử lý AI
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AIProcessingPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('job') || 'AI-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  const type = searchParams.get('type') || 'tryon';
  
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'processing' | 'completed' | 'error'>('processing');
  const [currentStep, setCurrentStep] = useState(0);

  const steps = type === 'tryon' ? [
    { label: 'Phân tích hình ảnh', icon: 'image_search' },
    { label: 'Nhận diện cơ thể', icon: 'person' },
    { label: 'Áp dụng trang phục', icon: 'checkroom' },
    { label: 'Tối ưu hóa kết quả', icon: 'auto_fix_high' },
  ] : [
    { label: 'Phân tích số đo', icon: 'straighten' },
    { label: 'So sánh với bảng size', icon: 'compare' },
    { label: 'Tính toán độ vừa', icon: 'calculate' },
    { label: 'Đề xuất kích cỡ', icon: 'recommend' },
  ];

  useEffect(() => {
    // Simulate processing progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('completed');
          return 100;
        }
        const newProgress = prev + Math.random() * 15;
        setCurrentStep(Math.min(Math.floor(newProgress / 25), 3));
        return Math.min(newProgress, 100);
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header cartItemsCount={0} />
      
      <main className="flex-1 bg-cream">
        <div className="container-app py-16">
          <div className="max-w-lg mx-auto text-center">
            {/* Status icon */}
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              status === 'completed' ? 'bg-green-100' : 
              status === 'error' ? 'bg-red-100' : 
              'bg-primary/10'
            }`}>
              {status === 'processing' ? (
                <div className="relative">
                  <span className="material-symbols-outlined text-5xl text-primary animate-pulse">
                    smart_toy
                  </span>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm animate-spin">
                      autorenew
                    </span>
                  </div>
                </div>
              ) : status === 'completed' ? (
                <span className="material-symbols-outlined text-5xl text-green-600">check_circle</span>
              ) : (
                <span className="material-symbols-outlined text-5xl text-red-600">error</span>
              )}
            </div>

            <h1 className="text-3xl font-bold mb-2">
              {status === 'processing' ? 'AI đang xử lý...' :
               status === 'completed' ? 'Xử lý hoàn tất!' :
               'Đã xảy ra lỗi'}
            </h1>
            <p className="text-gray-600 mb-8">
              {status === 'processing' 
                ? 'Vui lòng đợi trong giây lát, AI đang phân tích yêu cầu của bạn.' 
                : status === 'completed'
                ? 'Kết quả đã sẵn sàng để xem.'
                : 'Không thể hoàn thành xử lý. Vui lòng thử lại.'}
            </p>

            {/* Progress card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm text-left mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Mã công việc</span>
                <span className="font-mono text-primary font-bold">{jobId}</span>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Tiến trình</span>
                  <span className="font-bold">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      index < currentStep ? 'bg-green-50' :
                      index === currentStep ? 'bg-primary/10' :
                      'bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index < currentStep ? 'bg-green-500 text-white' :
                      index === currentStep ? 'bg-primary text-white' :
                      'bg-gray-200 text-gray-400'
                    }`}>
                      {index < currentStep ? (
                        <span className="material-symbols-outlined text-sm">check</span>
                      ) : (
                        <span className="material-symbols-outlined text-sm">{step.icon}</span>
                      )}
                    </div>
                    <span className={`text-sm ${
                      index <= currentStep ? 'font-semibold' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                    {index === currentStep && status === 'processing' && (
                      <span className="ml-auto text-xs text-primary animate-pulse">Đang xử lý...</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            {status === 'completed' && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-studio">
                  <button className="w-full sm:w-auto px-8 h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                    Xem kết quả
                  </button>
                </Link>
                <Link href="/products">
                  <button className="w-full sm:w-auto px-8 h-12 rounded-full border border-gray-300 font-bold hover:bg-white transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                    Tiếp tục mua sắm
                  </button>
                </Link>
              </div>
            )}

            {status === 'error' && (
              <button 
                onClick={() => window.location.reload()}
                className="px-8 h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <span className="material-symbols-outlined text-[20px]">refresh</span>
                Thử lại
              </button>
            )}

            {/* Info note */}
            {status === 'processing' && (
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <span className="material-symbols-outlined text-[18px]">info</span>
                <span>Thời gian xử lý trung bình: 10-30 giây</span>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
