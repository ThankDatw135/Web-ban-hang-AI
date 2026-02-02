/**
 * Fashion AI - Order API
 */

import apiClient from '../api-client';
import { ApiResponse, Order, CreateOrderRequest, OrderFilter, PaginatedResponse } from '@/types/api';

export async function createOrder(data: CreateOrderRequest): Promise<Order> {
  const response = await apiClient.post<ApiResponse<Order>>('/orders', data);
  return response.data.data;
}

export async function getOrders(filter?: OrderFilter): Promise<PaginatedResponse<Order>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>('/orders', { params: filter });
  return response.data.data;
}

export async function getOrderById(id: string): Promise<Order> {
  const response = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
  return response.data.data;
}

/**
 * [ADMIN] Get all orders
 */
export async function getAdminOrders(filter?: OrderFilter): Promise<PaginatedResponse<Order>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>('/admin/orders', { params: filter });
  return response.data.data;
}

/**
 * [ADMIN] Update order status
 */
export async function updateOrderStatus(id: string, status: string): Promise<Order> {
  const response = await apiClient.patch<ApiResponse<Order>>(`/admin/orders/${id}/status`, { status });
  return response.data.data;
}
