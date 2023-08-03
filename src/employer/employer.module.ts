import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { JobApplication } from 'src/employee/entities/jobapplication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, Employee, JobApplication])],
  controllers: [EmployerController],
  providers: [EmployerService],
  exports: [EmployerService],
})
export class EmployerModule {}
