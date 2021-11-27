import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn:process.env.JWT_EXPIRES
    }
  }),TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
