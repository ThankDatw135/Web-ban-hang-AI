/**
 * Fashion AI - Orders API Service
 * 
 * Các functions gọi API đơn hàng
 */

import apiClient from '../api-client';
import type { 
  Order, 
  CreateOrderRequest, 
  OrderFilter, 
  PaginatedResponse,
  ApiResponse 
} from '@/types/api';

/**
 * Tạo đơn hàng mới
 */
export async function createOrder(data: CreateOrderRequest): Promise<Order> {
  const response = await apiClient.post<ApiResponse<Order>>('/orders', data);
  return response.data.data;
}

/**
 * Lấy danh sách đơn hàng của user
 */
export async function getOrders(filter?: OrderFilter): Promise<PaginatedResponse<Order>> {
  const params = new URLSearchParams();
  
  if (filter?.page) params.set('page', String(filter.page));
  if (filter?.limit) params.set('limit', String(filter.limit));
  if (filter?.status) params.set('status', filter.status);

  const response = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>(
    `/orders?${params.toString()}`
  );
  return response.data.data;
}

/**
 * Lấy chi tiết đơn hàng
 */
export async function getOrderById(id: string): Promise<Order> {
  const response = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
  return response.data.data;
}

/**
 * Hủy đơn hàng
 */
export async function cancelOrder(id: string): Promise<Order> {
  const response = await apiClient.post<ApiResponse<Order>>(`/orders/${id}/cancel`);
  return response.data.data;
}
