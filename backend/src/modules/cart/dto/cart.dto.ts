import { IsString, IsNumber, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddToCartDto {
  @ApiProperty({ description: "ID sản phẩm" })
  @IsString()
  productId: string;

  @ApiProperty({ description: "ID variant" })
  @IsString()
  variantId: string;

  @ApiProperty({ example: 1, minimum: 1, maximum: 99 })
  @IsNumber()
  @Min(1)
  @Max(99)
  quantity: number;
}

export class UpdateCartItemDto {
  @ApiProperty({ example: 2, minimum: 1, maximum: 99 })
  @IsNumber()
  @Min(1)
  @Max(99)
  quantity: number;
}
