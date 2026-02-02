/**
 * CouponsService - Xử lý logic mã giảm giá
 *
 * Features:
 * - validate: Kiểm tra mã hợp lệ
 * - apply: Áp dụng mã vào đơn hàng
 * - calculateDiscount: Tính số tiền giảm
 * - CRUD cho Admin
 *
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CouponType } from "@prisma/client";
import { CreateCouponDto, UpdateCouponDto, ValidateCouponDto } from "./dto";

// Error codes cho response chi tiết
export enum CouponErrorCode {
  COUPON_NOT_FOUND = "COUPON_NOT_FOUND",
  COUPON_EXPIRED = "COUPON_EXPIRED",
  COUPON_INACTIVE = "COUPON_INACTIVE",
  COUPON_LIMIT_REACHED = "COUPON_LIMIT_REACHED",
  USER_LIMIT_REACHED = "USER_LIMIT_REACHED",
  MIN_ORDER_NOT_MET = "MIN_ORDER_NOT_MET",
  COUPON_NOT_STARTED = "COUPON_NOT_STARTED",
}

// Interface cho kết quả validate
export interface ValidateCouponResult {
  valid: boolean;
  error?: CouponErrorCode;
  errorMessage?: string;
  coupon?: {
    id: string;
    code: string;
    name: string;
    type: CouponType;
    value: number;
    discountAmount: number;
    finalTotal: number;
  };
}

@Injectable()
export class CouponsService {
  constructor(private readonly prisma: PrismaService) {}

  // ========================================
  // PUBLIC METHODS - User facing
  // ========================================

  /**
   * Kiểm tra mã giảm giá có hợp lệ không
   *
   * @param dto - Thông tin validate (code, orderTotal)
   * @param userId - ID của user đang validate
   * @returns Kết quả validate với thông tin discount
   */
  async validate(
    dto: ValidateCouponDto,
    userId: string,
  ): Promise<ValidateCouponResult> {
    // Tìm coupon theo code
    const coupon = await this.prisma.coupon.findUnique({
      where: { code: dto.code.toUpperCase() },
    });

    if (!coupon) {
      return {
        valid: false,
        error: CouponErrorCode.COUPON_NOT_FOUND,
        errorMessage: "Mã giảm giá không tồn tại",
      };
    }

    // Kiểm tra active
    if (!coupon.isActive) {
      return {
        valid: false,
        error: CouponErrorCode.COUPON_INACTIVE,
        errorMessage: "Mã giảm giá không còn hoạt động",
      };
    }

    // Kiểm tra thời gian
    const now = new Date();
    if (now < coupon.startDate) {
      return {
        valid: false,
        error: CouponErrorCode.COUPON_NOT_STARTED,
        errorMessage: "Mã giảm giá chưa có hiệu lực",
      };
    }

    if (now > coupon.endDate) {
      return {
        valid: false,
        error: CouponErrorCode.COUPON_EXPIRED,
        errorMessage: "Mã giảm giá đã hết hạn",
      };
    }

    // Kiểm tra tổng lượt dùng
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return {
        valid: false,
        error: CouponErrorCode.COUPON_LIMIT_REACHED,
        errorMessage: "Mã giảm giá đã hết lượt sử dụng",
      };
    }

    // Kiểm tra user đã dùng bao nhiêu lần
    const userUsageCount = await this.prisma.couponUsage.count({
      where: {
        couponId: coupon.id,
        userId: userId,
      },
    });

    if (userUsageCount >= coupon.usagePerUser) {
      return {
        valid: false,
        error: CouponErrorCode.USER_LIMIT_REACHED,
        errorMessage: "Bạn đã sử dụng mã này rồi",
      };
    }

    // Kiểm tra giá trị đơn hàng tối thiểu
    if (coupon.minOrderValue && dto.orderTotal < Number(coupon.minOrderValue)) {
      return {
        valid: false,
        error: CouponErrorCode.MIN_ORDER_NOT_MET,
        errorMessage: `Đơn hàng tối thiểu ${Number(coupon.minOrderValue).toLocaleString("vi-VN")}đ`,
      };
    }

    // Tính số tiền giảm
    const discountAmount = this.calculateDiscount(
      coupon.type,
      Number(coupon.value),
      dto.orderTotal,
      dto.shippingFee || 0,
      coupon.maxDiscount ? Number(coupon.maxDiscount) : null,
    );

    return {
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        name: coupon.name,
        type: coupon.type,
        value: Number(coupon.value),
        discountAmount,
        finalTotal: dto.orderTotal - discountAmount,
      },
    };
  }

  /**
   * Lấy danh sách mã giảm giá khả dụng cho user
   * Trả về các mã đang active, trong thời gian hiệu lực, còn lượt sử dụng
   */
  async getAvailableCoupons(userId: string) {
    const now = new Date();

    // Lấy tất cả coupon đang hoạt động
    const coupons = await this.prisma.coupon.findMany({
      where: {
        isActive: true,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      orderBy: { endDate: "asc" }, // Sắp xếp theo ngày hết hạn
    });

    // Lọc ra các coupon user còn có thể dùng
    const availableCoupons = [];

    for (const coupon of coupons) {
      // Kiểm tra tổng lượt sử dụng
      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        continue;
      }

      // Kiểm tra lượt sử dụng của user
      const userUsageCount = await this.prisma.couponUsage.count({
        where: {
          couponId: coupon.id,
          userId: userId,
        },
      });

      if (userUsageCount >= coupon.usagePerUser) {
        continue;
      }

      // Thêm thông tin bổ sung
      availableCoupons.push({
        id: coupon.id,
        code: coupon.code,
        name: coupon.name,
        description: coupon.description,
        type: coupon.type,
        value: Number(coupon.value),
        minOrderValue: coupon.minOrderValue ? Number(coupon.minOrderValue) : null,
        maxDiscount: coupon.maxDiscount ? Number(coupon.maxDiscount) : null,
        endDate: coupon.endDate,
        remainingUses: coupon.usagePerUser - userUsageCount,
      });
    }

    return {
      data: availableCoupons,
      total: availableCoupons.length,
    };
  }

  /**
   * Sử dụng coupon cho đơn hàng
   * Gọi sau khi tạo order thành công
   */
  async useCoupon(couponId: string, userId: string, orderId: string) {
    // Tạo usage record
    await this.prisma.couponUsage.create({
      data: {
        couponId,
        userId,
        orderId,
      },
    });

    // Tăng usedCount
    await this.prisma.coupon.update({
      where: { id: couponId },
      data: { usedCount: { increment: 1 } },
    });
  }

  /**
   * Tính số tiền giảm dựa trên loại coupon
   */
  calculateDiscount(
    type: CouponType,
    value: number,
    orderTotal: number,
    shippingFee: number,
    maxDiscount: number | null,
  ): number {
    let discount = 0;

    switch (type) {
      case CouponType.PERCENTAGE:
        // Giảm theo phần trăm
        discount = orderTotal * (value / 100);
        // Giới hạn max discount
        if (maxDiscount) {
          discount = Math.min(discount, maxDiscount);
        }
        break;

      case CouponType.FIXED_AMOUNT:
        // Giảm số tiền cố định
        discount = value;
        break;

      case CouponType.FREE_SHIPPING:
        // Miễn phí vận chuyển
        discount = shippingFee;
        break;
    }

    // Không giảm quá tổng đơn hàng
    return Math.min(discount, orderTotal);
  }

  // ========================================
  // ADMIN METHODS
  // ========================================

  /**
   * Lấy danh sách tất cả coupons (Admin)
   */
  async findAll(params?: {
    isActive?: boolean;
    page?: number;
    limit?: number;
  }) {
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const skip = (page - 1) * limit;

    const where =
      params?.isActive !== undefined ? { isActive: params.isActive } : {};

    const [coupons, total] = await Promise.all([
      this.prisma.coupon.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { usages: true, orders: true } },
        },
      }),
      this.prisma.coupon.count({ where }),
    ]);

    return {
      data: coupons,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Lấy chi tiết 1 coupon (Admin)
   */
  async findById(id: string) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { id },
      include: {
        _count: { select: { usages: true, orders: true } },
      },
    });

    if (!coupon) {
      throw new NotFoundException("Mã giảm giá không tồn tại");
    }

    return coupon;
  }

  /**
   * Tạo coupon mới (Admin)
   */
  async create(dto: CreateCouponDto) {
    // Kiểm tra code đã tồn tại chưa
    const existing = await this.prisma.coupon.findUnique({
      where: { code: dto.code.toUpperCase() },
    });

    if (existing) {
      throw new BadRequestException("Mã giảm giá đã tồn tại");
    }

    return this.prisma.coupon.create({
      data: {
        ...dto,
        code: dto.code.toUpperCase(),
      },
    });
  }

  /**
   * Cập nhật coupon (Admin)
   */
  async update(id: string, dto: UpdateCouponDto) {
    await this.findById(id); // Check exists

    return this.prisma.coupon.update({
      where: { id },
      data: {
        ...dto,
        code: dto.code?.toUpperCase(),
      },
    });
  }

  /**
   * Xóa coupon (Admin)
   */
  async delete(id: string) {
    await this.findById(id); // Check exists

    // Kiểm tra coupon đã được sử dụng chưa
    const usageCount = await this.prisma.couponUsage.count({
      where: { couponId: id },
    });

    if (usageCount > 0) {
      // Nếu đã được sử dụng, chỉ deactivate thay vì xóa
      return this.prisma.coupon.update({
        where: { id },
        data: { isActive: false },
      });
    }

    return this.prisma.coupon.delete({ where: { id } });
  }

  /**
   * Lấy lịch sử sử dụng coupon (Admin)
   */
  async getUsageHistory(couponId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [usages, total] = await Promise.all([
      this.prisma.couponUsage.findMany({
        where: { couponId },
        skip,
        take: limit,
        orderBy: { usedAt: "desc" },
      }),
      this.prisma.couponUsage.count({ where: { couponId } }),
    ]);

    return {
      data: usages,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}
