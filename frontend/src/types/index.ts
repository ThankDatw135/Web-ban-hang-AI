/**
 * API Response Types - Fashion AI
 */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

// Re-export all types
export * from './auth';
export * from './product';
export * from './cart';
export * from './order';
export * from './ai';
