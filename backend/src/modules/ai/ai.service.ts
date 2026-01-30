import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { VirtualTryOnDto, SizeRecommendationDto, AIChatDto } from './dto';
import { AIJobType, AIJobStatus } from '@prisma/client';
import amqp, { Channel, ChannelWrapper } from 'amqp-connection-manager';

@Injectable()
export class AiService {
  private channelWrapper: ChannelWrapper | null = null;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.initRabbitMQ();
  }

  private async initRabbitMQ() {
    try {
      const url = this.configService.get('rabbitmq.url');
      const connection = amqp.connect([url]);
      
      this.channelWrapper = connection.createChannel({
        setup: async (channel: Channel) => {
          await channel.assertQueue('ai.tryon', { durable: true });
          await channel.assertQueue('ai.size', { durable: true });
          await channel.assertQueue('ai.chat', { durable: true });
        },
      });

      console.log('✅ RabbitMQ connected');
    } catch (error: any) {
      console.error('❌ RabbitMQ connection failed:', error.message);
    }
  }

  async requestVirtualTryOn(userId: string, dto: VirtualTryOnDto) {
    // Verify product exists
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
      include: { images: { where: { isMain: true }, take: 1 } },
    });

    if (!product) {
      throw new NotFoundException('Sản phẩm không tồn tại');
    }

    // Create AI job
    const job = await this.prisma.aIJob.create({
      data: {
        userId,
        type: AIJobType.VIRTUAL_TRYON,
        status: AIJobStatus.PENDING,
        productId: dto.productId,
        inputData: {
          userImageUrl: dto.userImageUrl,
          productImageUrl: product.images[0]?.url,
          productName: product.name,
        },
      },
    });

    // Publish to RabbitMQ
    await this.publishToQueue('ai.tryon', {
      jobId: job.id,
      userId,
      ...dto,
      productImageUrl: product.images[0]?.url,
    });

    return {
      jobId: job.id,
      status: job.status,
      message: 'Yêu cầu thử đồ ảo đã được gửi. Vui lòng chờ kết quả.',
    };
  }

  async requestSizeRecommendation(userId: string, dto: SizeRecommendationDto) {
    // Get user measurements
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { height: true, weight: true, chest: true, waist: true, hips: true },
    });

    // Get product size guide
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
      select: { id: true, name: true, sizeGuide: true },
    });

    if (!product) {
      throw new NotFoundException('Sản phẩm không tồn tại');
    }

    // Create AI job
    const job = await this.prisma.aIJob.create({
      data: {
        userId,
        type: AIJobType.SIZE_RECOMMEND,
        status: AIJobStatus.PENDING,
        productId: dto.productId,
        inputData: {
          userMeasurements: user,
          productSizeGuide: product.sizeGuide,
          productName: product.name,
        },
      },
    });

    // Publish to RabbitMQ
    await this.publishToQueue('ai.size', {
      jobId: job.id,
      userId,
      productId: dto.productId,
      userMeasurements: user,
      sizeGuide: product.sizeGuide,
    });

    return {
      jobId: job.id,
      status: job.status,
      message: 'Đang phân tích kích thước phù hợp...',
    };
  }

  async chat(userId: string, dto: AIChatDto) {
    // Get or create chat session
    let session: any = null;
    let messages: any[] = [];
    
    if (dto.sessionId) {
      session = await this.prisma.chatSession.findFirst({
        where: { id: dto.sessionId, userId },
        include: { messages: { orderBy: { createdAt: 'asc' }, take: 20 } },
      });
      if (session) {
        messages = session.messages || [];
      }
    }

    if (!session) {
      session = await this.prisma.chatSession.create({
        data: {
          userId,
          title: dto.message.substring(0, 50),
        },
      });
    }

    // Save user message
    await this.prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'USER',
        content: dto.message,
      },
    });

    // Create AI job for chat
    const job = await this.prisma.aIJob.create({
      data: {
        userId,
        type: AIJobType.CHAT_SUPPORT,
        status: AIJobStatus.PENDING,
        inputData: {
          sessionId: session.id,
          message: dto.message,
          history: messages.map((m: any) => ({
            role: m.role,
            content: m.content,
          })),
        },
      },
    });

    // Publish to RabbitMQ
    await this.publishToQueue('ai.chat', {
      jobId: job.id,
      userId,
      sessionId: session.id,
      message: dto.message,
      history: messages,
    });

    return {
      jobId: job.id,
      sessionId: session.id,
      status: job.status,
      message: 'Đang xử lý...',
    };
  }

  async getJobStatus(userId: string, jobId: string) {
    const job = await this.prisma.aIJob.findFirst({
      where: { id: jobId, userId },
      select: {
        id: true,
        type: true,
        status: true,
        resultData: true,
        resultUrl: true,
        errorMessage: true,
        createdAt: true,
        completedAt: true,
      },
    });

    if (!job) {
      throw new NotFoundException('Không tìm thấy yêu cầu');
    }

    return job;
  }

  async getChatHistory(userId: string, sessionId: string) {
    const session = await this.prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!session) {
      throw new NotFoundException('Phiên chat không tồn tại');
    }

    return session;
  }

  async getChatSessions(userId: string) {
    return this.prisma.chatSession.findMany({
      where: { userId, isActive: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { messages: true } },
      },
    });
  }

  private async publishToQueue(queue: string, message: any) {
    if (!this.channelWrapper) {
      console.error('RabbitMQ channel not available');
      return;
    }

    await this.channelWrapper.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message)),
      { persistent: true },
    );
  }
}

