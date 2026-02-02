/**
 * Fashion AI - Address Hooks
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as addressApi from '@/lib/api/address';
import { toast } from 'sonner';

export function useAddresses() {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: addressApi.getAddresses,
  });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addressApi.createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Thêm địa chỉ thành công');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Không thể thêm địa chỉ');
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => addressApi.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Cập nhật địa chỉ thành công');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Không thể cập nhật địa chỉ');
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addressApi.deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Đã xóa địa chỉ');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Không thể xóa địa chỉ');
    },
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addressApi.setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Đã đặt làm mặc định');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Lỗi đặt mặc định');
    },
  });
}
