/**
 * QueueService - Service quản lý message queue (RabbitMQ)
 * 
 * Tính năng:
 * - Tách riêng các queues theo chức năng
 * - Dead Letter Queue (DLQ) cho failed messages
 * - Retry với exponential backoff
 * - Logging chi tiết
 * 
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { ChannelWrapper, AmqpConnectionManager } from 'amqp-connection-manager';
import { Channel, ConsumeMessage } from 'amqplib';

// ========================================
// QUEUE CONSTANTS
// ========================================

/**
 * Các queue trong hệ thống
 */
export const QUEUES = {
  // AI Processing
  AI_TRYON: 'ai.tryon',           // Thử đồ ảo
  AI_SIZE: 'ai.size',             // Gợi ý kích thước
  AI_CHAT: 'ai.chat',             // Chat AI

  // Notifications
  NOTIFICATION_EMAIL: 'notifications.email',    // Gửi email
  NOTIFICATION_PUSH: 'notifications.push',      // Push notification

  // Analytics
  ANALYTICS_EVENTS: 'analytics.events',         // Event tracking

  // Dead Letter Queue
  DLQ: 'dlq.failed',              // Failed messages
} as const;

/**
 * Cấu hình retry cho từng loại queue
 */
const RETRY_CONFIG = {
  [QUEUES.AI_TRYON]: { maxRetries: 3, delays: [1000, 5000, 30000] },
  [QUEUES.AI_SIZE]: { maxRetries: 3, delays: [1000, 5000, 30000] },
  [QUEUES.AI_CHAT]: { maxRetries: 2, delays: [1000, 5000] },
  [QUEUES.NOTIFICATION_EMAIL]: { maxRetries: 5, delays: [1000, 5000, 15000, 60000, 300000] },
  [QUEUES.NOTIFICATION_PUSH]: { maxRetries: 3, delays: [1000, 5000, 30000] },
};

// ========================================
// QUEUE SERVICE
// ========================================

@Injectable()
export class QueueService implements OnModuleInit, OnModuleDestroy {
  private connection: AmqpConnectionManager | null = null;
  private channelWrapper: ChannelWrapper | null = null;

  constructor(private readonly configService: ConfigService) {}

  /**
   * Khởi tạo kết nối RabbitMQ khi module được load
   */
  async onModuleInit() {
    await this.connect();
  }

  /**
   * Đóng kết nối khi module bị destroy
   */
  async onModuleDestroy() {
    await this.disconnect();
  }

  /**
   * Kết nối tới RabbitMQ và setup các queues
   */
  private async connect() {
    try {
      const url = this.configService.get<string>('rabbitmq.url') || 'amqp://localhost:5672';

      this.connection = amqp.connect([url]);

      this.connection.on('connect', () => {
        console.log('✅ RabbitMQ connected');
      });

      this.connection.on('disconnect', ({ err }) => {
        console.error('❌ RabbitMQ disconnected:', err?.message);
      });

      // Tạo channel và setup queues
      this.channelWrapper = this.connection.createChannel({
        setup: async (channel: Channel) => {
          // Setup Dead Letter Exchange
          await channel.assertExchange('dlx', 'direct', { durable: true });
          await channel.assertQueue(QUEUES.DLQ, { durable: true });
          await channel.bindQueue(QUEUES.DLQ, 'dlx', 'failed');

          // Setup các queue chính với DLX
          const queueOptions = {
            durable: true,
            arguments: {
              'x-dead-letter-exchange': 'dlx',
              'x-dead-letter-routing-key': 'failed',
            },
          };

          // AI Queues
          await channel.assertQueue(QUEUES.AI_TRYON, queueOptions);
          await channel.assertQueue(QUEUES.AI_SIZE, queueOptions);
          await channel.assertQueue(QUEUES.AI_CHAT, queueOptions);

          // Notification Queues
          await channel.assertQueue(QUEUES.NOTIFICATION_EMAIL, queueOptions);
          await channel.assertQueue(QUEUES.NOTIFICATION_PUSH, queueOptions);

          // Analytics Queue (không cần DLQ, có thể mất)
          await channel.assertQueue(QUEUES.ANALYTICS_EVENTS, { durable: false });

          console.log('📦 All queues initialized with DLQ support');
        },
      });
    } catch (error: any) {
      console.error('❌ Failed to connect to RabbitMQ:', error.message);
    }
  }

