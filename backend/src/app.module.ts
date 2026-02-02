import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import {
  appConfig,
  databaseConfig,
  jwtConfig,
  redisConfig,
  storageConfig,
  rabbitmqConfig,
} from "./config";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { RedisModule } from "./modules/redis/redis.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ProductsModule } from "./modules/products/products.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { CartModule } from "./modules/cart/cart.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { AiModule } from "./modules/ai/ai.module";
import { ReviewsModule } from "./modules/reviews/reviews.module";
import { EventsModule } from "./modules/events/events.module";
import { HealthController } from "./health.controller";
import { LoggerModule } from "./common/logger";
import { CouponsModule } from "./modules/coupons/coupons.module";
import { WishlistModule } from "./modules/wishlist/wishlist.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { TicketsModule } from "./modules/tickets/tickets.module";
import { CampaignsModule } from "./modules/campaigns/campaigns.module";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
      load: [
        appConfig,
        databaseConfig,
        jwtConfig,
        redisConfig,
        storageConfig,
        rabbitmqConfig,
      ],
    }),

    // Rate Limiting
    ThrottlerModule.forRoot([
      {
        name: "short",
        ttl: 1000,
        limit: 10,
      },
      {
        name: "medium",
        ttl: 10000,
        limit: 50,
      },
      {
        name: "long",
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Core Modules
    PrismaModule,
    RedisModule,
    LoggerModule,

    // Feature Modules
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    AiModule,
    ReviewsModule,
    EventsModule,
    CouponsModule,
    WishlistModule,
    AnalyticsModule,
    TicketsModule,
    CampaignsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
