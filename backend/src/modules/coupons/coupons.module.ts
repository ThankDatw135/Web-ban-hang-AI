/**
 * CouponsModule - Module quản lý mã giảm giá
 * 
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { CouponsAdminController } from './coupons.admin.controller';

@Module({
  controllers: [CouponsController, CouponsAdminController],
  providers: [CouponsService],
  exports: [CouponsService],
})
export class CouponsModule {}
