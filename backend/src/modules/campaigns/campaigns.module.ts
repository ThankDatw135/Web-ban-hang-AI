import { Module } from "@nestjs/common";
import { CampaignsService } from "./campaigns.service";
import { AdminCampaignsController } from "./campaigns.admin.controller";

@Module({
  controllers: [AdminCampaignsController],
  providers: [CampaignsService],
  exports: [CampaignsService],
})
export class CampaignsModule {}
