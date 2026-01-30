/**
 * Search Results Page - Fashion AI
 * 
 * Kết quả tìm kiếm với:
 * - AI Analysis Box
 * - Sidebar Filters (Category, Color, Fabric, Price)
 * - Product Grid với AI Match badges
 */

import Link from 'next/link';
import { Sparkles, Search, Camera, ChevronRight, X, Heart } from 'lucide-react';
import { Header, Footer, ProductCard } from '@/components';

// Mock data
const products = [
  {
    id: '1',
    slug: 'structured-linen-blazer',
    name: 'Áo Blazer Linen Chất',
    price: 4650000,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
    brand: 'Massimo Dutti',
    personalized: true,
  },
  {
    id: '2',
    slug: 'pleated-trousers',
    name: 'Quần Tây Xếp Ly',
    price: 2830000,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600',
    brand: 'Arket',
    aiMatch: 98,
  },
  {
    id: '3',
    slug: 'silk-midi-dress',
    name: 'Đầm Midi Lụa',
    price: 6840000,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600',
    brand: 'Reformation',
  },
  {
    id: '4',
    slug: 'cashmere-wrap-coat',
    name: 'Áo Khoác Cashmere',
    price: 14640000,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600',
    brand: 'Theory',
  },
  {
    id: '5',
    slug: 'relaxed-poplin-shirt',
    name: 'Áo Sơ Mi Poplin',
    price: 2165000,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600',
    brand: 'Everlane',
    aiMatch: 95,
  },
  {
    id: '6',
    slug: 'oversized-trench',
    name: 'Áo Trench Oversize',
    price: 20180000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    brand: 'Totême',
  },
];

const categories = ['Blazers & Jackets', 'Trousers', 'Dresses'];
const colors = ['#F5F5DC', '#D2B48C', '#000000', '#FFFFFF', '#556B2F'];
const fabrics = ['Linen (100%)', 'Cotton Blend', 'Silk'];

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 container mx-auto px-4 md:px-8 py-8">
        {/* Search Hero */}
        <section className="flex flex-col items-center justify-center mb-12">
          <div className="w-full max-w-2xl relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="size-5 text-text-muted group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              defaultValue="Modern Classic Linen Outfit"
              className="block w-full pl-12 pr-14 py-4 bg-white border-0 ring-1 ring-border rounded-2xl text-base placeholder:text-text-muted focus:ring-2 focus:ring-primary shadow-soft transition-all"
              placeholder="Tìm theo phong cách, dịp, hoặc hình ảnh..."
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <button className="p-2 text-text-muted hover:text-primary transition-colors rounded-xl hover:bg-secondary-50" title="Tìm bằng hình ảnh">
                <Camera className="size-5" />
              </button>
            </div>
          </div>
          <div className="mt-3 flex gap-2 text-xs font-medium text-text-muted">
            <span>Xu hướng:</span>
            <button className="hover:text-primary underline decoration-primary/30">Old Money Aesthetic</button>
            <button className="hover:text-primary underline decoration-primary/30">Summer Linen</button>
            <button className="hover:text-primary underline decoration-primary/30">Minimalist</button>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
            {/* Category */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-text-main uppercase tracking-wider">Danh Mục</h3>
              <div className="space-y-2">
                {categories.map((cat, i) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked={i === 0}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-muted group-hover:text-text-main">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-text-main uppercase tracking-wider">Màu Sắc</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color, i) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border border-border transition-all ${
                      i === 0 ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-secondary-300 ring-offset-2'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Fabric */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-text-main uppercase tracking-wider">Chất Liệu</h3>
              <div className="space-y-2">
                {fabrics.map((fabric, i) => (
                  <label key={fabric} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked={i === 0}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-muted group-hover:text-text-main">{fabric}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-text-main uppercase tracking-wider">Khoảng Giá</h3>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-text-muted text-xs">₫</span>
                  <input
                    type="text"
                    defaultValue="2.000.000"
                    className="w-full pl-6 pr-2 py-2 text-sm border border-border rounded-lg bg-white focus:ring-primary focus:border-primary"
                  />
                </div>
                <span className="text-text-muted">-</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-text-muted text-xs">₫</span>
                  <input
                    type="text"
                    defaultValue="15.000.000"
                    className="w-full pl-6 pr-2 py-2 text-sm border border-border rounded-lg bg-white focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Results */}
          <div className="flex-1 min-w-0">
            {/* AI Insights Box */}
            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 mb-8 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
              <div className="flex flex-col sm:flex-row gap-5 items-start relative z-10">
                <div className="flex-shrink-0 size-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-accent">
                  <Sparkles className="size-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-main mb-1">Phân Tích AI</h3>
                  <p className="text-sm text-text-muted leading-relaxed max-w-3xl">
                    Chúng tôi tìm thấy các sản phẩm dựa trên phong cách <span className="font-semibold text-accent">Modern Classic</span> và hình ảnh bạn tải lên. Ưu tiên <span className="font-semibold text-accent">vải linen</span> và tông màu trung tính theo sở thích của bạn.
                  </p>
                </div>
                <button className="px-4 py-2 bg-white hover:bg-white/80 border border-accent/20 text-accent text-sm font-bold rounded-lg transition-colors flex items-center gap-2">
                  <Sparkles className="size-4" />
                  Tinh Chỉnh
                </button>
              </div>
            </div>

            {/* Results Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-medium text-text-muted">Hiển thị 24 kết quả</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-main">Sắp xếp:</span>
                <select className="bg-transparent border-none text-sm font-bold text-text-main focus:ring-0 cursor-pointer">
                  <option>AI Gợi Ý</option>
                  <option>Giá: Thấp → Cao</option>
                  <option>Giá: Cao → Thấp</option>
                  <option>Mới nhất</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group flex flex-col gap-3">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-secondary-100">
                    {/* Badges */}
                    {product.personalized && (
                      <div className="absolute top-3 left-3 z-20 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                        ⭐ Gợi ý cho bạn
                      </div>
                    )}
                    {product.aiMatch && (
                      <div className="absolute top-3 left-3 z-20 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                        ⭐ {product.aiMatch}% Phù hợp
                      </div>
                    )}
                    
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Try-On Button */}
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <button className="w-full h-11 bg-white/90 backdrop-blur-md hover:bg-primary hover:text-white text-text-main text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors">
                        <Sparkles className="size-4" />
                        Thử Đồ AI
                      </button>
                    </div>
                  </div>
                  
                  <div className="px-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-text-main text-base leading-tight group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-text-muted text-xs mt-1">{product.brand}</p>
                      </div>
                      <span className="font-bold text-text-main">
                        {new Intl.NumberFormat('vi-VN').format(product.price)}₫
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="size-10 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                  <ChevronRight className="size-5 rotate-180" />
                </button>
                <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-md">1</button>
                <button className="size-10 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors font-medium">2</button>
                <button className="size-10 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors font-medium">3</button>
                <span className="px-2 text-text-muted">...</span>
                <button className="size-10 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
