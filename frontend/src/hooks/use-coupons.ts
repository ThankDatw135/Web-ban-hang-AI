/**
 * Fashion AI - Coupons Hooks
 * 
 * React Query hooks cho mã giảm giá
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as couponsApi from '@/lib/api/coupons';
import type { ValidateCouponRequest } from '@/types/api';

/**
 * Hook lấy danh sách mã giảm giá của user
 */
export function useMyCoupons() {
  return useQuery({
    queryKey: ['my-coupons'],
    queryFn: () => couponsApi.getMyCoupons(),
  });
}

/**
 * Hook validate mã giảm giá
 */
export function useValidateCoupon() {
  return useMutation({
    mutationFn: (data: ValidateCouponRequest) => couponsApi.validateCoupon(data),
  });
}

/**
 * Hook áp dụng mã giảm giá
 */
export function useApplyCoupon() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (code: string) => couponsApi.applyCoupon(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

/**
 * Hook bỏ mã giảm giá
 */
export function useRemoveCoupon() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => couponsApi.removeCoupon(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

// =====================================================
// ADMIN HOOKS
// =====================================================

/**
 * Hook lấy tất cả mã giảm giá (Admin)
 */
export function useAllCoupons(params?: { page?: number; limit?: number; status?: string }) {
  return useQuery({
    queryKey: ['admin-coupons', params],
    queryFn: () => couponsApi.getAllCoupons(params),
  });
}

/**
 * Hook tạo mã giảm giá (Admin)
 */
export function useCreateCoupon() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: couponsApi.createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-coupons'] });
    },
  });
}

/**
 * Hook xóa mã giảm giá (Admin)
 */
export function useDeleteCoupon() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: couponsApi.deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-coupons'] });
    },
  });
}
