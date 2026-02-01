/**
 * Fashion AI - Admin Categories API
 * 
 * API functions cho quản lý danh mục (Admin)
 */

import apiClient from '../../api-client';
import { ApiResponse } from '@/types/api';

// Types
export interface CategoryInput {
  name: string;
  description?: string;
  parentId?: string;
  image?: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
  createdAt: string;
  parent?: {
    id: string;
    name: string;
    slug: string;
  };
  _count?: {
    products: number;
    children: number;
  };
}

/**
 * Create new category (Admin)
 */
export async function createCategory(input: CategoryInput): Promise<AdminCategory> {
  const response = await apiClient.post<ApiResponse<AdminCategory>>(
    '/categories',
    input
  );
  return response.data.data;
}

/**
 * Update category (Admin)
 */
export async function updateCategory(
  categoryId: string,
  input: Partial<CategoryInput>
): Promise<AdminCategory> {
  const response = await apiClient.patch<ApiResponse<AdminCategory>>(
    `/categories/${categoryId}`,
    input
  );
  return response.data.data;
}

/**
 * Delete category (Admin)
 */
export async function deleteCategory(categoryId: string): Promise<void> {
  await apiClient.delete(`/categories/${categoryId}`);
}
