import { Body, Controller, Post, Req } from '@nestjs/common';
import { TrimDto } from './dto/trim.dto';
import { TrimService } from './trim.service';

@Controller('trim')
export class TrimController {
  constructor(private trimService:TrimService){}
  @Post('')
  async createTrim(
  @Body() trimDto:TrimDto
  ): Promise<string>{
    return await this.trimService.createTrim(trimDto);
  }
}
