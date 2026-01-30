/**
 * Collections API Hooks - Fashion AI
 * 
 * Hooks cho collections: List, detail, products trong collection
 */

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { Product } from '@/types';

// ==================== TYPES ====================

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  bannerImage?: string;
  productCount: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface CollectionDetail extends Collection {
  products: Product[];
  meta?: {
    total: number;
    page: number;
    totalPages: number;
  };
}

// ==================== LIST COLLECTIONS ====================

export function useCollections(options?: { featured?: boolean; limit?: number }) {
  return useQuery({
    queryKey: ['collections', options],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (options?.featured) params.append('featured', 'true');
      if (options?.limit) params.append('limit', String(options.limit));

      const response = await apiClient.get<{ success: boolean; data: Collection[] }>(
        `/collections?${params}`
      );
      return response.data.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// ==================== COLLECTION DETAIL ====================

export function useCollectionDetail(slug: string, page = 1) {
  return useQuery({
    queryKey: ['collections', slug, page],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: CollectionDetail }>(
        `/collections/${slug}?page=${page}`
      );
      return response.data.data;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== COLLECTION PRODUCTS ====================

export function useCollectionProducts(
  collectionId: string, 
  options?: { page?: number; limit?: number; sort?: string }
) {
  return useQuery({
    queryKey: ['collections', collectionId, 'products', options],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (options?.page) params.append('page', String(options.page));
      if (options?.limit) params.append('limit', String(options.limit || 20));
      if (options?.sort) params.append('sort', options.sort);

      const response = await apiClient.get<{ 
        success: boolean; 
        data: { items: Product[]; meta: { total: number; page: number; totalPages: number } } 
      }>(`/collections/${collectionId}/products?${params}`);
      return response.data.data;
    },
    enabled: !!collectionId,
    staleTime: 5 * 60 * 1000,
  });
}
