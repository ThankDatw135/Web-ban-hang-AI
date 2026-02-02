/**
 * Fashion AI - Order Hooks
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as orderApi from '@/lib/api/order';
import { toast } from 'sonner';

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] }); // Cart is cleared after order
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Đặt hàng thành công!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Đặt hàng thất bại');
    },
  });
}

export function useOrders(filter?: any) {
  return useQuery({
    queryKey: ['orders', filter],
    queryFn: () => orderApi.getOrders(filter),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => orderApi.getOrderById(id),
    enabled: !!id,
  });
}

/**
 * [ADMIN] Hook lấy danh sách đơn hàng confirm
 */
export function useAdminOrders(filter?: any) {
  return useQuery({
    queryKey: ['admin-orders', filter],
    queryFn: () => orderApi.getAdminOrders(filter),
  });
}

/**
 * [ADMIN] Hook cập nhật trạng thái đơn hàng
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => orderApi.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Cập nhật trạng thái thành công');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Cập nhật thất bại');
    },
  });
}
