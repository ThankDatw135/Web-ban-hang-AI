/**
 * Fashion AI - AI Studio Page
 * 
 * Trang thử đồ ảo với AI
 * Upload ảnh, chọn sản phẩm, xem kết quả
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Upload, 
  Camera, 
  Sparkles, 
  ArrowRight, 
  Image as ImageIcon,
  RefreshCw,
  Download,
  Share2,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { AIProcessing } from '@/components/ui/AIProcessing';
import { cn } from '@/lib/utils';
import { useProducts } from '@/hooks/use-products';
import { useVirtualTryOn, useAIJobStatus } from '@/hooks/use-ai';

type Step = 'upload' | 'select-product' | 'processing' | 'result';

interface SelectedProduct {
  id: string;
  name: string;
  imageUrl: string;
}

export default function AIStudioPage() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch featured products for try-on suggestions
  const { data: productsData } = useProducts({ limit: 4, sort: 'popular' });
  const suggestedProducts = productsData?.data?.map(p => ({
    id: p.id,
    name: p.name,
    imageUrl: p.images?.[0]?.url || '/placeholder.jpg',
  })) || [];

  // Virtual try-on mutation
  const virtualTryOnMutation = useVirtualTryOn();
  
  // Poll job status
  const { data: jobStatus } = useAIJobStatus(jobId, { refetchInterval: 2000 });

  // Handle job completion
  useEffect(() => {
    if (jobStatus?.status === 'COMPLETED' && jobStatus.resultUrl) {
      setResultImage(jobStatus.resultUrl);
      setCurrentStep('result');
      setJobId(null);
    } else if (jobStatus?.status === 'FAILED') {
      // Handle error - reset to select product step
      alert('AI xử lý thất bại. Vui lòng thử lại.');
      setCurrentStep('select-product');
      setJobId(null);
    }
  }, [jobStatus]);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setCurrentStep('select-product');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle product selection and start processing
  const handleProductSelect = (product: SelectedProduct) => {
    if (!uploadedImage) return;
    
    setSelectedProduct(product);
    setCurrentStep('processing');
    
    // Call virtual try-on API
    virtualTryOnMutation.mutate(
      {
        userImageUrl: uploadedImage,
        productId: product.id,
      },
      {
        onSuccess: (job) => {
          setJobId(job.id);
        },
        onError: () => {
          alert('Không thể bắt đầu thử đồ ảo. Vui lòng thử lại.');
          setCurrentStep('select-product');
        },
      }
    );
  };

  // Reset and try again
  const handleReset = () => {
    setCurrentStep('upload');
    setUploadedImage(null);
    setSelectedProduct(null);
    setJobId(null);
    setResultImage(null);
  };

  // Calculate progress from job status (estimate based on status)
  const processingProgress = 
    jobStatus?.status === 'COMPLETED' ? 100 : 
    jobStatus?.status === 'PROCESSING' ? 60 : 
    virtualTryOnMutation.isPending ? 20 : 0;

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Page header */}
        <div className="bg-gradient-to-b from-accent/10 to-transparent py-12">
          <div className="container-app text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold mb-4">
              <Sparkles className="w-5 h-5" />
              AI Virtual Try-On
            </div>
            <h1 className="text-4xl font-extrabold mb-4">
              Thử đồ ảo với <span className="text-accent">AI thông minh</span>
            </h1>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Tải ảnh của bạn lên, chọn sản phẩm muốn thử và xem kết quả ngay lập tức
            </p>
          </div>
        </div>

        <div className="container-app py-12">
          {/* Steps indicator */}
          <div className="flex items-center justify-center mb-12">
            {[
              { step: 'upload', label: 'Tải ảnh' },
              { step: 'select-product', label: 'Chọn sản phẩm' },
              { step: 'result', label: 'Xem kết quả' },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm',
                  currentStep === item.step || 
                  (currentStep === 'processing' && item.step === 'select-product') ||
                  (currentStep === 'result' && index < 2)
                    ? 'bg-accent text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-secondary'
                )}>
                  {index + 1}
                </div>
                <span className={cn(
                  'ml-2 font-medium text-sm hidden sm:block',
                  currentStep === item.step ? 'text-accent' : 'text-secondary'
                )}>
                  {item.label}
                </span>
                {index < 2 && (
                  <div className="w-12 sm:w-24 h-0.5 bg-gray-200 dark:bg-gray-700 mx-4" />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Upload */}
            {currentStep === 'upload' && (
              <div className="text-center">
                <div
                  className={cn(
                    'border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-3xl p-12',
                    'hover:border-accent hover:bg-accent/5 transition-colors cursor-pointer'
                  )}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                    <Upload className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Kéo thả ảnh vào đây</h3>
                  <p className="text-secondary mb-6">hoặc click để chọn file</p>
                  <Button variant="accent" leftIcon={<ImageIcon className="w-5 h-5" />}>
                    Chọn ảnh từ thiết bị
                  </Button>
                </div>

                {/* Tips */}
                <div className="mt-8 grid sm:grid-cols-3 gap-6">
                  {[
                    { icon: Camera, text: 'Chụp ảnh toàn thân, đứng thẳng' },
                    { icon: ImageIcon, text: 'Nền đơn giản, ánh sáng tốt' },
                    { icon: Sparkles, text: 'Kết quả chính xác nhất với ảnh rõ nét' },
                  ].map((tip, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-secondary">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <tip.icon className="w-5 h-5" />
                      </div>
                      {tip.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select product */}
            {currentStep === 'select-product' && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Uploaded image */}
                <div>
                  <h3 className="font-bold mb-4">Ảnh của bạn</h3>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {uploadedImage && (
                      <img
                        src={uploadedImage}
                        alt="Ảnh đã tải lên"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4"
                    leftIcon={<RefreshCw className="w-4 h-4" />}
                    onClick={handleReset}
                  >
                    Chọn ảnh khác
                  </Button>
                </div>

                {/* Product selection */}
                <div>
                  <h3 className="font-bold mb-4">Chọn sản phẩm để thử</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {suggestedProducts.map(product => (
                      <button
                        key={product.id}
                        onClick={() => handleProductSelect(product)}
                        className={cn(
                          'text-left rounded-2xl overflow-hidden border-2 transition-all',
                          'hover:border-accent hover:shadow-lg'
                        )}
                      >
                        <div
                          className="aspect-square bg-cover bg-center"
                          style={{ backgroundImage: `url(${product.imageUrl})` }}
                        />
                        <div className="p-3">
                          <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <Link href="/products" className="block mt-6">
                    <Button variant="outline" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Xem thêm sản phẩm
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Step 3: Processing */}
            {currentStep === 'processing' && (
              <div className="max-w-md mx-auto">
                <AIProcessing
                  variant="card"
                  message="AI đang tạo hình ảnh thử đồ..."
                  progress={processingProgress}
                />
              </div>
            )}

            {/* Step 4: Result */}
            {currentStep === 'result' && resultImage && (
              <div>
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Before */}
                  <div>
                    <h3 className="font-bold mb-4 text-center">Ảnh gốc</h3>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {uploadedImage && (
                        <img
                          src={uploadedImage}
                          alt="Ảnh gốc"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>

                  {/* After */}
                  <div>
                    <h3 className="font-bold mb-4 text-center flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      Kết quả AI
                    </h3>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={resultImage}
                        alt="Kết quả AI"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Button variant="outline" leftIcon={<Download className="w-5 h-5" />}>
                    Tải về
                  </Button>
                  <Button variant="outline" leftIcon={<Share2 className="w-5 h-5" />}>
                    Chia sẻ
                  </Button>
                  <Button variant="accent" leftIcon={<RefreshCw className="w-5 h-5" />} onClick={handleReset}>
                    Thử lại
                  </Button>
                  <Link href={`/products/${selectedProduct?.id}`}>
                    <Button variant="primary" rightIcon={<ArrowRight className="w-5 h-5" />}>
                      Mua sản phẩm này
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
