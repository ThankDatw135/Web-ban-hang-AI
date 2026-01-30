import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail({}, { message: "Email không hợp lệ" })
  email: string;

  @ApiProperty({ example: "StrongPass123!" })
  @IsString()
  @MinLength(1, { message: "Mật khẩu không được để trống" })
  password: string;
}
