/**
 * CategoriesService - Quản lý danh mục sản phẩm
 *
 * Đã tích hợp Redis caching:
 * - findAll: Cache 1 giờ (categories ít thay đổi)
 * - Invalidate cache khi create/update/delete
 *
 * @author Fashion AI Team
 * @created 29/01/2026
 * @updated 30/01/2026 - Thêm Redis caching
 */

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import { CacheService, CACHE_TTL } from "../redis/cache.service";

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Lấy danh sách danh mục
   *
   * @param tree - Nếu true, trả về dạng cây (cha-con)
   * @returns Danh sách danh mục (từ cache nếu có)
   *
   * // Cache TTL: 1 giờ
   * // Invalidate khi admin create/update/delete category
   */
  async findAll(tree = false) {
    // Tạo cache key
    const cacheKey = tree ? "categories:tree" : "categories:flat";

    // Kiểm tra cache
    const cached = await this.cacheService.get(cacheKey);
    if (cached) {
      console.log(`📦 Cache HIT: ${cacheKey}`);
      return cached;
    }

    console.log(`🔍 Cache MISS: ${cacheKey}, fetching from DB...`);

    let categories;

    if (tree) {
      // Lấy danh mục gốc với danh mục con
      categories = await this.prisma.category.findMany({
        where: { parentId: null, isActive: true },
        orderBy: { sortOrder: "asc" },
        include: {
          children: {
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
          },
        },
      });
    } else {
      // Danh sách phẳng
      categories = await this.prisma.category.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      });
    }

    // Lưu vào cache
    await this.cacheService.set(cacheKey, categories, CACHE_TTL.CATEGORIES);

    return categories;
  }

  /**
   * Lấy chi tiết danh mục theo slug
   */
  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        parent: { select: { id: true, name: true, slug: true } },
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
        _count: { select: { products: true } },
      },
    });

    if (!category || !category.isActive) {
      throw new NotFoundException("Danh mục không tồn tại");
    }

    return category;
  }

  // ========================================
  // ADMIN METHODS - Tự động invalidate cache
  // ========================================

  /**
   * Tạo danh mục mới
   * // NOTE: Sau khi tạo, cache categories bị xóa
   */
  async create(dto: CreateCategoryDto) {
    const slug = this.generateSlug(dto.name);

    // Kiểm tra slug đã tồn tại
    const existing = await this.prisma.category.findUnique({
      where: { slug },
    });

    if (existing) {
      throw new ConflictException("Danh mục với tên này đã tồn tại");
    }

    const category = await this.prisma.category.create({
      data: {
        ...dto,
        slug,
      },
    });

    // Xóa cache để lần sau fetch mới
    await this.invalidateCache();

    return category;
  }

  /**
   * Cập nhật danh mục
   * // NOTE: Sau khi cập nhật, cache bị xóa
   */
  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException("Danh mục không tồn tại");
    }

    const updateData: any = { ...dto };

    // Cập nhật slug nếu đổi tên
    if (dto.name && dto.name !== category.name) {
      updateData.slug = this.generateSlug(dto.name);
    }

    const updated = await this.prisma.category.update({
      where: { id },
      data: updateData,
    });

    // Xóa cache
    await this.invalidateCache();

    return updated;
  }

  /**
   * Xóa danh mục
   * // NOTE: Soft delete nếu có sản phẩm/danh mục con
   */
  async delete(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true, children: true } } },
    });

    if (!category) {
      throw new NotFoundException("Danh mục không tồn tại");
    }

    if (category._count.products > 0 || category._count.children > 0) {
      // Soft delete
      await this.prisma.category.update({
        where: { id },
        data: { isActive: false },
      });
    } else {
      // Hard delete nếu không có sản phẩm/danh mục con
      await this.prisma.category.delete({
        where: { id },
      });
    }

    // Xóa cache
    await this.invalidateCache();

    return { message: "Xóa danh mục thành công" };
  }

  // ========================================
  // PRIVATE METHODS
  // ========================================

  /**
   * Xóa toàn bộ cache categories
   */
  private async invalidateCache() {
    await this.cacheService.deleteByPattern("categories:*");
    console.log("🗑️ Categories cache invalidated");
  }

  /**
   * Tạo slug từ tên danh mục
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
}
