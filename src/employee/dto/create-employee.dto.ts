import { ApiBody, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EducationDto } from './education.dto';
import { Exclude, Type } from 'class-transformer';
import { WorkExperienceDto } from './workExperience.dto';
import { ProjectsDto } from './projects.dto';

export class CreateEmployeeDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  @Exclude()
  email: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @ApiProperty({ type: [EducationDto] })
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];

  @ApiProperty({ type: [WorkExperienceDto] })
  @ValidateNested({ each: true })
  @Type(() => WorkExperienceDto)
  workExperience: WorkExperienceDto[];

  @ApiProperty({ type: [ProjectsDto] })
  @ValidateNested({ each: true })
  @Type(() => ProjectsDto)
  projects: ProjectsDto[];

  @IsString()
  @ApiProperty()
  location: string;

}
