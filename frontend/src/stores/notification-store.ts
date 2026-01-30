/**
 * Notification Store - Fashion AI
 */

import { create } from 'zustand';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  markAllRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
        ...state.notifications,
      ],
      unreadCount: state.unreadCount + 1,
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
  markAllRead: () => set({ unreadCount: 0 }),
}));

// Toast helper function
export function toast(notification: Omit<Notification, 'id' | 'createdAt'>) {
  useNotificationStore.getState().addNotification(notification);
}

export const toastSuccess = (title: string, message?: string) => 
  toast({ type: 'success', title, message, duration: 3000 });

export const toastError = (title: string, message?: string) => 
  toast({ type: 'error', title, message, duration: 5000 });

export const toastWarning = (title: string, message?: string) => 
  toast({ type: 'warning', title, message, duration: 4000 });

export const toastInfo = (title: string, message?: string) => 
  toast({ type: 'info', title, message, duration: 3000 });
