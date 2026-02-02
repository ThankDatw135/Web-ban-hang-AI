/**
 * Admin CampaignsController - API endpoints cho quản lý chiến dịch (Admin)
 *
 * @author Fashion AI Team
 * @created 01/02/2026
 */

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from "@nestjs/common";
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
import { CampaignsService } from "./campaigns.service";
import { CampaignStatus, CampaignType } from "@prisma/client";

@ApiTags("Admin Campaigns")
@Controller("admin/campaigns")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("ADMIN")
@ApiBearerAuth()
export class AdminCampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  @ApiOperation({ summary: "Lấy danh sách campaigns" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "status", required: false, enum: CampaignStatus })
  @ApiQuery({ name: "type", required: false, enum: CampaignType })
  @ApiResponse({ status: 200, description: "Danh sách campaigns" })
  async findAll(
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("status") status?: CampaignStatus,
    @Query("type") type?: CampaignType,
  ) {
    return this.campaignsService.findAll({
      page: page || 1,
      limit: limit || 20,
      status,
      type,
    });
  }

  @Get("stats")
  @ApiOperation({ summary: "Thống kê campaigns" })
  @ApiResponse({ status: 200, description: "Thống kê campaigns" })
  async getStats() {
    return this.campaignsService.getStats();
  }

  @Get(":id")
  @ApiOperation({ summary: "Lấy chi tiết campaign" })
  @ApiResponse({ status: 200, description: "Chi tiết campaign" })
  async findById(@Param("id") id: string) {
    return this.campaignsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "Tạo campaign mới" })
  @ApiResponse({ status: 201, description: "Campaign đã được tạo" })
  async create(
    @Body()
    body: {
      name: string;
      description?: string;
      type: CampaignType;
      startDate: Date;
      endDate: Date;
      bannerUrl?: string;
      targetUrl?: string;
    },
  ) {
    return this.campaignsService.create(body);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Cập nhật campaign" })
  @ApiResponse({ status: 200, description: "Campaign đã cập nhật" })
  async update(
    @Param("id") id: string,
    @Body()
    body: Partial<{
      name: string;
      description: string;
      type: CampaignType;
      status: CampaignStatus;
      startDate: Date;
      endDate: Date;
      bannerUrl: string;
      targetUrl: string;
    }>,
  ) {
    return this.campaignsService.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xóa campaign" })
  @ApiResponse({ status: 200, description: "Campaign đã xóa" })
  async delete(@Param("id") id: string) {
    return this.campaignsService.delete(id);
  }
}
