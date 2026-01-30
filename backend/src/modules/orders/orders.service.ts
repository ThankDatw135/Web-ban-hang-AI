/**
 * OrdersService - Entry point cho Orders module
 * 
 * Service này đóng vai trò là façade, delegate các request tới các service con:
 * - OrdersQueryService: Đọc dữ liệu (findUserOrders, findById, findAll)
 * - OrdersCreateService: Tạo/hủy đơn (create, cancelOrder)
 * - OrdersAdminService: Thao tác admin (updateStatus)
 * 
 * @author Fashion AI Team
 * @created 29/01/2026
 * @refactored 30/01/2026 - Chia từ 316 lines thành 4 files
 */

import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderFilterDto, UpdateOrderStatusDto } from './dto';
import { OrdersQueryService } from './orders.query.service';
import { OrdersCreateService } from './orders.create.service';
import { OrdersAdminService } from './orders.admin.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly queryService: OrdersQueryService,
    private readonly createService: OrdersCreateService,
    private readonly adminService: OrdersAdminService,
  ) {}

  // ========================================
  // USER METHODS - Thao tác người dùng
  // ========================================

  /**
   * Tạo đơn hàng từ giỏ hàng
   * Delegate sang OrdersCreateService
   */
  async create(userId: string, dto: CreateOrderDto) {
    return this.createService.create(userId, dto);
  }

  /**
   * Lấy danh sách đơn hàng của user
   * Delegate sang OrdersQueryService
   */
  async findUserOrders(userId: string, filter: OrderFilterDto) {
    return this.queryService.findUserOrders(userId, filter);
  }

  /**
   * Lấy chi tiết đơn hàng
   * Delegate sang OrdersQueryService
   */
  async findById(userId: string, orderId: string, isAdmin = false) {
    return this.queryService.findById(userId, orderId, isAdmin);
  }

  /**
   * Hủy đơn hàng
   * Delegate sang OrdersCreateService
   */
  async cancelOrder(userId: string, orderId: string) {
    return this.createService.cancelOrder(userId, orderId);
  }

  // ========================================
  // ADMIN METHODS - Thao tác quản trị
  // ========================================

  /**
   * Lấy tất cả đơn hàng (Admin only)
   * Delegate sang OrdersQueryService
   */
  async findAll(filter: OrderFilterDto) {
    return this.queryService.findAll(filter);
  }

  /**
   * Cập nhật trạng thái đơn hàng (Admin only)
   * Delegate sang OrdersAdminService
   */
  async updateStatus(orderId: string, dto: UpdateOrderStatusDto) {
    return this.adminService.updateStatus(orderId, dto);
  }
}
