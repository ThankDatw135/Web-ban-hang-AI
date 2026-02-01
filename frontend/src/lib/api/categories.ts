/**
 * Fashion AI - Categories API Service
 * 
 * Các functions gọi API danh mục
 */

import apiClient from '../api-client';
import type { Category, ApiResponse } from '@/types/api';

/**
 * Lấy danh sách danh mục
 */
export async function getCategories(tree = false): Promise<Category[]> {
  const response = await apiClient.get<ApiResponse<Category[]>>(
    `/categories${tree ? '?tree=true' : ''}`
  );
  return response.data.data;
}

/**
 * Lấy chi tiết danh mục theo slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category> {
  const response = await apiClient.get<ApiResponse<Category>>(`/categories/${slug}`);
  return response.data.data;
}
