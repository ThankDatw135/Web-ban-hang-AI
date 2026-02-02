/**
 * Fashion AI - Wishlist API
 */

import apiClient from '../api-client';
import { ApiResponse, Product } from '@/types/api';

export async function getWishlist(): Promise<Product[]> {
  const response = await apiClient.get<ApiResponse<Product[]>>('/wishlist');
  return response.data.data;
}

export async function addToWishlist(productId: string): Promise<boolean> {
  await apiClient.post(`/wishlist/${productId}`);
  return true;
}

export async function removeFromWishlist(productId: string): Promise<boolean> {
  await apiClient.delete(`/wishlist/${productId}`);
  return true;
}

export async function checkWishlist(productId: string): Promise<boolean> {
    // Optional: Check if a specific product is wishlisted (often included in getProduct detail, but this is handy)
    // If backend doesn't support, we can check client side from getWishlist list.
    // Assuming backend endpoint /wishlist/check/:id exists or we filter getWishlist.
    // For now, let's assume we fetch all and check.
    const list = await getWishlist();
    return list.some(p => p.id === productId);
}
