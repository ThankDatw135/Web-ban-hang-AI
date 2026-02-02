/**
 * Fashion AI - Wishlist Page
 */

'use client';

import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';
import ProductCard from '@/components/products/product-card';
import { useWishlist, useRemoveFromWishlist } from '@/hooks/use-wishlist';

export default function WishlistPage() {
  const { data: wishlist, isLoading } = useWishlist();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist(); // ProductCard might not use this directly unless passed as prop

  // Note: ProductCard has its own "Wishlist" button logic usually.
  // Ideally, ProductCard can toggle wishlist state.
  // Here we assume ProductCard handles display. 
  // If we want a "Remove" button explicit on Wishlist page, we might wrap ProductCard or add overlay.
  
  // For simplicity, we stick to ProductCard standard behavior (which should show "Heart Filled" if checking wishlist status).
  // But ProductCard logic for wishlist needs checking if item is in wishlist.
  // Currently ProductCard is generic.

  return (
    <div className="space-y-6">
       <h1 className="text-2xl font-bold">Sản phẩm yêu thích</h1>

       {isLoading ? (
           <div className="py-12 flex justify-center">
               <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
           </div>
       ) : wishlist && wishlist.length > 0 ? (
           <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
               {wishlist.map((product) => (
                   <div key={product.id} className="relative group">
                       <ProductCard product={product} />
                       {/* Overlay Remove Button (Optional) */}
                       <button
                           onClick={() => removeFromWishlist(product.id)}
                           className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-red-50 text-secondary hover:text-red-500 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                           title="Xóa khỏi yêu thích"
                       >
                           <Trash2 className="w-4 h-4" />
                       </button>
                   </div>
               ))}
           </div>
       ) : (
           <div className="flex flex-col items-center justify-center py-16 text-center card bg-gray-50 dark:bg-gray-800/50 border-dashed">
               <Heart className="w-12 h-12 text-gray-300 mb-4" />
               <h3 className="text-lg font-medium mb-1">Danh sách yêu thích trống</h3>
               <p className="text-secondary mb-6">Hãy thả tim cho sản phẩm bạn yêu thích</p>
               <Link href="/products" className="btn-primary">
                   Khám phá ngay
               </Link>
           </div>
       )}
    </div>
  );
}
