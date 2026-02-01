import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { WishlistService } from "./wishlist.service";
import { AddToWishlistDto } from "./dto";
import { CurrentUser } from "@/common/decorators";

@ApiTags("Wishlist")
@Controller("wishlist")
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth("JWT-auth")
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @ApiOperation({ summary: "Lấy danh sách yêu thích" })
  @ApiResponse({ status: 200, description: "Danh sách sản phẩm yêu thích" })
  getWishlist(@CurrentUser("id") userId: string) {
    return this.wishlistService.getWishlist(userId);
  }

  @Post()
  @ApiOperation({ summary: "Thêm sản phẩm vào yêu thích" })
  @ApiResponse({ status: 201, description: "Đã thêm vào yêu thích" })
  @ApiResponse({ status: 409, description: "Sản phẩm đã có trong yêu thích" })
  addToWishlist(
    @CurrentUser("id") userId: string,
    @Body() dto: AddToWishlistDto
  ) {
    return this.wishlistService.addToWishlist(userId, dto);
  }

  @Delete(":productId")
  @ApiOperation({ summary: "Xóa sản phẩm khỏi yêu thích" })
  @ApiResponse({ status: 200, description: "Đã xóa khỏi yêu thích" })
  removeFromWishlist(
    @CurrentUser("id") userId: string,
    @Param("productId") productId: string
  ) {
    return this.wishlistService.removeFromWishlist(userId, productId);
  }

  @Get("check/:productId")
  @ApiOperation({ summary: "Kiểm tra sản phẩm có trong yêu thích không" })
  @ApiResponse({ status: 200, description: "Trạng thái yêu thích" })
  async isInWishlist(
    @CurrentUser("id") userId: string,
    @Param("productId") productId: string
  ) {
    const isInWishlist = await this.wishlistService.isInWishlist(
      userId,
      productId
    );
    return { isInWishlist };
  }

  @Post("toggle/:productId")
  @ApiOperation({ summary: "Toggle trạng thái yêu thích" })
  @ApiResponse({ status: 200, description: "Đã cập nhật trạng thái" })
  toggleWishlist(
    @CurrentUser("id") userId: string,
    @Param("productId") productId: string
  ) {
    return this.wishlistService.toggleWishlist(userId, productId);
  }

  @Delete()
  @ApiOperation({ summary: "Xóa toàn bộ danh sách yêu thích" })
  @ApiResponse({ status: 200, description: "Đã xóa danh sách" })
  clearWishlist(@CurrentUser("id") userId: string) {
    return this.wishlistService.clearWishlist(userId);
  }
}
