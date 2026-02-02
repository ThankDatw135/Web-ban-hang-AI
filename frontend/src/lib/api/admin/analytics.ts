/**
 * Admin Analytics API - Frontend client
 */

import apiClient from '../../api-client';

export interface DashboardStats {
  revenue: {
    today: number;
    yesterday: number;
    thisMonth: number;
    lastMonth: number;
    growthPercent: number;
  };
  orders: {
    today: number;
    yesterday: number;
    pending: number;
    growthPercent: number;
  };
  users: {
    newToday: number;
    total: number;
  };
  ai: {
    processingJobs: number;
  };
  inventory: {
    lowStockCount: number;
  };
}

export interface RevenueChartData {
  date: string;
  revenue: number;
}

export interface TopProduct {
  id: string;
  name: string;
  image: string | null;
  price: number;
  soldCount: number;
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await apiClient.get('/admin/analytics/dashboard');
  return response.data;
}

/**
 * Get revenue chart data
 */
export async function getRevenueChart(days = 7): Promise<RevenueChartData[]> {
  const response = await apiClient.get('/admin/analytics/revenue-chart', {
    params: { days },
  });
  return response.data;
}

/**
 * Get top selling products
 */
export async function getTopProducts(limit = 5): Promise<TopProduct[]> {
  const response = await apiClient.get('/admin/analytics/top-products', {
    params: { limit },
  });
  return response.data;
}
