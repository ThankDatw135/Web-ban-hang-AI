/**
 * Fashion AI - Badge Component
 * 
 * Badges cho status, categories, và AI labels
 */

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

const badgeVariants = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  error: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  neutral: 'bg-gray-100 dark:bg-gray-800 text-secondary',
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export interface BadgeProps {
  children: ReactNode;
  variant?: keyof typeof badgeVariants;
  size?: keyof typeof badgeSizes;
  icon?: ReactNode;
  className?: string;
}

/**
 * Badge component cho status và labels
 * 
 * @example
 * <Badge variant="success">Đã giao</Badge>
 * <Badge variant="accent" icon={<Sparkles />}>AI Recommended</Badge>
 */
export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md font-bold',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

/**
 * AI Badge - Pre-configured cho các tính năng AI
 */
export function AIBadge({
  children = 'AI Recommended',
  size = 'md',
  className,
}: Omit<BadgeProps, 'variant' | 'icon'>) {
  return (
    <Badge
      variant="accent"
      size={size}
      icon={<Sparkles className="w-3 h-3" />}
      className={className}
    >
      {children}
    </Badge>
  );
}

/**
 * Status Badge cho đơn hàng
 */
export function OrderStatusBadge({
  status,
  className,
}: {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  className?: string;
}) {
  const statusConfig = {
    pending: { variant: 'warning' as const, label: 'Chờ xác nhận' },
    processing: { variant: 'primary' as const, label: 'Đang xử lý' },
    shipped: { variant: 'accent' as const, label: 'Đang giao' },
    delivered: { variant: 'success' as const, label: 'Đã giao' },
    cancelled: { variant: 'error' as const, label: 'Đã hủy' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}

export default Badge;
