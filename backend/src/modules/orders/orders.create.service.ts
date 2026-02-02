/**
 * OrdersCreateService - Xử lý tạo đơn hàng
 *
 * File này chứa logic phức tạp nhất:
 * - create: Tạo đơn hàng từ giỏ hàng
 * - cancelOrder: Hủy đơn hàng
 * - generateOrderNumber: Tạo mã đơn hàng
 *
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto";
import { OrderStatus } from "@prisma/client";

@Injectable()
export class OrdersCreateService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Tạo đơn hàng từ giỏ hàng
   *
   * @param userId - ID của user đặt hàng
   * @param dto - Dữ liệu đơn hàng (addressId, paymentMethod, note)
   * @returns Đơn hàng vừa tạo
   *
   * // Quy trình:
   * // 1. Lấy giỏ hàng với các items
   * // 2. Kiểm tra địa chỉ giao hàng
   * // 3. Kiểm tra tồn kho từng sản phẩm
   * // 4. Tính tổng tiền và phí ship
   * // 5. Tạo đơn hàng trong transaction
   * // 6. Trừ stock và xóa giỏ hàng
   */
  async create(userId: string, dto: CreateOrderDto) {
    // Bước 1: Lấy giỏ hàng của user
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  orderBy: { sortOrder: "asc" },
                  take: 1, // Chỉ lấy ảnh đầu tiên
                },
              },
            },
            variant: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException("Giỏ hàng trống");
    }

    // Bước 2: Kiểm tra địa chỉ giao hàng thuộc về user
    const address = await this.prisma.address.findFirst({
      where: { id: dto.addressId, userId },
    });

    if (!address) {
      throw new NotFoundException("Địa chỉ không tồn tại");
    }

    // Bước 3: Kiểm tra tồn kho và tính giá
    let subtotal = 0;
    const orderItems: any[] = [];

    for (const item of cart.items) {
      // Kiểm tra còn đủ hàng không
      if (item.variant.stock < item.quantity) {
        throw new BadRequestException(
          `Sản phẩm "${item.product.name}" không đủ hàng`,
        );
      }

      // Tính giá (ưu tiên giá sale)
      const price = item.product.salePrice || item.product.price;
      const totalPrice = Number(price) * item.quantity;
      subtotal += totalPrice;

      // Lấy URL ảnh đầu tiên của sản phẩm
      const productImage = item.product.images?.[0]?.url || null;

      orderItems.push({
        productId: item.productId,
        variantId: item.variantId,
        productName: item.product.name,
        productImage, // Lưu ảnh sản phẩm vào order item
        size: item.variant.size,
        color: item.variant.color,
        quantity: item.quantity,
        unitPrice: price,
        totalPrice,
      });
    }


    // Bước 4: Tính phí ship (miễn phí nếu đơn >= 500k)
    const shippingFee = subtotal >= 500000 ? 0 : 30000;
    const total = subtotal + shippingFee;

    // Bước 5: Tạo mã đơn hàng
    const orderNumber = await this.generateOrderNumber();

    // Bước 6: Tạo đơn hàng trong transaction
    // Transaction đảm bảo tất cả hoặc không có gì được thực hiện
    const order = await this.prisma.$transaction(async (tx) => {
      // Tạo đơn hàng
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          addressId: dto.addressId,
          paymentMethod: dto.paymentMethod,
          subtotal,
          shippingFee,
          total,
          note: dto.note,
          // Snapshot địa chỉ vào đơn hàng (tránh bị thay đổi sau này)
          shippingAddress: {
            fullName: address.fullName,
            phone: address.phone,
            street: address.street,
            ward: address.ward,
            district: address.district,
            city: address.city,
            province: address.province,
          },
          items: {
            create: orderItems,
          },
        },
        include: {
          items: true,
        },
      });

      // Trừ stock cho từng variant
      for (const item of cart.items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }

      // Xóa giỏ hàng sau khi đặt hàng thành công
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return newOrder;
    });

    return order;
  }

  /**
   * Hủy đơn hàng
   *
   * @param userId - ID của user
   * @param orderId - ID đơn hàng cần hủy
   * @returns Message xác nhận
   *
   * // Chỉ được hủy khi đơn đang ở trạng thái PENDING hoặc CONFIRMED
   * // Sau khi hủy, stock được hoàn lại
   */
  async cancelOrder(userId: string, orderId: string) {
    // Tìm đơn hàng của user
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException("Đơn hàng không tồn tại");
    }

    // Kiểm tra trạng thái có thể hủy
    if (!["PENDING", "CONFIRMED"].includes(order.status)) {
      throw new BadRequestException("Không thể hủy đơn hàng này");
    }

    // Hoàn stock và cập nhật trạng thái trong transaction
    await this.prisma.$transaction(async (tx) => {
      // Hoàn lại stock cho từng item
      for (const item of order.items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: {
            stock: { increment: item.quantity },
          },
        });
      }

      // Cập nhật trạng thái đơn hàng
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.CANCELLED,
          cancelledAt: new Date(),
        },
      });
    });

    return { message: "Đã hủy đơn hàng" };
  }

  /**
   * Tạo mã đơn hàng theo format: FA + YYYYMMDD + sequence
   *
   * @returns Mã đơn hàng (ví dụ: FA202601300001)
   *
   * // Format: FA + năm(4) + tháng(2) + ngày(2) + sequence(4)
   * // Mỗi ngày sequence reset về 0001
   */
  async generateOrderNumber(): Promise<string> {
    const date = new Date();

    // Tạo prefix: FA20260130
    const prefix = `FA${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;

    // Tìm đơn hàng cuối cùng trong ngày
    const lastOrder = await this.prisma.order.findFirst({
      where: { orderNumber: { startsWith: prefix } },
      orderBy: { orderNumber: "desc" },
    });

    // Tính sequence tiếp theo
    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.orderNumber.slice(-4));
      sequence = lastSequence + 1;
    }

    // Trả về mã hoàn chỉnh: FA202601300001
    return `${prefix}${String(sequence).padStart(4, "0")}`;
  }
}
