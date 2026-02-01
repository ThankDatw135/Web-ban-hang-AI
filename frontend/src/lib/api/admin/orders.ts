/**
 * Fashion AI - Admin Orders API
 * 
 * API functions cho quản lý đơn hàng (Admin)
 */

import apiClient from '../../api-client';
import { ApiResponse } from '@/types/api';

// Types
export type OrderStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'CANCELLED';

export interface AdminOrder {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  shippingFee: number;
  discount: number;
  finalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  };
  items: {
    id: string;
    productId: string;
    variantId: string;
    quantity: number;
    price: number;
    product: {
      name: string;
      images: { url: string }[];
    };
  }[];
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    ward: string;
    district: string;
    city: string;
  };
}

export interface AdminOrdersResponse {
  items: AdminOrder[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AdminOrdersParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  search?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Get all orders (Admin)
 */
export async function getAdminOrders(params: AdminOrdersParams = {}): Promise<AdminOrdersResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.status) searchParams.append('status', params.status);
  if (params.search) searchParams.append('search', params.search);
  if (params.startDate) searchParams.append('startDate', params.startDate);
  if (params.endDate) searchParams.append('endDate', params.endDate);

  const response = await apiClient.get<ApiResponse<AdminOrdersResponse>>(
    `/admin/orders?${searchParams.toString()}`
  );
  return response.data.data;
}

/**
 * Get order details by ID (Admin)
 */
export async function getAdminOrderById(orderId: string): Promise<AdminOrder> {
  const response = await apiClient.get<ApiResponse<AdminOrder>>(
    `/admin/orders/${orderId}`
  );
  return response.data.data;
}

/**
 * Update order status (Admin)
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  note?: string
): Promise<AdminOrder> {
  const response = await apiClient.patch<ApiResponse<AdminOrder>>(
    `/admin/orders/${orderId}/status`,
    { status, note }
  );
  return response.data.data;
}

/**
 * Get order statistics (Admin)
 */
export async function getOrderStatistics(): Promise<{
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}> {
  const response = await apiClient.get<ApiResponse<{
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
  }>>('/admin/orders/statistics');
  return response.data.data;
}
