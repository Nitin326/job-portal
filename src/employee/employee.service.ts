import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/employer/entities/job.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Projects } from './entities/projects.entity';
import { Education } from './entities/eduction.entity';
import { WorkExperience } from './entities/workexperience.entity';
import { Resume } from './entities/resume.entity';
import { ResumeDto } from './dto/resume.dto';
import { JobApplication } from './entities/jobapplication.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Job) private jobRepository: Repository<Job>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Projects)
    private projectsRepository: Repository<Projects>,
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
    @InjectRepository(WorkExperience)
    private workexpRepository: Repository<WorkExperience>,
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
    @InjectRepository(JobApplication)
    private jobApplicationRepository: Repository<JobApplication>,
  ) {}

  async craeteProfile(
    createEmployeeDto: CreateEmployeeDto,
    email: string,
    name: string,
  ) {
    createEmployeeDto.email = email;
    createEmployeeDto.name = name;

    const check = await this.employeeRepository.findOneBy({ email: email });

    if (check) {
      return { ststuscode: 409, message: 'Profile already Created' };
    }
    const response = await this.employeeRepository.save(createEmployeeDto);
    return {
      status: 200,
      message: 'Profile is creadted successfully',
      data: response,
    };
  }

  async updateProfile(
    empid: string,
    updateEmployeeDto: UpdateEmployeeDto,
    email: string,
    name: string,
  ) {
    const emp = await this.employeeRepository.findOne({
      where: { id: empid },
      relations: ['education', 'workExperience', 'projects'],
    });

    if (!emp) {
      throw new NotFoundException('Job not found');
    }

    if (emp.email !== email) {
      return {
        status: 403,
        message: 'User have no permision to update these detail',
      };
    }

    emp.name = name;
    emp.email = email;
    emp.phone = updateEmployeeDto.phone;

    if (updateEmployeeDto.education) {
      emp.education.forEach((edu, index) => {
        if (updateEmployeeDto.education[index]) {
          if (updateEmployeeDto.education[index].course) {
            edu.course = updateEmployeeDto.education[index].course;
          }
          if (updateEmployeeDto.education[index].duration) {
            edu.duration = updateEmployeeDto.education[index].duration;
          }
          if (updateEmployeeDto.education[index].eduname) {
            edu.eduname = updateEmployeeDto.education[index].eduname;
          }
          if (updateEmployeeDto.education[index].percentage) {
            edu.percentage = updateEmployeeDto.education[index].percentage;
          }
        }
      });
    }

    if (updateEmployeeDto.workExperience) {
      emp.workExperience.forEach((woekexp, index) => {
        if (updateEmployeeDto.workExperience[index]) {
          if (updateEmployeeDto.workExperience[index].description) {
            woekexp.description =
              updateEmployeeDto.workExperience[index].description;
          }
          if (updateEmployeeDto.workExperience[index].duration) {
            woekexp.duration = updateEmployeeDto.workExperience[index].duration;
          }
          if (updateEmployeeDto.workExperience[index].role) {
            woekexp.role = updateEmployeeDto.workExperience[index].role;
          }
          if (updateEmployeeDto.workExperience[index].technology) {
            woekexp.technology =
              updateEmployeeDto.workExperience[index].technology;
          }
          if (updateEmployeeDto.workExperience[index].workexpname) {
            woekexp.workexpname =
              updateEmployeeDto.workExperience[index].workexpname;
          }
        }
      });
    }

    if (updateEmployeeDto.projects) {
      emp.projects.forEach((project, index) => {
        if (updateEmployeeDto.projects[index]) {
          if (updateEmployeeDto.projects[index].description) {
            project.description = updateEmployeeDto.projects[index].description;
          }
          if (updateEmployeeDto.projects[index].duration) {
            project.duration = updateEmployeeDto.projects[index].duration;
          }
          if (updateEmployeeDto.projects[index].projectname) {
            project.projectname = updateEmployeeDto.projects[index].projectname;
          }
          if (updateEmployeeDto.projects[index].links) {
            project.links = updateEmployeeDto.projects[index].links;
          }
          if (updateEmployeeDto.projects[index].technology) {
            project.technology = updateEmployeeDto.projects[index].technology;
          }
        }
      });
    }

    emp.location = updateEmployeeDto.location;

    const response = this.employeeRepository.save(emp);
    return { status: 200, message: 'Job updated successfully', data: response };
  }

  async findAllJobPost(
    position: string,
    companyname: string,
    technology: string,
    paginate:number
  ) {
    const page = 1;
    const itemsPerPage = paginate || 10;

    const skip = (page - 1) * itemsPerPage;
    const take = itemsPerPage;

    let filteredjobs = [];
    if (position) {
      const filteredbyposition = await this.jobRepository.find({
        where: {
          position: position,
        },
      });
      filteredjobs.push(filteredbyposition);
    }
    if (companyname) {
      const filteredbycompanyname = await this.jobRepository.find({
        where: {
          companyname: companyname,
        },
      });
      filteredjobs.push(filteredbycompanyname);
    }
    if (technology) {
      const filteredbytechnology = await this.jobRepository.find({
        where: {
          technology: technology,
        },
      });
      filteredjobs.push(filteredbytechnology);
    }

    if (filteredjobs.length > 0) {
      let paginatedJobPosts = filteredjobs.flat();
      const response = paginatedJobPosts.slice(skip, skip + take);
      return {
        status: 200,
        message: 'All Job Post Listed Here',
        data: response,
      };
    }
    const paginatedJobPosts = await this.jobRepository.find({
      skip: skip,
      take: take,
    });
    return { status: 200, message: 'All Job Post Listed Here', data: paginatedJobPosts };
  }

  async resumeUpload(filename: string, email: string) {
    const fileDto = new ResumeDto();
    fileDto.resume = filename;
    fileDto.email = email;
    const employee = await this.employeeRepository.findOne({
      where: { email: email },
    });
    fileDto.employeeId = employee.id;
    await this.resumeRepository.save(fileDto);
    return { status: 200, message: 'Resume uploaded successfully' };
  }

  async applyForJob(jobId: string, email: string) {
    const employee = await this.employeeRepository.findOne({
      where: { email: email },
      relations: ['appliedJobs'],
    });
    const job = await this.jobRepository.findOneBy({ id: jobId });

    if (!employee || !job) {
      throw new NotFoundException('Employee or Job not found.');
    }

    if (!employee.appliedJobs) {
      employee.appliedJobs = [];
    }

    const alreadyApplied = employee.appliedJobs.some(
      (appliedJob) => appliedJob.id === jobId,
    );
    if (!alreadyApplied) {
      employee.appliedJobs.push(job);
      await this.employeeRepository.save(employee);
    }
    const response = employee;
    return {
      status: 200,
      message: 'Successfully Applied in the job',
      data: response,
    };
  }

  async allAppliedJobs(email: string) {
    const employee = await this.employeeRepository.findOne({
      where: { email: email },
      relations: ['appliedJobs'],
    });
    const response = employee.appliedJobs;
    return {
      status: 200,
      message: 'All Applied Jobs listed here',
      data: response,
    };
  }

  async jobStatus(jobId: string, email: string) {
    const employee = await this.employeeRepository.findOne({
      where: { email: email },
    });

    const job = await this.jobRepository.findOneBy({ id: jobId });

    if (!employee || !job) {
      throw new NotFoundException('Employee or Job not found.');
    }

    let jobApplication = await this.jobApplicationRepository.findOne({
      where: { employee: { id: employee.id }, job: { id: jobId } },
    });

    // console.log(jobApplication)

    if (!jobApplication) {
      return { status: 200, message: 'your job application is under review' };
    } else if (jobApplication.accepted) {
      return {
        status: 200,
        message: `your job application is ${jobApplication.accepted}`,
      };
    }
  }
}
