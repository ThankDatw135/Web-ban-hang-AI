/**
 * Fashion AI - Admin Users Hook
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as usersApi from '@/lib/api/users';
import { toast } from 'sonner';

export function useUsers(params?: any) {
  return useQuery({
    queryKey: ['admin-users', params],
    queryFn: () => usersApi.getUsers(params),
  });
}

export function useToggleBlockUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.toggleBlockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Cập nhật trạng thái người dùng thành công');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });
}
