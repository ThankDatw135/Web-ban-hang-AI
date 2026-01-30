/**
 * OrdersAdminService - Xử lý thao tác admin với đơn hàng
 * 
 * File này chứa các method:
 * - updateStatus: Cập nhật trạng thái đơn hàng
 * 
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateOrderStatusDto } from './dto';
import { OrderStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class OrdersAdminService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cập nhật trạng thái đơn hàng (Admin only)
   * 
   * @param orderId - ID đơn hàng
   * @param dto - Trạng thái mới
   * @returns Đơn hàng sau khi cập nhật
   * 
   * // Các trạng thái:
   * // PENDING -> CONFIRMED -> PROCESSING -> SHIPPED -> DELIVERED
   * //                                               -> CANCELLED
   * 
   * // Logic đặc biệt:
   * // - SHIPPED: Set shippedAt
   * // - DELIVERED: Set deliveredAt, nếu COD thì đánh dấu đã thanh toán
   * // - CANCELLED: Set cancelledAt
   */
  async updateStatus(orderId: string, dto: UpdateOrderStatusDto) {
    // Kiểm tra đơn hàng tồn tại
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    // Chuẩn bị dữ liệu update
    const updateData: any = { status: dto.status };

    // Set timestamp tương ứng với trạng thái
    switch (dto.status) {
      case OrderStatus.SHIPPED:
        // Đơn hàng đã được giao cho shipper
        updateData.shippedAt = new Date();
        break;

      case OrderStatus.DELIVERED:
        // Đơn hàng đã giao thành công
        updateData.deliveredAt = new Date();
        
        // Nếu thanh toán COD, tự động đánh dấu đã thanh toán
        if (order.paymentMethod === 'COD') {
          updateData.paymentStatus = PaymentStatus.COMPLETED;
          updateData.paidAt = new Date();
        }
        break;

      case OrderStatus.CANCELLED:
        // Đơn hàng bị hủy bởi admin
        updateData.cancelledAt = new Date();
        // TODO: Hoàn stock nếu cần (hiện tại chỉ updateStatus)
        break;
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });
  }
}
