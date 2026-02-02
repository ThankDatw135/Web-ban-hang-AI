/**
 * Admin TicketsController - API endpoints cho quản lý tickets (Admin)
 *
 * @author Fashion AI Team
 * @created 01/02/2026
 */

import {
  Controller,
  Get,
  Post,
  Patch,
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
import { CurrentUser } from "@/common/decorators";
import { TicketsService } from "./tickets.service";
import { TicketStatus, TicketPriority } from "@prisma/client";

@ApiTags("Admin Tickets")
@Controller("admin/tickets")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("ADMIN")
@ApiBearerAuth()
export class AdminTicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @ApiOperation({ summary: "Lấy danh sách tickets" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "status", required: false, enum: TicketStatus })
  @ApiQuery({ name: "priority", required: false, enum: TicketPriority })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiResponse({ status: 200, description: "Danh sách tickets" })
  async findAll(
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("status") status?: TicketStatus,
    @Query("priority") priority?: TicketPriority,
    @Query("search") search?: string,
  ) {
    return this.ticketsService.findAll({
      page: page || 1,
      limit: limit || 20,
      status,
      priority,
      search,
    });
  }

  @Get("stats")
  @ApiOperation({ summary: "Thống kê tickets" })
  @ApiResponse({ status: 200, description: "Thống kê tickets" })
  async getStats() {
    return this.ticketsService.getStats();
  }

  @Get(":id")
  @ApiOperation({ summary: "Lấy chi tiết ticket" })
  @ApiResponse({ status: 200, description: "Chi tiết ticket" })
  async findById(@Param("id") id: string) {
    return this.ticketsService.findById(id);
  }

  @Patch(":id/status")
  @ApiOperation({ summary: "Cập nhật trạng thái ticket" })
  @ApiResponse({ status: 200, description: "Ticket đã cập nhật" })
  async updateStatus(
    @Param("id") id: string,
    @Body() body: { status: TicketStatus; assignedTo?: string },
  ) {
    return this.ticketsService.updateStatus(id, body.status, body.assignedTo);
  }

  @Post(":id/reply")
  @ApiOperation({ summary: "Trả lời ticket" })
  @ApiResponse({ status: 201, description: "Reply đã được tạo" })
  async addReply(
    @Param("id") id: string,
    @CurrentUser("id") adminId: string,
    @Body() body: { content: string },
  ) {
    return this.ticketsService.addReply(id, adminId, body.content);
  }
}
