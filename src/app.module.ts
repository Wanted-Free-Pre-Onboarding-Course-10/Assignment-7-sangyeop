import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './ormconfig';
import { UserModule } from './user/user.module';
import { TrimModule } from './trim/trim.module';
import { TireModule } from './tire/tire.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, TrimModule, TireModule],
})
export class AppModule {}
