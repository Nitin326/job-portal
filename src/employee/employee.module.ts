import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/eduction.entity';
import { Employee } from './entities/employee.entity';
import { Projects} from './entities/projects.entity';
import { WorkExperience } from './entities/workexperience.entity';
import { EmployerModule } from 'src/employer/employer.module';
import { Job } from 'src/employer/entities/job.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Education,Projects,Employee,WorkExperience,Job]),EmployerModule],
  controllers: [EmployeeController],
  providers: [EmployeeService]

})

export class EmployeeModule {}
