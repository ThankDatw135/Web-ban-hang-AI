/**
 * AnalyticsService - Thống kê và phân tích cho Admin Dashboard
 *
 * Features:
 * - getDashboardStats: Lấy thống kê tổng quan
 * - getRevenueChart: Dữ liệu biểu đồ doanh thu
 * - getTopProducts: Sản phẩm bán chạy
 *
 * @author Fashion AI Team
 * @created 01/02/2026
 */

import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lấy thống kê tổng quan cho Admin Dashboard
   */
  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    // Parallel queries for performance
    const [
      todayRevenue,
      yesterdayRevenue,
      thisMonthRevenue,
      lastMonthRevenue,
      todayOrders,
      yesterdayOrders,
      newUsersToday,
      totalUsers,
      pendingOrders,
      processingAIJobs,
      lowStockProducts,
    ] = await Promise.all([
      // Today's revenue
      this.prisma.order.aggregate({
        where: {
          createdAt: { gte: today },
          paymentStatus: "COMPLETED",
        },
        _sum: { total: true },
      }),
      // Yesterday's revenue
      this.prisma.order.aggregate({
        where: {
          createdAt: { gte: yesterday, lt: today },
          paymentStatus: "COMPLETED",
        },
        _sum: { total: true },
      }),
      // This month's revenue
      this.prisma.order.aggregate({
        where: {
          createdAt: { gte: thisMonthStart },
          paymentStatus: "COMPLETED",
        },
        _sum: { total: true },
      }),
      // Last month's revenue
      this.prisma.order.aggregate({
        where: {
          createdAt: { gte: lastMonthStart, lte: lastMonthEnd },
          paymentStatus: "COMPLETED",
        },
        _sum: { total: true },
      }),
      // Today's orders
      this.prisma.order.count({
        where: { createdAt: { gte: today } },
      }),
      // Yesterday's orders
      this.prisma.order.count({
        where: { createdAt: { gte: yesterday, lt: today } },
      }),
      // New users today
      this.prisma.user.count({
        where: { createdAt: { gte: today } },
      }),
      // Total users
      this.prisma.user.count(),
      // Pending orders
      this.prisma.order.count({
        where: { status: "PENDING" },
      }),
      // Processing AI jobs
      this.prisma.aIJob.count({
        where: { status: "PROCESSING" },
      }),
      // Low stock products (< 10)
      this.prisma.productVariant.count({
        where: { stock: { lt: 10 } },
      }),
    ]);

    // Calculate growth percentages
    const todayRevenueValue = Number(todayRevenue._sum.total || 0);
    const yesterdayRevenueValue = Number(yesterdayRevenue._sum.total || 0);
    const revenueGrowth = yesterdayRevenueValue > 0
      ? ((todayRevenueValue - yesterdayRevenueValue) / yesterdayRevenueValue) * 100
      : 0;

    const orderGrowth = yesterdayOrders > 0
      ? ((todayOrders - yesterdayOrders) / yesterdayOrders) * 100
      : 0;

    return {
      revenue: {
        today: todayRevenueValue,
        yesterday: yesterdayRevenueValue,
        thisMonth: Number(thisMonthRevenue._sum.total || 0),
        lastMonth: Number(lastMonthRevenue._sum.total || 0),
        growthPercent: Math.round(revenueGrowth * 100) / 100,
      },
      orders: {
        today: todayOrders,
        yesterday: yesterdayOrders,
        pending: pendingOrders,
        growthPercent: Math.round(orderGrowth * 100) / 100,
      },
      users: {
        newToday: newUsersToday,
        total: totalUsers,
      },
      ai: {
        processingJobs: processingAIJobs,
      },
      inventory: {
        lowStockCount: lowStockProducts,
      },
    };
  }

  /**
   * Lấy dữ liệu doanh thu theo ngày (7 ngày gần nhất)
   */
  async getRevenueChart(days = 7) {
    const result = [];
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const revenue = await this.prisma.order.aggregate({
        where: {
          createdAt: { gte: date, lt: nextDate },
          paymentStatus: "COMPLETED",
        },
        _sum: { total: true },
      });

      result.push({
        date: date.toISOString().split("T")[0],
        revenue: Number(revenue._sum.total || 0),
      });
    }

    return result;
  }

  /**
   * Lấy top sản phẩm bán chạy
   */
  async getTopProducts(limit = 5) {
    const orderItems = await this.prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: limit,
    });

    const productIds = orderItems.map((item) => item.productId);

    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        name: true,
        images: true,
        price: true,
      },
    });

    return orderItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        id: item.productId,
        name: product?.name || "Unknown",
        image: product?.images?.[0] || null,
        price: product?.price ? Number(product.price) : 0,
        soldCount: item._sum.quantity || 0,
      };
    });
  }
}
