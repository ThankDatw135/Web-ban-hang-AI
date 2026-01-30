/**
 * OrdersModule - Module quản lý đơn hàng
 *
 * Cấu trúc:
 * - OrdersController: Xử lý HTTP requests
 * - OrdersService: Entry point (façade)
 * - OrdersQueryService: Đọc dữ liệu đơn hàng
 * - OrdersCreateService: Tạo/hủy đơn hàng
 * - OrdersAdminService: Thao tác admin
 *
 * @author Fashion AI Team
 * @created 29/01/2026
 * @refactored 30/01/2026 - Tách services theo chức năng
 */

import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrdersQueryService } from "./orders.query.service";
import { OrdersCreateService } from "./orders.create.service";
import { OrdersAdminService } from "./orders.admin.service";

@Module({
  controllers: [OrdersController],
  providers: [
    // Entry point service
    OrdersService,
    // Sub-services
    OrdersQueryService,
    OrdersCreateService,
    OrdersAdminService,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
