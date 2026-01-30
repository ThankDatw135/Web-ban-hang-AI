/**
 * OrdersQueryService - Xử lý truy vấn đơn hàng
 *
 * File này chứa các method:
 * - findUserOrders: Lấy danh sách đơn hàng của user
 * - findById: Lấy chi tiết đơn hàng
 * - findAll: Lấy tất cả đơn hàng (Admin)
 *
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderFilterDto } from "./dto";

@Injectable()
export class OrdersQueryService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lấy danh sách đơn hàng của user
   *
   * @param userId - ID của user
   * @param filter - Bộ lọc (status, page, limit)
   * @returns Danh sách đơn hàng với phân trang
   *
   * // Hiển thị tối đa 3 items preview trong mỗi order
   * // để giảm data transfer
   */
  async findUserOrders(userId: string, filter: OrderFilterDto) {
    const where: any = { userId };

    // Lọc theo trạng thái đơn hàng
    if (filter.status) {
      where.status = filter.status;
    }

    // Query song song để tăng tốc
    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip: filter.skip,
        take: filter.limit,
        orderBy: { createdAt: "desc" },
        include: {
          // Chỉ lấy 3 items đầu tiên để preview
          items: {
            take: 3,
            select: {
              productName: true,
              productImage: true,
              size: true,
              color: true,
            },
          },
          // Đếm tổng số items
          _count: { select: { items: true } },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: {
        total,
        page: filter.page ?? 1,
        limit: filter.limit ?? 10,
        totalPages: Math.ceil(total / (filter.limit ?? 10)),
      },
    };
  }

  /**
   * Lấy chi tiết đơn hàng theo ID
   *
   * @param userId - ID của user (để verify ownership)
   * @param orderId - ID của đơn hàng
   * @param isAdmin - Nếu true, bỏ qua kiểm tra ownership
   * @returns Chi tiết đơn hàng với items, payments, address
   * @throws NotFoundException nếu không tìm thấy
   */
  async findById(userId: string, orderId: string, isAdmin = false) {
    const where: any = { id: orderId };

    // User thường chỉ xem được đơn của mình
    if (!isAdmin) {
      where.userId = userId;
    }

    const order = await this.prisma.order.findFirst({
      where,
      include: {
        items: {
          include: {
            product: {
              select: { slug: true }, // Để tạo link xem sản phẩm
            },
          },
        },
        payments: true,
        address: true,
      },
    });

    if (!order) {
      throw new NotFoundException("Đơn hàng không tồn tại");
    }

    return order;
  }

  /**
   * Lấy tất cả đơn hàng (Admin only)
   *
   * @param filter - Bộ lọc (status, page, limit)
   * @returns Danh sách đơn hàng với thông tin user
   */
  async findAll(filter: OrderFilterDto) {
    const where: any = {};

    if (filter.status) {
      where.status = filter.status;
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip: filter.skip,
        take: filter.limit,
        orderBy: { createdAt: "desc" },
        include: {
          // Thông tin user để admin xem
          user: {
            select: { email: true, firstName: true, lastName: true },
          },
          _count: { select: { items: true } },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: {
        total,
        page: filter.page ?? 1,
        limit: filter.limit ?? 10,
        totalPages: Math.ceil(total / (filter.limit ?? 10)),
      },
    };
  }
}
