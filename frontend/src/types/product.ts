/**
 * Product Types - Fashion AI
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  isActive: boolean;
  sortOrder: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  sortOrder: number;
  isMain: boolean;
}

export interface ProductVariant {
  id: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' | 'FREE';
  color: string;
  colorCode: string;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  salePrice?: number;
  sku: string;
  brand?: string;
  material?: string;
  categoryId: string;
  category?: Category;
  isActive: boolean;
  isFeatured: boolean;
  isNew?: boolean;
  image?: string; // Backward compat fallback
  sizeGuide?: Record<string, Record<string, string>>;
  images: ProductImage[];
  variants: ProductVariant[];
  reviews?: {
    average: number;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  image?: string; // Backward compat fallback
  isNew?: boolean;
  images: ProductImage[];
  category?: Category;
  variants: ProductVariant[];
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductsResponse {
  success: boolean;
  data: {
    items: ProductSummary[];
    meta: PaginationMeta;
  };
}

export interface ProductResponse {
  success: boolean;
  data: Product;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title?: string;
  content?: string;
  isVisible: boolean;
  createdAt: string;
  user?: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}
