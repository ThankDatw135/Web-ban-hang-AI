import { IsString, IsInt, Min, Max, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ description: 'ID sản phẩm' })
  @IsString()
  productId: string;

  @ApiProperty({ description: 'Đánh giá từ 1-5 sao', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ description: 'Tiêu đề đánh giá' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @ApiPropertyOptional({ description: 'Nội dung đánh giá' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  content?: string;
}
