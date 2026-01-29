import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AiService } from './ai.service';
import { VirtualTryOnDto, SizeRecommendationDto, AIChatDto } from './dto';
import { CurrentUser } from '@/common/decorators';

@ApiTags('AI')
@Controller('ai')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('tryon')
  @ApiOperation({ summary: 'Yêu cầu thử đồ ảo' })
  @ApiResponse({ status: 201, description: 'Job đã được tạo' })
  requestVirtualTryOn(
    @CurrentUser('id') userId: string,
    @Body() dto: VirtualTryOnDto,
  ) {
    return this.aiService.requestVirtualTryOn(userId, dto);
  }

  @Post('size')
  @ApiOperation({ summary: 'Yêu cầu gợi ý kích thước' })
  @ApiResponse({ status: 201, description: 'Job đã được tạo' })
  requestSizeRecommendation(
    @CurrentUser('id') userId: string,
    @Body() dto: SizeRecommendationDto,
  ) {
    return this.aiService.requestSizeRecommendation(userId, dto);
  }

  @Post('chat')
  @ApiOperation({ summary: 'Gửi tin nhắn chat với AI' })
  @ApiResponse({ status: 201, description: 'Tin nhắn đã được gửi' })
  chat(@CurrentUser('id') userId: string, @Body() dto: AIChatDto) {
    return this.aiService.chat(userId, dto);
  }

  @Get('jobs/:jobId')
  @ApiOperation({ summary: 'Lấy trạng thái job AI' })
  @ApiResponse({ status: 200, description: 'Trạng thái job' })
  getJobStatus(
    @CurrentUser('id') userId: string,
    @Param('jobId') jobId: string,
  ) {
    return this.aiService.getJobStatus(userId, jobId);
  }

  @Get('chat/:sessionId')
  @ApiOperation({ summary: 'Lấy lịch sử chat' })
  getChatHistory(
    @CurrentUser('id') userId: string,
    @Param('sessionId') sessionId: string,
  ) {
    return this.aiService.getChatHistory(userId, sessionId);
  }

  @Get('chat/sessions')
  @ApiOperation({ summary: 'Lấy danh sách phiên chat' })
  getChatSessions(@CurrentUser('id') userId: string) {
    return this.aiService.getChatSessions(userId);
  }
}
