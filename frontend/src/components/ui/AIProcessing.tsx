/**
 * Fashion AI - AIProcessing Component
 * 
 * UI cho trạng thái AI đang xử lý
 * Animated glow, sparkles, progress indication
 */

import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AIProcessingProps {
  message?: string;
  progress?: number; // 0-100, optional
  variant?: 'inline' | 'card' | 'fullscreen';
  className?: string;
}

/**
 * AI Processing state component
 * 
 * @example
 * <AIProcessing message="AI đang phân tích..." />
 * <AIProcessing variant="card" progress={65} />
 */
export function AIProcessing({
  message = 'AI đang xử lý...',
  progress,
  variant = 'inline',
  className,
}: AIProcessingProps) {
  // Inline variant - nhỏ gọn
  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5',
          'bg-accent/10 rounded-lg',
          className
        )}
      >
        <div className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center animate-pulse-slow">
          <Sparkles className="w-3 h-3" />
        </div>
        <span className="text-sm font-bold text-accent">{message}</span>
      </div>
    );
  }

  // Card variant - có progress bar
  if (variant === 'card') {
    return (
      <div
        className={cn(
          'p-6 bg-white dark:bg-[#2c2822] rounded-2xl shadow-lg',
          'border border-accent/20',
          className
        )}
      >
        {/* Header with animated icon */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full" />
            <div className="relative w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center animate-pulse-slow">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="font-bold text-text-main dark:text-white">{message}</p>
            {progress !== undefined && (
              <p className="text-sm text-secondary">{progress}% hoàn thành</p>
            )}
          </div>
        </div>

        {/* Progress bar */}
        {progress !== undefined && (
          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Processing tips */}
        <p className="text-xs text-secondary mt-4">
          💡 AI đang phân tích hình ảnh và tạo kết quả. Quá trình này có thể mất 5-15 giây.
        </p>
      </div>
    );
  }

  // Fullscreen variant - overlay toàn màn hình
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-black/80 backdrop-blur-md',
        className
      )}
    >
      <div className="text-center">
        {/* Animated circles */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full border-4 border-accent/30 animate-ping" />
          {/* Middle ring */}
          <div className="absolute inset-4 rounded-full border-4 border-accent/50 animate-pulse" />
          {/* Inner icon */}
          <div className="absolute inset-8 rounded-full bg-accent flex items-center justify-center animate-pulse-slow">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Message */}
        <h3 className="text-2xl font-bold text-white mb-2">{message}</h3>
        
        {/* Progress */}
        {progress !== undefined && (
          <div className="max-w-xs mx-auto">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-white/60 text-sm">{progress}% hoàn thành</p>
          </div>
        )}

        {/* Cancel hint */}
        <p className="text-white/40 text-sm mt-8">
          Nhấn ESC để hủy
        </p>
      </div>
    </div>
  );
}

export default AIProcessing;
