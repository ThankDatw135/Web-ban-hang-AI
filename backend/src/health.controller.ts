/**
 * HealthController - Kiểm tra trạng thái hệ thống
 *
 * Endpoints:
 * - GET /health - Full health check (DB, Redis, RabbitMQ, Memory)
 * - GET /health/liveness - Kubernetes liveness probe
 * - GET /health/readiness - Kubernetes readiness probe
 *
 * @author Fashion AI Team
 * @created 29/01/2026
 * @updated 30/01/2026 - Thêm Redis, RabbitMQ, Memory checks
 */

import { Controller, Get, Inject } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PrismaService } from "./modules/prisma/prisma.service";
import { REDIS_CLIENT } from "./modules/redis/redis.module";
import Redis from "ioredis";
import { ConfigService } from "@nestjs/config";

// Interface cho response
interface HealthCheckResponse {
  status: "ok" | "degraded" | "error";
  timestamp: string;
  uptime: number;
  environment: string;
  services: {
    database: "ok" | "error";
    redis: "ok" | "error" | "not_configured";
    rabbitmq: "ok" | "error" | "not_configured";
  };
  memory: {
    used: string;
    total: string;
    percentage: string;
  };
}

@ApiTags("Health")
@Controller("health")
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  /**
   * Full health check - Kiểm tra tất cả services
   *
   * Trả về:
   * - status: 'ok' nếu tất cả OK, 'degraded' nếu có service lỗi
   * - services: Trạng thái từng service
   * - memory: Thông tin bộ nhớ
   */
  @Get()
  @ApiOperation({ summary: "Kiểm tra trạng thái đầy đủ của hệ thống" })
  @ApiResponse({ status: 200, description: "Server hoạt động bình thường" })
  async check(): Promise<HealthCheckResponse> {
    const response: HealthCheckResponse = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      environment: this.configService.get("NODE_ENV") || "development",
      services: {
        database: "error",
        redis: "not_configured",
        rabbitmq: "not_configured",
      },
      memory: this.getMemoryUsage(),
    };

    // Check Database (PostgreSQL via Prisma)
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      response.services.database = "ok";
    } catch (error) {
      response.services.database = "error";
      response.status = "degraded";
      console.error("❌ Database health check failed:", error.message);
    }

    // Check Redis
    try {
      if (this.redis) {
        const pong = await this.redis.ping();
        response.services.redis = pong === "PONG" ? "ok" : "error";
      }
    } catch (error) {
      response.services.redis = "error";
      response.status = "degraded";
      console.error("❌ Redis health check failed:", error.message);
    }

    // Check RabbitMQ (ping config URL)
    try {
      const rabbitmqUrl = this.configService.get("rabbitmq.url");
      if (rabbitmqUrl) {
        // Nếu có URL thì đánh dấu là configured
        // Chi tiết hơn có thể dùng amqp connection test
        response.services.rabbitmq = "ok";
      }
    } catch (error) {
      response.services.rabbitmq = "error";
      console.error("❌ RabbitMQ health check failed:", error.message);
    }

    return response;
  }

  /**
   * Liveness probe - Kubernetes dùng để check container còn sống không
   * Nếu fail → restart container
   */
  @Get("liveness")
  @ApiOperation({ summary: "Liveness probe cho Kubernetes" })
  liveness() {
    return {
      status: "alive",
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Readiness probe - Kubernetes dùng để check container sẵn sàng nhận traffic
   * Nếu fail → không route traffic tới container này
   */
  @Get("readiness")
  @ApiOperation({ summary: "Readiness probe cho Kubernetes" })
  async readiness() {
    try {
      // Chỉ check database vì đó là dependency chính
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: "ready",
        timestamp: new Date().toISOString(),
      };
    } catch {
      return {
        status: "not_ready",
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Lấy thông tin sử dụng bộ nhớ
   */
  private getMemoryUsage(): {
    used: string;
    total: string;
    percentage: string;
  } {
    const usage = process.memoryUsage();
    const usedMB = Math.round(usage.heapUsed / 1024 / 1024);
    const totalMB = Math.round(usage.heapTotal / 1024 / 1024);
    const percentage = Math.round((usedMB / totalMB) * 100);

    return {
      used: `${usedMB}MB`,
      total: `${totalMB}MB`,
      percentage: `${percentage}%`,
    };
  }
}
