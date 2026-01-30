/**
 * CouponsAdminController - API endpoints quản lý mã giảm giá (Admin)
 *
 * Endpoints:
 * - GET    /admin/coupons         - Danh sách coupons
 * - GET    /admin/coupons/:id     - Chi tiết 1 coupon
 * - POST   /admin/coupons         - Tạo coupon mới
 * - PUT    /admin/coupons/:id     - Cập nhật coupon
 * - DELETE /admin/coupons/:id     - Xóa coupon
 * - GET    /admin/coupons/:id/usage - Lịch sử sử dụng
 *
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { CouponsService } from "./coupons.service";
import { CreateCouponDto, UpdateCouponDto, CouponFilterDto } from "./dto";

@ApiTags("Admin - Coupons")
@Controller("admin/coupons")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("ADMIN")
@ApiBearerAuth()
export class CouponsAdminController {
  constructor(private readonly couponsService: CouponsService) {}

  /**
   * Lấy danh sách tất cả coupons
   */
  @Get()
  @ApiOperation({ summary: "Danh sách mã giảm giá" })
  @ApiResponse({ status: 200, description: "Danh sách coupons" })
  async findAll(@Query() query: CouponFilterDto) {
    return this.couponsService.findAll(query);
  }

  /**
   * Lấy chi tiết 1 coupon
   */
  @Get(":id")
  @ApiOperation({ summary: "Chi tiết mã giảm giá" })
  @ApiResponse({ status: 200, description: "Chi tiết coupon" })
  @ApiResponse({ status: 404, description: "Không tìm thấy" })
  async findById(@Param("id") id: string) {
    return this.couponsService.findById(id);
  }

  /**
   * Tạo coupon mới
   */
  @Post()
  @ApiOperation({ summary: "Tạo mã giảm giá mới" })
  @ApiResponse({ status: 201, description: "Tạo thành công" })
  @ApiResponse({ status: 400, description: "Mã đã tồn tại" })
  async create(@Body() dto: CreateCouponDto) {
    return this.couponsService.create(dto);
  }

  /**
   * Cập nhật coupon
   */
  @Put(":id")
  @ApiOperation({ summary: "Cập nhật mã giảm giá" })
  @ApiResponse({ status: 200, description: "Cập nhật thành công" })
  @ApiResponse({ status: 404, description: "Không tìm thấy" })
  async update(@Param("id") id: string, @Body() dto: UpdateCouponDto) {
    return this.couponsService.update(id, dto);
  }

  /**
   * Xóa coupon
   */
  @Delete(":id")
  @ApiOperation({ summary: "Xóa mã giảm giá" })
  @ApiResponse({ status: 200, description: "Xóa thành công" })
  @ApiResponse({ status: 404, description: "Không tìm thấy" })
  async delete(@Param("id") id: string) {
    return this.couponsService.delete(id);
  }

  /**
   * Lấy lịch sử sử dụng coupon
   */
  @Get(":id/usage")
  @ApiOperation({ summary: "Lịch sử sử dụng mã giảm giá" })
  @ApiResponse({ status: 200, description: "Danh sách usage" })
  async getUsageHistory(
    @Param("id") id: string,
    @Query("page") page?: number,
    @Query("limit") limit?: number,
  ) {
    return this.couponsService.getUsageHistory(id, page, limit);
  }
}
