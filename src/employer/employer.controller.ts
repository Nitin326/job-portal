import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {JobDto } from './dto/job.dto';
import {JwtAuthGuard}  from '../auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import Role from 'src/constant';
import {Request} from 'express'
import { UpdateJobDto } from './dto/updatejob.dto';

@Controller('employeer')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, new RoleGuard(Role.Employer))
@ApiTags('employeer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}


  @Post('job')
  createjob(@Body() jobDto: JobDto, @Req() req: Request) {
    const user: any = req.user;
    const email = user.email;
    return this.employerService.createjob(jobDto,email);
  }

  @Patch('job/:id')
  updatejob(@Param('id') jobid: string,@Body() updateJobDto: UpdateJobDto, @Req() req: Request) {
    const user: any = req.user;
    const email = user.email;
    return this.employerService.updatejob(updateJobDto,jobid,email);
  }

  @Delete('job/:id')
  removejob(@Param('id') id: string,@Req() req: Request) {
    const user: any = req.user;
    const email = user.email;
    return this.employerService.removejob(id,email);
  }

  @Post('job/accept')
  acceptproposal() {
    return this.employerService.acceptproposal();
  }

  @Get('job/status')
  proposalview() {
    return this.employerService.proposalview();
  }
}
