/**
 * CampaignsService - Quản lý chiến dịch marketing
 *
 * @author Fashion AI Team
 * @created 01/02/2026
 */

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CampaignStatus, CampaignType } from "@prisma/client";

@Injectable()
export class CampaignsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lấy danh sách campaigns
   */
  async findAll(params?: {
    page?: number;
    limit?: number;
    status?: CampaignStatus;
    type?: CampaignType;
  }) {
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (params?.status) where.status = params.status;
    if (params?.type) where.type = params.type;

    const [campaigns, total] = await Promise.all([
      this.prisma.campaign.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.campaign.count({ where }),
    ]);

    return {
      data: campaigns,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Lấy chi tiết campaign
   */
  async findById(id: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new NotFoundException("Chiến dịch không tồn tại");
    }

    return campaign;
  }

  /**
   * Tạo campaign mới
   */
  async create(data: {
    name: string;
    description?: string;
    type: CampaignType;
    startDate: Date;
    endDate: Date;
    bannerUrl?: string;
    targetUrl?: string;
  }) {
    return this.prisma.campaign.create({
      data: {
        ...data,
        status: CampaignStatus.DRAFT,
      },
    });
  }

  /**
   * Cập nhật campaign
   */
  async update(id: string, data: Partial<{
    name: string;
    description: string;
    type: CampaignType;
    status: CampaignStatus;
    startDate: Date;
    endDate: Date;
    bannerUrl: string;
    targetUrl: string;
  }>) {
    await this.findById(id);

    return this.prisma.campaign.update({
      where: { id },
      data,
    });
  }

  /**
   * Xóa campaign
   */
  async delete(id: string) {
    await this.findById(id);

    return this.prisma.campaign.delete({
      where: { id },
    });
  }

  /**
   * Thống kê campaigns
   */
  async getStats() {
    const now = new Date();

    const [total, active, scheduled, ended] = await Promise.all([
      this.prisma.campaign.count(),
      this.prisma.campaign.count({ where: { status: CampaignStatus.ACTIVE } }),
      this.prisma.campaign.count({ where: { status: CampaignStatus.SCHEDULED } }),
      this.prisma.campaign.count({ where: { status: CampaignStatus.ENDED } }),
    ]);

    // Get total views and clicks
    const stats = await this.prisma.campaign.aggregate({
      _sum: { views: true, clicks: true },
    });

    return {
      total,
      active,
      scheduled,
      ended,
      totalViews: stats._sum.views || 0,
      totalClicks: stats._sum.clicks || 0,
    };
  }

  /**
   * Lấy campaigns đang active (cho frontend)
   */
  async getActiveCampaigns() {
    const now = new Date();

    return this.prisma.campaign.findMany({
      where: {
        status: CampaignStatus.ACTIVE,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Tăng view count
   */
  async incrementView(id: string) {
    await this.prisma.campaign.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }

  /**
   * Tăng click count
   */
  async incrementClick(id: string) {
    await this.prisma.campaign.update({
      where: { id },
      data: { clicks: { increment: 1 } },
    });
  }
}
