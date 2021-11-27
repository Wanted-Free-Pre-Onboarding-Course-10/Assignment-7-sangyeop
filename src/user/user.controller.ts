import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }
  
  @Post('signup')
  signup(@Body() userDto: UserDto): Promise<string>{
    return this.userService.signup(userDto);
  }

  @Post('signin')
  signin(@Body() userDto: UserDto): Promise<{ accessToken: string }>{
    return this.userService.signin(userDto);
  }
}
