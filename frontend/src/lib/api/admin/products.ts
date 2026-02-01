/**
 * Fashion AI - Admin Products API
 * 
 * API functions cho quản lý sản phẩm (Admin)
 */

import apiClient from '../../api-client';
import { ApiResponse } from '@/types/api';

// Types
export interface ProductVariant {
  id?: string;
  size: string;
  color: string;
  stock: number;
  sku?: string;
}

export interface ProductImage {
  id?: string;
  url: string;
  alt?: string;
  isPrimary?: boolean;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  categoryId: string;
  variants: ProductVariant[];
  images: ProductImage[];
  isActive?: boolean;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {}

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  categoryId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  variants: ProductVariant[];
  images: ProductImage[];
  category: {
    id: string;
    name: string;
    slug: string;
  };
  _count?: {
    reviews: number;
    orderItems: number;
  };
}

/**
 * Create new product (Admin)
 */
export async function createProduct(input: CreateProductInput): Promise<AdminProduct> {
  const response = await apiClient.post<ApiResponse<AdminProduct>>(
    '/products',
    input
  );
  return response.data.data;
}

/**
 * Update product (Admin)
 */
export async function updateProduct(
  productId: string,
  input: UpdateProductInput
): Promise<AdminProduct> {
  const response = await apiClient.patch<ApiResponse<AdminProduct>>(
    `/products/${productId}`,
    input
  );
  return response.data.data;
}

/**
 * Delete product (Admin)
 */
export async function deleteProduct(productId: string): Promise<void> {
  await apiClient.delete(`/products/${productId}`);
}

/**
 * Toggle product active status (Admin)
 */
export async function toggleProductActive(productId: string): Promise<AdminProduct> {
  const response = await apiClient.patch<ApiResponse<AdminProduct>>(
    `/products/${productId}/toggle-active`
  );
  return response.data.data;
}

/**
 * Upload product images (Admin)
 */
export async function uploadProductImages(files: File[]): Promise<{ urls: string[] }> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await apiClient.post<ApiResponse<{ urls: string[] }>>(
    '/upload/products',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data.data;
}
