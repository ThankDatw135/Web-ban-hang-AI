import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { PaymentsService } from "./payments.service";
import { InitiatePaymentDto } from "./dto";
import { CurrentUser, AuthAdmin } from "@/common/decorators";

@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Khởi tạo thanh toán" })
  @ApiResponse({ status: 201, description: "Thông tin thanh toán" })
  initiatePayment(
    @CurrentUser("id") userId: string,
    @Body() dto: InitiatePaymentDto,
  ) {
    return this.paymentsService.initiatePayment(userId, dto);
  }

  @Post("momo/webhook")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "MoMo IPN Webhook" })
  handleMoMoWebhook(@Body() body: any) {
    return this.paymentsService.handleMoMoWebhook(body);
  }

  @Post("zalopay/webhook")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "ZaloPay Callback Webhook" })
  handleZaloPayWebhook(@Body() body: any) {
    return this.paymentsService.handleZaloPayWebhook(body);
  }

  @Post("bank/verify/:referenceCode")
  @AuthAdmin()
  @ApiOperation({ summary: "[Admin] Xác nhận chuyển khoản ngân hàng" })
  verifyBankTransfer(@Param("referenceCode") referenceCode: string) {
    return this.paymentsService.verifyBankTransfer(referenceCode);
  }
}
