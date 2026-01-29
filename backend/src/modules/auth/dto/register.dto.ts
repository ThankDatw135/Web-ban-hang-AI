import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @ApiProperty({ example: 'Nguyễn' })
  @IsString()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ example: 'Văn A' })
  @IsString()
  @MaxLength(50)
  lastName: string;

  @ApiPropertyOptional({ example: '0901234567' })
  @IsOptional()
  @Matches(/^0[0-9]{9}$/, { message: 'Invalid Vietnamese phone number' })
  phone?: string;
}
