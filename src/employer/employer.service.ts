import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobDto } from './dto/job.dto';
import { UpdateJobDto } from './dto/updatejob.dto';

@Injectable()
export class EmployerService {
  constructor(@InjectRepository(Job) private jobRepository: Repository<Job>) {}

  async createjob(jobDto: JobDto, email: string) {
    const newDto = new JobDto();

    newDto.email = email;
    newDto.companyname = jobDto.companyname;
    newDto.description = jobDto.description;
    newDto.phone = jobDto.phone;
    newDto.position = jobDto.position;
    newDto.yearofexp = jobDto.yearofexp;
    newDto.technology = jobDto.technology;

    return await this.jobRepository.save(newDto);
  }

  async updatejob(updateJobDto: UpdateJobDto, jobid: string, email: string) {
    const job = await this.jobRepository.findOneBy({ id: jobid });
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.email === email) {
      job.email = email;
    } else {
      return { status: 403, message: 'Unable to access job' };
    }
   
    job.email = updateJobDto.email;
    job.description = updateJobDto.description;
    job.companyname = updateJobDto.companyname;
    job.phone = updateJobDto.phone;
    job.position = updateJobDto.position;
    job.yearofexp = updateJobDto.yearofexp;
    job.technology = updateJobDto.technology;

    return await this.jobRepository.save(job);
  }

  async removejob(jobId: string,email: string) {
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
    return await this.jobRepository.find({where:{ email: email}});
  }

  async getJob(jobId: string, email: string) {
    const job = await this.jobRepository.findOneBy({ id: jobId });

    if(!job) {
      throw new NotFoundException('Job not found');
    }

    if(job.email !== email) {
      return { status: 403, message: 'Unable to access job' };
    }
    return job;
  }

  acceptproposal() {
    return `This action for accept the job Proposal`;
  }

  proposalview() {
    return `This action returns all Job Proposal View`;
  }
}
