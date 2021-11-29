import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TireRepository } from 'src/tire/tire.repository';
import { TrimDto } from './dto/trim.dto';
import { TrimRepository } from './trim.repository';
import  axios  from 'axios';
import { User } from 'src/user/user.entity';
import { Trim } from './trim.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class TrimService {
  constructor(
    @InjectRepository(TrimRepository)
    private trimRepository: TrimRepository,
    @InjectRepository(TireRepository)
    private tireRepository: TireRepository,
    @InjectRepository(UserRepository)
    private userRepository:UserRepository
  ) { }
  
  async createTrim(trimDto: TrimDto): Promise<string>{
    // return await this.trimRepository.createTrim(trimDto);
    const { id, trimId } = trimDto;

    const foundUser = await this.userRepository.findOne({ username: id });

    if (!foundUser) throw new UnauthorizedException('user not found');

    
    //이 부분에서 No metadata for "[object Object]" was found 에러가 나는 상황. 어떻게 대처할까?
    //해결했지만 테이블 연결에서 문제가 조금 있다. 이것을 어떻게 해야하는가...
    let url = `https://dev.mycar.cardoc.co.kr/v1/trim/${trimId}`;

    const result = await axios.get(url);
    const { trimName, spec } = result.data;
    
    // == trim 생성 == //
    const trim = await this.trimRepository.create({ trimId, trimName });
    // console.log('11111',trim)
    // foundUser.trim = trim.id;
    // console.log(foundUser)
    
    // == trim 저장 == //
    try {
      await this.trimRepository.save(trim);
      foundUser.trim = trim.id

      await this.userRepository.save(foundUser);
    } catch (err) {
      // throw new InternalServerErrorException();
      console.log(err);
    }

    // == tire 정보 빼내기 == //
    // name, value(폭, 편성비, 휠사이즈),unit, multiValues
    const frontTire = spec.driving.frontTire;
    const rearTire = spec.driving.rearTire;
    
    const [frontWidth, frontRatio, frontWheelsize] = frontTire.value.split(/\/|\D/)
      .map(num => parseInt(num));
    const [rearWidth, rearRatio, rearWheelsize ] = rearTire.value.split(/\/|\D/)
      .map(num => parseInt(num));
    
    if (!frontWidth || !frontRatio || !frontWheelsize || !rearWidth || !rearRatio || !rearWheelsize)
      throw new InternalServerErrorException('wrong tire informantion');
    
    // == tire 객체 생성 == // 
    const frontTireInfo = this.tireRepository.create({
      tireName: frontTire.name,
      width: frontWidth,
      ratio: frontRatio,
      wheelsize: frontWheelsize,
      unit: frontTire.unit || '',
      multiValues: frontTire.multiValues || '',
      trim
    })
    
    const rearTireInfo = this.tireRepository.create({
      tireName: rearTire.name,
      width: rearWidth,
      ratio: rearRatio,
      wheelsize: rearWheelsize,
      unit: rearTire.unit|| '',
      multiValues: rearTire.multiValues || '',
      trim
    })
    
    // == tire 정보 저장 == //
    try {
      await this.tireRepository.save(frontTireInfo);
      await this.tireRepository.save(rearTireInfo);
    } catch (err) {
      console.log(err);
    }
    return 'success';
  }
}
