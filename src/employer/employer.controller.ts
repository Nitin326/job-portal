import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmployerDto } from './dto/employer.dto';
import {JwtAuthGuard}  from '../auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import Role from 'src/constant';

@Controller('employeer')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, new RoleGuard(Role.Employer))
@ApiTags('employeer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}


  @Post('job')
  createjob(@Body() employerDto: EmployerDto) {
    return this.employerService.createjob(employerDto);
  }

  @Patch('job/:id')
  updatejob(@Param('id') id: string) {
    return this.employerService.updatejob(+id);
  }

  @Delete('job/:id')
  removejob(@Param('id') id: string) {
    return this.employerService.removejob(+id);
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
