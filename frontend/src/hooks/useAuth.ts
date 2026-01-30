/**
 * Auth API Hooks - Fashion AI
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';
import { useAuthStore } from '@/stores/auth-store';
import type { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User,
  ForgotPasswordRequest,
  ResetPasswordRequest 
} from '@/types';

// Login mutation
export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await apiClient.post<AuthResponse>('/auth/login', data);
      return response.data;
    },
    onSuccess: (response) => {
      const { user, accessToken, refreshToken } = response.data;
      
      // Store tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Update auth store
      setAuth(user, accessToken);
      
      // Redirect based on role
      if (user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    },
  });
}

// Register mutation
export function useRegister() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      return response.data;
    },
    onSuccess: (response) => {
      const { user, accessToken, refreshToken } = response.data;
      
      // Store tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Update auth store
      setAuth(user, accessToken);
      
      // Redirect to dashboard
      router.push('/dashboard');
    },
  });
}

// Logout mutation
export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/logout');
    },
    onSettled: () => {
      // Clear tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      // Clear auth store
      logout();
      
      // Clear cache
      queryClient.clear();
      
      // Redirect to login
      router.push('/login');
    },
  });
}

// Get current user
export function useCurrentUser() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: User }>('/users/me');
      return response.data.data;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Forgot password mutation
export function useForgotPassword() {
  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest) => {
      const response = await apiClient.post('/auth/forgot-password', data);
      return response.data;
    },
  });
}

// Reset password mutation
export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ResetPasswordRequest) => {
      const response = await apiClient.post('/auth/reset-password', data);
      return response.data;
    },
    onSuccess: () => {
      router.push('/reset-success');
    },
  });
}

// Update profile mutation
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<User>) => {
      const response = await apiClient.patch<{ success: boolean; data: User }>('/users/me', data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}
