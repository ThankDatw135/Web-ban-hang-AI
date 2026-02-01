/**
 * Fashion AI - Skeleton Component
 * 
 * Loading skeletons cho các components
 * Shimmer animation cho visual feedback
 */

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

/**
 * Base skeleton với shimmer animation
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-gray-200 dark:bg-gray-700 rounded-lg animate-shimmer',
        className
      )}
    />
  );
}

/**
 * Skeleton cho text lines
 */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            // Line cuối cùng ngắn hơn
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton cho avatar/image tròn
 */
export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return <Skeleton className={cn('rounded-full', sizes[size])} />;
}

/**
 * Skeleton cho Product Card
 * Matching cấu trúc của ProductCard component
 */
export function SkeletonProductCard() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-[#2c2822] shadow-sm overflow-hidden">
      {/* Image skeleton - aspect 3:4 */}
      <Skeleton className="aspect-[3/4] w-full rounded-none" />
      
      {/* Content */}
      <div className="flex flex-col p-5 pt-2 gap-4">
        {/* Title và price */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
        
        {/* Button */}
        <Skeleton className="h-11 w-full rounded-full" />
      </div>
    </div>
  );
}

/**
 * Grid của Product Card skeletons
 */
export function SkeletonProductGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}

/**
 * Skeleton cho table row
 */
export function SkeletonTableRow({ cols = 5 }: { cols?: number }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 dark:border-gray-700">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === 0 ? 'w-12' : 'flex-1')}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton cho dashboard card
 */
export function SkeletonCard() {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#2c2822] shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <Skeleton className="h-4 w-24" />
        <SkeletonAvatar size="sm" />
      </div>
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
}

export default Skeleton;
