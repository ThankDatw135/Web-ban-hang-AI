/**
 * Fashion AI - User Hooks
 */

'use client';

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import * as userApi from '@/lib/api/user';
import { toast } from 'sonner';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'user'], data); // Update user data in cache
      toast.success('Cập nhật hồ sơ thành công');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Cập nhật thất bại');
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: userApi.changePassword,
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Đổi mật khẩu thất bại');
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.uploadAvatar,
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
       toast.success('Đổi ảnh đại diện thành công');
    },
    onError: (error: any) => {
       toast.error(error.response?.data?.message || 'Upload ảnh thất bại');
    }
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: userApi.getProfile,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
