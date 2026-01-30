/**
 * Home Page API Hooks - Fashion AI
 * 
 * Hooks cho trang chủ: Featured products, New arrivals, Bestsellers, Banners, Collections
 */

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { Product } from '@/types';

// ==================== TYPES ====================

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  buttonText?: string;
  order: number;
  isActive: boolean;
}

export interface FeaturedCollection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  productCount: number;
}

export interface HomeData {
  banners: Banner[];
  featuredProducts: Product[];
  newArrivals: Product[];
  bestsellers: Product[];
  collections: FeaturedCollection[];
}

// ==================== HOME PAGE DATA ====================

export function useHomeData() {
  return useQuery({
    queryKey: ['home'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: HomeData }>('/home');
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
}

// ==================== BANNERS ====================

export function useHomeBanners() {
  return useQuery({
    queryKey: ['home', 'banners'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Banner[] }>('/home/banners');
      return response.data.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// ==================== FEATURED PRODUCTS ====================

export function useFeaturedProducts(limit = 8) {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Product[] }>(
        `/products?featured=true&limit=${limit}`
      );
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== NEW ARRIVALS ====================

export function useNewArrivals(limit = 8) {
  return useQuery({
    queryKey: ['products', 'new-arrivals', limit],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Product[] }>(
        `/products?sort=newest&limit=${limit}`
      );
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== BESTSELLERS ====================

export function useBestsellers(limit = 8) {
  return useQuery({
    queryKey: ['products', 'bestsellers', limit],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Product[] }>(
        `/products?sort=popular&limit=${limit}`
      );
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== FEATURED COLLECTIONS ====================

export function useFeaturedCollections(limit = 4) {
  return useQuery({
    queryKey: ['collections', 'featured', limit],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: FeaturedCollection[] }>(
        `/collections?featured=true&limit=${limit}`
      );
      return response.data.data;
    },
    staleTime: 10 * 60 * 1000,
  });
}
