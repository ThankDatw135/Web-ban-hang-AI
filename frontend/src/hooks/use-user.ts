/**
 * Fashion AI - User Hooks
 * 
 * React Query hooks cho người dùng
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as usersApi from '@/lib/api/users';
import type { CreateAddressRequest } from '@/types/api';

/**
 * Hook lấy profile hiện tại
 */
export function useProfile() {
  return useQuery({
    queryKey: ['user'],
    queryFn: usersApi.getProfile,
    retry: false,
  });
}

/**
 * Hook cập nhật profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

/**
 * Hook cập nhật số đo
 */
export function useUpdateMeasurements() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.updateMeasurements,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

/**
 * Hook lấy danh sách địa chỉ
 */
export function useAddresses() {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: usersApi.getAddresses,
  });
}

/**
 * Hook thêm địa chỉ
 */
export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAddressRequest) => usersApi.createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
}

/**
 * Hook cập nhật địa chỉ
 */
export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateAddressRequest> }) => 
      usersApi.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
}

/**
 * Hook xóa địa chỉ
 */
export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
}

/**
 * Hook đặt địa chỉ mặc định
 */
export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.setDefaultAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
}
