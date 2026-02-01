/**
 * Fashion AI - Products Hooks
 * 
 * React Query hooks cho sản phẩm
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import * as productsApi from '@/lib/api/products';
import type { ProductFilter } from '@/types/api';

/**
 * Hook lấy danh sách sản phẩm
 */
export function useProducts(filter?: ProductFilter) {
  return useQuery({
    queryKey: ['products', filter],
    queryFn: () => productsApi.getProducts(filter),
  });
}

/**
 * Hook lấy chi tiết sản phẩm theo slug
 */
export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productsApi.getProductBySlug(slug),
    enabled: !!slug,
  });
}

/**
 * Hook lấy sản phẩm nổi bật
 */
export function useFeaturedProducts(limit = 8) {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: () => productsApi.getFeaturedProducts(limit),
  });
}

/**
 * Hook tìm kiếm sản phẩm
 */
export function useSearchProducts(query: string, limit = 20) {
  return useQuery({
    queryKey: ['products', 'search', query, limit],
    queryFn: () => productsApi.searchProducts(query, limit),
    enabled: query.length >= 2,
  });
}
