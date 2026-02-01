/**
 * Fashion AI - Auth API Service
 * 
 * Các functions gọi API authentication
 */

import apiClient from '../api-client';
import type { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  ApiResponse 
} from '@/types/api';

/**
 * Đăng nhập
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
  return response.data.data;
}

/**
 * Đăng ký
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
  return response.data.data;
}

/**
 * Đăng nhập bằng Google
 */
export async function loginGoogle(token: string): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login/google', { token });
  return response.data.data;
}

/**
 * Refresh token
 */
export async function refreshToken(refreshToken: string): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/refresh', { refreshToken });
  return response.data.data;
}

/**
 * Đăng xuất
 */
export async function logout(refreshToken: string): Promise<void> {
  await apiClient.post('/auth/logout', { refreshToken });
}

/**
 * Quên mật khẩu - gửi OTP
 */
export async function forgotPassword(email: string): Promise<void> {
  await apiClient.post('/auth/forgot-password', { email });
}

/**
 * Xác thực OTP
 */
export async function verifyOtp(email: string, otp: string): Promise<{ token: string }> {
  const response = await apiClient.post<ApiResponse<{ token: string }>>('/auth/verify-otp', { email, otp });
  return response.data.data;
}

/**
 * Đặt lại mật khẩu
 */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await apiClient.post('/auth/reset-password', { token, newPassword });
}
