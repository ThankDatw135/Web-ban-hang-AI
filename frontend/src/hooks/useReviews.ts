/**
 * Product Reviews Hooks - Fashion AI
 * 
 * Hooks cho reviews: Get, Add, Update, Delete
 */

import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { Review } from '@/types';

// ==================== TYPES ====================

export interface ReviewFilters {
  page?: number;
  limit?: number;
  sort?: 'newest' | 'oldest' | 'highest' | 'lowest';
  rating?: number;
}

export interface ReviewsResponse {
  items: Review[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
    averageRating: number;
    ratingDistribution: Record<number, number>;
  };
}

export interface AddReviewData {
  productId: string;
  rating: number;
  title?: string;
  content?: string;
  images?: string[];
}

// ==================== GET REVIEWS ====================

export function useProductReviews(productId: string, filters?: ReviewFilters) {
  return useQuery({
    queryKey: ['reviews', productId, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', String(filters.page));
      if (filters?.limit) params.append('limit', String(filters.limit || 10));
      if (filters?.sort) params.append('sort', filters.sort);
      if (filters?.rating) params.append('rating', String(filters.rating));

      const response = await apiClient.get<{ success: boolean; data: ReviewsResponse }>(
        `/products/${productId}/reviews?${params}`
      );
      return response.data.data;
    },
    enabled: !!productId,
  });
}

// ==================== INFINITE REVIEWS ====================

export function useInfiniteProductReviews(productId: string, filters?: Omit<ReviewFilters, 'page'>) {
  return useInfiniteQuery({
    queryKey: ['reviews', 'infinite', productId, filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams();
      params.append('page', String(pageParam));
      if (filters?.limit) params.append('limit', String(filters.limit || 10));
      if (filters?.sort) params.append('sort', filters.sort || 'newest');
      if (filters?.rating) params.append('rating', String(filters.rating));

      const response = await apiClient.get<{ success: boolean; data: ReviewsResponse }>(
        `/products/${productId}/reviews?${params}`
      );
      return response.data.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!productId,
  });
}

// ==================== ADD REVIEW ====================

export function useAddReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddReviewData) => {
      const response = await apiClient.post<{ success: boolean; data: Review }>(
        `/products/${data.productId}/reviews`,
        data
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['products', variables.productId] });
    },
  });
}

// ==================== UPDATE REVIEW ====================

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, productId, ...data }: { reviewId: string; productId: string; rating?: number; title?: string; content?: string }) => {
      const response = await apiClient.patch<{ success: boolean; data: Review }>(
        `/reviews/${reviewId}`,
        data
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
    },
  });
}

// ==================== DELETE REVIEW ====================

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, productId }: { reviewId: string; productId: string }) => {
      await apiClient.delete(`/reviews/${reviewId}`);
      return { reviewId, productId };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
    },
  });
}

// ==================== HELPFUL VOTE ====================

export function useVoteReviewHelpful() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, productId, helpful }: { reviewId: string; productId: string; helpful: boolean }) => {
      const response = await apiClient.post<{ success: boolean }>(`/reviews/${reviewId}/vote`, {
        helpful,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
    },
  });
}

// ==================== MY REVIEWS ====================

export function useMyReviews() {
  return useQuery({
    queryKey: ['reviews', 'my'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Review[] }>('/reviews/my');
      return response.data.data;
    },
  });
}

// ==================== CAN REVIEW ====================

export function useCanReview(productId: string) {
  return useQuery({
    queryKey: ['reviews', 'can-review', productId],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: { canReview: boolean; reason?: string } }>(
        `/products/${productId}/can-review`
      );
      return response.data.data;
    },
    enabled: !!productId,
  });
}
