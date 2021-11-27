import { UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";
import { EntityRepository, Repository } from "typeorm";
import { TrimDto } from "./dto/trim.dto";
import { Trim } from "./trim.entity";
import  axios  from 'axios';
import { ExtractJwt } from "passport-jwt";

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

    const foundUser = await this.userRepository.findOne({ username: id });

    if (!foundUser) throw new UnauthorizedException('user not found');

    let url = `https://dev.mycar.cardoc.co.kr/v1/trim/${trimId}`;

    const result = await axios.get(url);
    console.log(result);
  }
}