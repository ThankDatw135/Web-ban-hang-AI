import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  Min,
  Max,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "@/common/dto";

export enum ProductSortBy {
  NEWEST = "newest",
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
  NAME = "name",
  POPULAR = "popular",
}

export class ProductFilterDto extends PaginationDto {
  @ApiPropertyOptional({ description: "Tìm kiếm theo tên" })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: "Lọc theo category slug" })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: "Lọc theo brand" })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ description: "Giá tối thiểu" })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ description: "Giá tối đa" })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ description: "Lọc theo size" })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiPropertyOptional({ description: "Lọc theo màu" })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ description: "Chỉ lấy sản phẩm nổi bật" })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ description: "Chỉ lấy sản phẩm đang sale" })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  onSale?: boolean;

  @ApiPropertyOptional({ enum: ProductSortBy, default: ProductSortBy.NEWEST })
  @IsOptional()
  @IsEnum(ProductSortBy)
  sortBy?: ProductSortBy = ProductSortBy.NEWEST;
}
