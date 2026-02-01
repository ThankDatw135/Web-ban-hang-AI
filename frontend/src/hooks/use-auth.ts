/**
 * Fashion AI - Auth Hooks
 * 
 * React Query hooks cho authentication
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import * as authApi from '@/lib/api/auth';
import type { LoginRequest, RegisterRequest } from '@/types/api';

/**
 * Hook đăng nhập
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      // Lưu tokens
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      
      // Invalidate user query
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      // Redirect based on role
      if (response.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    },
  });
}

/**
 * Hook đăng ký
 */
export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      // Lưu tokens
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      
      // Invalidate user query
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      // Redirect to home
      router.push('/');
    },
  });
}

/**
 * Hook đăng xuất
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    },
    onSuccess: () => {
      // Clear tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      // Clear all queries
      queryClient.clear();
      
      // Redirect to login
      router.push('/login');
    },
    onError: () => {
      // Clear tokens anyway
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      queryClient.clear();
      router.push('/login');
    },
  });
}

/**
 * Hook quên mật khẩu
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
  });
}

/**
 * Hook xác thực OTP
 */
export function useVerifyOtp() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) => 
      authApi.verifyOtp(email, otp),
    onSuccess: (data, variables) => {
      // Navigate to reset password page with token
      router.push(`/reset-password?token=${encodeURIComponent(data.token)}`);
    },
  });
}

/**
 * Hook đặt lại mật khẩu
 */
export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) => 
      authApi.resetPassword(token, newPassword),
    onSuccess: () => {
      router.push('/login');
    },
  });
}
