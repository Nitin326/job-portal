import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobDto } from './dto/job.dto';
import { UpdateJobDto } from './dto/updatejob.dto';
import { Employee } from 'src/employee/entities/employee.entity';
import { JobApplication } from 'src/employee/entities/jobapplication.entity';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Job) private jobRepository: Repository<Job>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(JobApplication)
    private jobApplicationRepository: Repository<JobApplication>,
  ) {}

  async createjob(jobDto: JobDto, email: string, name: string) {
    const newDto = new JobDto();

    newDto.name = name;
    newDto.email = email;
    newDto.companyname = jobDto.companyname;
    newDto.description = jobDto.description;
    newDto.phone = jobDto.phone;
    newDto.position = jobDto.position;
    newDto.yearofexp = jobDto.yearofexp;
    newDto.technology = jobDto.technology;

    return await this.jobRepository.save(newDto);
  }

  async updatejob(
    updateJobDto: UpdateJobDto,
    jobid: string,
    email: string,
    name: string,
  ) {
    const job = await this.jobRepository.findOneBy({ id: jobid });
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.email === email) {
      job.email = email;
    } else {
      return { status: 403, message: 'Unable to access job' };
    }

    job.name = name;
    job.email = updateJobDto.email;
    job.description = updateJobDto.description;
    job.companyname = updateJobDto.companyname;
    job.phone = updateJobDto.phone;
    job.position = updateJobDto.position;
    job.yearofexp = updateJobDto.yearofexp;
    job.technology = updateJobDto.technology;

    return await this.jobRepository.save(job);
  }

  async removejob(jobId: string, email: string) {
    const job = await this.jobRepository.findOneBy({ id: jobId });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.email === email) {
      await this.jobRepository.remove(job);
    } else {
      return { status: 403, message: 'Unable to access job' };
    }
  }

  async allJobs(email: string) {
    return await this.jobRepository.find({ where: { email: email } });
  }

  async getJob(jobId: string, email: string) {
    const job = await this.jobRepository.findOneBy({ id: jobId });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.email !== email) {
      return { status: 403, message: 'Unable to access job' };
    }
    return job;
  }

  async acceptproposal(jobId: string, empId: string) {
    const employee = await this.employeeRepository.findOne({
      where: { id: empId },
    });
    const job = await this.jobRepository.findOne({ where: { id: jobId } });

    if (!employee || !job) {
      throw new NotFoundException('Employee or Job not found.');
    }

    let jobApplication = await this.jobApplicationRepository.findOne({
      where: { employee: { id: empId }, job: { id: job.id } },
    });

    if (!jobApplication) {
      jobApplication = new JobApplication();
      jobApplication.employee = employee;
      jobApplication.job = job;
    } else if (jobApplication.accepted) {
      return {
        status: 200,
        message: 'jobApplication status is already accepted',
      };
    }

    jobApplication.accepted = true;
    await this.jobApplicationRepository.save(jobApplication);
  }

  async proposalview(jobid: string, email: string) {
    const job = await this.jobRepository.findOne({
      where: { id: jobid },
      relations: ['employee'],
    });
    return job.employee;
  }
}
