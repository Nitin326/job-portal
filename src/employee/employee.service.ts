import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/employer/entities/job.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
// import { Project } from './entities/projects.entity';


@Injectable()
export class EmployeeService {

  constructor(@InjectRepository(Job) private jobRepository:Repository<Job>,
  @InjectRepository(Employee) private employeeRepository : Repository<Employee>,
  // @InjectRepository(Project) private projectRepository : Repository<Project>
  ){}

  applyForJob() {
    return 'This action for create a job application';
  }

  async findAllJobPost() {
   const data = await this.jobRepository.find();
   return data;
  }

  // filterJobs(id: number) {
  //   return `This action filter the jobs`;
  // }

  // sortJobs(id: number) {
  //   return `This action sort the Jobs`;
  // }

  resumeUpload(filepath:string,email:string) {
    return 'save';
  }

  craeteProfile(createEmployeeDto:CreateEmployeeDto){
    console.log(createEmployeeDto.projects)
    return this.employeeRepository.save(createEmployeeDto);
    // return this.projectRepository.save(createEmployeeDto.projects);
  }

  updateProfile(id: number) {
    return `This action update profile`;
  }

  jobStatus(id: number) {
    return `This action removes a #${id} employee`;
  }
}
