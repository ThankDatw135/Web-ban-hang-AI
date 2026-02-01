/**
 * Fashion AI - Coupons API Service
 * 
 * API calls cho mã giảm giá
 */

import apiClient from '../api-client';
import type { 
  Coupon, 
  UserCoupon,
  ValidateCouponRequest,
  ValidateCouponResponse,
  ApiResponse,
  PaginatedResponse 
} from '@/types/api';

/**
 * Lấy danh sách mã giảm giá của user
 */
export async function getMyCoupons(): Promise<UserCoupon[]> {
  const response = await apiClient.get<ApiResponse<UserCoupon[]>>('/coupons/my');
  return response.data.data;
}

/**
 * Validate mã giảm giá
 */
export async function validateCoupon(data: ValidateCouponRequest): Promise<ValidateCouponResponse> {
  const response = await apiClient.post<ApiResponse<ValidateCouponResponse>>('/coupons/validate', data);
  return response.data.data;
}

/**
 * Áp dụng mã giảm giá vào giỏ hàng
 */
export async function applyCoupon(code: string): Promise<{ discountAmount: number }> {
  const response = await apiClient.post<ApiResponse<{ discountAmount: number }>>('/coupons/apply', { code });
  return response.data.data;
}

/**
 * Bỏ mã giảm giá khỏi giỏ hàng
 */
export async function removeCoupon(): Promise<void> {
  await apiClient.delete('/coupons/remove');
}

// =====================================================
// ADMIN APIs
// =====================================================

/**
 * Lấy tất cả mã giảm giá (Admin)
 */
export async function getAllCoupons(params?: { 
  page?: number; 
  limit?: number;
  status?: string;
}): Promise<PaginatedResponse<Coupon>> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.limit) searchParams.set('limit', String(params.limit));
  if (params?.status) searchParams.set('status', params.status);
  
  const response = await apiClient.get<ApiResponse<PaginatedResponse<Coupon>>>(
    `/admin/coupons?${searchParams.toString()}`
  );
  return response.data.data;
}

/**
 * Tạo mã giảm giá mới (Admin)
 */
export async function createCoupon(data: Omit<Coupon, 'id' | 'usedCount' | 'createdAt' | 'updatedAt'>): Promise<Coupon> {
  const response = await apiClient.post<ApiResponse<Coupon>>('/admin/coupons', data);
  return response.data.data;
}

/**
 * Cập nhật mã giảm giá (Admin)
 */
export async function updateCoupon(id: string, data: Partial<Coupon>): Promise<Coupon> {
  const response = await apiClient.put<ApiResponse<Coupon>>(`/admin/coupons/${id}`, data);
  return response.data.data;
}

/**
 * Xóa mã giảm giá (Admin)
 */
export async function deleteCoupon(id: string): Promise<void> {
  await apiClient.delete(`/admin/coupons/${id}`);
}
