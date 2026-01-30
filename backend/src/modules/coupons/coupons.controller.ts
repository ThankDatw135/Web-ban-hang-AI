/**
 * CouponsController - API endpoints cho mã giảm giá (User)
 * 
 * Endpoints:
 * - POST /coupons/validate - Kiểm tra mã hợp lệ
 * 
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CouponsService } from './coupons.service';
import { ValidateCouponDto } from './dto';

@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  /**
   * Kiểm tra mã giảm giá có hợp lệ không
   */
  @Post('validate')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kiểm tra mã giảm giá' })
  @ApiResponse({ status: 200, description: 'Kết quả validate' })
  async validate(@Body() dto: ValidateCouponDto, @Request() req: any) {
    return this.couponsService.validate(dto, req.user.id);
  }
}
