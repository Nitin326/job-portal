import { ApiBody, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EducationDto } from './education.dto';
import { Exclude, Type } from 'class-transformer';
import { WorkExperienceDto } from './workExperience.dto';
import { ProjectsDto } from './projects.dto';

export class UpdateEmployeeDto {

  @Exclude()
  name: string;

  @Exclude()
  email: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  phone: string;

  @ApiProperty({ type: [EducationDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];

  @ApiProperty({ type: [WorkExperienceDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WorkExperienceDto)
  workExperience: WorkExperienceDto[];

  @ApiProperty({ type: [ProjectsDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProjectsDto)
  projects: ProjectsDto[];

  @IsString()
  @ApiProperty()
  @IsOptional()
  location: string;

}
