import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';

export class InitiatePaymentDto {
  @ApiProperty({ description: 'ID đơn hàng' })
  @IsString()
  orderId: string;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiPropertyOptional({ description: 'URL callback sau khi thanh toán' })
  @IsOptional()
  @IsString()
  returnUrl?: string;
}
