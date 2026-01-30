/**
 * QueueModule - Module quản lý message queue
 *
 * Exports:
 * - QueueService: Service gửi message tới RabbitMQ
 * - QUEUES: Constants các queue names
 *
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import { Global, Module } from "@nestjs/common";
import { QueueService, QUEUES } from "./queue.service";

export { QUEUES };

@Global()
@Module({
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
