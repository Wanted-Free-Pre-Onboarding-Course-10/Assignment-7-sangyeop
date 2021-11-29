import { InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";
import { CannotCreateEntityIdMapError, EntityRepository, Repository } from "typeorm";
import { TrimDto } from "./dto/trim.dto";
import { Trim } from "./trim.entity";
import  axios  from 'axios';
import { Tire } from "src/tire/tire.entity";
import { TireRepository } from "src/tire/tire.repository";

@EntityRepository(Trim)
export class TrimRepository extends Repository<Trim>{
  constructor(
    @InjectRepository(TireRepository)
    private tireRepository:TireRepository
  ) {
    super()
  }
  async createTrim(trimDto: TrimDto): Promise<any>{
    const { id, trimId } = trimDto;

    // const foundUser = await this.userRepository.findOne({ username: id });

    // if (!foundUser) throw new UnauthorizedException('user not found');
    //이 부분에서 No metadata for "[object Object]" was found 에러가 나는 상황. 어떻게 대처할까?

    let url = `https://dev.mycar.cardoc.co.kr/v1/trim/${trimId}`;

    const result = await axios.get(url);
    const { trimName, spec } = result.data;
    
    // == trim 생성 == //
    const trim = this.create({ trimId, trimName, users: User[id] });
    
    // == trim 저장 == //
    try {
      await this.save(trim);
    } catch (err) {
      throw new InternalServerErrorException();
    }

    // == tire 정보 빼내기 == //
    // name, value(폭, 편성비, 휠사이즈),unit, multiValues
    const frontTire = spec.driving.frontTire;
    const rearTire = spec.driving.frontTire;
    
    const [frontWidth, frontRatio, frontWheelsize] = frontTire.value.split(/\/|\D/)
      .map(num => parseInt(num));
    const [rearWidth, rearRatio, rearWheelsize ] = rearTire.value.split(/\/|\D/)
    .map(num => parseInt(num));
    
    // == tire 객체 생성 == // 지금 이부분이 안되고 있다.
    console.log('1',frontTire.name)
    console.log('2',frontWidth)
    console.log('3',frontRatio)
    console.log('4',frontWheelsize)
    console.log('5',frontTire.unit)
    console.log('6',frontTire.multiValues)
    const frontTireInfo = this.tireRepository.create({
      tireName: frontTire.name,
      width: frontWidth,
      ratio: frontRatio,
      wheelsize: frontWheelsize,
      // unit: frontTire.unit || null,
      // multiValues: frontTire.multiValues|| null,
      // trims: Trim[trimName],
      // users: User[id]
    })
    console.log('111111', frontTireInfo)
    const rearTireInfo = this.tireRepository.create({
      tireName: rearTire.name,
      width: rearWidth,
      ratio: rearRatio,
      wheelsize: rearWheelsize,
      // unit: rearTire.unit|| null,
      // multiValues: rearTire.multiValues|| null,
      // trims: Trim[trimName],
      // users: User[id]
    })
    
    // == tire 정보 저장 == //
    try {
      await this.save(frontTireInfo);
      await this.save(rearTireInfo);
    } catch (err) {
      console.log(err);
    }

    //save도 해야한다.
    return 'success';
  }
}