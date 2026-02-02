/**
 * Fashion AI - Sản Phẩm Yêu Thích
 * 
 * Danh sách wishlist của user
 */

'use client';

import { Heart, ShoppingBag, Trash2, X } from 'lucide-react';
import Link from 'next/link';

// Mock wishlist data
const wishlistItems = [
  { id: 1, name: 'Áo sơ mi trắng Premium', price: 850000, originalPrice: 1200000, inStock: true },
  { id: 2, name: 'Đầm dự tiệc sang trọng', price: 1250000, originalPrice: null, inStock: true },
  { id: 3, name: 'Quần tây navy công sở', price: 750000, originalPrice: null, inStock: false },
  { id: 4, name: 'Áo khoác denim phong cách', price: 950000, originalPrice: 1100000, inStock: true },
];

// Format giá tiền
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export default function WishlistPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sản phẩm yêu thích</h1>
        <span className="text-secondary">{wishlistItems.length} sản phẩm</span>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="card overflow-hidden group relative">
              {/* Remove button */}
              <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-[#25221d]/90 backdrop-blur-sm flex items-center justify-center text-secondary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <X className="w-4 h-4" />
              </button>

              {/* Image */}
              <Link href={`/products/${item.id}`} className="block relative aspect-product bg-gray-100 dark:bg-[#2c2822]">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-600">
                  <span className="text-4xl">👕</span>
                </div>
                
                {/* Out of stock overlay */}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-white text-sm font-bold">Hết hàng</span>
                  </div>
                )}
              </Link>

              {/* Info */}
              <div className="p-4">
                <Link href={`/products/${item.id}`}>
                  <h3 className="font-medium text-sm line-clamp-2 mb-2 hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-primary font-bold">{formatPrice(item.price)}</span>
                  {item.originalPrice && (
                    <span className="text-secondary text-sm line-through">
                      {formatPrice(item.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Add to cart button */}
                <button 
                  disabled={!item.inStock}
                  className="btn-primary w-full h-10 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {item.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty state
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#2c2822] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="font-bold mb-2">Chưa có sản phẩm yêu thích</h3>
          <p className="text-secondary text-sm mb-4">Hãy thêm sản phẩm bạn thích vào đây</p>
          <Link href="/products" className="btn-primary">
            Khám phá sản phẩm
          </Link>
        </div>
      )}
    </div>
  );
}
