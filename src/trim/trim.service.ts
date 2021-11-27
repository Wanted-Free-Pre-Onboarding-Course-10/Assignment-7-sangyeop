import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrimDto } from './dto/trim.dto';
import { TrimRepository } from './trim.repository';

@Injectable()
export class TrimService {
  constructor(
    @InjectRepository(TrimRepository)
    private trimRepository:TrimRepository
  ) { }
  
  async createTrim(trimDto: TrimDto): Promise<string>{
    return await this.trimRepository.createTrim(trimDto);
  }
}
