/**
 * Fashion AI - Wishlist Hooks
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as wishlistApi from '@/lib/api/wishlist';
import { toast } from 'sonner';

export function useWishlist() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: wishlistApi.getWishlist,
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wishlistApi.addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success('Đã thêm vào yêu thích');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Lỗi thêm yêu thích');
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wishlistApi.removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success('Đã xóa khỏi yêu thích');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Lỗi xóa yêu thích');
    },
  });
}
