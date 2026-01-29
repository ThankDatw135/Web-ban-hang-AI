import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { InitiatePaymentDto } from './dto';
import { PaymentMethod, PaymentStatus, OrderStatus } from '@prisma/client';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async initiatePayment(userId: string, dto: InitiatePaymentDto) {
    const order = await this.prisma.order.findFirst({
      where: { id: dto.orderId, userId },
    });

    if (!order) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (order.paymentStatus === PaymentStatus.COMPLETED) {
      throw new BadRequestException('Đơn hàng đã được thanh toán');
    }

    // Create payment record
    const payment = await this.prisma.payment.create({
      data: {
        orderId: order.id,
        method: dto.method,
        amount: order.total,
        referenceCode: this.generateReferenceCode(),
      },
    });

    switch (dto.method) {
      case PaymentMethod.COD:
        return this.handleCOD(order.id, payment.id);

      case PaymentMethod.BANK:
        return this.handleBankTransfer(payment);

      case PaymentMethod.MOMO:
        return this.handleMoMo(order, payment, dto.returnUrl);

      case PaymentMethod.ZALOPAY:
        return this.handleZaloPay(order, payment, dto.returnUrl);

      default:
        throw new BadRequestException('Phương thức thanh toán không hỗ trợ');
    }
  }

  // COD: Just confirm order
  private async handleCOD(orderId: string, paymentId: string) {
    await this.prisma.$transaction([
      this.prisma.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.CONFIRMED },
      }),
      this.prisma.payment.update({
        where: { id: paymentId },
        data: { status: PaymentStatus.PENDING },
      }),
    ]);

    return {
      method: 'COD',
      message: 'Đơn hàng đã được xác nhận. Thanh toán khi nhận hàng.',
    };
  }

  // Bank Transfer: Return bank info
  private async handleBankTransfer(payment: any) {
    return {
      method: 'BANK',
      bankInfo: {
        bankName: 'Vietcombank',
        accountNumber: '1234567890',
        accountHolder: 'CONG TY FASHION AI',
        branch: 'Chi nhánh TP.HCM',
      },
      amount: Number(payment.amount),
      referenceCode: payment.referenceCode,
      message: `Nội dung chuyển khoản: ${payment.referenceCode}`,
      note: 'Vui lòng chuyển khoản đúng số tiền và nội dung để đơn hàng được xử lý nhanh chóng.',
    };
  }

  // MoMo: Generate payment URL
  private async handleMoMo(order: any, payment: any, returnUrl?: string) {
    const partnerCode = this.configService.get('MOMO_PARTNER_CODE');
    const accessKey = this.configService.get('MOMO_ACCESS_KEY');
    const secretKey = this.configService.get('MOMO_SECRET_KEY');

    if (!partnerCode || !accessKey || !secretKey) {
      throw new BadRequestException('MoMo chưa được cấu hình');
    }

    const requestId = `${Date.now()}_${payment.id}`;
    const orderId = payment.referenceCode;
    const amount = Number(payment.amount);
    const orderInfo = `Thanh toan don hang ${order.orderNumber}`;
    const redirectUrl = returnUrl || `${this.configService.get('APP_URL')}/payment/result`;
    const ipnUrl = `${this.configService.get('APP_URL')}/api/payments/momo/webhook`;
    const requestType = 'captureWallet';
    const extraData = '';

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    // In production, call MoMo API
    // For now, return mock response
    return {
      method: 'MOMO',
      payUrl: `https://test-payment.momo.vn/v2/gateway/pay?t=${requestId}`,
      orderId,
      requestId,
      message: 'Vui lòng thanh toán qua MoMo',
      // In production: actual payUrl from MoMo response
    };
  }

  // ZaloPay: Generate payment URL
  private async handleZaloPay(order: any, payment: any, returnUrl?: string) {
    const appId = this.configService.get('ZALOPAY_APP_ID');
    const key1 = this.configService.get('ZALOPAY_KEY1');

    if (!appId || !key1) {
      throw new BadRequestException('ZaloPay chưa được cấu hình');
    }

    const appTransId = `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}_${payment.id}`;
    const amount = Number(payment.amount);

    // In production, call ZaloPay API
    return {
      method: 'ZALOPAY',
      orderUrl: `https://sandbox.zalopay.vn/v001/gateway?t=${appTransId}`,
      appTransId,
      message: 'Vui lòng thanh toán qua ZaloPay',
    };
  }

  // Webhook handlers
  async handleMoMoWebhook(body: any) {
    const { orderId, resultCode, message } = body;

    const payment = await this.prisma.payment.findFirst({
      where: { referenceCode: orderId },
    });

    if (!payment) {
      return { returnCode: 1, returnMessage: 'Payment not found' };
    }

    if (resultCode === 0) {
      // Success
      await this.prisma.$transaction([
        this.prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: PaymentStatus.COMPLETED,
            completedAt: new Date(),
            gatewayResponse: body,
          },
        }),
        this.prisma.order.update({
          where: { id: payment.orderId },
          data: {
            paymentStatus: PaymentStatus.COMPLETED,
            status: OrderStatus.CONFIRMED,
            paidAt: new Date(),
          },
        }),
      ]);
    } else {
      // Failed
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.FAILED,
          gatewayResponse: body,
        },
      });
    }

    return { returnCode: 0, returnMessage: 'Success' };
  }

  async handleZaloPayWebhook(body: any) {
    const { data, mac } = body;

    // Verify MAC
    const key2 = this.configService.get('ZALOPAY_KEY2');
    const computedMac = crypto
      .createHmac('sha256', key2)
      .update(data)
      .digest('hex');

    if (mac !== computedMac) {
      return { returnCode: -1, returnMessage: 'MAC verification failed' };
    }

    const dataJson = JSON.parse(data);
    const appTransId = dataJson.apptransid;

    const payment = await this.prisma.payment.findFirst({
      where: { referenceCode: { contains: appTransId } },
    });

    if (!payment) {
      return { returnCode: 2, returnMessage: 'Payment not found' };
    }

    await this.prisma.$transaction([
      this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.COMPLETED,
          completedAt: new Date(),
          gatewayResponse: dataJson,
        },
      }),
      this.prisma.order.update({
        where: { id: payment.orderId },
        data: {
          paymentStatus: PaymentStatus.COMPLETED,
          status: OrderStatus.CONFIRMED,
          paidAt: new Date(),
        },
      }),
    ]);

    return { returnCode: 1, returnMessage: 'Success' };
  }

  // Verify bank transfer
  async verifyBankTransfer(referenceCode: string) {
    const payment = await this.prisma.payment.findFirst({
      where: { referenceCode, method: PaymentMethod.BANK },
    });

    if (!payment) {
      throw new NotFoundException('Thanh toán không tồn tại');
    }

    await this.prisma.$transaction([
      this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.COMPLETED,
          completedAt: new Date(),
        },
      }),
      this.prisma.order.update({
        where: { id: payment.orderId },
        data: {
          paymentStatus: PaymentStatus.COMPLETED,
          status: OrderStatus.CONFIRMED,
          paidAt: new Date(),
        },
      }),
    ]);

    return { message: 'Xác nhận thanh toán thành công' };
  }

  private generateReferenceCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'FA';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
