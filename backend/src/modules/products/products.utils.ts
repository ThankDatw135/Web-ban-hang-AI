/**
 * ProductsUtils - Các hàm tiện ích cho Products module
 * 
 * File này chứa các helper functions:
 * - generateSlug: Tạo URL-friendly slug từ tên sản phẩm
 * - formatPrice: Format giá tiền (future)
 * 
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsUtils {
  /**
   * Tạo slug URL-friendly từ tên sản phẩm
   * 
   * @param name - Tên sản phẩm (có thể có tiếng Việt)
   * @returns Slug không dấu, lowercase, dùng dấu gạch ngang
   * 
   * @example
   * generateSlug("Áo Thun Nam Cổ Tròn") // => "ao-thun-nam-co-tron"
   * generateSlug("Quần Jeans Slim Fit 2024") // => "quan-jeans-slim-fit-2024"
   */
  generateSlug(name: string): string {
    return name
      .toLowerCase()
      // Chuẩn hóa Unicode (tách dấu ra khỏi ký tự)
      .normalize('NFD')
      // Xóa các ký tự dấu
      .replace(/[\u0300-\u036f]/g, '')
      // Chuyển đ thành d
      .replace(/đ/g, 'd')
      // Chuyển các ký tự không phải chữ/số thành dấu gạch ngang
      .replace(/[^a-z0-9]+/g, '-')
      // Xóa dấu gạch ngang ở đầu và cuối
      .replace(/(^-|-$)/g, '');
  }

  /**
   * Format giá tiền VNĐ
   * 
   * @param price - Giá tiền (số)
   * @returns Chuỗi đã format (ví dụ: "150.000 đ")
   * 
   * // TODO: Sử dụng cho frontend display
   */
  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  }

  /**
   * Tính giá sau khi giảm
   * 
   * @param originalPrice - Giá gốc
   * @param salePrice - Giá sale (có thể null)
   * @param discountPercent - Phần trăm giảm (có thể null)
   * @returns Giá cuối cùng
   */
  calculateFinalPrice(
    originalPrice: number,
    salePrice: number | null,
    discountPercent: number | null,
  ): number {
    // Ưu tiên salePrice nếu có
    if (salePrice !== null) {
      return salePrice;
    }

    // Nếu có discount percent thì tính
    if (discountPercent !== null && discountPercent > 0) {
      return originalPrice * (1 - discountPercent / 100);
    }

    // Không có giảm giá
    return originalPrice;
  }
}
