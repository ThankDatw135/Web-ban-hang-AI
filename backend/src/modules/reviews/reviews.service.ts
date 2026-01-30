import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateReviewDto } from "./dto";

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getProductReviews(productId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { productId, isVisible: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, avatar: true },
          },
        },
      }),
      this.prisma.review.count({ where: { productId, isVisible: true } }),
    ]);

    return {
      items: reviews,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(userId: string, dto: CreateReviewDto) {
    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException("Sản phẩm không tồn tại");
    }

    // Check if user has purchased this product
    const hasPurchased = await this.prisma.orderItem.findFirst({
      where: {
        productId: dto.productId,
        order: {
          userId,
          status: "DELIVERED",
        },
      },
    });

    if (!hasPurchased) {
      throw new BadRequestException("Bạn cần mua sản phẩm trước khi đánh giá");
    }

    // Check if already reviewed
    const existingReview = await this.prisma.review.findFirst({
      where: { userId, productId: dto.productId },
    });

    if (existingReview) {
      throw new ConflictException("Bạn đã đánh giá sản phẩm này rồi");
    }

    return this.prisma.review.create({
      data: {
        userId,
        productId: dto.productId,
        rating: dto.rating,
        title: dto.title,
        content: dto.content,
      },
    });
  }

  async delete(userId: string, reviewId: string) {
    const review = await this.prisma.review.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) {
      throw new NotFoundException("Đánh giá không tồn tại");
    }

    await this.prisma.review.delete({
      where: { id: reviewId },
    });

    return { message: "Xóa đánh giá thành công" };
  }

  // Admin: Toggle visibility
  async toggleVisibility(reviewId: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new NotFoundException("Đánh giá không tồn tại");
    }

    return this.prisma.review.update({
      where: { id: reviewId },
      data: { isVisible: !review.isVisible },
    });
  }
}
