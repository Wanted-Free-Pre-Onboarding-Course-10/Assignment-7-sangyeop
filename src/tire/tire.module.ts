import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrimRepository } from 'src/trim/trim.repository';
import { UserRepository } from 'src/user/user.repository';
import { TireController } from './tire.controller';
import { TireRepository } from './tire.repository';
import { TireService } from './tire.service';

@Module({
  imports:[TypeOrmModule.forFeature([TireRepository,UserRepository,TrimRepository])],
  controllers: [TireController],
  providers: [TireService]
})
export class TireModule {}
