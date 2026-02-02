/**
 * Fashion AI - Products Hooks
 * 
 * React Query hooks cho sản phẩm
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as productsApi from '@/lib/api/products';
import type { ProductFilter } from '@/types/api';
import { toast } from 'sonner';

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

/**
 * [ADMIN] Hook tạo sản phẩm
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productsApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Tạo sản phẩm thành công');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi tạo sản phẩm');
    },
  });
}

/**
 * [ADMIN] Hook cập nhật sản phẩm
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => productsApi.updateProduct(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.slug] });
      toast.success('Cập nhật sản phẩm thành công');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật');
    },
  });
}

/**
 * [ADMIN] Hook xóa sản phẩm
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Xóa sản phẩm thành công');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi xóa');
    },
  });
}
