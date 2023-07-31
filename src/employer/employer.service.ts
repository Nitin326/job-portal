import { Injectable } from '@nestjs/common';
import { EmployerDto } from './dto/employer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from './entities/employee.entity';
import { Repository } from 'typeorm';


@Injectable()
export class EmployerService {

  constructor(@InjectRepository(Employer) private employerRepository : Repository<Employer> ){}


  createjob(employerDto:EmployerDto){
    return this.employerRepository.save(employerDto);
  }

  updatejob(id: number) {
    return `This action updates a #${id} employeer`;
  }

  removejob(id: number) {
    return `This action removes a #${id} employeer`;
  }

  acceptproposal() {
    return `This action for accept the job Proposal`;
  }

  proposalview(){
    return `This action returns all Job Proposal View`;
  }

}