  /**
   * Đóng kết nối
   */
  private async disconnect() {
    try {
      if (this.channelWrapper) {
        await this.channelWrapper.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      console.log('🔌 RabbitMQ connection closed');
    } catch (error: any) {
      console.error('Error closing RabbitMQ:', error.message);
    }
  }

  // ========================================
  // PUBLIC METHODS - Gửi message
  // ========================================

  /**
   * Gửi message tới queue
   * 
   * @param queue - Tên queue (sử dụng QUEUES constant)
   * @param message - Dữ liệu message
   * @param options - Tùy chọn thêm
   */
  async publish(
    queue: string,
    message: Record<string, any>,
    options?: { priority?: number; expiration?: number },
  ): Promise<boolean> {
    if (!this.channelWrapper) {
      console.error('❌ RabbitMQ channel not available');
      return false;
    }

    try {
      // Thêm metadata vào message
      const enrichedMessage = {
        ...message,
        _metadata: {
          publishedAt: new Date().toISOString(),
          retryCount: 0,
        },
      };

      await this.channelWrapper.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(enrichedMessage)),
        {
          persistent: true,
          priority: options?.priority,
          expiration: options?.expiration?.toString(),
        },
      );

      console.log(`📤 Published to ${queue}:`, message.jobId || 'no-jobId');
      return true;
    } catch (error: any) {
      console.error(`❌ Failed to publish to ${queue}:`, error.message);
      return false;
    }
  }

  /**
   * Gửi message AI try-on
   */
  async publishTryOn(message: {
    jobId: string;
    userId: string;
    userImageUrl: string;
    productImageUrl: string;
  }): Promise<boolean> {
    return this.publish(QUEUES.AI_TRYON, message);
  }

  /**
   * Gửi message AI size recommendation
   */
  async publishSizeRecommendation(message: {
    jobId: string;
    userId: string;
    productId: string;
    userMeasurements: any;
    sizeGuide: any;
  }): Promise<boolean> {
    return this.publish(QUEUES.AI_SIZE, message);
  }

  /**
   * Gửi message AI chat
   */
  async publishChat(message: {
    jobId: string;
    userId: string;
    sessionId: string;
    message: string;
    history: any[];
  }): Promise<boolean> {
    return this.publish(QUEUES.AI_CHAT, message);
  }

  /**
   * Gửi email notification
   */
  async publishEmailNotification(message: {
    to: string;
    subject: string;
    template: string;
    data: Record<string, any>;
  }): Promise<boolean> {
    return this.publish(QUEUES.NOTIFICATION_EMAIL, message);
  }

  /**
   * Gửi push notification
   */
  async publishPushNotification(message: {
    userId: string;
    title: string;
    body: string;
    data?: Record<string, any>;
  }): Promise<boolean> {
    return this.publish(QUEUES.NOTIFICATION_PUSH, message);
  }

  /**
   * Ghi log analytics event
   */
  async publishAnalyticsEvent(message: {
    event: string;
    userId?: string;
    properties?: Record<string, any>;
  }): Promise<boolean> {
    return this.publish(QUEUES.ANALYTICS_EVENTS, {
      ...message,
      timestamp: new Date().toISOString(),
    });
  }

  // ========================================
  // HELPER METHODS
  // ========================================

  /**
   * Kiểm tra kết nối RabbitMQ
   */
  isConnected(): boolean {
    return this.connection?.isConnected() || false;
  }

  /**
   * Lấy channel wrapper (cho consumer)
   */
  getChannelWrapper(): ChannelWrapper | null {
    return this.channelWrapper;
  }
}
