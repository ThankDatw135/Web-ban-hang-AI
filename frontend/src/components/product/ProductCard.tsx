'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  slug: string;
  isNew?: boolean;
}

/**
 * ProductCard Component - Fashion AI
 * Hiển thị sản phẩm trong danh sách/lưới
 */
export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  slug,
  isNew = false,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <div
      className="group flex flex-col gap-4 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-2xl">
        <Link href={`/products/${slug}`}>
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:text-red-500 transition-colors"
          aria-label={isFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isFavorite ? 'favorite' : 'favorite_border'}
          </span>
        </button>

        {/* New Badge */}
        {isNew && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
            Mới
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-5 pt-2 gap-4">
        <div>
          {category && (
            <p className="text-secondary-500 text-xs uppercase tracking-wider mb-1">{category}</p>
          )}
          <div className="flex justify-between items-start">
            <Link href={`/products/${slug}`}>
              <p className="text-secondary-800 text-lg font-bold leading-snug hover:text-primary transition-colors">
                {name}
              </p>
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-primary font-bold">{formatPrice(price)}</p>
            {originalPrice && originalPrice > price && (
              <p className="text-secondary-400 text-sm line-through">{formatPrice(originalPrice)}</p>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="flex w-full cursor-pointer items-center justify-center rounded-full h-11 bg-primary text-white text-sm font-bold hover:bg-primary-600 transition-colors gap-2">
          <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
          Mua ngay
        </button>
      </div>
    </div>
  );
}
