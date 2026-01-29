import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VirtualTryOnDto {
  @ApiProperty({ description: 'ID sản phẩm cần thử' })
  @IsString()
  productId: string;

  @ApiProperty({ description: 'URL ảnh người dùng (base64 hoặc URL)' })
  @IsString()
  userImageUrl: string;
}

export class SizeRecommendationDto {
  @ApiProperty({ description: 'ID sản phẩm' })
  @IsString()
  productId: string;
}

export class AIChatDto {
  @ApiProperty({ description: 'Nội dung tin nhắn' })
  @IsString()
  message: string;

  @ApiPropertyOptional({ description: 'ID phiên chat (nếu tiếp tục chat)' })
  @IsOptional()
  @IsString()
  sessionId?: string;
}
