/**
 * Fashion AI - Users API Service
 * 
 * Các functions gọi API người dùng
 */

import apiClient from '../api-client';
import type { 
  User, 
  Address, 
  CreateAddressRequest,
  ApiResponse 
} from '@/types/api';

/**
 * Lấy thông tin profile hiện tại
 */
export async function getProfile(): Promise<User> {
  const response = await apiClient.get<ApiResponse<User>>('/users/me');
  return response.data.data;
}

/**
 * Cập nhật profile
 */
export async function updateProfile(data: Partial<User>): Promise<User> {
  const response = await apiClient.patch<ApiResponse<User>>('/users/me', data);
  return response.data.data;
}

/**
 * Cập nhật số đo cơ thể
 */
export async function updateMeasurements(data: {
  height?: number;
  weight?: number;
  chest?: number;
  waist?: number;
  hips?: number;
}): Promise<User> {
  const response = await apiClient.patch<ApiResponse<User>>('/users/me/measurements', data);
  return response.data.data;
}

/**
 * Lấy danh sách địa chỉ
 */
export async function getAddresses(): Promise<Address[]> {
  const response = await apiClient.get<ApiResponse<Address[]>>('/users/me/addresses');
  return response.data.data;
}

/**
 * Thêm địa chỉ mới
 */
export async function createAddress(data: CreateAddressRequest): Promise<Address> {
  const response = await apiClient.post<ApiResponse<Address>>('/users/me/addresses', data);
  return response.data.data;
}

/**
 * Cập nhật địa chỉ
 */
export async function updateAddress(id: string, data: Partial<CreateAddressRequest>): Promise<Address> {
  const response = await apiClient.patch<ApiResponse<Address>>(`/users/me/addresses/${id}`, data);
  return response.data.data;
}

/**
 * Xóa địa chỉ
 */
export async function deleteAddress(id: string): Promise<void> {
  await apiClient.delete(`/users/me/addresses/${id}`);
}

/**
 * Đặt địa chỉ mặc định
 */
export async function setDefaultAddress(id: string): Promise<Address> {
  const response = await apiClient.patch<ApiResponse<Address>>(`/users/me/addresses/${id}/default`);
  return response.data.data;
}
