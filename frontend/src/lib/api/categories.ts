/**
 * Fashion AI - Categories API
 */

import apiClient from '../api-client';
import { ApiResponse, Category } from '@/types/api';

/**
 * Lấy danh sách tất cả category
 */
export async function getCategories(): Promise<Category[]> {
  const response = await apiClient.get<ApiResponse<Category[]>>('/categories?isActive=true');
  return response.data.data;
}

/**
 * Lấy category theo slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category> {
  const response = await apiClient.get<ApiResponse<Category>>(`/categories/${slug}`);
  return response.data.data;
}
