/**
 * Fashion AI - Blog Page
 * 
 * Trang blog với bài viết về thời trang và xu hướng
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, Clock, User, Sparkles, Search, TrendingUp } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Xu hướng thời trang Xuân Hè 2026: Những gam màu nổi bật',
    excerpt: 'Khám phá các xu hướng màu sắc đang "làm mưa làm gió" trên các sàn runway quốc tế và cách áp dụng chúng vào tủ đồ của bạn.',
    category: 'Xu hướng',
    author: 'Mai Anh',
    date: '2026-01-28',
    readTime: '5 phút',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    featured: true,
  },
  {
    id: '2',
    title: 'Công nghệ AI đang thay đổi ngành thời trang như thế nào?',
    excerpt: 'Từ thiết kế đến thử đồ ảo, trí tuệ nhân tạo đang cách mạng hóa trải nghiệm mua sắm thời trang.',
    category: 'Công nghệ',
    author: 'Minh Tuấn',
    date: '2026-01-25',
    readTime: '8 phút',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
  },
  {
    id: '3',
    title: 'Hướng dẫn phối đồ minimalist cho mùa mới',
    excerpt: 'Phong cách tối giản không bao giờ lỗi mốt. Học cách tạo nên những outfit đơn giản nhưng đầy ấn tượng.',
    category: 'Phong cách',
    author: 'Thanh Hà',
    date: '2026-01-22',
    readTime: '6 phút',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800',
  },
  {
    id: '4',
    title: 'Thời trang bền vững: Xu hướng không thể bỏ qua',
    excerpt: 'Sustainable fashion đang trở thành tiêu chuẩn mới. Tìm hiểu cách mua sắm thông minh và thân thiện với môi trường.',
    category: 'Bền vững',
    author: 'Hoàng Nam',
    date: '2026-01-18',
    readTime: '7 phút',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800',
  },
  {
    id: '5',
    title: '10 món đồ cơ bản mỗi tủ quần áo đều cần có',
    excerpt: 'Xây dựng capsule wardrobe hoàn hảo với những item không thể thiếu giúp bạn phối đồ dễ dàng hơn.',
    category: 'Phong cách',
    author: 'Linh Chi',
    date: '2026-01-15',
    readTime: '5 phút',
    image: 'https://images.unsplash.com/photo-1558171813-01342daa945c?w=800',
  },
  {
    id: '6',
    title: 'Street style tuần lễ thời trang Paris 2026',
    excerpt: 'Bắt kịp những outfit ấn tượng nhất từ đường phố Paris trong tuần lễ thời trang vừa qua.',
    category: 'Xu hướng',
    author: 'Mai Anh',
    date: '2026-01-10',
    readTime: '4 phút',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
  },
];

const categories = ['Tất cả', 'Xu hướng', 'Phong cách', 'Công nghệ', 'Bền vững'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticle = articles.find(a => a.featured);
  const filteredArticles = articles.filter(a => {
    const matchCategory = activeCategory === 'Tất cả' || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch && !a.featured;
  });

  return (
    <div className="min-h-screen bg-cream dark:bg-background-dark">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20 py-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
            <TrendingUp className="w-4 h-4" />
            Blog Fashion AI
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-text-main dark:text-white tracking-tight">
            Xu hướng & Cảm hứng
          </h1>
          <p className="text-secondary max-w-2xl mx-auto">
            Khám phá những bài viết mới nhất về xu hướng thời trang, phong cách và công nghệ AI trong ngành thời trang.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#333] text-text-main dark:text-white placeholder:text-secondary focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors',
                  activeCategory === cat
                    ? 'bg-primary text-text-main'
                    : 'bg-white dark:bg-[#1a1a1a] text-secondary hover:bg-primary/10 border border-border dark:border-[#333]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {featuredArticle && activeCategory === 'Tất cả' && !searchQuery && (
          <Link href={`/blog/${featuredArticle.id}`}>
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${featuredArticle.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="relative p-8 md:p-12 min-h-[400px] flex flex-col justify-end">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-text-main text-xs font-bold uppercase mb-4 w-fit">
                  <Sparkles className="w-3 h-3" />
                  Bài viết nổi bật
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 max-w-3xl">
                  {featuredArticle.title}
                </h2>
                <p className="text-white/80 mb-4 max-w-2xl">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-4 text-white/60 text-sm">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredArticle.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.readTime}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link key={article.id} href={`/blog/${article.id}`}>
              <article className="bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden border border-border dark:border-[#333] hover:shadow-lg transition-shadow group cursor-pointer h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${article.image})` }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm text-text-main dark:text-white text-xs font-bold rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <h3 className="font-bold text-lg text-text-main dark:text-white leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-secondary text-sm line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-secondary mt-auto pt-3 border-t border-border dark:border-[#333]">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
              Không tìm thấy bài viết
            </h3>
            <p className="text-secondary">
              Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main dark:text-white mb-4">
            Đừng bỏ lỡ xu hướng mới nhất
          </h2>
          <p className="text-secondary mb-6 max-w-xl mx-auto">
            Đăng ký nhận newsletter để cập nhật những bài viết mới nhất về thời trang và phong cách.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 px-4 py-3 rounded-lg border border-border dark:border-[#333] bg-white dark:bg-[#1a1a1a] text-text-main dark:text-white placeholder:text-secondary focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
            <button className="px-6 py-3 bg-primary text-text-main font-bold rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
              Đăng ký
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
