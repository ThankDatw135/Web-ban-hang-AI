/**
 * Fashion AI - Blog API Service
 * 
 * API calls cho bài viết blog
 */

import apiClient from '../api-client';
import type { ApiResponse, PaginatedResponse } from '@/types/api';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  readTime: number;
  views: number;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogFilter {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  featured?: boolean;
}

/**
 * Lấy danh sách bài viết
 */
export async function getPosts(filter?: BlogFilter): Promise<PaginatedResponse<BlogPost>> {
  const params = new URLSearchParams();
  
  if (filter?.page) params.set('page', String(filter.page));
  if (filter?.limit) params.set('limit', String(filter.limit));
  if (filter?.category) params.set('category', filter.category);
  if (filter?.search) params.set('search', filter.search);
  if (filter?.featured !== undefined) params.set('featured', String(filter.featured));
  
  const response = await apiClient.get<ApiResponse<PaginatedResponse<BlogPost>>>(
    `/blog/posts?${params.toString()}`
  );
  return response.data.data;
}

/**
 * Lấy chi tiết bài viết theo slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const response = await apiClient.get<ApiResponse<BlogPost>>(`/blog/posts/${slug}`);
  return response.data.data;
}

/**
 * Lấy danh sách danh mục
 */
export async function getCategories(): Promise<string[]> {
  const response = await apiClient.get<ApiResponse<string[]>>('/blog/categories');
  return response.data.data;
}

/**
 * Lấy bài viết nổi bật
 */
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const response = await apiClient.get<ApiResponse<BlogPost[]>>('/blog/posts/featured');
  return response.data.data;
}
