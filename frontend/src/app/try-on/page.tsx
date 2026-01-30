/**
 * AI Virtual Try-On Studio - Fashion AI
 * 
 * Kết hợp hoàn chỉnh:
 * - V2: Split view interface với Upload Photo / Choose Model
 * - V1: AI Size Recommendation + AI Stylist Match % badges
 * 
 * Tính năng:
 * - Upload ảnh hoặc chọn model mẫu
 * - AI Magic Try-On với hiệu ứng glow
 * - AI Size Recommendation (98% accuracy)
 * - Complete the Look với Match % badges
 * - Floating AI Stylist chat
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Camera, 
  Upload, 
  Wand2, 
  Heart, 
  Info, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  User,
  Ruler,
  Check,
  Bot,
  ShoppingBag
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock product data
const selectedProduct = {
  id: '1',
  name: 'Silk Evening Gown',
  description: '100% Mulberry Silk • Size M',
  price: 28800000,
  image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
  inStock: true,
};

// Mock models
const models = [
  { id: '1', name: 'Model A', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' },
  { id: '2', name: 'Model B', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300' },
  { id: '3', name: 'Model C', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300' },
];

// Mock recommendations with match %
const recommendations = [
  {
    id: '1',
    name: 'Baroque Pearl Choker',
    price: 7680000,
    match: 98,
    material: 'Freshwater Pearls',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
  },
  {
    id: '2',
    name: 'Velvet Midnight Blazer',
    price: 21360000,
    match: 95,
    material: 'Italian Velvet',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
  },
  {
    id: '3',
    name: 'Pleated Chiffon Skirt',
    price: 10800000,
    match: 92,
    material: 'Recycled Polyester',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?w=400',
  },
  {
    id: '4',
    name: 'Slate Wool Suit',
    price: 36000000,
    match: 88,
    material: 'Merino Wool',
    forHim: true,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
  },
];

export default function TryOnPage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'model'>('upload');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [showSizeRecommendation, setShowSizeRecommendation] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleTryOn = async () => {
    if (!uploadedImage && !selectedModel) return;
    
    setIsProcessing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setTryOnResult('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600');
    setIsProcessing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setSelectedModel(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl flex flex-col gap-12">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
            <Sparkles className="size-4" />
            AI Powered
          </div>
          <h1 className="text-text-main text-4xl md:text-5xl font-black leading-tight tracking-tight">
            Virtual Atelier
          </h1>
          <p className="text-text-muted text-lg font-normal leading-normal max-w-2xl">
            Trải nghiệm tương lai của việc thử đồ. Tải ảnh của bạn lên hoặc chọn người mẫu để xem bộ sưu tập mới nhất trên bạn.
          </p>
        </div>

        {/* Main Split View Interface */}
        <div className="relative bg-white rounded-3xl shadow-lg p-6 md:p-8 overflow-visible border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[600px]">
            {/* Left Panel: Input */}
            <div className="flex flex-col gap-6 h-full">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-lg font-bold text-text-main">Ảnh Của Bạn</h3>
                <div className="flex bg-secondary-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('upload')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                      activeTab === 'upload'
                        ? 'bg-white shadow-sm text-primary'
                        : 'text-text-muted hover:text-text-main'
                    }`}
                  >
                    Tải Ảnh Lên
                  </button>
                  <button
                    onClick={() => setActiveTab('model')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                      activeTab === 'model'
                        ? 'bg-white shadow-sm text-primary'
                        : 'text-text-muted hover:text-text-main'
                    }`}
                  >
                    Chọn Model
                  </button>
                </div>
              </div>

              {activeTab === 'upload' ? (
                <label className="flex-grow border-2 border-dashed border-primary/30 bg-cream rounded-2xl flex flex-col items-center justify-center relative group hover:border-primary transition-colors cursor-pointer overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  {uploadedImage ? (
                    <div className="absolute inset-0">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-bold">Nhấn để thay đổi</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8 z-10 flex flex-col items-center gap-4 transition-transform group-hover:scale-105 duration-300">
                      <div className="size-20 rounded-full bg-white shadow-md flex items-center justify-center text-primary mb-2">
                        <Camera className="size-10" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-text-main">Tải ảnh của bạn lên</p>
                        <p className="text-sm text-text-muted mt-1">Kéo thả hoặc nhấn để chọn file</p>
                      </div>
                      <p className="text-xs text-text-muted mt-4 max-w-[200px]">
                        Định dạng: JPG, PNG, HEIC. Tối đa: 15MB.
                      </p>
                    </div>
                  )}

                  {/* Background Pattern */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ 
                      backgroundImage: 'radial-gradient(#c7a26b 1px, transparent 1px)', 
                      backgroundSize: '20px 20px' 
                    }}
                  />
                </label>
              ) : (
                <div className="flex-grow bg-cream rounded-2xl p-4 overflow-y-auto">
                  <div className="grid grid-cols-3 gap-4">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model.id);
                          setUploadedImage(null);
                        }}
                        className={`aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
                          selectedModel === model.id
                            ? 'border-primary ring-2 ring-primary/20 scale-[1.02]'
                            : 'border-transparent hover:border-primary/50'
                        }`}
                      >
                        <img
                          src={model.image}
                          alt={model.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Size Recommendation Box - từ V1 */}
              <div className="p-5 bg-gradient-to-br from-white to-accent/5 rounded-xl border border-accent/20 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Ruler className="size-12 text-accent" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-5 text-accent" />
                      <h3 className="font-bold text-text-main">Chưa chắc về size?</h3>
                    </div>
                    <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-full">
                      AI Powered
                    </span>
                  </div>
                  <p className="text-sm text-text-muted mb-4">
                    AI của chúng tôi có thể gợi ý size phù hợp với độ chính xác 98% dựa trên một bức ảnh hoặc số đo cơ bản.
                  </p>
                  <button 
                    onClick={() => setShowSizeRecommendation(!showSizeRecommendation)}
                    className="w-full py-2.5 bg-white border border-accent/30 text-accent font-bold rounded-lg hover:bg-accent hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <User className="size-4" />
                    Tìm Size Với AI
                  </button>
                  
                  {showSizeRecommendation && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 border border-dashed border-border rounded-lg text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors">
                          <Camera className="size-5 text-text-muted mx-auto" />
                          <div className="text-xs mt-1 text-text-main">Quét Body</div>
                        </div>
                        <div className="p-3 border border-dashed border-border rounded-lg text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors">
                          <Ruler className="size-5 text-text-muted mx-auto" />
                          <div className="text-xs mt-1 text-text-main">Nhập Số Đo</div>
                        </div>
                      </div>
                      <p className="text-xs text-primary mt-3 flex items-center gap-1">
                        <Check className="size-3" />
                        AI Gợi Ý: Size M là phù hợp nhất với bạn.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Center Action Button */}
            <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 flex flex-col items-center justify-center my-4 lg:my-0">
              <button
                onClick={handleTryOn}
                disabled={isProcessing || (!uploadedImage && !selectedModel)}
                className="group relative flex items-center justify-center gap-3 px-8 py-5 bg-text-main text-white rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent opacity-20 group-hover:opacity-40 animate-pulse" />
                
                {isProcessing ? (
                  <>
                    <div className="size-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-lg font-bold tracking-wide relative z-10">Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="size-8 text-accent group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-lg font-bold tracking-wide relative z-10">AI Magic Try-on</span>
                  </>
                )}
              </button>
              <p className="text-xs text-text-muted mt-3 font-medium tracking-wide uppercase">
                Tạo trong ~5 giây
              </p>
            </div>

            {/* Right Panel: Product */}
            <div className="flex flex-col gap-6 h-full">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-lg font-bold text-text-main">Sản Phẩm Đã Chọn</h3>
                <span className="text-sm text-green-600 font-bold">
                  {selectedProduct.inStock ? 'Còn hàng' : 'Hết hàng'}
                </span>
              </div>
              
              <div className="flex-grow bg-white rounded-2xl relative overflow-hidden group shadow-sm border border-border">
                <div className="absolute inset-0 bg-secondary-100">
                  <img
                    src={tryOnResult || selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {tryOnResult && (
                    <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Sparkles className="size-3" />
                      AI Generated
                    </div>
                  )}
                </div>
                
                {/* Product Details Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-border shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-text-main leading-tight">{selectedProduct.name}</h4>
                    <p className="text-sm text-text-muted mt-1">{selectedProduct.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-primary">
                      {formatPrice(selectedProduct.price)}
                    </span>
                  </div>
                </div>
                
                {/* Top Right Actions */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white/80 hover:bg-white p-2 rounded-full backdrop-blur-md shadow-sm transition-colors text-text-muted hover:text-red-500">
                    <Heart className="size-5" />
                  </button>
                  <button className="bg-white/80 hover:bg-white p-2 rounded-full backdrop-blur-md shadow-sm transition-colors text-text-muted hover:text-primary">
                    <Info className="size-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2">
                <ShoppingBag className="size-5" />
                Thêm Vào Giỏ
              </button>
            </div>
          </div>
        </div>

        {/* Complete the Look - với AI Stylist Match % từ V1 */}
        <div className="flex flex-col gap-6 pb-20">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <span className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-[0_0_20px_rgba(168,85,247,0.4)] animate-pulse">
                <Sparkles className="size-3" />
                AI STYLIST
              </span>
              <h3 className="text-text-main text-xl font-bold leading-tight">
                Hoàn Thiện Phong Cách
              </h3>
            </div>
            <div className="flex gap-2">
              <button className="size-8 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <ChevronLeft className="size-4" />
              </button>
              <button className="size-8 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Container */}
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {recommendations.map((item) => (
              <div
                key={item.id}
                className="min-w-[280px] md:min-w-[320px] snap-start bg-white p-3 rounded-xl border border-transparent hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary-100 relative mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Match % Badge - từ V1 */}
                  <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded text-primary border border-primary/20">
                      {item.forHim ? 'FOR HIM' : `${item.match}% MATCH`}
                    </span>
                  </div>
                  
                  <button className="absolute bottom-3 right-3 size-8 bg-white text-primary rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white">
                    <Plus className="size-4" />
                  </button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-text-muted mt-1">{item.material}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">{formatPrice(item.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Floating AI Stylist Chat Button */}
      <button className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-text-main text-white px-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform cursor-pointer group">
        <span className="relative">
          <span className="absolute -top-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-text-main" />
          <Bot className="size-6" />
        </span>
        <span className="font-bold text-sm hidden group-hover:inline-block transition-all duration-300">
          Hỏi AI Stylist
        </span>
      </button>

      <Footer />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
