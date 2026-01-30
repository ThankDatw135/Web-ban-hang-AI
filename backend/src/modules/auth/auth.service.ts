import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import Redis from 'ioredis';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private firebaseService: FirebaseService,
    @Inject('REDIS_CLIENT') private redis: Redis,
  ) {}

  async register(dto: RegisterDto) {
    // Check existing email
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        cart: { create: {} }, // Create empty cart
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user,
      ...tokens,
    };
  }

  async loginGoogle(idToken: string) {
    // Verify token with Firebase
    const decodedToken = await this.firebaseService.verifyToken(idToken);
    const { email, name, picture, uid } = decodedToken;

    if (!email) {
      throw new BadRequestException('Email không tồn tại trong Google Token');
    }

    // Check if user exists
    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Create new user
      // Split name into first/last
      const nameParts = (name || '').split(' ');
      const lastName = nameParts.pop() || '';
      const firstName = nameParts.join(' ') || 'User';

      // Generate random password
      const randomPassword = randomBytes(16).toString('hex');
      const hashedPassword = await bcrypt.hash(randomPassword, 12);

      user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          avatar: picture,
          isActive: true,
          role: 'USER',
          cart: { create: {} },
        },
      });
    } else if (!user.isActive) {
      throw new UnauthorizedException('Tài khoản đã bị khóa');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    // Remove password
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Tài khoản đã bị khóa');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      });

      // Check if token is blacklisted
      const isBlacklisted = await this.redis.get(`bl_${dto.refreshToken}`);
      if (isBlacklisted) {
        throw new UnauthorizedException('Token đã hết hạn');
      }

      // Verify user still exists and is active
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, email: true, role: true, isActive: true },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Tài khoản không tồn tại hoặc đã bị khóa');
      }

      // Blacklist old refresh token
      await this.redis.set(
        `bl_${dto.refreshToken}`,
        '1',
        'EX',
        7 * 24 * 60 * 60, // 7 days
      );

      // Generate new tokens
      return await this.generateTokens(user.id, user.email, user.role);
    } catch (error) {
      throw new UnauthorizedException('Token không hợp lệ');
    }
  }

  async logout(refreshToken: string) {
    // Blacklist refresh token
    await this.redis.set(
      `bl_${refreshToken}`,
      '1',
      'EX',
      7 * 24 * 60 * 60, // 7 days
    );

    return { message: 'Đăng xuất thành công' };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return { message: 'Nếu email tồn tại, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu' };
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 10);

    // Store in Redis with 1 hour expiry
    await this.redis.set(`reset_${user.id}`, hashedToken, 'EX', 3600);

    // TODO: Send email with reset link
    // For now, just log the token
    console.log(`Reset token for ${user.email}: ${resetToken}`);

    return { message: 'Nếu email tồn tại, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    // Decode token to get user ID (token format: userId.randomToken)
    const [userId, token] = dto.token.split('.');
    if (!userId || !token) {
      throw new BadRequestException('Token không hợp lệ');
    }

    // Get stored hash from Redis
    const storedHash = await this.redis.get(`reset_${userId}`);
    if (!storedHash) {
      throw new BadRequestException('Token đã hết hạn');
    }

    // Verify token
    const isValid = await bcrypt.compare(token, storedHash);
    if (!isValid) {
      throw new BadRequestException('Token không hợp lệ');
    }

    // Update password
    const hashedPassword = await bcrypt.hash(dto.newPassword, 12);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Delete reset token
    await this.redis.del(`reset_${userId}`);

    return { message: 'Đặt lại mật khẩu thành công' };
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.secret'),
        expiresIn: this.configService.get<string>('jwt.expiresIn'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
      expiresIn: this.configService.get<string>('jwt.expiresIn'),
    };
  }
}
