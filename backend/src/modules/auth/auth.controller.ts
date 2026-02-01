import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  GoogleLoginDto,
  VerifyOtpDto,
} from "./dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Đăng ký tài khoản mới" })
  @ApiResponse({ status: 201, description: "Đăng ký thành công" })
  @ApiResponse({ status: 409, description: "Email đã được sử dụng" })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Đăng nhập" })
  @ApiResponse({ status: 200, description: "Đăng nhập thành công" })
  @ApiResponse({ status: 401, description: "Email hoặc mật khẩu không đúng" })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("login/google")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Đăng nhập bằng Google" })
  @ApiResponse({ status: 200, description: "Đăng nhập thành công" })
  @ApiResponse({ status: 400, description: "Token không hợp lệ" })
  googleLogin(@Body() dto: GoogleLoginDto) {
    return this.authService.loginGoogle(dto.token);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Làm mới access token" })
  @ApiResponse({ status: 200, description: "Token mới" })
  @ApiResponse({ status: 401, description: "Refresh token không hợp lệ" })
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Đăng xuất" })
  @ApiResponse({ status: 200, description: "Đăng xuất thành công" })
  logout(@Body() dto: RefreshTokenDto) {
    return this.authService.logout(dto.refreshToken);
  }

  @Post("forgot-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Yêu cầu mã OTP đặt lại mật khẩu" })
  @ApiResponse({
    status: 200,
    description: "Mã OTP đã được gửi (nếu email tồn tại)",
  })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post("verify-otp")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Xác thực mã OTP" })
  @ApiResponse({ status: 200, description: "Xác thực thành công, trả về token reset" })
  @ApiResponse({ status: 400, description: "Mã OTP không đúng hoặc hết hạn" })
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto.email, dto.otp);
  }

  @Post("reset-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Đặt lại mật khẩu với token" })
  @ApiResponse({ status: 200, description: "Đặt lại mật khẩu thành công" })
  @ApiResponse({ status: 400, description: "Token không hợp lệ hoặc hết hạn" })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
