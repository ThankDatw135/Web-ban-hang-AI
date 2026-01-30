/**
 * Search API Hooks - Fashion AI
 * 
 * Hooks cho search: Search products, suggestions, recent searches
 */

import { useQuery, useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { Product } from '@/types';

// ==================== TYPES ====================

export interface SearchFilters {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'relevance';
  page?: number;
  limit?: number;
}

export interface SearchResult {
  items: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  facets?: {
    categories: { id: string; name: string; count: number }[];
    sizes: { size: string; count: number }[];
    colors: { color: string; colorCode: string; count: number }[];
    priceRange: { min: number; max: number };
  };
}

export interface SearchSuggestion {
  type: 'product' | 'category' | 'query';
  text: string;
  id?: string;
  image?: string;
}

// ==================== SEARCH PRODUCTS ====================

export function useSearch(filters: SearchFilters) {
  return useQuery({
    queryKey: ['search', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters.query) params.append('search', filters.query);
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', String(filters.minPrice));
      if (filters.maxPrice) params.append('maxPrice', String(filters.maxPrice));
      if (filters.size) params.append('size', filters.size);
      if (filters.color) params.append('color', filters.color);
      if (filters.sort) params.append('sort', filters.sort);
      if (filters.page) params.append('page', String(filters.page));
      if (filters.limit) params.append('limit', String(filters.limit || 20));

      const response = await apiClient.get<{ success: boolean; data: SearchResult }>(
        `/products?${params}`
      );
      return response.data.data;
    },
    enabled: !!filters.query || !!filters.category,
  });
}

// ==================== SEARCH SUGGESTIONS ====================

export function useSearchSuggestions(query: string) {
  return useQuery({
    queryKey: ['search', 'suggestions', query],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: SearchSuggestion[] }>(
        `/search/suggestions?q=${encodeURIComponent(query)}`
      );
      return response.data.data;
    },
    enabled: query.length >= 2,
    staleTime: 30 * 1000, // 30 seconds
  });
}

// ==================== RECENT SEARCHES (Local Storage) ====================

const RECENT_SEARCHES_KEY = 'fashion-ai-recent-searches';
const MAX_RECENT_SEARCHES = 10;

export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addRecentSearch(query: string): void {
  if (typeof window === 'undefined') return;
  const searches = getRecentSearches();
  const filtered = searches.filter(s => s.toLowerCase() !== query.toLowerCase());
  const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
}

export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(RECENT_SEARCHES_KEY);
}

export function useRecentSearches() {
  return useQuery({
    queryKey: ['search', 'recent'],
    queryFn: () => getRecentSearches(),
    staleTime: Infinity,
  });
}

// ==================== TRENDING SEARCHES ====================

export function useTrendingSearches() {
  return useQuery({
    queryKey: ['search', 'trending'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: string[] }>('/search/trending');
      return response.data.data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}
