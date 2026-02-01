/**
 * Fashion AI - Orders Hooks
 * 
 * React Query hooks cho đơn hàng
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import * as ordersApi from '@/lib/api/orders';
import type { CreateOrderRequest, OrderFilter } from '@/types/api';

/**
 * Hook lấy danh sách đơn hàng
 */
export function useOrders(filter?: OrderFilter) {
  return useQuery({
    queryKey: ['orders', filter],
    queryFn: () => ordersApi.getOrders(filter),
  });
}

/**
 * Hook lấy chi tiết đơn hàng
 */
export function useOrder(id: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersApi.getOrderById(id),
    enabled: !!id,
  });
}

/**
 * Hook tạo đơn hàng
 */
export function useCreateOrder() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderRequest) => ordersApi.createOrder(data),
    onSuccess: (order) => {
      // Clear cart after order
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      // Redirect to success page
      router.push(`/checkout/success?orderId=${order.id}`);
    },
  });
}

/**
 * Hook hủy đơn hàng
 */
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ordersApi.cancelOrder(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', id] });
    },
  });
}
