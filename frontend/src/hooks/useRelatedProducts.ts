/**
 * Related Products Hooks - Fashion AI
 * 
 * Hooks cho related products, cross-sell, upsell
 */

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { ProductSummary } from '@/types';

// ==================== RELATED PRODUCTS ====================

export function useRelatedProducts(productId: string, limit: number = 8) {
  return useQuery({
    queryKey: ['products', 'related', productId, limit],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: ProductSummary[] }>(
        `/products/${productId}/related?limit=${limit}`
      );
      return response.data.data;
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// ==================== SIMILAR PRODUCTS (AI) ====================

export function useSimilarProducts(productId: string, limit: number = 8) {
  return useQuery({
    queryKey: ['products', 'similar', productId, limit],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: ProductSummary[] }>(
        `/products/${productId}/similar?limit=${limit}`
      );
      return response.data.data;
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== FREQUENTLY BOUGHT TOGETHER ====================

export function useFrequentlyBoughtTogether(productId: string, limit: number = 4) {
  return useQuery({
    queryKey: ['products', 'frequently-bought', productId, limit],
    queryFn: async () => {
      const response = await apiClient.get<{ 
        success: boolean; 
        data: {
          products: ProductSummary[];
          bundlePrice?: number;
          discount?: number;
        }
      }>(`/products/${productId}/frequently-bought?limit=${limit}`);
      return response.data.data;
    },
    enabled: !!productId,
    staleTime: 10 * 60 * 1000,
  });
}

// ==================== COMPLETE THE LOOK (AI) ====================

export function useCompleteTheLook(productId: string, limit: number = 6) {
  return useQuery({
    queryKey: ['products', 'complete-look', productId, limit],
    queryFn: async () => {
      const response = await apiClient.get<{ 
        success: boolean; 
        data: {
          items: ProductSummary[];
          styleNote?: string;
        }
      }>(`/products/${productId}/complete-look?limit=${limit}`);
      return response.data.data;
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== RECENTLY VIEWED ====================

const RECENTLY_VIEWED_KEY = 'recently-viewed';
const MAX_RECENTLY_VIEWED = 20;

export function getRecentlyViewed(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addToRecentlyViewed(productId: string): void {
  if (typeof window === 'undefined') return;
  try {
    let viewed = getRecentlyViewed();
    viewed = viewed.filter(id => id !== productId);
    viewed.unshift(productId);
    viewed = viewed.slice(0, MAX_RECENTLY_VIEWED);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(viewed));
  } catch {
    // Ignore localStorage errors
  }
}

export function useRecentlyViewed(limit: number = 10) {
  return useQuery({
    queryKey: ['products', 'recently-viewed', limit],
    queryFn: async () => {
      const productIds = getRecentlyViewed().slice(0, limit);
      if (productIds.length === 0) return [];

      const response = await apiClient.post<{ success: boolean; data: ProductSummary[] }>(
        '/products/by-ids',
        { ids: productIds }
      );
      
      // Maintain order
      const products = response.data.data;
      return productIds
        .map(id => products.find(p => p.id === id))
        .filter(Boolean) as ProductSummary[];
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ==================== YOU MAY ALSO LIKE (AI Personalized) ====================

export function useRecommendedProducts(limit: number = 12) {
  return useQuery({
    queryKey: ['products', 'recommended', limit],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: ProductSummary[] }>(
        `/products/recommended?limit=${limit}`
      );
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== TRENDING NOW ====================

export function useTrendingProducts(limit: number = 8) {
  return useQuery({
    queryKey: ['products', 'trending', limit],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: ProductSummary[] }>(
        `/products/trending?limit=${limit}`
      );
      return response.data.data;
    },
    staleTime: 10 * 60 * 1000,
  });
}
