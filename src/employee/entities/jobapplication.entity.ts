import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';
import { Job } from 'src/employer/entities/job.entity';

@Entity('')
export class JobApplication {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: false })
  accepted: boolean;

  @ManyToOne(() => Employee, employee => employee.appliedJobs)
  employee: Employee;

  @ManyToOne(() => Job, job => job.applications)
  job: Job;
}
