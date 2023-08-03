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

    const response = await this.jobRepository.save(newDto);
    return { status: 200, message: 'Job is successfully created', data: response };
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
    job.email = email;
    if (updateJobDto.description) {
      job.description = updateJobDto.description;
    }
    if (updateJobDto.companyname) {
      job.companyname = updateJobDto.companyname;
    }
    if (updateJobDto.phone) {
      job.phone = updateJobDto.phone;
    }
    if (updateJobDto.position) {
      job.position = updateJobDto.position;
    }
    if (updateJobDto.yearofexp) {
      job.yearofexp = updateJobDto.yearofexp;
    }
    if (updateJobDto.technology) {
      job.technology = updateJobDto.technology;
    }

    const response = await this.jobRepository.save(job);
    return { status: 200, message: 'Job updated successfully', data: response };
  }

  async removejob(jobId: string, email: string) {
    const job = await this.jobRepository.findOneBy({ id: jobId });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.email === email) {
      await this.jobRepository.remove(job);
      return { status: 200, message: 'job deleted successfully' };
    } else {
      return { status: 403, message: 'Unable to access job' };
    }
  }

  async allJobs(email: string) {
    const response = await this.jobRepository.find({ where: { email: email } });
    return {
      status: 200,
      message: 'All jobs created by employer listed here',
      data: response,
    };
  }

  async getJob(jobId: string, email: string) {
    const job = await this.jobRepository.findOneBy({ id: jobId });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.email !== email) {
      return { status: 403, message: 'Unable to access job' };
    }
    const response = job;
    return { status: 200, message: 'Employer Requested Job', data: response };
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
    return { status: 200, message: 'jobApplication is accepted'}
  }

  async proposalview(jobid: string, email: string) {
    const job = await this.jobRepository.findOne({
      where: { id: jobid },
      relations: ['employee'],
    });
    const response = job.employee;
    return {
      status: 200,
      message: 'All employess listed apllied in this job',
      data: response,
    };
  }
}
