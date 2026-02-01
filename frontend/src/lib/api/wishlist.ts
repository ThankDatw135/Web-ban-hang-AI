/**
 * Fashion AI - Wishlist API
 * 
 * API functions cho danh sách yêu thích
 */

import apiClient from '../api-client';
import { ApiResponse } from '@/types/api';

// Types
export interface WishlistItem {
  id: string;
  productId: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice?: number;
    images: { url: string }[];
  };
}

export interface WishlistResponse {
  items: WishlistItem[];
  total: number;
}

/**
 * Get user's wishlist
 */
export async function getWishlist(): Promise<WishlistResponse> {
  const response = await apiClient.get<ApiResponse<WishlistResponse>>(
    '/users/me/wishlist'
  );
  return response.data.data;
}

/**
 * Add product to wishlist
 */
export async function addToWishlist(productId: string): Promise<WishlistItem> {
  const response = await apiClient.post<ApiResponse<WishlistItem>>(
    '/users/me/wishlist',
    { productId }
  );
  return response.data.data;
}

/**
 * Remove product from wishlist
 */
export async function removeFromWishlist(productId: string): Promise<void> {
  await apiClient.delete(`/users/me/wishlist/${productId}`);
}

/**
 * Check if product is in wishlist
 */
export async function isInWishlist(productId: string): Promise<boolean> {
  const response = await apiClient.get<ApiResponse<{ isInWishlist: boolean }>>(
    `/users/me/wishlist/check/${productId}`
  );
  return response.data.data.isInWishlist;
}

/**
 * Toggle wishlist (add if not exists, remove if exists)
 */
export async function toggleWishlist(productId: string): Promise<{ added: boolean }> {
  const response = await apiClient.post<ApiResponse<{ added: boolean }>>(
    `/users/me/wishlist/toggle`,
    { productId }
  );
  return response.data.data;
}
