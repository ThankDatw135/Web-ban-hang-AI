/**
 * ProductsModule - Module quản lý sản phẩm
 * 
 * Cấu trúc:
 * - ProductsController: Xử lý HTTP requests
 * - ProductsService: Entry point (façade)
 * - ProductsQueryService: Đọc dữ liệu
 * - ProductsAdminService: Thao tác admin
 * - ProductsUtils: Hàm tiện ích
 * 
 * @author Fashion AI Team
 * @created 29/01/2026
 * @refactored 30/01/2026 - Tách services theo chức năng
 */

import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsQueryService } from './products.query.service';
import { ProductsAdminService } from './products.admin.service';
import { ProductsUtils } from './products.utils';

@Module({
  controllers: [ProductsController],
  providers: [
    // Entry point service
    ProductsService,
    // Sub-services
    ProductsQueryService,
    ProductsAdminService,
    // Utilities
    ProductsUtils,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
