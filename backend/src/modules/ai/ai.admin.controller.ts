/**
 * AdminAiController - API endpoints cho quản lý AI Jobs (Admin)
 *
 * Endpoints:
 * - GET /admin/ai-jobs - Lấy danh sách tất cả AI jobs
 * - GET /admin/ai-jobs/:id - Lấy chi tiết job
 * - DELETE /admin/ai-jobs/:id - Hủy/Xóa job
 * - GET /admin/ai-jobs/stats - Thống kê AI jobs
 *
 * @author Fashion AI Team
 * @created 01/02/2026
 */

import {
  Controller,
  Get,
  Delete,
  Param,
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
import { AiService } from "./ai.service";

@ApiTags("Admin AI Jobs")
@Controller("admin/ai-jobs")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("ADMIN")
@ApiBearerAuth()
export class AdminAiController {
  constructor(private readonly aiService: AiService) {}

  /**
   * Lấy danh sách tất cả AI jobs
   */
  @Get()
  @ApiOperation({ summary: "Lấy danh sách AI jobs" })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: "status",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: "type",
    required: false,
    type: String,
  })
  @ApiResponse({ status: 200, description: "Danh sách AI jobs" })
  async getAllJobs(
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("status") status?: string,
    @Query("type") type?: string,
  ) {
    return this.aiService.getAllJobs({
      page: page || 1,
      limit: limit || 20,
      status,
      type,
    });
  }

  /**
   * Lấy chi tiết một AI job
   */
  @Get("stats")
  @ApiOperation({ summary: "Thống kê AI jobs" })
  @ApiResponse({ status: 200, description: "Thống kê AI jobs" })
  async getJobStats() {
    return this.aiService.getJobStats();
  }

  /**
   * Lấy chi tiết một AI job
   */
  @Get(":id")
  @ApiOperation({ summary: "Lấy chi tiết AI job" })
  @ApiResponse({ status: 200, description: "Chi tiết AI job" })
  async getJobById(@Param("id") id: string) {
    return this.aiService.getJobById(id);
  }

  /**
   * Hủy một AI job
   */
  @Delete(":id")
  @ApiOperation({ summary: "Hủy AI job" })
  @ApiResponse({ status: 200, description: "AI job đã được hủy" })
  async cancelJob(@Param("id") id: string) {
    return this.aiService.cancelJob(id);
  }
}
