import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './entities/employee.entity';
import { Job } from './entities/job.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Employer,Job])],
  controllers: [EmployerController],
  providers: [EmployerService]
})
export class EmployerModule {}
