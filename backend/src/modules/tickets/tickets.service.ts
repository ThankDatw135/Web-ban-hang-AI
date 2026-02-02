/**
 * TicketsService - Quản lý yêu cầu hỗ trợ
 *
 * @author Fashion AI Team
 * @created 01/02/2026
 */

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TicketStatus, TicketPriority } from "@prisma/client";

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  // ========================================
  // ADMIN METHODS
  // ========================================

  /**
   * Lấy danh sách tickets (Admin)
   */
  async findAll(params?: {
    page?: number;
    limit?: number;
    status?: TicketStatus;
    priority?: TicketPriority;
    search?: string;
  }) {
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (params?.status) where.status = params.status;
    if (params?.priority) where.priority = params.priority;
    if (params?.search) {
      where.OR = [
        { ticketNumber: { contains: params.search, mode: "insensitive" } },
        { subject: { contains: params.search, mode: "insensitive" } },
        { user: { firstName: { contains: params.search, mode: "insensitive" } } },
        { user: { email: { contains: params.search, mode: "insensitive" } } },
      ];
    }

    const [tickets, total] = await Promise.all([
      this.prisma.supportTicket.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, email: true, avatar: true },
          },
          _count: { select: { replies: true } },
        },
      }),
      this.prisma.supportTicket.count({ where }),
    ]);

    return {
      data: tickets,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Lấy chi tiết ticket (Admin)
   */
  async findById(id: string) {
    const ticket = await this.prisma.supportTicket.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true, avatar: true },
        },
        replies: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!ticket) {
      throw new NotFoundException("Ticket không tồn tại");
    }

    return ticket;
  }

  /**
   * Cập nhật trạng thái ticket
   */
  async updateStatus(id: string, status: TicketStatus, assignedTo?: string) {
    await this.findById(id);

    const data: any = { status };
    if (assignedTo) data.assignedTo = assignedTo;
    if (status === TicketStatus.RESOLVED) {
      data.resolvedAt = new Date();
    }

    return this.prisma.supportTicket.update({
      where: { id },
      data,
    });
  }

  /**
   * Trả lời ticket (Admin)
   */
  async addReply(ticketId: string, adminId: string, content: string) {
    // Verify ticket exists
    await this.findById(ticketId);

    // Create reply
    const reply = await this.prisma.ticketReply.create({
      data: {
        ticketId,
        userId: adminId,
        content,
        isAdmin: true,
      },
    });

    // Update ticket status to PROCESSING if it was OPEN
    await this.prisma.supportTicket.updateMany({
      where: { id: ticketId, status: TicketStatus.OPEN },
      data: { status: TicketStatus.PROCESSING },
    });

    return reply;
  }

  /**
   * Thống kê tickets
   */
  async getStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [open, processing, resolved, todayCount, highPriority] = await Promise.all([
      this.prisma.supportTicket.count({ where: { status: TicketStatus.OPEN } }),
      this.prisma.supportTicket.count({ where: { status: TicketStatus.PROCESSING } }),
      this.prisma.supportTicket.count({
        where: { status: { in: [TicketStatus.RESOLVED, TicketStatus.CLOSED] } },
      }),
      this.prisma.supportTicket.count({ where: { createdAt: { gte: today } } }),
      this.prisma.supportTicket.count({ where: { priority: TicketPriority.HIGH, status: TicketStatus.OPEN } }),
    ]);

    return {
      open,
      processing,
      resolved,
      today: todayCount,
      highPriority,
    };
  }

  // ========================================
  // USER METHODS
  // ========================================

  /**
   * Tạo ticket mới (User)
   */
  async create(userId: string, data: { subject: string; description: string; category: any }) {
    // Generate ticket number
    const count = await this.prisma.supportTicket.count();
    const ticketNumber = `TK-${String(count + 1).padStart(4, "0")}`;

    return this.prisma.supportTicket.create({
      data: {
        ticketNumber,
        userId,
        subject: data.subject,
        description: data.description,
        category: data.category,
      },
    });
  }

  /**
   * Lấy tickets của user
   */
  async findByUser(userId: string) {
    return this.prisma.supportTicket.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { replies: true } },
      },
    });
  }

  /**
   * Thêm reply từ user
   */
  async addUserReply(ticketId: string, userId: string, content: string) {
    // Verify ticket belongs to user
    const ticket = await this.prisma.supportTicket.findFirst({
      where: { id: ticketId, userId },
    });

    if (!ticket) {
      throw new NotFoundException("Ticket không tồn tại");
    }

    return this.prisma.ticketReply.create({
      data: {
        ticketId,
        userId,
        content,
        isAdmin: false,
      },
    });
  }
}
