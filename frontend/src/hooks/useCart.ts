/**
 * Cart API Hooks - Fashion AI
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { useAuthStore } from '@/stores/auth-store';
import type { 
  Cart, 
  CartResponse, 
  AddToCartRequest, 
  UpdateCartItemRequest,
  ApplyCouponRequest 
} from '@/types';

// Get cart
export function useCart() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await apiClient.get<CartResponse>('/cart');
      return response.data.data;
    },
    enabled: isAuthenticated,
    staleTime: 30 * 1000, // 30 seconds
  });
}

// Add to cart
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddToCartRequest) => {
      const response = await apiClient.post<CartResponse>('/cart/items', data);
      return response.data.data;
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(['cart'], cart);
    },
  });
}

// Update cart item quantity
export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId, data }: { itemId: string; data: UpdateCartItemRequest }) => {
      const response = await apiClient.patch<CartResponse>(`/cart/items/${itemId}`, data);
      return response.data.data;
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(['cart'], cart);
    },
  });
}

// Remove cart item
export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const response = await apiClient.delete<CartResponse>(`/cart/items/${itemId}`);
      return response.data.data;
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(['cart'], cart);
    },
  });
}

// Clear cart
export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete('/cart');
    },
    onSuccess: () => {
      queryClient.setQueryData(['cart'], null);
    },
  });
}

// Apply coupon
export function useApplyCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ApplyCouponRequest) => {
      const response = await apiClient.post<CartResponse>('/cart/coupon', data);
      return response.data.data;
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(['cart'], cart);
    },
  });
}

// Remove coupon
export function useRemoveCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.delete<CartResponse>('/cart/coupon');
      return response.data.data;
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(['cart'], cart);
    },
  });
}
