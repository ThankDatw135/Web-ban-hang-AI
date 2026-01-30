/**
 * Virtual Wardrobe - Fashion AI
 * 
 * Tủ đồ ảo với API integration:
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
  Grid, 
  LayoutGrid, 
  Shirt,
  Heart,
  Calendar,
  Wand2,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Header, Footer } from '@/components';
import { useWardrobe, useUpdateWardrobeItem, useAIOutfitSuggest, type WardrobeItem } from '@/hooks/useAI';
import { toastSuccess, toastError } from '@/stores';

const categories = ['Tất cả', 'Đầm', 'Áo', 'Áo khoác', 'Chân váy', 'Quần', 'Phụ kiện'];

export default function WardrobePage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  
  const { data, isLoading, refetch } = useWardrobe();
  const updateItem = useUpdateWardrobeItem();
  const aiSuggest = useAIOutfitSuggest();

  const wardrobeItems = data?.items || [];
  const stats = data?.stats || { total: 0, categories: {} };

  const filteredItems = selectedCategory === 'Tất cả' 
    ? wardrobeItems 
    : wardrobeItems.filter(item => item.category === selectedCategory);

  const handleToggleFavorite = async (item: WardrobeItem) => {
    try {
      await updateItem.mutateAsync({ id: item.id, favorite: !item.favorite });
      toastSuccess('Thành công', item.favorite ? 'Đã bỏ yêu thích' : 'Đã thêm vào yêu thích');
    } catch {
      toastError('Lỗi', 'Không thể cập nhật');
    }
  };

  const handleAISuggest = async () => {
    try {
      await aiSuggest.mutateAsync({ occasion: 'daily' });
      toastSuccess('AI Outfit', 'Đã tạo gợi ý outfit!');
    } catch {
      toastError('Lỗi', 'Không thể tạo gợi ý');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-main mb-2">Tủ Đồ Của Tôi</h1>
            <p className="text-text-muted">{stats.total} items trong tủ đồ</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleAISuggest}
              disabled={aiSuggest.isPending}
              className="px-4 py-2 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {aiSuggest.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Wand2 className="size-4" />
              )}
              AI Outfit Builder
            </button>
            <button 
              onClick={() => refetch()}
              className="px-4 py-2 bg-white border border-border hover:bg-secondary-50 text-text-main font-medium rounded-lg flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="size-4" />
              Làm mới
            </button>
          </div>
        </div>

        {/* AI Outfit Suggestions */}
        {aiSuggest.data && aiSuggest.data.length > 0 && (
          <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="size-5 text-accent" />
              <h2 className="text-lg font-bold text-text-main">AI Gợi Ý Outfit Hôm Nay</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {aiSuggest.data.map((suggestion, idx) => (
                <div
                  key={idx}
                  className="min-w-[280px] bg-white rounded-xl p-4 border border-border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-text-main">{suggestion.outfits[0]?.name || 'Outfit'}</h3>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">{suggestion.outfits[0]?.occasion}</span>
                  </div>
                  <p className="text-sm text-text-muted mb-3">{suggestion.reason}</p>
                  <div className="flex gap-2">
                    {suggestion.outfits[0]?.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="size-16 rounded-lg overflow-hidden bg-secondary-100">
                        <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters & View Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
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
                {cat !== 'Tất cả' && stats.categories[cat] ? ` (${stats.categories[cat]})` : ''}
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

        {/* Loading */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
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
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button 
                      onClick={() => handleToggleFavorite(item)}
                      disabled={updateItem.isPending}
                      className={`absolute top-3 right-3 size-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center transition-colors ${
                        item.favorite ? 'text-red-500' : 'text-text-muted hover:text-red-500'
                      }`}
                    >
                      <Heart className={`size-4 ${item.favorite ? 'fill-red-500' : ''}`} />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-medium">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-text-main mb-1 group-hover:text-primary transition-colors">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-text-muted mb-2">{item.color} • {item.size}</p>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {formatDate(item.purchaseDate)}
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

            {/* Empty state */}
            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <Shirt className="size-12 text-text-muted mx-auto mb-4" />
                <h3 className="font-bold text-text-main mb-2">Tủ đồ trống</h3>
                <p className="text-text-muted mb-4">Hãy mua sắm để thêm items vào tủ đồ!</p>
                <Link 
                  href="/shop"
                  className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Khám phá cửa hàng
                </Link>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
