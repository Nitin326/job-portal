import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmployerModule } from './employer/employer.module';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), EmployerModule, EmployeeModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
