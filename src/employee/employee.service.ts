import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/employer/entities/job.entity';
import { Repository } from 'typeorm';


@Injectable()
export class EmployeeService {

  constructor(@InjectRepository(Job) private jobRepository:Repository<Job>){}

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

  craeteProfile(){
    return `This action create profile`;
  }

  updateProfile(id: number) {
    return `This action update profile`;
  }

  jobStatus(id: number) {
    return `This action removes a #${id} employee`;
  }
}
