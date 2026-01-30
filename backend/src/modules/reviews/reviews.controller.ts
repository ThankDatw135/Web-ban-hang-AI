import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto";
import { CurrentUser, AuthAdmin } from "@/common/decorators";

@ApiTags("Reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get("product/:productId")
  @ApiOperation({ summary: "Lấy đánh giá của sản phẩm" })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "limit", required: false })
  getProductReviews(
    @Param("productId") productId: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    return this.reviewsService.getProductReviews(
      productId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
    );
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Tạo đánh giá sản phẩm" })
  create(@CurrentUser("id") userId: string, @Body() dto: CreateReviewDto) {
    return this.reviewsService.create(userId, dto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Xóa đánh giá của mình" })
  delete(@CurrentUser("id") userId: string, @Param("id") reviewId: string) {
    return this.reviewsService.delete(userId, reviewId);
  }

  @Patch(":id/toggle-visibility")
  @AuthAdmin()
  @ApiOperation({ summary: "[Admin] Ẩn/hiện đánh giá" })
  toggleVisibility(@Param("id") reviewId: string) {
    return this.reviewsService.toggleVisibility(reviewId);
  }
}
