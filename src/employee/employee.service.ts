import { Injectable } from '@nestjs/common';


@Injectable()
export class EmployeeService {

  applyForJob() {
    return 'This action for create a job application';
  }

  findAllJobPost() {
    return `This action returns all Posted jobs`;
  }

  // filterJobs(id: number) {
  //   return `This action filter the jobs`;
  // }

  // sortJobs(id: number) {
  //   return `This action sort the Jobs`;
  // }

  resumeUpload() {
    return `This action Upload the resume`;
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
