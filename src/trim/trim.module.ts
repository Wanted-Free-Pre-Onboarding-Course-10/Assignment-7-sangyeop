import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrimController } from './trim.controller';
import { TrimRepository } from './trim.repository';
import { TrimService } from './trim.service';

@Module({
  imports:[TypeOrmModule.forFeature([TrimRepository])],
  controllers: [TrimController],
  providers: [TrimService]
})
export class TrimModule {}
