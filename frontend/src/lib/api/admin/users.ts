/**
 * Fashion AI - Admin Users API
 * 
 * API functions cho quản lý người dùng (Admin)
 */

import apiClient from '../../api-client';
import { ApiResponse } from '@/types/api';

// Types
export type UserRole = 'USER' | 'ADMIN';

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    orders: number;
    reviews: number;
  };
}

export interface AdminUsersResponse {
  items: AdminUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AdminUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  isActive?: boolean;
}

/**
 * Get all users (Admin)
 */
export async function getAdminUsers(params: AdminUsersParams = {}): Promise<AdminUsersResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.search) searchParams.append('search', params.search);
  if (params.role) searchParams.append('role', params.role);
  if (params.isActive !== undefined) searchParams.append('isActive', params.isActive.toString());

  const response = await apiClient.get<ApiResponse<AdminUsersResponse>>(
    `/users?${searchParams.toString()}`
  );
  return response.data.data;
}

/**
 * Get user by ID (Admin)
 */
export async function getAdminUserById(userId: string): Promise<AdminUser> {
  const response = await apiClient.get<ApiResponse<AdminUser>>(
    `/users/${userId}`
  );
  return response.data.data;
}

/**
 * Toggle user active status (Admin)
 */
export async function toggleUserActive(userId: string): Promise<AdminUser> {
  const response = await apiClient.patch<ApiResponse<AdminUser>>(
    `/users/${userId}/toggle-active`
  );
  return response.data.data;
}

/**
 * Update user role (Admin)
 */
export async function updateUserRole(userId: string, role: UserRole): Promise<AdminUser> {
  const response = await apiClient.patch<ApiResponse<AdminUser>>(
    `/users/${userId}/role`,
    { role }
  );
  return response.data.data;
}
