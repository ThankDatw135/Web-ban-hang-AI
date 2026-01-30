/**
 * AI 3D Body Profile & Scanning - Fashion AI
 * 
 * Quản lý số đo với API integration
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  RotateCcw, 
  RotateCw, 
  Shield, 
  Ruler, 
  TrendingDown,
  Minus,
  ScanLine,
  Edit,
  Camera,
  RefreshCw,
  Wand2,
  ChevronRight,
  Loader2,
  Save
} from 'lucide-react';
import { Header, Footer } from '@/components';
import { useMeasurements, useSaveMeasurements, useBodyScan, type Measurements } from '@/hooks/useAI';
import { toastSuccess, toastError } from '@/stores';

const steps = [
  {
    icon: Camera,
    title: '1. Đặt Thiết Bị',
    description: 'Đặt điện thoại trên bề mặt ổn định ngang thắt lưng, hướng dọc.',
  },
  {
    icon: RefreshCw,
    title: '2. Xoay Chậm',
    description: 'Đứng lùi lại và xoay chậm 360 độ trong khi camera ghi lại hình dáng của bạn.',
  },
  {
    icon: Wand2,
    title: '3. AI Tính Toán',
    description: 'AI thời trang của chúng tôi xây dựng bản sao kỹ thuật số và trích xuất hơn 60 số đo chính xác.',
  },
];

export default function BodyScanPage() {
  const [rotation, setRotation] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Measurements>({});

  const { data: measurements, isLoading } = useMeasurements();
  const saveMeasurements = useSaveMeasurements();
  const bodyScan = useBodyScan();

  useEffect(() => {
    if (measurements) {
      setFormData(measurements);
    }
  }, [measurements]);

  const handleSave = async () => {
    try {
      await saveMeasurements.mutateAsync(formData);
      toastSuccess('Thành công', 'Đã lưu số đo!');
      setEditMode(false);
    } catch {
      toastError('Lỗi', 'Không thể lưu số đo');
    }
  };

  const displayMeasurements = [
    { key: 'chest', name: 'Ngực', unit: 'cm' },
    { key: 'waist', name: 'Eo', unit: 'cm' },
    { key: 'hips', name: 'Hông', unit: 'cm' },
    { key: 'inseam', name: 'Đùi trong', unit: 'cm' },
  ];

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Chưa cập nhật';
    return new Date(dateString).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-10 py-8 lg:py-12">
        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: 3D Visualization */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="sticky top-24 flex flex-col gap-6">
              {/* 3D Viewer */}
              <div className="relative group w-full aspect-[3/4] bg-white rounded-3xl shadow-lg overflow-hidden border border-border">
                {/* 3D Model Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-b from-secondary-50 to-secondary-100 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500"
                    alt="3D Body Model"
                    className="w-full h-full object-cover opacity-50 grayscale transition-transform duration-300"
                    style={{ transform: `rotateY(${rotation}deg)` }}
                  />
                  {/* Overlay mesh effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(199,162,107,0.03)_2px),linear-gradient(90deg,transparent_2px,rgba(199,162,107,0.03)_2px)] bg-[length:20px_20px]" />
                </div>

                {/* Controls Overlay */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur rounded-full px-5 py-2 shadow-sm border border-white/50">
                  <button
                    onClick={() => setRotation(r => r - 45)}
                    className="p-2 hover:bg-secondary-100 rounded-full text-text-muted transition-colors"
                  >
                    <RotateCcw className="size-5" />
                  </button>
                  <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                    360° View
                  </span>
                  <button
                    onClick={() => setRotation(r => r + 45)}
                    className="p-2 hover:bg-secondary-100 rounded-full text-text-muted transition-colors"
                  >
                    <RotateCw className="size-5" />
                  </button>
                </div>

                {/* Status Badge */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
                  <span className="relative flex size-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
                  </span>
                  <span className="text-xs font-bold text-text-main">Live Model</span>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl border border-border">
                <Shield className="size-5 text-primary mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-text-main">Riêng Tư & Bảo Mật</h4>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Dữ liệu quét của bạn được mã hóa end-to-end và chỉ bạn mới có thể xem.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Data & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-10 order-1 lg:order-2">
            {/* Page Heading */}
            <div className="flex flex-col gap-4">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white border border-border px-3 py-1 text-xs font-bold text-text-main shadow-sm">
                <Sparkles className="size-4 text-accent" />
                <span>AI Confidence: {measurements?.confidence || 0}%</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight leading-[1.1]">
                Hồ Sơ Body Kỹ Thuật Số
              </h1>
              <p className="text-lg text-text-muted font-normal leading-relaxed max-w-xl">
                Quản lý số đo chính xác để có form dáng hoàn hảo.
              </p>
            </div>

            {/* Loading */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {displayMeasurements.map((m) => (
                    <div
                      key={m.key}
                      className="group bg-white p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-text-muted text-sm font-medium">{m.name}</p>
                        <Ruler className="size-5 text-secondary-200 group-hover:text-primary transition-colors" />
                      </div>
                      {editMode ? (
                        <input
                          type="number"
                          value={formData[m.key as keyof Measurements] || ''}
                          onChange={(e) => setFormData({ ...formData, [m.key]: Number(e.target.value) })}
                          className="text-3xl font-bold text-primary w-full bg-transparent border-b border-primary/30 focus:outline-none focus:border-primary"
                        />
                      ) : (
                        <p className="text-primary text-4xl font-bold tracking-tight">
                          {formData[m.key as keyof Measurements] || '-'}
                          <span className="text-xl text-text-muted ml-1 font-medium">{m.unit}</span>
                        </p>
                      )}
                      <div className="mt-3">
                        <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded-md">
                          <Minus className="size-3" />
                          <span>Ổn định</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Last Updated */}
                <p className="text-sm text-text-muted">
                  Cập nhật lần cuối: {formatDate(measurements?.updatedAt)}
                </p>

                {/* CTA Section */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-border relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 size-40 bg-accent/5 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-text-main mb-2">
                      {editMode ? 'Chỉnh sửa số đo' : 'Sẵn sàng cập nhật số đo?'}
                    </h3>
                    <p className="text-text-muted text-sm mb-6 max-w-md">
                      {editMode 
                        ? 'Nhập số đo mới và nhấn Lưu để cập nhật.'
                        : 'Số đo thay đổi theo thời gian. Cập nhật hồ sơ với lần quét mới hoặc nhập thủ công.'}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {editMode ? (
                        <>
                          <button 
                            onClick={handleSave}
                            disabled={saveMeasurements.isPending}
                            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-xl transition-all disabled:opacity-50"
                          >
                            {saveMeasurements.isPending ? (
                              <Loader2 className="size-5 animate-spin" />
                            ) : (
                              <Save className="size-5" />
                            )}
                            Lưu Số Đo
                          </button>
                          <button 
                            onClick={() => setEditMode(false)}
                            className="flex items-center justify-center gap-2 bg-white border border-border hover:bg-secondary-50 text-text-main font-bold h-12 px-6 rounded-xl transition-colors"
                          >
                            Hủy
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            disabled={bodyScan.isPending}
                            className="flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold h-12 px-8 rounded-xl transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 transform hover:-translate-y-0.5 disabled:opacity-50"
                          >
                            {bodyScan.isPending ? (
                              <Loader2 className="size-5 animate-spin" />
                            ) : (
                              <ScanLine className="size-5" />
                            )}
                            Bắt Đầu Quét 3D
                          </button>
                          <button 
                            onClick={() => setEditMode(true)}
                            className="flex items-center justify-center gap-2 bg-white border border-border hover:bg-secondary-50 text-text-main font-bold h-12 px-6 rounded-xl transition-colors"
                          >
                            <Edit className="size-5" />
                            Nhập Thủ Công
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20 lg:mt-32 pt-12 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-text-main">Chính Xác Trong 3 Bước</h2>
              <p className="text-text-muted mt-2">Không cần thước dây. Chỉ cần điện thoại của bạn.</p>
            </div>
            <Link
              href="/size-guide"
              className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              Xem hướng dẫn đầy đủ
              <ChevronRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-border hover:shadow-md transition-shadow"
                >
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-text-main">{step.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
