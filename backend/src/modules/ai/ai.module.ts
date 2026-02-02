import { Module } from "@nestjs/common";
import { AiController } from "./ai.controller";
import { AdminAiController } from "./ai.admin.controller";
import { AiService } from "./ai.service";

@Module({
  controllers: [AiController, AdminAiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
