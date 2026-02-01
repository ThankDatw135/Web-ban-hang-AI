/**
 * Fashion AI - Categories Hooks
 * 
 * React Query hooks cho danh mục
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import * as categoriesApi from '@/lib/api/categories';

/**
 * Hook lấy danh sách danh mục
 */
export function useCategories(tree = false) {
  return useQuery({
    queryKey: ['categories', tree],
    queryFn: () => categoriesApi.getCategories(tree),
  });
}

/**
 * Hook lấy chi tiết danh mục
 */
export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoriesApi.getCategoryBySlug(slug),
    enabled: !!slug,
  });
}
