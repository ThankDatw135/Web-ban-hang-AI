/**
 * Notifications API Hooks - Fashion AI
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export interface Notification {
  id: string;
  userId: string;
  type: 'ORDER' | 'PROMO' | 'AI' | 'WISHLIST' | 'SYSTEM';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

// Get notifications list
export function useNotifications(filter?: string) {
  return useQuery({
    queryKey: ['notifications', filter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filter && filter !== 'all') {
        params.set('type', filter.toUpperCase());
      }
      
      const response = await apiClient.get<{ 
        success: boolean; 
        data: { items: Notification[]; unreadCount: number } 
      }>(`/notifications?${params.toString()}`);
      return response.data.data;
    },
  });
}

// Mark notification as read
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      await apiClient.patch(`/notifications/${notificationId}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

// Mark all notifications as read
export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.patch('/notifications/read-all');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

// Delete notification
export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      await apiClient.delete(`/notifications/${notificationId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

// Unread notification count
export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: { count: number } }>(
        '/notifications/unread-count'
      );
      return response.data.data.count;
    },
    refetchInterval: 15 * 1000,
    staleTime: 10 * 1000,
  });
}

// Delete all notifications
export function useDeleteAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete('/notifications');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

// Notification preferences
export interface NotificationPreferences {
  email: { orders: boolean; promotions: boolean; newsletter: boolean };
  push: { orders: boolean; promotions: boolean; ai: boolean };
}

export function useNotificationPreferences() {
  return useQuery({
    queryKey: ['notifications', 'preferences'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: NotificationPreferences }>(
        '/notifications/preferences'
      );
      return response.data.data;
    },
  });
}

export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (preferences: Partial<NotificationPreferences>) => {
      const response = await apiClient.patch<{ success: boolean; data: NotificationPreferences }>(
        '/notifications/preferences',
        preferences
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'preferences'] });
    },
  });
}
