/**
 * Fashion AI - UI Components Index
 * 
 * Export tất cả UI components
 * NOTE: Prefer direct imports cho better tree-shaking
 */

// Atoms
export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Input } from './Input';
export type { InputProps } from './Input';

export { Badge, AIBadge, OrderStatusBadge } from './Badge';
export type { BadgeProps } from './Badge';

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonProductCard, 
  SkeletonProductGrid,
  SkeletonTableRow,
  SkeletonCard,
} from './Skeleton';

// Molecules
export { ProductCard } from './ProductCard';
export type { ProductCardProps } from './ProductCard';

export { Modal, ModalFooter } from './Modal';
export type { ModalProps } from './Modal';

export { AIProcessing } from './AIProcessing';
export type { AIProcessingProps } from './AIProcessing';
