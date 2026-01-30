/**
 * Fashion Magazine - Fashion AI
 * 
 * Tạp chí thời trang:
 * - Featured articles
 * - Category filters
 * - Trending topics
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Heart,
  Share2,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Categories
const categories = ['Tất cả', 'Xu hướng', 'Style Tips', 'Người nổi tiếng', 'Bền vững', 'Care Guide'];

// Articles
const articles = [
  {
    id: '1',
    title: 'Xu Hướng Thời Trang Xuân Hè 2024',
    excerpt: 'Khám phá những màu sắc và kiểu dáng sẽ thống trị mùa thời trang tới',
    category: 'Xu hướng',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    author: 'Minh Anh',
    date: '28/01/2024',
    readTime: '5 phút',
    featured: true,
  },
  {
    id: '2',
    title: '10 Cách Phối Đồ Công Sở Thanh Lịch',
    excerpt: 'Gợi ý outfit công sở vừa chuyên nghiệp vừa thời thượng',
    category: 'Style Tips',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600',
    author: 'Thanh Hằng',
    date: '25/01/2024',
    readTime: '8 phút',
    featured: false,
  },
  {
    id: '3',
    title: 'Bí Quyết Bảo Quản Đồ Lụa Từ Chuyên Gia',
    excerpt: 'Cách giữ cho trang phục lụa luôn như mới',
    category: 'Care Guide',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600',
    author: 'Hoàng Nam',
    date: '22/01/2024',
    readTime: '4 phút',
    featured: false,
  },
  {
    id: '4',
    title: 'Thời Trang Bền Vững: Xu Hướng Hay Tương Lai?',
    excerpt: 'Tìm hiểu về phong trào thời trang xanh đang thay đổi ngành công nghiệp',
    category: 'Bền vững',
    image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=600',
    author: 'Lan Anh',
    date: '20/01/2024',
    readTime: '6 phút',
    featured: false,
  },
  {
    id: '5',
    title: 'Street Style Tuần Lễ Thời Trang Paris',
    excerpt: 'Những outfit ấn tượng nhất từ fashionistas trên đường phố Paris',
    category: 'Người nổi tiếng',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
    author: 'Đức Minh',
    date: '18/01/2024',
    readTime: '7 phút',
    featured: false,
  },
  {
    id: '6',
    title: 'Capsule Wardrobe: Tủ Đồ Tối Giản Hoàn Hảo',
    excerpt: 'Xây dựng tủ đồ 30 món có thể mix-match hàng trăm outfit',
    category: 'Style Tips',
    image: 'https://images.unsplash.com/photo-1558191053-9cd3e0a46056?w=600',
    author: 'Minh Anh',
    date: '15/01/2024',
    readTime: '10 phút',
    featured: false,
  },
];

// Trending topics
const trending = [
  'Quiet Luxury',
  'Old Money Style',
  'Coastal Grandmother',
  'Dopamine Dressing',
  'Y2K Revival',
];

export default function MagazinePage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const featuredArticle = articles.find(a => a.featured);
  const regularArticles = articles.filter(a => !a.featured);

  const filteredArticles = selectedCategory === 'Tất cả'
    ? regularArticles
    : regularArticles.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide mb-4">
            <BookOpen className="size-5" />
            Fashion Magazine
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            Tạp Chí Thời Trang
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Cập nhật xu hướng, tips phong cách và câu chuyện thời trang mới nhất
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <Link
            href={`/magazine/${featuredArticle.id}`}
            className="block mb-12 group"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-secondary-100">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-bold rounded-full mb-4">
                  {featuredArticle.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-white/80 mb-4 max-w-2xl">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-4 text-white/60 text-sm">
                  <span>{featuredArticle.author}</span>
                  <span>•</span>
                  <span>{featuredArticle.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-4" />
                    {featuredArticle.readTime}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto mb-8 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-white text-text-muted border border-border hover:border-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/magazine/${article.id}`}
                  className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-2 py-0.5 bg-secondary-100 text-text-muted text-xs font-medium rounded mb-3">
                      {article.category}
                    </span>
                    <h3 className="font-bold text-text-main mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-text-muted mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <h3 className="font-bold text-text-main mb-4 flex items-center gap-2">
                <TrendingUp className="size-5 text-accent" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {trending.map((topic, idx) => (
                  <Link
                    key={idx}
                    href={`/magazine?topic=${encodeURIComponent(topic)}`}
                    className="px-3 py-1.5 bg-secondary-50 text-text-main text-sm font-medium rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    #{topic}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6">
              <h3 className="font-bold text-text-main mb-2">Đăng Ký Newsletter</h3>
              <p className="text-sm text-text-muted mb-4">
                Nhận tips thời trang và ưu đãi độc quyền
              </p>
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-4 py-3 rounded-lg border border-border mb-3 focus:outline-none focus:border-primary"
              />
              <button className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
