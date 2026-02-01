/**
 * Fashion AI - ProductCard Component
 * 
 * Card hiển thị sản phẩm với image, info, và actions
 * Hover effects, wishlist, AI badge support
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from './Button';
import { AIBadge } from './Badge';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  imageUrl: string;
  isAIRecommended?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isWishlisted?: boolean;
  onAddToCart?: (id: string) => void;
  onToggleWishlist?: (id: string) => void;
  className?: string;
}

/**
 * ProductCard component cho danh sách sản phẩm
 * 
 * @example
 * <ProductCard
 *   id="1"
 *   name="Silk Evening Dress"
 *   price={4500000}
 *   imageUrl="/products/dress.jpg"
 *   isAIRecommended
 * />
 */
export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  description,
  imageUrl,
  isAIRecommended = false,
  isBestSeller = false,
  isTrending = false,
  isWishlisted = false,
  onAddToCart,
  onToggleWishlist,
  className,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [localWishlisted, setLocalWishlisted] = useState(isWishlisted);

  // Handle wishlist toggle
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    setLocalWishlisted(!localWishlisted);
    onToggleWishlist?.(id);
  };

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.(id);
  };

  // Có discount không?
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <Link
      href={`/products/${id}`}
      className={cn(
        'group flex flex-col gap-4 rounded-2xl bg-white dark:bg-[#2c2822]',
        'shadow-sm hover:shadow-xl transition-shadow duration-300',
        'overflow-hidden',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-2xl">
        {/* Product image với zoom effect */}
        <div
          className={cn(
            'w-full h-full bg-center bg-cover transition-transform duration-500',
            isHovered && 'scale-105'
          )}
          style={{ backgroundImage: `url(${imageUrl})` }}
          role="img"
          aria-label={name}
        />

        {/* Badges - Top left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {isAIRecommended && <AIBadge size="sm">AI PICK</AIBadge>}
          {isBestSeller && (
            <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-md">
              BEST SELLER
            </span>
          )}
          {isTrending && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-md">
              TRENDING
            </span>
          )}
        </div>

        {/* Wishlist button - Top right */}
        <button
          onClick={handleWishlistClick}
          className={cn(
            'absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-black/50',
            'flex items-center justify-center transition-colors',
            localWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
          )}
          aria-label={localWishlisted ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        >
          <Heart
            className={cn('w-5 h-5', localWishlisted && 'fill-current')}
          />
        </button>

        {/* Discount badge - Bottom left */}
        {hasDiscount && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-md">
            -{Math.round((1 - price / originalPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 pt-2 gap-4">
        {/* Title và Price */}
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-text-main dark:text-white text-lg font-bold leading-snug line-clamp-2">
              {name}
            </h3>
            <div className="text-right flex-shrink-0">
              <p className="text-primary font-bold">{formatCurrency(price)}</p>
              {hasDiscount && (
                <p className="text-gray-400 text-sm line-through">
                  {formatCurrency(originalPrice)}
                </p>
              )}
            </div>
          </div>
          {description && (
            <p className="text-gray-500 text-sm mt-1 line-clamp-1">{description}</p>
          )}
        </div>

        {/* Add to cart button */}
        <Button
          variant="primary"
          size="md"
          fullWidth
          leftIcon={<ShoppingBag className="w-4 h-4" />}
          onClick={handleAddToCart}
        >
          Mua ngay
        </Button>
      </div>
    </Link>
  );
}

export default ProductCard;
