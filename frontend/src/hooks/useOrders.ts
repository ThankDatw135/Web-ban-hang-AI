/**
 * Orders API Hooks - Fashion AI
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';
import type { 
  Order, 
  OrderSummary, 
  CreateOrderRequest,
  PaymentInitiateRequest,
  PaymentInitiateResponse,
  Address,
  AddressInput,
  OrderStatus
} from '@/types';

// Get orders list
export function useOrders(status?: OrderStatus, page: number = 1) {
  return useQuery({
    queryKey: ['orders', { status, page }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', String(page));
      if (status) params.set('status', status);

      const response = await apiClient.get<{ 
        success: boolean; 
        data: { items: OrderSummary[]; meta: { total: number; page: number; limit: number; totalPages: number } } 
      }>(`/orders?${params.toString()}`);
      return response.data.data;
    },
  });
}

// Get single order
export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Order }>(`/orders/${orderId}`);
      return response.data.data;
    },
    enabled: !!orderId,
  });
}

// Create order
export function useCreateOrder() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateOrderRequest) => {
      const response = await apiClient.post<{ success: boolean; data: Order }>('/orders', data);
      return response.data.data;
    },
    onSuccess: (order) => {
      // Clear cart
      queryClient.setQueryData(['cart'], null);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      // If COD, go to success page
      if (order.paymentMethod === 'COD') {
        router.push(`/order-success?orderId=${order.id}`);
      }
    },
  });
}

// Cancel order
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, reason }: { orderId: string; reason?: string }) => {
      const response = await apiClient.post(`/orders/${orderId}/cancel`, { reason });
      return response.data;
    },
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

// Initiate payment
export function useInitiatePayment() {
  return useMutation({
    mutationFn: async (data: PaymentInitiateRequest) => {
      const response = await apiClient.post<PaymentInitiateResponse>('/payments/initiate', data);
      return response.data.data;
    },
    onSuccess: (data) => {
      // Redirect to payment gateway if payUrl exists
      if (data.payUrl) {
        window.location.href = data.payUrl;
      }
    },
  });
}

// Get addresses
export function useAddresses() {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Address[] }>('/users/me/addresses');
      return response.data.data;
    },
  });
}

// Create address
export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddressInput) => {
      const response = await apiClient.post<{ success: boolean; data: Address }>('/users/me/addresses', data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
}

// Update address
export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<AddressInput> }) => {
      const response = await apiClient.patch<{ success: boolean; data: Address }>(`/users/me/addresses/${id}`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
}

// Delete address
export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/users/me/addresses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
}
