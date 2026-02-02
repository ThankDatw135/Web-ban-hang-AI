/**
 * AnalyticsController - API endpoints cho Admin Dashboard thống kê
 *
 * Endpoints:
 * - GET /admin/analytics/dashboard - Thống kê tổng quan
 * - GET /admin/analytics/revenue-chart - Biểu đồ doanh thu
 * - GET /admin/analytics/top-products - Sản phẩm bán chạy
 *
 * @author Fashion AI Team
 * @created 01/02/2026
 */

import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "@/common/guards/roles.guard";
import { Roles } from "@/common/decorators/roles.decorator";
import { AnalyticsService } from "./analytics.service";

@ApiTags("Admin Analytics")
@Controller("admin/analytics")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("ADMIN")
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  /**
   * Lấy thống kê tổng quan cho Dashboard
   */
  @Get("dashboard")
  @ApiOperation({ summary: "Lấy thống kê Dashboard" })
  @ApiResponse({ status: 200, description: "Thống kê dashboard" })
  async getDashboardStats() {
    return this.analyticsService.getDashboardStats();
  }

  /**
   * Lấy dữ liệu biểu đồ doanh thu
   */
  @Get("revenue-chart")
  @ApiOperation({ summary: "Lấy dữ liệu biểu đồ doanh thu" })
  @ApiQuery({ name: "days", required: false, type: Number, description: "Số ngày (mặc định 7)" })
  @ApiResponse({ status: 200, description: "Dữ liệu biểu đồ" })
  async getRevenueChart(@Query("days") days?: number) {
    return this.analyticsService.getRevenueChart(days || 7);
  }

  /**
   * Lấy top sản phẩm bán chạy
   */
  @Get("top-products")
  @ApiOperation({ summary: "Lấy top sản phẩm bán chạy" })
  @ApiQuery({ name: "limit", required: false, type: Number, description: "Số sản phẩm (mặc định 5)" })
  @ApiResponse({ status: 200, description: "Danh sách sản phẩm bán chạy" })
  async getTopProducts(@Query("limit") limit?: number) {
    return this.analyticsService.getTopProducts(limit || 5);
  }
}
