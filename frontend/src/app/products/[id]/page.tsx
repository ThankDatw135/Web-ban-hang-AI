/**
 * Fashion AI - Product Detail Page
 * 
 * Trang chi tiết sản phẩm với ảnh, thông tin, và AI try-on
 */

'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn, formatCurrency } from '@/lib/utils';
import { useProduct } from '@/hooks/use-products';
import { useAddToCart } from '@/hooks/use-cart';
import { Loader2 } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product from API
  const { data: product, isLoading, error } = useProduct(productId);
  const addToCart = useAddToCart();

  // Build product display data
  const images = useMemo(() => {
    if (!product?.images) return [];
    return product.images.map(img => img.url);
  }, [product]);

  const sizes = useMemo(() => {
    if (!product?.variants) return [];
    const uniqueSizes = Array.from(new Set(product.variants.map(v => v.size)));
    return uniqueSizes;
  }, [product]);

  const colors = useMemo(() => {
    if (!product?.variants) return [];
    const uniqueColors = product.variants.reduce((acc, v) => {
      if (!acc.find(c => c.name === v.color)) {
        acc.push({ name: v.color, hex: v.colorCode || '#000000' });
      }
      return acc;
    }, [] as { name: string; hex: string }[]);
    return uniqueColors;
  }, [product]);

  // Find variant for selected size/color
  const selectedVariant = useMemo(() => {
    if (!product?.variants || !selectedSize || colors.length === 0) return null;
    return product.variants.find(
      v => v.size === selectedSize && v.color === colors[selectedColor]?.name
    );
  }, [product, selectedSize, selectedColor, colors]);

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;
    addToCart.mutate({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-cream">
          <div className="container-app py-20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Error or not found
  if (error || !product) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-cream">
          <div className="container-app py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
            <Link href="/products" className="text-primary hover:underline">
              ← Quay lại danh sách sản phẩm
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const price = Number(product.price);
  const salePrice = product.salePrice ? Number(product.salePrice) : undefined;

  return (
    <>
      <Header cartItemsCount={2} />
      
      <main className="flex-1 bg-cream">
        <div className="container-app py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-gray-500 hover:text-primary">Trang chủ</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-primary">Sản phẩm</Link>
            <span className="text-gray-400">/</span>
            <span className="font-semibold">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              {/* Main image */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${images[selectedImage] || '/placeholder.jpg'})` }}
                />
                {product.isFeatured && (
                  <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-white text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    AI Recommended
                  </div>
                )}
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors hover:bg-gray-50"
                >
                  <span className={cn(
                    'material-symbols-outlined',
                    isWishlisted ? 'filled text-red-500' : 'text-gray-600'
                  )}>favorite</span>
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      'w-20 h-24 rounded-lg overflow-hidden border-2 transition-all',
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    )}
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                  {product.brand && <span className="text-sm text-gray-500">| {product.brand}</span>}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">{formatCurrency(salePrice || price)}</span>
                {salePrice && salePrice < price && (
                  <span className="text-xl text-gray-400 line-through">{formatCurrency(price)}</span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              {/* Colors */}
              {colors.length > 0 && (
              <div>
                <p className="font-semibold mb-3">Màu sắc: <span className="font-normal text-gray-600">{colors[selectedColor]?.name}</span></p>
                <div className="flex gap-3">
                  {colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={cn(
                        'w-10 h-10 rounded-full border-2 transition-all',
                        selectedColor === idx ? 'border-primary scale-110' : 'border-gray-200'
                      )}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
              )}

              {/* Sizes */}
              {sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold">Kích thước</p>
                  <button className="text-sm text-primary font-semibold hover:underline">Hướng dẫn chọn size</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'w-14 h-10 rounded-lg border-2 font-semibold transition-all',
                        selectedSize === size 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              )}

              {/* Quantity */}
              <div>
                <p className="font-semibold mb-3">Số lượng</p>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={!selectedVariant || addToCart.isPending}
                  className="flex-1 h-14 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">shopping_bag</span>
                  {addToCart.isPending ? 'Đang thêm...' : 'Thêm vào giỏ'}
                </button>
                <Link href={`/ai-studio?product=${product.id}`} className="flex-1">
                  <button className="w-full h-14 rounded-full bg-accent text-white font-bold text-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">view_in_ar</span>
                    Thử đồ AI
                  </button>
                </Link>
              </div>

              {/* Material info */}
              {product.material && (
              <div className="pt-6 border-t">
                <h3 className="font-bold mb-4">Thông tin sản phẩm</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                    Chất liệu: {product.material}
                  </li>
                  {product.brand && (
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                    Thương hiệu: {product.brand}
                  </li>
                  )}
                </ul>
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
