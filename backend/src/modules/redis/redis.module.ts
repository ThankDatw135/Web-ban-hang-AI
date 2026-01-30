/**
 * RedisModule - Module Redis với CacheService
 *
 * Exports:
 * - REDIS_CLIENT: Raw Redis client (ioredis)
 * - CacheService: Wrapper với caching methods
 *
 * @author Fashion AI Team
 * @updated 30/01/2026 - Thêm CacheService
 */

import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";
import { CacheService } from "./cache.service";

export const REDIS_CLIENT = "REDIS_CLIENT";

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>("REDIS_HOST", "localhost");
        const port = configService.get<number>("REDIS_PORT", 6379);
        const password = configService.get<string>("REDIS_PASSWORD");

        return new Redis({
          host,
          port,
          password,
        });
      },
      inject: [ConfigService],
    },
    CacheService,
  ],
  exports: [REDIS_CLIENT, CacheService],
})
export class RedisModule {}
