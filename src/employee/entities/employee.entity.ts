import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Education } from './eduction.entity';
import { WorkExperience } from './workexperience.entity';
import { Projects } from './projects.entity';
import { BaseEntity } from 'src/employer/entities/base.entity';
import { Job } from 'src/employer/entities/job.entity';
import { JobApplication } from './jobapplication.entity';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @OneToMany(() => Projects, (projects) => projects.employee, { cascade: true })
  projects: Projects[];

  @OneToMany(() => Education, (education) => education.employee, {
    cascade: true,
  })
  education: Education[];

  @OneToMany(
    () => WorkExperience,
    (workexperience) => workexperience.employee,
    { cascade: true },
  )
  workExperience: WorkExperience[];

  @Column({ type: 'varchar' })
  location: string;

  @ManyToMany(() => Job, (job) => job.employee)
  @JoinTable({
    name: 'employee_job',
    joinColumn: { name: 'employeeId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'jobId', referencedColumnName: 'id' },
  })
  appliedJobs: Job[];

}
