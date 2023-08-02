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
import { EducationDto } from './dto/education.dto';
import { ProjectsDto } from './dto/projects.dto';
// import { Project } from './entities/projects.entity';

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
  ) {}

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

  resumeUpload(filepath: string, email: string) {
    return 'save';
  }

  async craeteProfile(
    createEmployeeDto: CreateEmployeeDto,
    email: string,
    name: string,
  ) {
    createEmployeeDto.email = email;
    createEmployeeDto.name = name;
    
    const check = await this.employeeRepository.findOneBy({ email: email});

    if(check){
      return {ststuscode:409, message:'Profile already Created'}
    }

    return await this.employeeRepository.save(createEmployeeDto);
  }

  async updateProfile(
    empid: string,
    updateEmployeeDto: UpdateEmployeeDto,
    email: string,
    name: string,
  ) {
    const emp = await this.employeeRepository.findOne({ where:{id: empid},relations:["education","workExperience","projects"] });

    if (!emp) {
      throw new NotFoundException('Job not found');
    }

    if (emp.email !== email) {
      return { status: 403, message: 'User have no permision to update these detail'};
    }

    emp.name = name;
    emp.email = email;
    emp.phone = updateEmployeeDto.phone;

    if (emp.education) {
      emp.education.forEach((edu, index) => {
        if (updateEmployeeDto.education[index]) {
          edu.course = updateEmployeeDto.education[index].course;
          edu.duration = updateEmployeeDto.education[index].duration;
          edu.eduname = updateEmployeeDto.education[index].eduname;
          edu.percentage = updateEmployeeDto.education[index].percentage;
        }
      });
    }

    if (emp.workExperience) {
      emp.workExperience.forEach((woekexp, index) => {
        if (updateEmployeeDto.workExperience[index]) {
          woekexp.description = updateEmployeeDto.workExperience[index].description;
          woekexp.duration = updateEmployeeDto.workExperience[index].duration;
          woekexp.role = updateEmployeeDto.workExperience[index].role;
          woekexp.technology = updateEmployeeDto.workExperience[index].technology;
          woekexp.workexpname = updateEmployeeDto.workExperience[index].workexpname;
        }
      });
    }

    if (emp.projects) {
      emp.projects.forEach((project, index) => {
        if (updateEmployeeDto.education[index]) {
          project.description = updateEmployeeDto.projects[index].description;
          project.duration = updateEmployeeDto.projects[index].duration;
          project.projectname = updateEmployeeDto.projects[index].projectname;
          project.links = updateEmployeeDto.projects[index].links;
          project.technology = updateEmployeeDto.projects[index].technology;
        }
      });
    }
    
    emp.location = updateEmployeeDto.location;

    return this.employeeRepository.save(emp);
  }

  jobStatus(id: number) {
    return `This action removes a #${id} employee`;
  }
}
