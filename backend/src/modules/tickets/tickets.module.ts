import { Module } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { AdminTicketsController } from "./tickets.admin.controller";

@Module({
  controllers: [AdminTicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
