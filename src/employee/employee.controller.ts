import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {ApiTags } from '@nestjs/swagger';

@Controller('employee')
@ApiTags('employee')
export class EmployeeController {

  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/profile')
  craeteProfile() {
    return this.employeeService.craeteProfile();
  }

  @Patch('profile/:id')
  updateProfile(@Param('id') id: string) {
    return this.employeeService.updateProfile(+id);
  }

  @Get('alljobs')
  findAllJobPost() {
    return this.employeeService.findAllJobPost();
  }

  @Post('apply')
  applyForJob() {
    return this.employeeService.applyForJob();
  }

  // @Get('filter/:id')
  // filterJobs(@Param('id') id: string) {
  //   return this.employeeService.filterJobs(+id);
  // }

  // @Get('')
  // sortJobs(@Param('id') id: string) {
  //   return this.employeeService.sortJobs(+id);
  // }

  @Post('resume')
  resumeUpload() {
    return this.employeeService.resumeUpload();
  }

  @Get('jobstatus/:id')
  jobStatus(@Param('id') id: string) {
    return this.employeeService.jobStatus(+id);
  }
}
