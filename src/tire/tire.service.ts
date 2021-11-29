import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trim } from 'src/trim/trim.entity';
import { TrimRepository } from 'src/trim/trim.repository';
import { UserRepository } from 'src/user/user.repository';
import { In } from 'typeorm';
import { Tire } from './tire.entity';
import { TireRepository } from './tire.repository';

@Injectable()
export class TireService {
  constructor(
    @InjectRepository(TireRepository)
    private tireRepository: TireRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(TrimRepository)
    private trimRepository: TrimRepository
  ) { }
  
  async getTireInformation(username: string): Promise<Tire[]>{
    const foundUser = await this.userRepository.findOne(username);

    if (!foundUser) throw new UnauthorizedException('not found user');
    console.log('111111', foundUser);

    const foundTrim = await this.trimRepository.findOne(foundUser);
    console.log('ttttt', foundTrim)

    const foundTireInfo = await this.tireRepository.find({ where: { trim: foundUser.trim } });
    console.log('222222',foundTireInfo)

    if (!foundTireInfo) throw new InternalServerErrorException('no tireInformation');

    return foundTireInfo;
  }
}
