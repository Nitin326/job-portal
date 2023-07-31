import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: any) {
    console.log(payload);
    return this.jwtService.sign(payload);
  }

  async validate(token: string) {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
