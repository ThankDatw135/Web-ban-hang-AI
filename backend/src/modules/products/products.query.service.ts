/**
 * ProductsQueryService - Xử lý các thao tác đọc dữ liệu sản phẩm
 *
 * File này chứa các method:
 * - findAll: Lấy danh sách sản phẩm với bộ lọc và phân trang
 * - findBySlug: Lấy chi tiết sản phẩm theo slug
 * - findById: Lấy sản phẩm theo ID (internal use)
 *
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProductFilterDto, ProductSortBy } from "./dto";
import { Prisma, Size } from "@prisma/client";

@Injectable()
export class ProductsQueryService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lấy danh sách sản phẩm với bộ lọc và phân trang
   *
   * @param filter - Các tham số lọc (category, price, size, color, sortBy, page, limit)
   * @returns Danh sách sản phẩm và thông tin phân trang
   *
   * // Tiến độ triển khai:
   * // [x] Lọc theo category - DONE 29/01/2026
   * // [x] Lọc theo giá min/max - DONE 29/01/2026
   * // [x] Lọc theo size/color - DONE 29/01/2026
   * // [x] Sắp xếp theo giá/tên/mới nhất - DONE 29/01/2026
   * // [ ] Cache Redis - TODO Phase 4
   */
  async findAll(filter: ProductFilterDto) {
    // Xây dựng điều kiện WHERE
    const where = this.buildWhereClause(filter);

    // Xây dựng điều kiện ORDER BY
    const orderBy = this.buildOrderBy(filter);

    // Thực hiện 2 query song song để tăng tốc
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: filter.skip,
        take: filter.limit,
        orderBy,
        include: {
          // Chỉ lấy các field cần thiết để giảm data transfer
          category: { select: { id: true, name: true, slug: true } },
          images: { where: { isMain: true }, take: 1 },
          variants: {
            select: { size: true, color: true, colorCode: true, stock: true },
          },
          _count: { select: { reviews: true } },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    // Format kết quả trả về
    return {
      data: products.map((p) => ({
        ...p,
        mainImage: p.images[0]?.url || null,
        images: undefined, // Ẩn array images, chỉ giữ mainImage
      })),
      meta: {
        total,
        page: filter.page ?? 1,
        limit: filter.limit ?? 10,
        totalPages: Math.ceil(total / (filter.limit ?? 10)),
      },
    };
  }

  /**
   * Lấy chi tiết sản phẩm theo slug (URL-friendly)
   *
   * @param slug - Slug của sản phẩm (ví dụ: "ao-thun-nam-co-tron")
   * @returns Chi tiết sản phẩm bao gồm variants, images, reviews
   * @throws NotFoundException nếu sản phẩm không tồn tại hoặc đã bị ẩn
   */
  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { sortOrder: "asc" } },
        variants: {
          select: {
            id: true,
            size: true,
            color: true,
            colorCode: true,
            stock: true,
            sku: true,
          },
        },
        // Lấy 10 reviews mới nhất
        reviews: {
          where: { isVisible: true },
          include: {
            user: { select: { firstName: true, lastName: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    // Kiểm tra sản phẩm tồn tại và đang active
    if (!product || !product.isActive) {
      throw new NotFoundException("Sản phẩm không tồn tại");
    }

    // Tính rating trung bình
    const avgRating = await this.prisma.review.aggregate({
      where: { productId: product.id },
      _avg: { rating: true },
      _count: true,
    });

    return {
      ...product,
      averageRating: avgRating._avg.rating || 0,
      reviewCount: avgRating._count,
    };
  }

  /**
   * Lấy sản phẩm theo ID (dùng internal, không expose ra API public)
   *
   * @param id - UUID của sản phẩm
   * @returns Sản phẩm với đầy đủ thông tin
   * @throws NotFoundException nếu không tìm thấy
   */
  async findById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        variants: true,
      },
    });

    if (!product) {
      throw new NotFoundException("Sản phẩm không tồn tại");
    }

    return product;
  }

  // ========================================
  // PRIVATE METHODS - Logic riêng biệt
  // ========================================

  /**
   * Xây dựng điều kiện WHERE từ filter
   * Tách riêng để dễ test và maintain
   */
  private buildWhereClause(filter: ProductFilterDto): Prisma.ProductWhereInput {
    const where: Prisma.ProductWhereInput = {
      isActive: true, // Chỉ lấy sản phẩm đang hoạt động
    };

    // Tìm kiếm theo tên hoặc mô tả
    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search, mode: "insensitive" } },
        { description: { contains: filter.search, mode: "insensitive" } },
      ];
    }

    // Lọc theo danh mục (bao gồm cả danh mục con)
    if (filter.category) {
      where.category = {
        OR: [{ slug: filter.category }, { parent: { slug: filter.category } }],
      };
    }

    // Lọc theo thương hiệu
    if (filter.brand) {
      where.brand = { equals: filter.brand, mode: "insensitive" };
    }

    // Lọc theo khoảng giá
    if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
      where.price = {};
      if (filter.minPrice !== undefined) {
        where.price.gte = filter.minPrice;
      }
      if (filter.maxPrice !== undefined) {
        where.price.lte = filter.maxPrice;
      }
    }

    // Lọc theo size/color thông qua variants
    if (filter.size || filter.color) {
      where.variants = {
        some: {
          ...(filter.size && { size: filter.size as Size }),
          ...(filter.color && {
            color: { contains: filter.color, mode: "insensitive" },
          }),
          stock: { gt: 0 }, // Chỉ lấy variants còn hàng
        },
      };
    }

    // Lọc sản phẩm nổi bật
    if (filter.featured) {
      where.isFeatured = true;
    }

    // Lọc sản phẩm đang giảm giá
    if (filter.onSale) {
      where.salePrice = { not: null };
    }

    return where;
  }

  /**
   * Xây dựng điều kiện ORDER BY từ sortBy
   */
  private buildOrderBy(
    filter: ProductFilterDto,
  ): Prisma.ProductOrderByWithRelationInput {
    switch (filter.sortBy) {
      case ProductSortBy.PRICE_ASC:
        return { price: "asc" };
      case ProductSortBy.PRICE_DESC:
        return { price: "desc" };
      case ProductSortBy.NAME:
        return { name: "asc" };
      case ProductSortBy.NEWEST:
      default:
        return { createdAt: "desc" };
    }
  }
}
