import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JobDto } from './dto/job.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import Role from 'src/constant';
import { Request } from 'express';
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
    const name = user.name;
    return this.employerService.createjob(jobDto, email, name);
  }

  @Patch('job/:id')
  updatejob(
    @Param('id') jobid: string,
    @Body() updateJobDto: UpdateJobDto,
    @Req() req: Request,
  ) {
    const user: any = req.user;
    const email = user.email;
    const name = user.name;
    return this.employerService.updatejob(updateJobDto, jobid, email, name);
  }

  @Delete('job/:id')
  removejob(@Param('id') id: string, @Req() req: Request) {
    const user: any = req.user;
    const email = user.email;
    return this.employerService.removejob(id, email);
  }

  @Get('alljob')
  allJobs(@Req() req: Request) {
    const user: any = req.user;
    const email = user.email;
    return this.employerService.allJobs(email);
  }

  @Get('job/:id')
  getJob(@Req() req: Request, @Param('id') id: string) {
    const user: any = req.user;
    const email = user.email;
    return this.employerService.getJob(id, email);
  }

  @Post('job/accept/:jobId/:empId')
  acceptproposal(@Param('jobId') jobid: string, @Param('empId') empid: string) {
    return this.employerService.acceptproposal(jobid, empid);
  }

  @Get('job/status/:id')
  proposalview(@Param('id') id: string, @Req() req: Request) {
    const user: any = req.user;
    const email = user.email;
    return this.employerService.proposalview(id, email);
  }
}
