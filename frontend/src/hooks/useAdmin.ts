/**
 * Admin API Hooks - Fashion AI
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { Product, Order, OrderStatus } from '@/types';

// ==================== DASHBOARD ====================

export interface AdminDashboardStats {
  todayRevenue: number;
  todayOrders: number;
  newCustomers: number;
  conversionRate: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
  conversionChange: number;
}

export interface AdminAlert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  link?: string;
}

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: async () => {
      const response = await apiClient.get<{ 
        success: boolean; 
        data: {
          stats: AdminDashboardStats;
          recentOrders: Order[];
          alerts: AdminAlert[];
        } 
      }>('/admin/dashboard');
      return response.data.data;
    },
  });
}

// ==================== PRODUCTS ====================

export interface AdminProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}

export function useAdminProducts(filters: AdminProductFilters = {}) {
  return useQuery({
    queryKey: ['admin', 'products', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.page) params.set('page', String(filters.page));
      if (filters.limit) params.set('limit', String(filters.limit));
      if (filters.search) params.set('search', filters.search);
      if (filters.category) params.set('category', filters.category);
      if (filters.status) params.set('status', filters.status);

      const response = await apiClient.get<{ 
        success: boolean; 
        data: { items: Product[]; meta: { total: number; page: number; totalPages: number } } 
      }>(`/admin/products?${params.toString()}`);
      return response.data.data;
    },
  });
}

export function useAdminProduct(id: string) {
  return useQuery({
    queryKey: ['admin', 'product', id],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Product }>(`/admin/products/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiClient.post<{ success: boolean; data: Product }>('/admin/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData | Partial<Product> }) => {
      const response = await apiClient.patch<{ success: boolean; data: Product }>(`/admin/products/${id}`, data);
      return response.data.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'product', id] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/admin/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
    },
  });
}

// ==================== ORDERS ====================

export interface AdminOrderFilters {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export function useAdminOrders(filters: AdminOrderFilters = {}) {
  return useQuery({
    queryKey: ['admin', 'orders', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.page) params.set('page', String(filters.page));
      if (filters.limit) params.set('limit', String(filters.limit));
      if (filters.status) params.set('status', filters.status);
      if (filters.search) params.set('search', filters.search);
      if (filters.dateFrom) params.set('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.set('dateTo', filters.dateTo);

      const response = await apiClient.get<{ 
        success: boolean; 
        data: { items: Order[]; meta: { total: number; page: number; totalPages: number } } 
      }>(`/admin/orders?${params.toString()}`);
      return response.data.data;
    },
  });
}

export function useAdminOrder(id: string) {
  return useQuery({
    queryKey: ['admin', 'order', id],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Order }>(`/admin/orders/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status, note }: { orderId: string; status: OrderStatus; note?: string }) => {
      const response = await apiClient.patch(`/admin/orders/${orderId}/status`, { status, note });
      return response.data;
    },
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'order', orderId] });
    },
  });
}

// ==================== CUSTOMERS ====================

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  vipTier?: string;
  createdAt: string;
}

export interface AdminCustomerFilters {
  page?: number;
  limit?: number;
  search?: string;
  vipTier?: string;
}

export function useAdminCustomers(filters: AdminCustomerFilters = {}) {
  return useQuery({
    queryKey: ['admin', 'customers', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.page) params.set('page', String(filters.page));
      if (filters.limit) params.set('limit', String(filters.limit));
      if (filters.search) params.set('search', filters.search);
      if (filters.vipTier) params.set('vipTier', filters.vipTier);

      const response = await apiClient.get<{ 
        success: boolean; 
        data: { items: Customer[]; meta: { total: number; page: number; totalPages: number } } 
      }>(`/admin/customers?${params.toString()}`);
      return response.data.data;
    },
  });
}



// ==================== PROMOTIONS ====================

export interface Promotion {
  id: string;
  code: string;
  name: string;
  description?: string;
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

export function useAdminPromotions(page: number = 1) {
  return useQuery({
    queryKey: ['admin', 'promotions', page],
    queryFn: async () => {
      const response = await apiClient.get<{ 
        success: boolean; 
        data: { items: Promotion[]; meta: { total: number; page: number; totalPages: number } } 
      }>(`/admin/promotions?page=${page}`);
      return response.data.data;
    },
  });
}

export function useCreatePromotion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Promotion, 'id' | 'usedCount' | 'createdAt'>) => {
      const response = await apiClient.post<{ success: boolean; data: Promotion }>('/admin/promotions', data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promotions'] });
    },
  });
}

export function useUpdatePromotion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Promotion> }) => {
      const response = await apiClient.patch<{ success: boolean; data: Promotion }>(`/admin/promotions/${id}`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promotions'] });
    },
  });
}

export function useDeletePromotion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/admin/promotions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promotions'] });
    },
  });
}

// ==================== ANALYTICS ====================

export interface AnalyticsData {
  revenue: { date: string; value: number }[];
  orders: { date: string; value: number }[];
  topProducts: { id: string; name: string; sales: number; revenue: number }[];
  topCategories: { id: string; name: string; sales: number }[];
}

export function useAdminAnalytics(period: 'week' | 'month' | 'year' = 'week') {
  return useQuery({
    queryKey: ['admin', 'analytics', period],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: AnalyticsData }>(`/admin/analytics?period=${period}`);
      return response.data.data;
    },
  });
}



// ==================== REVIEWS ====================

export interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title?: string;
  content: string;
  images?: string[];
  status: 'pending' | 'approved' | 'rejected';
  adminReply?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewFilters {
  page?: number;
  limit?: number;
  status?: 'pending' | 'approved' | 'rejected';
  rating?: number;
  productId?: string;
}

export function useAdminReviews(filters: ReviewFilters = {}) {
  return useQuery({
    queryKey: ['admin', 'reviews', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.page) params.set('page', String(filters.page));
      if (filters.limit) params.set('limit', String(filters.limit));
      if (filters.status) params.set('status', filters.status);
      if (filters.rating) params.set('rating', String(filters.rating));
      if (filters.productId) params.set('productId', filters.productId);

      const response = await apiClient.get<{ 
        success: boolean; 
        data: { 
          items: Review[]; 
          meta: { total: number; page: number; totalPages: number };
          stats: { pending: number; approved: number; rejected: number; avgRating: number };
        } 
      }>(`/admin/reviews?${params.toString()}`);
      return response.data.data;
    },
  });
}

export function useUpdateReviewStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, adminReply }: { id: string; status: 'approved' | 'rejected'; adminReply?: string }) => {
      const response = await apiClient.patch(`/admin/reviews/${id}`, { status, adminReply });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reviews'] });
    },
  });
}

export function useReplyReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, reply }: { id: string; reply: string }) => {
      const response = await apiClient.post(`/admin/reviews/${id}/reply`, { reply });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reviews'] });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/admin/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reviews'] });
    },
  });
}

// ==================== CATEGORIES ====================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  productCount: number;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export function useAdminCategories() {
  return useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Category[] }>('/admin/categories');
      return response.data.data;
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Category, 'id' | 'productCount' | 'createdAt'>) => {
      const response = await apiClient.post<{ success: boolean; data: Category }>('/admin/categories', data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Category> }) => {
      const response = await apiClient.patch<{ success: boolean; data: Category }>(`/admin/categories/${id}`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/admin/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
    },
  });
}

export function useReorderCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderedIds: string[]) => {
      await apiClient.post('/admin/categories/reorder', { orderedIds });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
    },
  });
}

// ==================== SETTINGS ====================

export interface AdminSettings {
  storeName: string;
  storeEmail: string;
  storePhone?: string;
  storeAddress?: string;
  currency: string;
  timezone: string;
  maintenance: boolean;
  emailNotifications: boolean;
  orderConfirmation: boolean;
  shippingUpdate: boolean;
  cod: boolean;
  vnpay: boolean;
  momo: boolean;
  freeShippingThreshold: number;

}

export function useAdminSettings() {
  return useQuery({
    queryKey: ['admin', 'settings'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: AdminSettings }>('/admin/settings');
      return response.data.data;
    },
  });
}

export function useSaveAdminSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Partial<AdminSettings>) => {
      const response = await apiClient.put('/admin/settings', settings);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'settings'] });
    },
  });
}

