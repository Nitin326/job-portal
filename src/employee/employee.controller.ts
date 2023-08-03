import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req,
  Body,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import Role from 'src/constant';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
@ApiTags('employee')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, new RoleGuard(Role.Employee))
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/profile')
  craeteProfile(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Req() req: Request,
  ) {
    const user: any = req.user;
    const email = user.email;
    const name = user.name;
    return this.employeeService.craeteProfile(createEmployeeDto, email, name);
  }

  @Patch('profile/:id')
  updateProfile(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Req() req: Request,
  ) {
    const user: any = req.user;
    const email = user.email;
    const name = user.name;
    return this.employeeService.updateProfile(
      id,
      updateEmployeeDto,
      email,
      name,
    );
  }

  @ApiQuery({ name: 'position', required: false, type: String })
  @ApiQuery({ name: 'companyname', required: false, type: String })
  @ApiQuery({ name: 'technology', required: false, type: String })
  @Get('alljobs')
  findAllJobPost(
    @Query('position') position: string,
    @Query('companyname') companyname: string,
    @Query('technology') technology: string,
  ) {
    return this.employeeService.findAllJobPost(
      position,
      companyname,
      technology,
    );
  }

  @Post('apply/:jobid')
  applyForJob(@Param('jobid') jobid: string, @Req() req : Request) {
    const user: any = req.user;
    const email = user.email;
    return this.employeeService.applyForJob(jobid,email);
  }

  @Post('resume')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  )

  resumeUpload(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const user: any = req.user;
    const email = user.email;
    const filename = file.path.slice(8);
    return this.employeeService.resumeUpload(filename, email);
  }

  @Get('appliedjobs')
  allAppliedJobs( @Req() req: Request) {
    const user: any = req.user;
    const email = user.email;
    return this.employeeService.allAppliedJobs(email);
  }

  @Get('jobstatus/:jobid')
  jobStatus(@Param('Jobid') jobid: string, @Req() req: Request) {
    const user: any = req.user;
    const email = user.email;
    return this.employeeService.jobStatus(jobid,email);
  }
}
