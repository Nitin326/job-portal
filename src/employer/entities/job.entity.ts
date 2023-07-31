import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Employee } from "src/employee/entities/employee.entity";
import { Employer } from "src/employer/entities/employee.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Job {

    @IsString()
    @PrimaryGeneratedColumn()
    id:string;

    @IsString()
    @ApiProperty()
    @Column()
    position: string;

    @IsString()
    @ApiProperty()
    @Column()
    description:string;

    @IsString()
    @ApiProperty()
    @Column()
    yearofexp:string;

    @IsString()
    @ApiProperty()
    @Column()
    technology:string;

    @ManyToOne(() => Employee, employee => employee.jobApplication)
    employee: Employee;

    @ManyToOne(() => Employer, employer => employer.jobs)
    employer: Employer;

}