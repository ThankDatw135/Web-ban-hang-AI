'use client';

/**
 * ProductCard Component - Fashion AI
 * 
 * Premium product card với:
 * - Hover zoom effect
 * - AI Try-on button
 * - Badge (New, Sale)
 */

import Image from 'next/image';
import Link from 'next/link';
import { View } from 'lucide-react';

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  material?: string;
  isNew?: boolean;
  onSale?: boolean;
}

export default function ProductCard({
  id,
  slug,
  name,
  price,
  originalPrice,
  image,
  material,
  isNew,
  onSale,
}: ProductCardProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <div className="group flex flex-col gap-3">
      {/* Image Container */}
      <Link href={`/products/${slug}`} className="relative w-full aspect-[3/4] bg-secondary-100 rounded-lg overflow-hidden cursor-pointer">
        {/* Product Image */}
        <div
          className="w-full h-full bg-center bg-cover product-image-hover"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* AI Try-on Button */}
        <button
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full 
                     opacity-0 group-hover:opacity-100 transition-opacity 
                     text-text-main hover:text-accent hover:bg-white"
          title="Thử đồ với AI"
          onClick={(e) => {
            e.preventDefault();
            // TODO: Open AI try-on modal
          }}
        >
          <View className="size-5" />
        </button>

        {/* Badges */}
        {isNew && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
            Mới
          </div>
        )}
        {onSale && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
            Giảm giá
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <Link href={`/products/${slug}`}>
            <h3 className="text-base font-medium text-text-main group-hover:text-primary transition-colors cursor-pointer line-clamp-1">
              {name}
            </h3>
          </Link>
          <div className="text-right">
            <p className="text-sm font-bold text-text-main">
              {formatPrice(price)}
            </p>
            {originalPrice && originalPrice > price && (
              <p className="text-xs text-text-muted line-through">
                {formatPrice(originalPrice)}
              </p>
            )}
          </div>
        </div>
        {material && (
          <p className="text-xs text-text-muted">{material}</p>
        )}
      </div>
    </div>
  );
}
