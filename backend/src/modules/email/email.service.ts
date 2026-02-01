import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>("MAIL_HOST"),
      port: this.configService.get<number>("MAIL_PORT"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>("MAIL_USERNAME"),
        pass: this.configService.get<string>("MAIL_PASSWORD"),
      },
    });
  }

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const mailFrom = this.configService.get<string>("MAIL_FROM");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f5f0; margin: 0; padding: 20px; }
          .container { max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
          .header { background: linear-gradient(135deg, #c9a86c, #b08d5b); padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
          .content { padding: 40px 30px; text-align: center; }
          .otp-box { background: linear-gradient(135deg, #f8f5f0, #ede8dd); border-radius: 12px; padding: 25px; margin: 25px 0; }
          .otp-code { font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #1a1a1a; font-family: 'Courier New', monospace; }
          .message { color: #666666; font-size: 15px; line-height: 1.6; margin-bottom: 20px; }
          .warning { background: #fff8e6; border-left: 4px solid #c9a86c; padding: 12px 15px; text-align: left; margin: 20px 0; font-size: 13px; color: #666; }
          .footer { background: #f8f5f0; padding: 20px 30px; text-align: center; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>👗 Fashion AI</h1>
          </div>
          <div class="content">
            <p class="message">Xin chào,</p>
            <p class="message">Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản Fashion AI. Vui lòng sử dụng mã OTP dưới đây:</p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            <div class="warning">
              ⏱️ Mã OTP có hiệu lực trong <strong>5 phút</strong>.<br>
              🔒 Không chia sẻ mã này với bất kỳ ai.
            </div>
            <p class="message">Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
          </div>
          <div class="footer">
            © 2024 Fashion AI. All rights reserved.<br>
            Đây là email tự động, vui lòng không trả lời.
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await this.transporter.sendMail({
        from: mailFrom,
        to,
        subject: "🔐 [Fashion AI] Mã xác thực OTP của bạn",
        html: htmlContent,
      });

      this.logger.log(`OTP email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send OTP email to ${to}:`, error);
      throw error;
    }
  }

  async sendPasswordResetSuccessEmail(to: string): Promise<void> {
    const mailFrom = this.configService.get<string>("MAIL_FROM");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f5f0; margin: 0; padding: 20px; }
          .container { max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
          .header { background: linear-gradient(135deg, #4CAF50, #45a049); padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
          .content { padding: 40px 30px; text-align: center; }
          .success-icon { font-size: 60px; margin-bottom: 20px; }
          .message { color: #666666; font-size: 15px; line-height: 1.6; margin-bottom: 20px; }
          .footer { background: #f8f5f0; padding: 20px 30px; text-align: center; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>👗 Fashion AI</h1>
          </div>
          <div class="content">
            <div class="success-icon">✅</div>
            <p class="message"><strong>Mật khẩu của bạn đã được thay đổi thành công!</strong></p>
            <p class="message">Bạn có thể đăng nhập vào tài khoản Fashion AI với mật khẩu mới.</p>
            <p class="message">Nếu bạn không thực hiện thay đổi này, vui lòng liên hệ với chúng tôi ngay lập tức.</p>
          </div>
          <div class="footer">
            © 2024 Fashion AI. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await this.transporter.sendMail({
        from: mailFrom,
        to,
        subject: "✅ [Fashion AI] Đổi mật khẩu thành công",
        html: htmlContent,
      });

      this.logger.log(`Password reset success email sent to ${to}`);
    } catch (error) {
      this.logger.error(
        `Failed to send password reset success email to ${to}:`,
        error,
      );
      // Don't throw - this is not critical
    }
  }
}
