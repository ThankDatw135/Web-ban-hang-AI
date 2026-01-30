/**
 * DTOs cho Coupons Module
 * 
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDate,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CouponType } from '@prisma/client';

/**
 * DTO tạo mã giảm giá mới
 */
export class CreateCouponDto {
  @ApiProperty({ example: 'SALE10', description: 'Mã coupon (unique)' })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  code: string;

  @ApiProperty({ example: 'Giảm 10%', description: 'Tên hiển thị' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ description: 'Mô tả chi tiết' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: CouponType, example: 'PERCENTAGE' })
  @IsEnum(CouponType)
  type: CouponType;

  @ApiProperty({ example: 10, description: 'Giá trị giảm (% hoặc số tiền)' })
  @IsNumber()
  @Min(0)
  value: number;

  @ApiPropertyOptional({ example: 100000, description: 'Giá trị đơn hàng tối thiểu' })
  @IsNumber()
  @IsOptional()
  @Min(0)
  minOrderValue?: number;

  @ApiPropertyOptional({ example: 50000, description: 'Số tiền giảm tối đa' })
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxDiscount?: number;

  @ApiPropertyOptional({ example: 100, description: 'Tổng số lần dùng tối đa' })
  @IsNumber()
  @IsOptional()
  @Min(1)
  usageLimit?: number;

  @ApiPropertyOptional({ example: 1, description: 'Số lần dùng / user' })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(10)
  usagePerUser?: number;

  @ApiProperty({ example: '2026-01-01T00:00:00Z', description: 'Ngày bắt đầu' })
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty({ example: '2026-12-31T23:59:59Z', description: 'Ngày kết thúc' })
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @ApiPropertyOptional({ example: true, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

/**
 * DTO cập nhật mã giảm giá
 */
export class UpdateCouponDto extends PartialType(CreateCouponDto) {}

/**
 * DTO validate mã giảm giá
 */
export class ValidateCouponDto {
  @ApiProperty({ example: 'SALE10', description: 'Mã coupon cần validate' })
  @IsString()
  @MinLength(3)
  code: string;

  @ApiProperty({ example: 500000, description: 'Tổng giá trị đơn hàng' })
  @IsNumber()
  @Min(0)
  orderTotal: number;

  @ApiPropertyOptional({ example: 30000, description: 'Phí vận chuyển' })
  @IsNumber()
  @IsOptional()
  @Min(0)
  shippingFee?: number;
}

/**
 * DTO filter danh sách coupons
 */
export class CouponFilterDto {
  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 20 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit?: number;
}
