/**
 * Fashion AI - Reviews API
 * 
 * API functions cho đánh giá sản phẩm
 */

import apiClient from '../api-client';
import { ApiResponse } from '@/types/api';

// Types
export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  isVisible: boolean;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

export interface CreateReviewInput {
  productId: string;
  rating: number;
  comment: string;
}

export interface ReviewsResponse {
  items: Review[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Get reviews for a product
 */
export async function getProductReviews(
  productId: string,
  page = 1,
  limit = 10
): Promise<ReviewsResponse> {
  const response = await apiClient.get<ApiResponse<ReviewsResponse>>(
    `/reviews/product/${productId}?page=${page}&limit=${limit}`
  );
  return response.data.data;
}

/**
 * Create a new review
 */
export async function createReview(input: CreateReviewInput): Promise<Review> {
  const response = await apiClient.post<ApiResponse<Review>>('/reviews', input);
  return response.data.data;
}

/**
 * Delete a review (user's own review)
 */
export async function deleteReview(reviewId: string): Promise<void> {
  await apiClient.delete(`/reviews/${reviewId}`);
}

/**
 * Admin: Toggle review visibility
 */
export async function toggleReviewVisibility(reviewId: string): Promise<Review> {
  const response = await apiClient.patch<ApiResponse<Review>>(
    `/admin/reviews/${reviewId}/toggle-visibility`
  );
  return response.data.data;
}
