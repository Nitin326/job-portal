import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignupDto } from '../user/dto/signup.dto';
import { LoginDto } from '../user/dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';


@Controller('auth')
@ApiTags('Auth')
export class UserController {
  
  constructor(private readonly userService:UserService) {}

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    return this.userService.signup(signupDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

}
