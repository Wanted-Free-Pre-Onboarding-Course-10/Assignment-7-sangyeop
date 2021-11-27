import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
  async signup(userDto: UserDto) {
    const { username, password } = userDto;

    const user = this.create({ username, password });

    try {
      await this.save(user);
      return 'signup success';
    } catch (err) {
      if (err.errno === 19) throw new ConflictException('Existing username');
      throw new InternalServerErrorException();
    }
  }
}