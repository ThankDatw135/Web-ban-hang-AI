/**
 * LoggerModule - Module cung cấp LoggerService
 *
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import { Global, Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
