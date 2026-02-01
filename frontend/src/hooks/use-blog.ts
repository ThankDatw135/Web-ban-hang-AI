/**
 * Fashion AI - Blog Hooks
 * 
 * React Query hooks cho blog
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import * as blogApi from '@/lib/api/blog';
import type { BlogFilter } from '@/lib/api/blog';

/**
 * Hook lấy danh sách bài viết
 */
export function usePosts(filter?: BlogFilter) {
  return useQuery({
    queryKey: ['posts', filter],
    queryFn: () => blogApi.getPosts(filter),
  });
}

/**
 * Hook lấy chi tiết bài viết
 */
export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => blogApi.getPostBySlug(slug),
    enabled: !!slug,
  });
}

/**
 * Hook lấy danh mục
 */
export function useBlogCategories() {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: blogApi.getCategories,
  });
}

/**
 * Hook lấy bài viết nổi bật
 */
export function useFeaturedPosts() {
  return useQuery({
    queryKey: ['featured-posts'],
    queryFn: blogApi.getFeaturedPosts,
  });
}
