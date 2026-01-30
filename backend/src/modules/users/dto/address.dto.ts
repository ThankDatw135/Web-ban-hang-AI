import {
  IsString,
  IsOptional,
  IsBoolean,
  MinLength,
  MaxLength,
  Matches,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAddressDto {
  @ApiProperty({ example: "Nguyễn Văn A" })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName: string;

  @ApiProperty({ example: "0901234567" })
  @IsString()
  @Matches(/^(0|\+84)[0-9]{9,10}$/, { message: "Số điện thoại không hợp lệ" })
  phone: string;

  @ApiProperty({ example: "123 Nguyễn Huệ" })
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  street: string;

  @ApiPropertyOptional({ example: "Phường Bến Nghé" })
  @IsOptional()
  @IsString()
  ward?: string;

  @ApiProperty({ example: "Quận 1" })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  district: string;

  @ApiProperty({ example: "TP. Hồ Chí Minh" })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @ApiProperty({ example: "Hồ Chí Minh" })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  province: string;

  @ApiPropertyOptional({ example: "700000" })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class UpdateAddressDto extends CreateAddressDto {}
