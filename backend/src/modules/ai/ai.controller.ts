import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AiService } from './ai.service';

@ApiTags('AI')
@Controller('ai')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  // TODO: Implement AI endpoints
}
