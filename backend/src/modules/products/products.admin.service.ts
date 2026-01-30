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
   * // NOTE: Hiện tại chưa hỗ trợ update variants/images
   * // TODO: Thêm logic update variants - cần thiết kế UI trước
   */
  async update(id: string, dto: UpdateProductDto) {
    // Kiểm tra sản phẩm tồn tại
    const product = await this.findById(id);

    // Tách variants và images ra (chưa xử lý)
    const { variants, images, ...updateData } = dto;

    // Nếu đổi tên thì cập nhật slug
    if (dto.name && dto.name !== product.name) {
      (updateData as any).slug = this.utils.generateSlug(dto.name);
    }

    return this.prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        images: true,
        variants: true,
      },
    });
  }

  /**
   * Xóa sản phẩm (hard delete)
   *
   * @param id - UUID của sản phẩm cần xóa
   * @returns Message xác nhận
   * @throws NotFoundException nếu sản phẩm không tồn tại
   *
   * // CAUTION: Đây là hard delete, không recovery được
   * // TODO: Cân nhắc chuyển sang soft delete (set isActive = false)
   */
  async delete(id: string) {
    // Kiểm tra sản phẩm tồn tại
    await this.findById(id);

    // Xóa sản phẩm (cascade delete variants, images do Prisma config)
    await this.prisma.product.delete({
      where: { id },
    });

    return { message: "Xóa sản phẩm thành công" };
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
