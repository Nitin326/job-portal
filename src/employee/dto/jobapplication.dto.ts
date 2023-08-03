// job-application.dto.ts
import { IsBoolean, IsNumber } from 'class-validator';

export class JobApplicationDto {
  @IsNumber()
  employeeId: number;

  @IsNumber()
  jobId: number;

  @IsBoolean()
  accepted: boolean;
}
