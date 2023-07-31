import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signup } from './entities/signup.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Signup]),AuthModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
