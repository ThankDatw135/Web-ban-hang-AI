/**
 * CacheService - Service caching với Redis
 * 
 * Cung cấp các method caching thông dụng:
 * - get/set với TTL
 * - delete key
 * - Pattern delete (xóa nhiều key)
 * 
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../redis/redis.module';

// TTL Constants (tính bằng giây)
export const CACHE_TTL = {
  CATEGORIES: 3600,      // 1 giờ - Categories ít thay đổi
  PRODUCT_LIST: 300,     // 5 phút - Danh sách sản phẩm
  PRODUCT_DETAIL: 600,   // 10 phút - Chi tiết sản phẩm
  USER_SESSION: 604800,  // 7 ngày - Session user
};

@Injectable()
export class CacheService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  /**
   * Lấy value từ cache
   * 
   * @param key - Cache key
   * @returns Parsed JSON object hoặc null nếu không có
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redis.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (error) {
      // Nếu lỗi parse JSON, trả về null
      console.error(`Cache get error for key ${key}:`, error.message);
      return null;
    }
  }

  /**
   * Lưu value vào cache
   * 
   * @param key - Cache key
   * @param value - Value cần lưu (sẽ được stringify)
   * @param ttl - Time to live (giây), mặc định 5 phút
   */
  async set(key: string, value: any, ttl: number = 300): Promise<void> {
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error(`Cache set error for key ${key}:`, error.message);
    }
  }

  /**
   * Xóa một key khỏi cache
   * 
   * @param key - Cache key cần xóa
   */
  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      console.error(`Cache delete error for key ${key}:`, error.message);
    }
  }

  /**
   * Xóa nhiều keys theo pattern
   * Ví dụ: deleteByPattern('products:*') xóa tất cả cache products
   * 
   * @param pattern - Pattern để match keys (ví dụ: 'products:*')
   * 
   * // CAUTION: Dùng cẩn thận với pattern rộng
   */
  async deleteByPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
        console.log(`Deleted ${keys.length} cache keys matching pattern: ${pattern}`);
      }
    } catch (error) {
      console.error(`Cache pattern delete error for ${pattern}:`, error.message);
    }
  }

  /**
   * Kiểm tra key có tồn tại không
   * 
   * @param key - Cache key
   * @returns true nếu tồn tại
   */
  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      return false;
    }
  }

  // ========================================
  // HELPER METHODS - Tạo cache key chuẩn
  // ========================================

  /**
   * Tạo cache key cho categories
   */
  static categoriesKey(): string {
    return 'categories:all';
  }

  /**
   * Tạo cache key cho product list với filter
   */
  static productListKey(filter: Record<string, any>): string {
    // Tạo hash từ filter để làm key
    const params = Object.entries(filter)
      .filter(([_, v]) => v !== undefined && v !== null)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join(':');
    return `products:list:${params || 'default'}`;
  }

  /**
   * Tạo cache key cho product detail
   */
  static productDetailKey(slug: string): string {
    return `products:detail:${slug}`;
  }
}
