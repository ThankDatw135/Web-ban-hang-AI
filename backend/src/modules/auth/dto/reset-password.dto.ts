import { IsString, MinLength, MaxLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
  @ApiProperty({ description: "Token reset từ email" })
  @IsString()
  token: string;

  @ApiProperty({ example: "NewStrongPass123!" })
  @IsString()
  @MinLength(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
  @MaxLength(32, { message: "Mật khẩu không được quá 32 ký tự" })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Mật khẩu phải chứa chữ hoa, chữ thường và số hoặc ký tự đặc biệt",
  })
  newPassword: string;
}
