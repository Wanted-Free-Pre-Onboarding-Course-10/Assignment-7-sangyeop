import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TireRepository } from '../tire/tire.repository';
import { UserRepository } from '../user/user.repository';
import { TrimController } from './trim.controller';
import { TrimRepository } from './trim.repository';
import { TrimService } from './trim.service';

@Module({
  imports:[TypeOrmModule.forFeature([TrimRepository,TireRepository,UserRepository])],
  controllers: [TrimController],
  providers: [TrimService]
})
export class TrimModule {}
