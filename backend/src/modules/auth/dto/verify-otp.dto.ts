import { IsString, IsEmail, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyOtpDto {
  @ApiProperty({ description: "Email đã đăng ký" })
  @IsEmail({}, { message: "Email không hợp lệ" })
  email: string;

  @ApiProperty({ description: "Mã OTP 6 số", example: "123456" })
  @IsString()
  @Length(6, 6, { message: "Mã OTP phải có đúng 6 ký tự" })
  otp: string;
}
