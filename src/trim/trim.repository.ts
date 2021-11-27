import { UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";
import { EntityRepository, Repository } from "typeorm";
import { TrimDto } from "./dto/trim.dto";
import { Trim } from "./trim.entity";
import  axios  from 'axios';

@EntityRepository(Trim)
export class TrimRepository extends Repository<Trim>{
  constructor(
    @InjectRepository(User)
    private userRepository:UserRepository
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
    const trim = this.create({ trimId, trimName });
    //user와의 관계에서 user table에다가 트림 저장해야해

    // == tire 정보 빼내기 == //
    // name, value(폭, 편성비, 휠사이즈),unit, multiValues
    const frontTire = spec.driving.frontTire;
    const rearTire = spec.driving.frontTire;

    const [frontWith, frontRatio, frontWheelsize] = frontTire.value.split(/\/|\D/)
      .map(num => parseInt(num));
    const [rearWith, rearRatio, rearWheelsize ] = rearTire.value.split(/\/|\D/)
    .map(num => parseInt(num));
    
    const tire = this.create({})//tire레파지토리를 만들고 해줘야해

    
    return 'success';
  }
}