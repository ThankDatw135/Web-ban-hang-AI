/**
 * Fashion AI - Cart Hooks
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as cartApi from '@/lib/api/cart';
import { toast } from 'sonner';

/**
 * Hook lấy thông tin giỏ hàng
 */
export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.getCart,
    retry: false, // Don't retry if 401 (not logged in)
  });
}

/**
 * Hook thêm vào giỏ hàng
 */
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.addToCart,
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
      toast.success('Đã thêm vào giỏ hàng');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
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
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Không thể cập nhật số lượng');
    },
  });
}

/**
 * Hook xóa sản phẩm khỏi giỏ
 */
export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.removeCartItem,
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
      toast.success('Đã xóa sản phẩm');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Không thể xóa sản phẩm');
    },
  });
}
