/**
 * Fashion AI - Wishlist Page
 * 
 * Danh sách sản phẩm yêu thích
 */

'use client';

import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { getWishlist, removeFromWishlist } from '@/lib/api/wishlist';
import { Loader2 } from 'lucide-react';

// Format price for Vietnamese market
function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

// Sidebar items
const sidebarItems = [
  { href: '/dashboard', icon: 'dashboard', label: 'Tổng quan' },
  { href: '/dashboard/orders', icon: 'receipt_long', label: 'Đơn hàng' },
  { href: '/dashboard/wishlist', icon: 'favorite', label: 'Yêu thích', active: true },
  { href: '/dashboard/addresses', icon: 'location_on', label: 'Địa chỉ' },
  { href: '/dashboard/settings', icon: 'settings', label: 'Cài đặt' },
];

export default function WishlistPage() {
  const queryClient = useQueryClient();

  // Fetch wishlist from API
  const { data: wishlistData, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });

  // Remove from wishlist mutation
  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  const items = wishlistData?.items?.map(item => ({
    id: item.productId,
    name: item.product.name,
    slug: item.product.slug,
    price: formatPrice(item.product.salePrice || item.product.price),
    originalPrice: item.product.salePrice ? formatPrice(item.product.price) : undefined,
    image: item.product.images?.[0]?.url || 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400',
    inStock: true, // TODO: Check from variant stock
  })) || [];

  const removeItem = (productId: string) => {
    removeMutation.mutate(productId);
  };

  return (
    <>
      <Header cartItemsCount={2} isLoggedIn={true} />
      
      <main className="flex-1 bg-cream">
        <div className="container-app py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <nav className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="space-y-1">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                        item.active 
                          ? 'bg-primary/10 text-primary font-bold' 
                          : 'hover:bg-gray-50'
                      )}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-6">Sản phẩm yêu thích ({items.length})</h1>

              {items.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm group">
                      {/* Image */}
                      <div className="relative aspect-[3/4]">
                        <div 
                          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-bold">Hết hàng</span>
                          </div>
                        )}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <span className="material-symbols-outlined filled">favorite</span>
                        </button>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-bold mb-1">{item.name}</h3>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-primary font-bold">{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-gray-400 text-sm line-through">{item.originalPrice}</span>
                          )}
                        </div>
                        <button 
                          disabled={!item.inStock}
                          className={cn(
                            'w-full h-11 rounded-full font-bold flex items-center justify-center gap-2 transition-colors',
                            item.inStock 
                              ? 'bg-primary text-white hover:bg-primary/90' 
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          )}
                        >
                          <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                          {item.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">favorite_border</span>
                  <p className="text-gray-500 mb-4">Chưa có sản phẩm yêu thích</p>
                  <Link href="/products">
                    <button className="px-6 h-11 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
                      Khám phá sản phẩm
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
