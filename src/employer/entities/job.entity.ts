import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Employee } from "src/employee/entities/employee.entity";


@Entity()
export class Job extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @IsEmail()
    @ApiProperty()
    @Column()
    email:string;

    @IsString()
    @ApiProperty()
    @Column()
    companyname:string;

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
    phone:string;

    @IsString()
    @ApiProperty()
    @Column()
    yearofexp:string;

    @IsString()
    @ApiProperty()
    @Column()
    technology:string;

    @ManyToOne(() => Employee, employee => employee.jobs)
    employee:Employee;

}