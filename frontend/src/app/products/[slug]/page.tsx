/**
 * Fashion AI - Chi Tiết Sản Phẩm
 * 
 * Trang hiển thị thông tin chi tiết sản phẩm
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Truck, 
  RefreshCw, 
  Shield, 
  ChevronRight,
  Minus,
  Plus,
  Star,
  AlertCircle,
  ShoppingCart // Added
} from 'lucide-react';
import { useProduct } from '@/hooks/use-products';
import { useAddToCart } from '@/hooks/use-cart';
import dynamic from 'next/dynamic'; // Added
import { formatCurrency } from '@/lib/utils/format';
import { ProductVariant } from '@/types/api';

const VirtualTryOn = dynamic(() => import('@/components/ai/VirtualTryOn'), { ssr: false });
const SizeRecommender = dynamic(() => import('@/components/ai/SizeRecommender'), { ssr: false });

export default function ProductDetailPage({ params }: { params: { slug: string } }) { // Modified signature
  // const params = useParams(); // Removed
  // const slug = params.slug as string; // Removed
  const { data: product, isLoading, isError } = useProduct(params.slug); // Modified to use params.slug
  const { mutate: addToCart, isPending: isAdding } = useAddToCart(); // Changed isPending to isAdding

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showTryOn, setShowTryOn] = useState(false);
  const [showSizeRec, setShowSizeRec] = useState(false);

  // Derived state for variants
  const variantOptions = useMemo(() => {
    if (!product) return { colors: [], sizes: [] };
    
    // Extract unique colors based on variants
    const colors = Array.from(new Set(product.variants.map(v => v.color))).map(colorName => {
        const variant = product.variants.find(v => v.color === colorName);
        return { name: colorName, code: variant?.colorCode || '#000000' };
    });

    // Extract unique sizes based on variants
    // TODO: Sort sizes properly (S, M, L, XL...)
    const sizes = Array.from(new Set(product.variants.map(v => v.size)));

    return { colors, sizes };
  }, [product]);

  // Find currently selected variant to check stock
  const currentVariant = useMemo(() => {
    if (!product || !selectedSize || !selectedColor) return null;
    return product.variants.find(v => v.size === selectedSize && v.color === selectedColor);
  }, [product, selectedSize, selectedColor]);

  if (isLoading) {
     return (
        <div className="min-h-screen py-8 flex items-center justify-center">
           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
     );
  }

  if (isError || !product) {
    return (
        <div className="min-h-screen py-8 flex items-center justify-center flex-col gap-4">
           <p className="text-red-500">Không tìm thấy sản phẩm hoặc có lỗi xảy ra.</p>
           <Link href="/products" className="text-primary hover:underline">Quay lại danh sách</Link>
        </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [{ url: '/images/product-placeholder.jpg', alt: product.name }];
  const mainImage = images[activeImageIndex]?.url || images[0].url;

  const handleAddToCart = () => {
      if (!selectedSize || !selectedColor) {
          // Toast or simple alert
          alert('Vui lòng chọn size và màu sắc');
          return;
      }
      if (!currentVariant) {
          alert('Sản phẩm đang tạm hết hàng với lựa chọn này');
          return;
      }
      
      addToCart({
        productId: product.id,
        variantId: currentVariant.id,
        quantity
      });
  };

  return (
    <div className="min-h-screen py-8">
      {/* Virtual Try-On Modal */}
      {showTryOn && product && (
        <VirtualTryOn 
            productId={product.id}
            productImage={product.images.find(i => i.isMain)?.url || product.images[0]?.url || ''}
            isOpen={showTryOn}
            onClose={() => setShowTryOn(false)}
        />
      )}

      {showSizeRec && (
        <SizeRecommender
           productId={product.id}
           isOpen={showSizeRec}
           onClose={() => setShowSizeRec(false)}
           onSelectSize={(size) => setSelectedSize(size)}
        />
      )}

      <div className="container-app">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-secondary mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary">Trang chủ</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <Link href="/products" className="hover:text-primary">Sản phẩm</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-text-main dark:text-white">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div>
            {/* Main image */}
            <div className="aspect-[3/4] md:aspect-square rounded-2xl bg-gray-100 dark:bg-[#2c2822] mb-4 relative overflow-hidden group">
               <Image 
                 src={mainImage} 
                 alt={product.name}
                 fill
                 className="object-cover"
                 priority
               />
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-20 h-20 shrink-0 rounded-xl bg-gray-100 dark:bg-[#2c2822] overflow-hidden border-2 transition-all ${
                    activeImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image 
                    src={img.url}
                    alt={img.alt || product.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            {/* Category */}
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
                {product.category?.name || 'Sản phẩm'}
              </span>
              {product.isFeatured && (
                 <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase">
                    HOT
                 </span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              {product.salePrice && product.salePrice < product.price ? (
                 <>
                    <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                        {formatCurrency(product.salePrice)}
                    </span>
                    <span className="text-xl text-secondary line-through">
                        {formatCurrency(product.price)}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                        -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                    </span>
                 </>
              ) : (
                  <span className="text-3xl font-bold text-primary">{formatCurrency(product.price)}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-secondary mb-6 leading-relaxed">
               {product.description || 'Chưa có mô tả cho sản phẩm này.'}
            </p>

            {/* Color selection */}
            {variantOptions.colors.length > 0 && (
                <div className="mb-6">
                <p className="font-medium mb-3">Màu sắc: <span className="text-secondary font-normal">{selectedColor || 'Chọn màu'}</span></p>
                <div className="flex flex-wrap gap-3">
                    {variantOptions.colors.map((color) => (
                    <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                        selectedColor === color.name ? 'border-primary ring-2 ring-primary/20 ring-offset-2 dark:ring-offset-[#1e1a14]' : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                    >
                        {selectedColor === color.name && (
                            <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">✓</span>
                        )}
                    </button>
                    ))}
                </div>
                </div>
            )}

            {/* Size selection */}
            {variantOptions.sizes.length > 0 && (
                <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <p className="font-medium">Kích thước: <span className="text-secondary font-normal">{selectedSize || 'Chọn size'}</span></p>
                    <button onClick={() => setShowSizeRec(true)} className="text-sm text-primary hover:underline flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Gợi ý size
                    </button>
                </div>
                <div className="flex flex-wrap gap-3">
                    {variantOptions.sizes.map((size) => {
                       // Check availability for this size (if color is selected)
                       const isAvailable = !selectedColor || product.variants.some(v => v.size === size && v.color === selectedColor && v.stock > 0);
                       
                       return (
                        <button
                            key={size as string}
                            onClick={() => setSelectedSize(size as string)}
                            disabled={!isAvailable}
                            className={`w-14 h-12 rounded-xl border-2 font-medium transition-all ${
                            selectedSize === size
                                ? 'border-primary bg-primary text-white'
                                : isAvailable 
                                    ? 'border-gray-200 dark:border-gray-700 hover:border-primary text-text-main dark:text-white'
                                    : 'border-gray-100 dark:border-gray-800 text-gray-300 dark:text-gray-700 cursor-not-allowed bg-gray-50 dark:bg-gray-900/50'
                            }`}
                        >
                            {size as string}
                        </button>
                       );
                    })}
                </div>
                </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="font-medium mb-3">Số lượng</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-full transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(currentVariant?.stock || 99, quantity + 1))}
                    disabled={!currentVariant || quantity >= currentVariant.stock}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-full transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {currentVariant && (
                    <span className="text-sm text-secondary">
                        {currentVariant.stock > 0 ? `Còn ${currentVariant.stock} sản phẩm` : 'Hết hàng'}
                    </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                disabled={!currentVariant || currentVariant.stock === 0}
                className="btn-primary flex-1 py-4 h-auto disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-5 h-5" />
                {currentVariant && currentVariant.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
              </button>
              <button 
                onClick={() => setShowTryOn(true)}
                className="btn-accent px-8 py-4 h-auto"
              >
                <Sparkles className="w-5 h-5" />
                Thử với AI
              </button>
              {/* Wishlist */}
              <button className="btn-ghost w-14 h-14 border border-gray-300 dark:border-gray-600 rounded-full shrink-0">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#25221d]">
              <div className="text-center">
                <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Miễn phí ship</p>
                <p className="text-xs text-secondary">Đơn từ 500k</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Đổi trả 30 ngày</p>
                <p className="text-xs text-secondary">Miễn phí</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Bảo hành</p>
                <p className="text-xs text-secondary">12 tháng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
