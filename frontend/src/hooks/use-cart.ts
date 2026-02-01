/**
 * Fashion AI - Cart Hooks
 * 
 * React Query hooks cho giỏ hàng
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as cartApi from '@/lib/api/cart';
import type { AddToCartRequest } from '@/types/api';

/**
 * Hook lấy giỏ hàng
 */
export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.getCart,
  });
}

/**
 * Hook thêm vào giỏ
 */
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddToCartRequest) => cartApi.addToCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

/**
 * Hook cập nhật số lượng
 */
export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) => 
      cartApi.updateCartItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

/**
 * Hook xóa item khỏi giỏ
 */
export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => cartApi.removeCartItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

/**
 * Hook xóa toàn bộ giỏ
 */
export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
