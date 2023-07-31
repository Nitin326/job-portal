import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports:[PassportModule ,JwtModule.register({
    secret:"my-secret-key",
    signOptions:{
        expiresIn:'1h'
    }
  })],
  controllers: [],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
