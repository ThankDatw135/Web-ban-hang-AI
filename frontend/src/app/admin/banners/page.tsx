/**
 * Admin Banners Management - Fashion AI
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Image, Plus, Edit, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';

const banners = [
  { id: '1', title: 'Flash Sale Tết', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', position: 'hero', active: true, clicks: 2340 },
  { id: '2', title: 'New Arrivals', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400', position: 'sidebar', active: true, clicks: 890 },
  { id: '3', title: 'VIP Exclusive', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', position: 'popup', active: false, clicks: 456 },
];

const positions = ['hero', 'sidebar', 'popup', 'footer'];

export default function AdminBanners() {
  const [bannerList, setBannerList] = useState(banners);

  const toggleActive = (id: string) => {
    setBannerList(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <h1 className="text-xl font-bold text-text-main">Quản Lý Banner</h1>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90">
            <Plus className="size-5" />
            Thêm banner
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Positions */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">Tất cả</button>
          {positions.map((pos) => (
            <button key={pos} className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium capitalize hover:border-primary">
              {pos}
            </button>
          ))}
        </div>

        {/* Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bannerList.map((banner) => (
            <div key={banner.id} className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="relative aspect-[16/9]">
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${banner.active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                    {banner.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-black/50 text-white text-xs font-medium rounded capitalize">
                    {banner.position}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-text-main mb-1">{banner.title}</h3>
                <p className="text-sm text-text-muted mb-3">{banner.clicks.toLocaleString()} lượt click</p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleActive(banner.id)}
                    className={`size-8 rounded-lg flex items-center justify-center ${banner.active ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'} hover:opacity-80`}
                  >
                    {banner.active ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                  <button className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100">
                    <Edit className="size-4" />
                  </button>
                  <button className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
