/**
 * Fashion AI - Size Recommender Component
 */

'use client';

import { useState } from 'react';
import { Ruler, X, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSizeRecommend } from '@/hooks/use-ai';

interface SizeRecommenderProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectSize: (size: string) => void;
}

export default function SizeRecommender({ productId, isOpen, onClose, onSelectSize }: SizeRecommenderProps) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [step, setStep] = useState<'INPUT' | 'RESULT'>('INPUT');
  const [result, setResult] = useState<{ size: string; confidence: number; details: string } | null>(null);

  const { mutate: recommend, isPending } = useSizeRecommend();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!height || !weight) return;

      recommend({
          productId,
          height: Number(height),
          weight: Number(weight)
      }, {
          onSuccess: (data: any) => {
              setResult({
                  size: data?.recommendedSize || 'L',
                  confidence: data?.confidence || 95,
                  details: data?.details || 'Dựa trên số đo của bạn.'
              });
              setStep('RESULT');
          }
      });
  };

  const handleApply = () => {
      if (result) {
          onSelectSize(result.size);
          onClose();
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white dark:bg-[#1e1a14] rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full z-10">
                <X className="w-5 h-5" />
            </button>

            <div className="bg-primary/10 p-6 text-center">
                <div className="w-12 h-12 bg-white dark:bg-[#1e1a14] rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Ruler className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-primary">Gợi ý size thông minh</h2>
                <p className="text-sm text-secondary mt-1">Sử dụng AI để tìm size phù hợp nhất với bạn</p>
            </div>

            <div className="p-6">
                {step === 'INPUT' ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Chiều cao (cm)</label>
                            <input 
                               type="number" 
                               placeholder="VD: 170"
                               className="input"
                               value={height}
                               onChange={e => setHeight(e.target.value)}
                               required
                               min={100}
                               max={250}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Cân nặng (kg)</label>
                            <input 
                               type="number" 
                               placeholder="VD: 60"
                               className="input"
                               value={weight}
                               onChange={e => setWeight(e.target.value)}
                               required
                               min={30}
                               max={150}
                            />
                        </div>
                        <button 
                           type="submit" 
                           className="btn-primary w-full mt-2"
                           disabled={isPending}
                        >
                            {isPending ? 'Đang phân tích...' : 'Phân tích ngay'}
                        </button>
                    </form>
                ) : (
                    <div className="text-center space-y-6 animate-in slide-in-from-right">
                        <div>
                            <p className="text-secondary text-sm mb-2">Size phù hợp nhất với bạn là:</p>
                            <div className="text-5xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
                                {result?.size}
                                <CheckCircle2 className="w-8 h-8 text-success" />
                            </div>
                            <p className="text-sm bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 py-1 px-3 rounded-full inline-block">
                                Độ tin cậy: {result?.confidence}%
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl text-left text-sm text-secondary">
                            <p className="flex gap-2">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                {result?.details || 'Dựa trên chiều cao và cân nặng của bạn, size này sẽ vừa vặn thoải mái.'}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setStep('INPUT')} className="btn-ghost flex-1">
                                Tính lại
                            </button>
                            <button onClick={handleApply} className="btn-primary flex-1">
                                Chọn size này
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
