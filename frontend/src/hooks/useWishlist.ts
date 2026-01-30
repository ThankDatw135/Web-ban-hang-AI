/**
 * Wishlist API Hooks - Fashion AI
 * 
 * Hooks cho wishlist: Get, Add, Remove, Sync
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { useWishlistStore } from '@/stores';
import type { Product } from '@/types';

// ==================== TYPES ====================

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface WishlistResponse {
  items: WishlistItem[];
  total: number;
}

// ==================== GET WISHLIST ====================

export function useWishlist() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: WishlistResponse }>('/wishlist');
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// ==================== ADD TO WISHLIST ====================

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  const { addItem } = useWishlistStore();

  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await apiClient.post<{ success: boolean; data: WishlistItem }>('/wishlist', {
        productId,
      });
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      // Sync with local store
      addItem({
        productId: data.productId,
        name: data.product.name,
        price: data.product.salePrice || data.product.price,
        image: data.product.images?.[0]?.url || '',
      });
    },
  });
}

// ==================== REMOVE FROM WISHLIST ====================

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  const { removeItem } = useWishlistStore();

  return useMutation({
    mutationFn: async (productId: string) => {
      await apiClient.delete(`/wishlist/${productId}`);
      return productId;
    },
    onSuccess: (productId) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      removeItem(productId);
    },
  });
}

// ==================== TOGGLE WISHLIST ====================

export function useToggleWishlist() {
  const queryClient = useQueryClient();
  const { toggleItem, isInWishlist } = useWishlistStore();

  return useMutation({
    mutationFn: async ({ productId, product }: { productId: string; product: Product }) => {
      const inWishlist = isInWishlist(productId);
      
      if (inWishlist) {
        await apiClient.delete(`/wishlist/${productId}`);
        return { action: 'removed', productId };
      } else {
        const response = await apiClient.post<{ success: boolean; data: WishlistItem }>('/wishlist', {
          productId,
        });
        return { action: 'added', productId, data: response.data.data };
      }
    },
    onSuccess: (result, { productId, product }) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toggleItem({
        productId,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.images?.[0]?.url || '',
      });
    },
  });
}

// ==================== SYNC WISHLIST ====================

export function useSyncWishlist() {
  const queryClient = useQueryClient();
  const { items, clearWishlist, addItem } = useWishlistStore();

  return useMutation({
    mutationFn: async () => {
      // Sync local wishlist to server after login
      const localItems = items.map(item => item.productId);
      
      const response = await apiClient.post<{ success: boolean; data: WishlistResponse }>('/wishlist/sync', {
        productIds: localItems,
      });
      
      return response.data.data;
    },
    onSuccess: (data) => {
      // Update local store with server data
      clearWishlist();
      data.items.forEach(item => {
        addItem({
          productId: item.productId,
          name: item.product.name,
          price: item.product.salePrice || item.product.price,
          image: item.product.images?.[0]?.url || '',
        });
      });
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
}

// ==================== CLEAR WISHLIST ====================

export function useClearWishlist() {
  const queryClient = useQueryClient();
  const { clearWishlist } = useWishlistStore();

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete('/wishlist');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      clearWishlist();
    },
  });
}

// ==================== WISHLIST COUNT ====================

export function useWishlistCount() {
  const { data } = useWishlist();
  const { items } = useWishlistStore();
  
  // Return server count if available, otherwise local count
  return data?.total ?? items.length;
}
