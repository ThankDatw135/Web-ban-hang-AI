/**
 * Fashion AI - Cart API Service
 */

import apiClient from '../api-client';
import { ApiResponse, Cart, AddToCartRequest } from '@/types/api';

/**
 * Lấy thông tin giỏ hàng hiện tại
 */
export async function getCart(): Promise<Cart> {
  const response = await apiClient.get<ApiResponse<Cart>>('/cart');
  return response.data.data;
}

/**
 * Thêm sản phẩm vào giỏ hàng
 */
export async function addToCart(data: AddToCartRequest): Promise<Cart> {
  const response = await apiClient.post<ApiResponse<Cart>>('/cart', data);
  return response.data.data;
}

/**
 * Cập nhật số lượng sản phẩm trong giỏ
 */
export async function updateCartItem(itemId: string, quantity: number): Promise<Cart> {
  const response = await apiClient.patch<ApiResponse<Cart>>(`/cart/items/${itemId}`, { quantity });
  return response.data.data;
}

/**
 * Xóa sản phẩm khỏi giỏ hàng
 */
export async function removeCartItem(itemId: string): Promise<Cart> {
  const response = await apiClient.delete<ApiResponse<Cart>>(`/cart/items/${itemId}`);
  return response.data.data;
}
