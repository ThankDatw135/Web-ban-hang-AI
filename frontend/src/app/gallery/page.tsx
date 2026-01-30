/**
 * Fashion Gallery - Fashion AI
 * 
 * Gallery lookbook:
 * - Masonry grid
 * - Lightbox view
 * - Filter by collection
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Share2,
  Heart,
  ShoppingBag,
  Maximize2
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Gallery images
const galleryImages = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    title: 'Silk Evening Collection',
    collection: 'Evening Wear',
    aspectRatio: 'tall',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800',
    title: 'Winter Essentials',
    collection: 'Winter 2024',
    aspectRatio: 'square',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800',
    title: 'Minimal Elegance',
    collection: 'Minimalist',
    aspectRatio: 'wide',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
    title: 'Street Style Edit',
    collection: 'Streetwear',
    aspectRatio: 'tall',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800',
    title: 'Office Chic',
    collection: 'Work Wear',
    aspectRatio: 'square',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1558191053-9cd3e0a46056?w=800',
    title: 'Casual Friday',
    collection: 'Casual',
    aspectRatio: 'square',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    title: 'Spring Florals',
    collection: 'Spring 2024',
    aspectRatio: 'tall',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800',
    title: 'Summer Vibes',
    collection: 'Summer 2024',
    aspectRatio: 'wide',
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800',
    title: 'Autumn Layers',
    collection: 'Autumn 2024',
    aspectRatio: 'square',
  },
];

const collections = ['Tất cả', 'Evening Wear', 'Winter 2024', 'Minimalist', 'Streetwear', 'Work Wear'];

export default function GalleryPage() {
  const [selectedCollection, setSelectedCollection] = useState('Tất cả');
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = selectedCollection === 'Tất cả'
    ? galleryImages
    : galleryImages.filter(img => img.collection === selectedCollection);

  const openLightbox = (image: typeof galleryImages[0]) => {
    const index = filteredImages.findIndex(img => img.id === image.id);
    setLightboxIndex(index);
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const goToPrev = () => {
    const newIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide mb-4">
            <Camera className="size-5" />
            Lookbook Gallery
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            Fashion Gallery
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Khám phá bộ sưu tập hình ảnh thời trang đẹp nhất từ Fashion AI
          </p>
        </div>

        {/* Collection Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {collections.map((col) => (
            <button
              key={col}
              onClick={() => setSelectedCollection(col)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCollection === col
                  ? 'bg-primary text-white'
                  : 'bg-white text-text-muted border border-border hover:border-primary'
              }`}
            >
              {col}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="break-inside-avoid group relative overflow-hidden rounded-2xl bg-secondary-100 cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.src}
                alt={image.title}
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                  image.aspectRatio === 'tall' ? 'aspect-[3/4]' :
                  image.aspectRatio === 'wide' ? 'aspect-[4/3]' : 'aspect-square'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold mb-1">{image.title}</h3>
                  <p className="text-white/70 text-sm">{image.collection}</p>
                </div>
                <button className="absolute top-4 right-4 size-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                  <Maximize2 className="size-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 size-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="size-6" />
            </button>

            {/* Nav Buttons */}
            <button
              onClick={goToPrev}
              className="absolute left-4 size-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 size-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Image */}
            <div className="max-w-5xl max-h-[80vh] mx-4">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[80vh] object-contain rounded-lg"
              />
            </div>

            {/* Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div>
                  <h3 className="text-white text-xl font-bold">{lightboxImage.title}</h3>
                  <p className="text-white/70">{lightboxImage.collection}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="size-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <Heart className="size-5" />
                  </button>
                  <button className="size-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <Share2 className="size-5" />
                  </button>
                  <button className="size-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <Download className="size-5" />
                  </button>
                  <Link
                    href="/shop"
                    className="px-4 py-2 bg-primary text-white font-medium rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingBag className="size-4" />
                    Shop Look
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
