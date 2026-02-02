/**
 * CouponsController - API endpoints cho mã giảm giá (User)
 *
 * Endpoints:
 * - GET /coupons/my - Lấy danh sách mã khả dụng
 * - POST /coupons/validate - Kiểm tra mã hợp lệ
 *
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import { Controller, Post, Get, Body, UseGuards, Request } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CouponsService } from "./coupons.service";
import { ValidateCouponDto } from "./dto";

@ApiTags("Coupons")
@Controller("coupons")
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  /**
   * Lấy danh sách mã giảm giá khả dụng cho user
   */
  @Get("my")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Lấy danh sách mã giảm giá khả dụng" })
  @ApiResponse({ status: 200, description: "Danh sách mã giảm giá" })
  async getMyCoupons(@Request() req: any) {
    return this.couponsService.getAvailableCoupons(req.user.id);
  }

  /**
   * Kiểm tra mã giảm giá có hợp lệ không
   */
  @Post("validate")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Kiểm tra mã giảm giá" })
  @ApiResponse({ status: 200, description: "Kết quả validate" })
  async validate(@Body() dto: ValidateCouponDto, @Request() req: any) {
    return this.couponsService.validate(dto, req.user.id);
  }
}
