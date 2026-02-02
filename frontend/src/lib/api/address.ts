/**
 * Fashion AI - Address API
 */

import apiClient from '../api-client';
import { ApiResponse, Address, CreateAddressRequest } from '@/types/api';

export async function getAddresses(): Promise<Address[]> {
  const response = await apiClient.get<ApiResponse<Address[]>>('/users/me/addresses');
  return response.data.data;
}

export async function createAddress(data: CreateAddressRequest): Promise<Address> {
  const response = await apiClient.post<ApiResponse<Address>>('/users/me/addresses', data);
  return response.data.data;
}

export async function updateAddress(id: string, data: Partial<CreateAddressRequest>): Promise<Address> {
  const response = await apiClient.patch<ApiResponse<Address>>(`/users/me/addresses/${id}`, data);
  return response.data.data;
}

export async function deleteAddress(id: string): Promise<boolean> {
  await apiClient.delete(`/users/me/addresses/${id}`);
  return true;
}

export async function setDefaultAddress(id: string): Promise<Address> {
  const response = await apiClient.patch<ApiResponse<Address>>(`/users/me/addresses/${id}/default`, {});
  return response.data.data;
}
