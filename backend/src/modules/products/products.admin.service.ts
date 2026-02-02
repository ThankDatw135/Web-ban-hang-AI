/**
 * ProductsAdminService - Xử lý các thao tác Admin với sản phẩm
 *
 * File này chứa các method:
 * - create: Tạo sản phẩm mới
 * - update: Cập nhật sản phẩm
 * - delete: Xóa sản phẩm
 *
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto, UpdateProductDto } from "./dto";
import { Size } from "@prisma/client";
import { ProductsUtils } from "./products.utils";

@Injectable()
export class ProductsAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: ProductsUtils,
  ) {}

  /**
   * Tạo sản phẩm mới
   *
   * @param dto - Dữ liệu sản phẩm (name, sku, price, variants, images...)
   * @returns Sản phẩm vừa tạo với đầy đủ thông tin
   * @throws ConflictException nếu SKU hoặc slug đã tồn tại
   *
   * // Quy trình:
   * // 1. Generate slug từ tên sản phẩm
   * // 2. Kiểm tra SKU trùng lặp
   * // 3. Kiểm tra slug trùng lặp
   * // 4. Tạo sản phẩm + variants + images trong 1 transaction
   */
  async create(dto: CreateProductDto) {
    // Bước 1: Tạo slug từ tên sản phẩm
    const slug = this.utils.generateSlug(dto.name);

    // Bước 2: Kiểm tra SKU đã tồn tại chưa
    const existingSku = await this.prisma.product.findUnique({
      where: { sku: dto.sku },
    });
    if (existingSku) {
      throw new ConflictException("SKU đã tồn tại");
    }

    // Bước 3: Kiểm tra slug đã tồn tại chưa
    const existingSlug = await this.prisma.product.findUnique({
      where: { slug },
    });
    if (existingSlug) {
      throw new ConflictException("Sản phẩm với tên này đã tồn tại");
    }

    // Bước 4: Tách data để xử lý nested create
    const { variants, images, ...productData } = dto;

    // Bước 5: Tạo sản phẩm với variants và images
    return this.prisma.product.create({
      data: {
        ...productData,
        slug,
        // Tạo variants nếu có
        variants: variants
          ? {
              create: variants.map((v, i) => ({
                ...v,
                size: v.size as Size,
                sku: `${dto.sku}-${v.size}-${i}`, // Generate variant SKU
              })),
            }
          : undefined,
        // Tạo images nếu có
        images: images
          ? {
              create: images.map((img, i) => ({
                ...img,
                sortOrder: i, // Thứ tự hiển thị
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        images: true,
        variants: true,
      },
    });
  }

  /**
   * Cập nhật thông tin sản phẩm
   *
   * @param id - UUID của sản phẩm cần cập nhật
   * @param dto - Dữ liệu cập nhật (các field optional)
   * @returns Sản phẩm sau khi cập nhật
   * @throws NotFoundException nếu sản phẩm không tồn tại
   *
   * Hỗ trợ cập nhật variants theo chiến lược:
   * - Variant có id: cập nhật variant đó
   * - Variant không có id: tạo mới
   * - Variant cũ không có trong danh sách: xóa đi
   */
  async update(id: string, dto: UpdateProductDto) {
    // Kiểm tra sản phẩm tồn tại
    const product = await this.findById(id);

    // Tách variants và images ra để xử lý riêng
    const { variants, images, ...updateData } = dto;

    // Nếu đổi tên thì cập nhật slug
    if (dto.name && dto.name !== product.name) {
      (updateData as any).slug = this.utils.generateSlug(dto.name);
    }

    // Xử lý trong transaction để đảm bảo tính toàn vẹn
    return this.prisma.$transaction(async (tx) => {
      // 1. Cập nhật thông tin cơ bản của sản phẩm
      await tx.product.update({
        where: { id },
        data: updateData,
      });

      // 2. Xử lý variants nếu có
      if (variants && variants.length > 0) {
        // Lấy danh sách variant IDs hiện có
        const existingVariantIds = product.variants.map(v => v.id);
        
        // Variant IDs từ request (chỉ những variant có id)
        const incomingVariantIds = variants
          .filter(v => (v as any).id)
          .map(v => (v as any).id);

        // Xóa variants không có trong request
        const variantsToDelete = existingVariantIds.filter(
          existingId => !incomingVariantIds.includes(existingId)
        );
        
        if (variantsToDelete.length > 0) {
          await tx.productVariant.deleteMany({
            where: { id: { in: variantsToDelete } },
          });
        }

        // Cập nhật hoặc tạo mới variants
        for (let i = 0; i < variants.length; i++) {
          const variant = variants[i] as any;
          
          if (variant.id) {
            // Cập nhật variant hiện có
            await tx.productVariant.update({
              where: { id: variant.id },
              data: {
                size: variant.size as Size,
                color: variant.color,
                stock: variant.stock,
              },
            });
          } else {
            // Tạo variant mới
            await tx.productVariant.create({
              data: {
                productId: id,
                size: variant.size as Size,
                color: variant.color || '',
                stock: variant.stock || 0,
                sku: `${product.sku}-${variant.size}-${Date.now()}`,
              },
            });
          }
        }
      }

      // 3. Xử lý images nếu có
      if (images && images.length > 0) {
        // Xóa tất cả images cũ và tạo lại
        await tx.productImage.deleteMany({
          where: { productId: id },
        });

        // Tạo images mới
        await tx.productImage.createMany({
          data: images.map((img, i) => ({
            productId: id,
            url: img.url,
            alt: img.alt || product.name,
            sortOrder: i,
          })),
        });
      }

      // Trả về sản phẩm đã cập nhật
      return tx.product.findUnique({
        where: { id },
        include: {
          category: true,
          images: { orderBy: { sortOrder: 'asc' } },
          variants: true,
        },
      });
    });
  }


  /**
   * Xóa sản phẩm (soft delete)
   *
   * @param id - UUID của sản phẩm cần xóa
   * @returns Message xác nhận
   * @throws NotFoundException nếu sản phẩm không tồn tại
   *
   * Sử dụng soft delete (set isActive = false) để:
   * - Giữ lại dữ liệu cho báo cáo, thống kê
   * - Có thể khôi phục sản phẩm nếu cần
   * - Không ảnh hưởng đến các đơn hàng cũ
   */
  async delete(id: string) {
    // Kiểm tra sản phẩm tồn tại
    await this.findById(id);

    // Soft delete: set isActive = false thay vì xóa thật
    await this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    return { message: "Đã ẩn sản phẩm thành công" };
  }

  /**
   * Xóa vĩnh viễn sản phẩm (hard delete)
   * Chỉ sử dụng khi thật sự cần thiết
   *
   * @param id - UUID của sản phẩm cần xóa vĩnh viễn
   * @returns Message xác nhận
   */
  async hardDelete(id: string) {
    await this.findById(id);

    // Xóa sản phẩm (cascade delete variants, images do Prisma config)
    await this.prisma.product.delete({
      where: { id },
    });

    return { message: "Xóa vĩnh viễn sản phẩm thành công" };
  }

  /**
   * Khôi phục sản phẩm đã ẩn
   *
   * @param id - UUID của sản phẩm cần khôi phục
   * @returns Sản phẩm đã khôi phục
   */
  async restore(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException("Sản phẩm không tồn tại");
    }

    return this.prisma.product.update({
      where: { id },
      data: { isActive: true },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        variants: true,
      },
    });
  }


  // ========================================
  // PRIVATE METHODS
  // ========================================

  /**
   * Tìm sản phẩm theo ID (internal)
   */
  private async findById(id: string) {
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
}
