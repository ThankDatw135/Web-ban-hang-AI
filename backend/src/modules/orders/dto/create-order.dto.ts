import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';

export class CreateOrderDto {
  @ApiProperty({ description: 'ID địa chỉ giao hàng' })
  @IsString()
  addressId: string;

  @ApiProperty({ enum: PaymentMethod, example: 'COD' })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiPropertyOptional({ description: 'Ghi chú đơn hàng' })
  @IsOptional()
  @IsString()
  note?: string;
}
