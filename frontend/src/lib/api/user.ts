/**
 * Fashion AI - User API
 */

import apiClient from '../api-client';
import { ApiResponse, User } from '@/types/api';

// Define request types here if missing in types/api.ts, or verify later
// Assuming UpdateUserRequest matches Partial<User> or similar
export interface UpdateUserRequest {
    firstName?: string;
    lastName?: string;
    phone?: string;
}

export interface ChangePasswordRequest {
    oldPassword?: string;
    newPassword?: string;
}

export async function getProfile(): Promise<User> {
  const response = await apiClient.get<ApiResponse<User>>('/users/me');
  return response.data.data;
}

export async function updateProfile(data: UpdateUserRequest): Promise<User> {
  const response = await apiClient.patch<ApiResponse<User>>('/users/me', data);
  return response.data.data;
}

export async function changePassword(data: ChangePasswordRequest): Promise<boolean> {
  await apiClient.post('/auth/change-password', data);
  return true;
}

export async function uploadAvatar(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<ApiResponse<{ url: string }>>('/upload/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data.url;
}
