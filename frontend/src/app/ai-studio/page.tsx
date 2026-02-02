/**
 * Fashion AI - AI Studio
 * 
 * Trang thử đồ trực tuyến với công nghệ AI
 */

'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  Wand2,
  Download,
  RefreshCw,
  Info
} from 'lucide-react';
import Link from 'next/link';

// Mock sản phẩm để thử
const sampleProducts = [
  { id: 1, name: 'Áo sơ mi trắng', price: '850.000đ' },
  { id: 2, name: 'Đầm dự tiệc đen', price: '1.250.000đ' },
  { id: 3, name: 'Áo khoác denim', price: '950.000đ' },
  { id: 4, name: 'Quần tây navy', price: '750.000đ' },
];

export default function AIStudioPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="min-h-screen py-12">
      <div className="container-app">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by AI
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              AI Studio
            </span>
          </h1>
          
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Thử đồ trực tuyến với công nghệ AI tiên tiến. Tải ảnh của bạn lên và xem 
            sản phẩm trông như thế nào trên người mình.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Upload Area */}
          <div>
            <div className="card p-6 mb-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-accent" />
                Tải ảnh của bạn
              </h2>
              
              {/* Upload zone */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center hover:border-accent transition-colors cursor-pointer">
                <div className="mb-4">
                  <Camera className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
                </div>
                <p className="font-medium mb-1">Kéo thả hoặc click để tải ảnh</p>
                <p className="text-sm text-secondary mb-4">
                  Hỗ trợ JPG, PNG - Tối đa 10MB
                </p>
                <button className="btn-accent">
                  <ImageIcon className="w-5 h-5" />
                  Chọn ảnh
                </button>
              </div>
              
              {/* Tips */}
              <div className="mt-4 p-4 rounded-xl bg-accent/5 border border-accent/10">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-accent mb-1">Mẹo để có kết quả tốt nhất:</p>
                    <ul className="text-secondary space-y-1">
                      <li>• Ảnh chụp thẳng, rõ nét, đủ sáng</li>
                      <li>• Mặc đồ đơn giản (áo phông, quần jean)</li>
                      <li>• Tư thế đứng thẳng, tay xuôi tự nhiên</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Product */}
            <div className="card p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-accent" />
                Chọn sản phẩm để thử
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                {sampleProducts.map((product) => (
                  <button
                    key={product.id}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-accent transition-colors text-left"
                  >
                    <div className="aspect-square rounded-lg bg-gray-100 dark:bg-[#2c2822] mb-2 flex items-center justify-center">
                      <span className="text-2xl">👕</span>
                    </div>
                    <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                    <p className="text-accent font-bold text-sm">{product.price}</p>
                  </button>
                ))}
              </div>
              
              <Link href="/products" className="block mt-4 text-center text-sm text-primary hover:underline">
                Xem thêm sản phẩm →
              </Link>
            </div>
          </div>

          {/* Right - Result Area */}
          <div>
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Kết quả</h2>
              
              {/* Result placeholder */}
              <div className="aspect-[3/4] rounded-2xl bg-gray-100 dark:bg-[#2c2822] flex items-center justify-center mb-4">
                {isProcessing ? (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <p className="font-medium">AI đang xử lý...</p>
                    <p className="text-sm text-secondary">Vui lòng chờ trong giây lát</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 dark:text-gray-600">
                    <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                    <p>Kết quả sẽ hiển thị ở đây</p>
                  </div>
                )}
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-3">
                <button className="btn-accent flex-1" disabled={isProcessing}>
                  <Sparkles className="w-5 h-5" />
                  Thử đồ
                </button>
                <button className="btn-outline flex-1" disabled>
                  <Download className="w-5 h-5" />
                  Tải về
                </button>
                <button className="btn-ghost w-12" disabled>
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              
              {/* Disclaimer */}
              <p className="text-xs text-secondary text-center mt-4">
                Kết quả chỉ mang tính tham khảo. Màu sắc và chi tiết thực tế có thể khác.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
