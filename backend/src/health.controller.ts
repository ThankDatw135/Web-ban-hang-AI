import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from './modules/prisma/prisma.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Kiểm tra trạng thái server' })
  @ApiResponse({ status: 200, description: 'Server hoạt động bình thường' })
  async check() {
    const checks = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        database: 'unknown',
      },
    };

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      checks.services.database = 'ok';
    } catch {
      checks.services.database = 'error';
      checks.status = 'degraded';
    }

    return checks;
  }

  @Get('liveness')
  @ApiOperation({ summary: 'Liveness probe cho Kubernetes' })
  liveness() {
    return { status: 'alive' };
  }

  @Get('readiness')
  @ApiOperation({ summary: 'Readiness probe cho Kubernetes' })
  async readiness() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ready' };
    } catch {
      return { status: 'not ready' };
    }
  }
}
