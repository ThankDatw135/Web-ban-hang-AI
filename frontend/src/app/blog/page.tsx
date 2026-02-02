/**
 * Fashion AI - Trang Tin Tức/Blog
 * 
 * Danh sách bài viết tin tức và blog
 */

import { Calendar, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tin tức',
  description: 'Cập nhật xu hướng thời trang mới nhất và các tin tức từ Fashion AI.',
};

// Mock data - bài viết mẫu
const blogPosts = [
  {
    id: 1,
    title: 'Xu hướng thời trang Xuân - Hè 2026',
    excerpt: 'Khám phá những xu hướng thời trang nổi bật nhất mùa Xuân - Hè năm nay với các gam màu pastel và phong cách minimalist.',
    category: 'Xu hướng',
    date: '28/01/2026',
    image: null,
  },
  {
    id: 2,
    title: 'Cách phối đồ đi làm thanh lịch',
    excerpt: 'Hướng dẫn chi tiết cách phối đồ công sở vừa chuyên nghiệp vừa thể hiện cá tính riêng của bạn.',
    category: 'Tips & Tricks',
    date: '25/01/2026',
    image: null,
  },
  {
    id: 3,
    title: 'Fashion AI ra mắt tính năng Try-On 2.0',
    excerpt: 'Phiên bản mới của AI Try-On với độ chính xác cao hơn, hỗ trợ nhiều pose và ánh sáng khác nhau.',
    category: 'Công nghệ',
    date: '20/01/2026',
    image: null,
  },
  {
    id: 4,
    title: '5 cách bảo quản quần áo đúng cách',
    excerpt: 'Những mẹo đơn giản giúp quần áo của bạn luôn như mới và bền đẹp theo thời gian.',
    category: 'Tips & Tricks',
    date: '15/01/2026',
    image: null,
  },
  {
    id: 5,
    title: 'Bộ sưu tập Limited Edition mới',
    excerpt: 'Fashion AI hợp tác với designer nổi tiếng ra mắt bộ sưu tập giới hạn chỉ 100 sản phẩm.',
    category: 'Bộ sưu tập',
    date: '10/01/2026',
    image: null,
  },
  {
    id: 6,
    title: 'Thời trang bền vững - Xu hướng tất yếu',
    excerpt: 'Tìm hiểu về sustainable fashion và cam kết của Fashion AI với môi trường.',
    category: 'Xu hướng',
    date: '05/01/2026',
    image: null,
  },
];

// Danh mục
const categories = ['Tất cả', 'Xu hướng', 'Tips & Tricks', 'Công nghệ', 'Bộ sưu tập'];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container-app">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tin tức & Blog</h1>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Cập nhật xu hướng thời trang mới nhất, tips phối đồ và tin tức từ Fashion AI.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === 'Tất cả'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-[#2c2822] text-secondary hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="card overflow-hidden group">
              {/* Image placeholder */}
              <div className="aspect-video bg-gray-100 dark:bg-[#2c2822] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-600">
                  <span className="text-4xl">📰</span>
                </div>
                {/* Category badge */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-[#25221d]/90 backdrop-blur-sm text-xs font-bold">
                  {post.category}
                </span>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-secondary mb-3">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                
                {/* Title */}
                <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                {/* Excerpt */}
                <p className="text-secondary text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Read more */}
                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                >
                  Đọc tiếp
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <button className="btn-outline">
            Xem thêm bài viết
          </button>
        </div>
      </div>
    </div>
  );
}
