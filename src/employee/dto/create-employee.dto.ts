import { ApiBody, ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
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

  @Exclude()
  name: string;

  @Exclude()
  email: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @ApiProperty({ type: [EducationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];

  @ApiProperty({ type: [WorkExperienceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkExperienceDto)
  workExperience: WorkExperienceDto[];

  @ApiProperty({ type: [ProjectsDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectsDto)
  projects: ProjectsDto[];

  @IsString()
  @ApiProperty()
  location: string;

}
