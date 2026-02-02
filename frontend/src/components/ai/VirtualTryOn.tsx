/**
 * Fashion AI - Virtual Try-On Component
 */

'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Sparkles, X, Loader2 } from 'lucide-react';
import { useVirtualTryOn, useAIJob } from '@/hooks/use-ai';
import { useUploadAvatar as useUploadImage } from '@/hooks/use-user'; // Reuse uploadAvatar logic for now or generic upload

interface VirtualTryOnProps {
  productId: string;
  productImage: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VirtualTryOn({ productId, productImage, isOpen, onClose }: VirtualTryOnProps) {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  
  const { mutate: upload, isPending: isUploading } = useUploadImage(); // Assuming this returns URL
  const { mutate: startTryOn, isPending: isStarting } = useVirtualTryOn();
  
  // Poll job
  const { data: job, isLoading: isJobLoading } = useAIJob(jobId);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          upload(file, {
              onSuccess: (url) => setUserImage(url as any) // Fix type cast if needed
          });
      }
  };

  const handleStart = () => {
      if (!userImage) return;
      startTryOn({ productId, userImageUrl: userImage }, {
          onSuccess: (data) => setJobId(data.id)
      });
  };

  const handleClose = () => {
      setJobId(null);
      setUserImage(null);
      onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white dark:bg-[#1e1a14] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col relative shadow-2xl">
            <button onClick={handleClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full z-10">
                <X className="w-6 h-6" />
            </button>

            <div className="p-6 md:p-8 flex-1">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                        Phòng thay đồ ảo
                    </h2>
                    <p className="text-secondary mt-2">Tải ảnh của bạn lên để xem bạn mặc bộ đồ này như thế nào nhé!</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-stretch h-full">
                    {/* User Image */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-center">1. Ảnh của bạn</h3>
                        <div 
                           onClick={() => fileInputRef.current?.click()}
                           className={`aspect-[3/4] rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:border-primary bg-gray-50 dark:bg-gray-800/50 overflow-hidden relative ${userImage ? 'border-primary' : 'border-gray-300'}`}
                        >
                            {isUploading ? (
                                <div className="flex flex-col items-center gap-2">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                    <span className="text-sm">Đang tải ảnh...</span>
                                </div>
                            ) : userImage ? (
                                <Image src={userImage} alt="User" fill className="object-cover" />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-secondary p-4 text-center">
                                    <Upload className="w-8 h-8" />
                                    <span className="text-sm">Nhấn để tải ảnh lên</span>
                                </div>
                            )}
                            <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </div>
                    </div>

                    {/* Product Image */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-center">2. Trang phục</h3>
                        <div className="aspect-[3/4] rounded-xl border border-gray-200 dark:border-gray-800 bg-white relative overflow-hidden">
                             <Image src={productImage} alt="Product" fill className="object-cover" />
                        </div>
                    </div>

                    {/* Result */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-center">3. Kết quả</h3>
                        <div className="aspect-[3/4] rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-col items-center justify-center relative overflow-hidden">
                             {jobId ? (
                                 job?.status === 'COMPLETED' && job.resultUrl ? (
                                     <Image src={job.resultUrl} alt="Result" fill className="object-cover" />
                                 ) : job?.status === 'FAILED' ? (
                                     <div className="text-error text-center p-4">
                                         <p>Xử lý thất bại</p>
                                         <button onClick={() => setJobId(null)} className="btn-ghost text-sm mt-2">Thử lại</button>
                                     </div>
                                 ) : (
                                     <div className="flex flex-col items-center gap-3 text-purple-600">
                                         <Loader2 className="w-10 h-10 animate-spin" />
                                         <p className="font-medium animate-pulse">AI đang xử lý...</p>
                                     </div>
                                 )
                             ) : (
                                 <div className="text-secondary text-sm text-center p-4">
                                     Kết quả sẽ hiển thị tại đây
                                 </div>
                             )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button 
                       onClick={handleStart}
                       disabled={!userImage || !!jobId}
                       className="btn-primary px-8 py-3 text-lg shadow-lg shadow-purple-500/30 bg-gradient-to-r from-purple-600 to-primary border-none disabled:opacity-50 disabled:shadow-none"
                    >
                        {jobId ? 'Đang thực hiện...' : 'Bắt đầu thử đồ'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
