/**
 * Products API Hooks - Fashion AI
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { 
  Product, 
  ProductSummary, 
  ProductFilters, 
  ProductsResponse,
  ProductResponse,
  Category,
  Review
} from '@/types';

// Get products list
export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters.page) params.set('page', String(filters.page));
      if (filters.limit) params.set('limit', String(filters.limit));
      if (filters.category) params.set('category', filters.category);
      if (filters.search) params.set('search', filters.search);
      if (filters.minPrice) params.set('minPrice', String(filters.minPrice));
      if (filters.maxPrice) params.set('maxPrice', String(filters.maxPrice));
      if (filters.size) params.set('size', filters.size);
      if (filters.color) params.set('color', filters.color);
      if (filters.sort) params.set('sort', filters.sort);

      const response = await apiClient.get<ProductsResponse>(`/products?${params.toString()}`);
      return response.data.data;
    },
    staleTime: 60 * 1000, // 1 minute
  });
}

// Get single product by ID or slug
export function useProduct(idOrSlug: string) {
  return useQuery({
    queryKey: ['product', idOrSlug],
    queryFn: async () => {
      const response = await apiClient.get<ProductResponse>(`/products/${idOrSlug}`);
      return response.data.data;
    },
    enabled: !!idOrSlug,
  });
}

// Get categories
export function useCategories(tree: boolean = false) {
  return useQuery({
    queryKey: ['categories', { tree }],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Category[] }>(
        `/categories${tree ? '?tree=true' : ''}`
      );
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get product reviews
export function useProductReviews(productId: string, page: number = 1) {
  return useQuery({
    queryKey: ['reviews', productId, page],
    queryFn: async () => {
      const response = await apiClient.get<{ 
        success: boolean; 
        data: { items: Review[]; meta: { total: number; page: number; limit: number } } 
      }>(`/products/${productId}/reviews?page=${page}`);
      return response.data.data;
    },
    enabled: !!productId,
  });
}

// Create product review
export function useCreateReview(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { rating: number; title?: string; content?: string }) => {
      const response = await apiClient.post(`/products/${productId}/reviews`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
    },
  });
}

// Search products
export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      const response = await apiClient.get<ProductsResponse>(`/products?search=${encodeURIComponent(query)}`);
      return response.data.data;
    },
    enabled: query.length >= 2,
    staleTime: 30 * 1000, // 30 seconds
  });
}

// Featured products
export function useFeaturedProducts(limit: number = 8) {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: async () => {
      const response = await apiClient.get<ProductsResponse>(`/products?featured=true&limit=${limit}`);
      return response.data.data.items;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// New arrivals
export function useNewArrivals(limit: number = 8) {
  return useQuery({
    queryKey: ['products', 'new', limit],
    queryFn: async () => {
      const response = await apiClient.get<ProductsResponse>(`/products?sort=newest&limit=${limit}`);
      return response.data.data.items;
    },
    staleTime: 5 * 60 * 1000,
  });
}
