import { Injectable } from '@nestjs/common';
import { SignupDto } from '../user/dto/signup.dto';
import { LoginDto } from '../user/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Signup } from '../user/entities/signup.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Signup) private signupRepository: Repository<Signup>,
    private authService: AuthService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { name, email, role, password } = signupDto;

    const hashpassword = await bcrypt.hash(password, 12);

    const newDto = new SignupDto();

    newDto.name = name;
    newDto.email = email;
    newDto.role = role;
    newDto.password = hashpassword;

    try {
      await this.signupRepository.save(newDto);
      return { status: 201, message: 'User Registered Successfully' };
    } catch (err) {
      return err;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.signupRepository.findOneBy({
        email: loginDto.email,
      });

      if (!user) {
        return { status: 404, message: 'User Not Found !' };
      }

      const isMatch = await bcrypt.compare(loginDto.password, user.password);

      if (isMatch) {
        const token = await this.authService.generateToken({
          email: user.email,
          role: user.role,
          id: user.id,
          name: user.name
        });
        return {
          token: token,
          status: 200,
          message: 'User Logged in successfully',
        };
      }
      return { status: 404, message: 'Invalid Password' };
    } catch (err) {
      return { status: 404, message: 'Invalid Login details' };
    }
  }
}
