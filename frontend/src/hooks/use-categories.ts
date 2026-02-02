/**
 * Fashion AI - Categories Hooks
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import * as categoriesApi from '@/lib/api/categories';

/**
 * Hook lấy danh sách categories
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook lấy category theo slug
 */
export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['categories', slug],
    queryFn: () => categoriesApi.getCategoryBySlug(slug),
    enabled: !!slug,
  });
}
