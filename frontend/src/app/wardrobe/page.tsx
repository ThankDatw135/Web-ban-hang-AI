/**
 * Virtual Wardrobe - Fashion AI
 * 
 * Tủ đồ ảo của người dùng:
 * - Grid các item đã mua
 * - AI outfit suggestions
 * - Filter by category
 * - Add to outfit builder
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Plus, 
  Filter, 
  Grid, 
  LayoutGrid, 
  Shirt,
  Heart,
  Calendar,
  Wand2,
  ChevronDown
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock wardrobe items
const wardrobeItems = [
  {
    id: '1',
    name: 'Silk Evening Gown',
    category: 'Đầm',
    color: 'Champagne',
    purchaseDate: '15/01/2024',
    wornCount: 3,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
  },
  {
    id: '2',
    name: 'Velvet Blazer',
    category: 'Áo khoác',
    color: 'Navy',
    purchaseDate: '10/01/2024',
    wornCount: 5,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
  },
  {
    id: '3',
    name: 'Wool Coat',
    category: 'Áo khoác',
    color: 'Camel',
    purchaseDate: '05/01/2024',
    wornCount: 8,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
  },
  {
    id: '4',
    name: 'Silk Blouse',
    category: 'Áo',
    color: 'White',
    purchaseDate: '01/01/2024',
    wornCount: 12,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400',
  },
  {
    id: '5',
    name: 'Pleated Midi Skirt',
    category: 'Chân váy',
    color: 'Black',
    purchaseDate: '28/12/2023',
    wornCount: 7,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?w=400',
  },
  {
    id: '6',
    name: 'Cashmere Sweater',
    category: 'Áo',
    color: 'Cream',
    purchaseDate: '20/12/2023',
    wornCount: 10,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
  },
];

const categories = ['Tất cả', 'Đầm', 'Áo', 'Áo khoác', 'Chân váy', 'Quần', 'Phụ kiện'];

// Mock AI outfit suggestions
const outfitSuggestions = [
  {
    id: '1',
    name: 'Office Chic',
    items: ['1', '4', '5'],
    occasion: 'Công sở',
  },
  {
    id: '2',
    name: 'Weekend Casual',
    items: ['6', '3'],
    occasion: 'Hàng ngày',
  },
];

export default function WardrobePage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');

  const filteredItems = selectedCategory === 'Tất cả' 
    ? wardrobeItems 
    : wardrobeItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-main mb-2">Tủ Đồ Của Tôi</h1>
            <p className="text-text-muted">{wardrobeItems.length} items trong tủ đồ</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg flex items-center gap-2 transition-colors">
              <Wand2 className="size-4" />
              AI Outfit Builder
            </button>
            <button className="px-4 py-2 bg-white border border-border hover:bg-secondary-50 text-text-main font-medium rounded-lg flex items-center gap-2 transition-colors">
              <Plus className="size-4" />
              Thêm Item
            </button>
          </div>
        </div>

        {/* AI Outfit Suggestions */}
        <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="size-5 text-accent" />
            <h2 className="text-lg font-bold text-text-main">AI Gợi Ý Outfit Hôm Nay</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {outfitSuggestions.map((outfit) => (
              <div
                key={outfit.id}
                className="min-w-[280px] bg-white rounded-xl p-4 border border-border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-text-main">{outfit.name}</h3>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">{outfit.occasion}</span>
                </div>
                <div className="flex gap-2">
                  {outfit.items.slice(0, 3).map((itemId) => {
                    const item = wardrobeItems.find(w => w.id === itemId);
                    return item ? (
                      <div key={itemId} className="size-16 rounded-lg overflow-hidden bg-secondary-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters & View Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-text-main text-white'
                    : 'bg-white text-text-muted border border-border hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-text-muted border border-border'
              }`}
            >
              <Grid className="size-5" />
            </button>
            <button
              onClick={() => setViewMode('large')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'large' ? 'bg-primary text-white' : 'bg-white text-text-muted border border-border'
              }`}
            >
              <LayoutGrid className="size-5" />
            </button>
          </div>
        </div>

        {/* Wardrobe Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' 
            : 'grid-cols-1 sm:grid-cols-2'
        }`}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all"
            >
              <div className="relative aspect-[3/4] bg-secondary-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 size-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <Heart className="size-4" />
                </button>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-medium">
                  {item.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-text-main mb-1 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-text-muted mb-2">{item.color}</p>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {item.purchaseDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Shirt className="size-3" />
                    Đã mặc {item.wornCount}x
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
