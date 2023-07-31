import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Job])],
  controllers: [EmployerController],
  providers: [EmployerService],
  exports: [EmployerService]
})
export class EmployerModule {}
