/**
 * Fashion AI - Products API Service
 * 
 * Các functions gọi API sản phẩm
 */

import apiClient from '../api-client';
import type { 
  Product, 
  ProductFilter, 
  PaginatedResponse,
  ApiResponse 
} from '@/types/api';

/**
 * Lấy danh sách sản phẩm với filter
 */
export async function getProducts(filter?: ProductFilter): Promise<PaginatedResponse<Product>> {
  const params = new URLSearchParams();
  
  if (filter?.page) params.set('page', String(filter.page));
  if (filter?.limit) params.set('limit', String(filter.limit));
  if (filter?.categoryId) params.set('categoryId', filter.categoryId);
  if (filter?.search) params.set('search', filter.search);
  if (filter?.minPrice) params.set('minPrice', String(filter.minPrice));
  if (filter?.maxPrice) params.set('maxPrice', String(filter.maxPrice));
  if (filter?.sort) params.set('sort', filter.sort);

  const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
    `/products?${params.toString()}`
  );
  return response.data.data;
}

/**
 * Lấy chi tiết sản phẩm theo slug
 */
export async function getProductBySlug(slug: string): Promise<Product> {
  const response = await apiClient.get<ApiResponse<Product>>(`/products/${slug}`);
  return response.data.data;
}

/**
 * Lấy sản phẩm nổi bật
 */
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
    `/products?isFeatured=true&limit=${limit}`
  );
  return response.data.data.data;
}

/**
 * Tìm kiếm sản phẩm
 */
export async function searchProducts(query: string, limit = 20): Promise<Product[]> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
    `/products?search=${encodeURIComponent(query)}&limit=${limit}`
  );
  return response.data.data.data;
}
