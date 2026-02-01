import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddToWishlistDto {
  @ApiProperty({ description: "Product ID to add to wishlist" })
  @IsString()
  productId: string;
}
