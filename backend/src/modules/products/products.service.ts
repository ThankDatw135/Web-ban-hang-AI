/**
 * ProductsService - Entry point cho Products module
 * 
 * Service này đóng vai trò là façade, delegate các request tới các service con:
 * - ProductsQueryService: Đọc dữ liệu (findAll, findBySlug, findById)
 * - ProductsAdminService: Thao tác admin (create, update, delete)
 * 
 * Cấu trúc này giúp:
 * - Code dễ đọc và maintain hơn
 * - Dễ dàng thêm caching, logging riêng cho từng loại operation
 * - Dễ test từng phần riêng biệt
 * 
 * @author Fashion AI Team
 * @created 30/01/2026
 * @refactored 30/01/2026 - Chia từ 270 lines thành 4 files
 */

import { Injectable } from '@nestjs/common';
import { ProductFilterDto, CreateProductDto, UpdateProductDto } from './dto';
import { ProductsQueryService } from './products.query.service';
import { ProductsAdminService } from './products.admin.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly queryService: ProductsQueryService,
    private readonly adminService: ProductsAdminService,
  ) {}

  // ========================================
  // PUBLIC METHODS - Đọc dữ liệu
  // ========================================

  /**
   * Lấy danh sách sản phẩm với bộ lọc
   * Delegate sang ProductsQueryService
   */
  async findAll(filter: ProductFilterDto) {
    return this.queryService.findAll(filter);
  }

  /**
   * Lấy chi tiết sản phẩm theo slug
   * Delegate sang ProductsQueryService
   */
  async findBySlug(slug: string) {
    return this.queryService.findBySlug(slug);
  }

  /**
   * Lấy sản phẩm theo ID (internal use)
   * Delegate sang ProductsQueryService
   */
  async findById(id: string) {
    return this.queryService.findById(id);
  }

  // ========================================
  // ADMIN METHODS - Thao tác quản trị
  // ========================================

  /**
   * Tạo sản phẩm mới (Admin only)
   * Delegate sang ProductsAdminService
   */
  async create(dto: CreateProductDto) {
    return this.adminService.create(dto);
  }

  /**
   * Cập nhật sản phẩm (Admin only)
   * Delegate sang ProductsAdminService
   */
  async update(id: string, dto: UpdateProductDto) {
    return this.adminService.update(id, dto);
  }

  /**
   * Xóa sản phẩm (Admin only)
   * Delegate sang ProductsAdminService
   */
  async delete(id: string) {
    return this.adminService.delete(id);
  }
}
