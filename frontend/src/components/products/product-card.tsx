/**
 * Fashion AI - Product Card
 * 
 * Component hiển thị thông tin tóm tắt của sản phẩm
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '@/types/api';
import { formatCurrency } from '@/lib/utils/format';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Lấy ảnh đại diện (ảnh main hoặc ảnh đầu tiên)
  const mainImage = product.images.find(img => img.isMain) || product.images[0];
  const imageUrl = mainImage?.url || '/images/product-placeholder.jpg';

  // Tính giá khuyến mãi
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  return (
    <div className="group relative bg-white dark:bg-[#2c2822] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-[#25221d]">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {product.isFeatured && (
            <span className="px-2 py-1 bg-accent text-white text-xs font-bold rounded-lg shadow-sm">
              HOT
            </span>
          )}
        </div>

        {/* Quick Actions (Hover) */}
        <div className="absolute bottom-3 left-3 right-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
          <button 
            className="flex-1 btn-primary h-10 text-sm gap-2"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Add to cart
              console.log('Add to cart:', product.id);
            }}
          >
            <ShoppingBag className="w-4 h-4" />
            Thêm vào giỏ
          </button>
          <button 
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#1e1a14] text-secondary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Wishlist
              console.log('Toggle wishlist:', product.id);
            }}
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-secondary mb-1">
          {product.category?.name || 'Sản phẩm'}
        </div>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-text-main dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-secondary mb-2">{product.brand}</p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-red-600 dark:text-red-400">
                {formatCurrency(product.salePrice!)}
              </span>
              <span className="text-sm text-secondary line-through">
                {formatCurrency(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
