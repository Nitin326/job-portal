import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";


@Entity()
export class WorkExperience {

    @IsString()
    @PrimaryGeneratedColumn()
    id:string;

    @IsString()
    @ApiProperty()
    @Column()
    name: string;

    @IsString()
    @ApiProperty()
    @Column()
    role:string;

    @IsString()
    @ApiProperty()
    @Column()
    duration:string;

    @IsString()
    @ApiProperty()
    @Column()
    technology:string;

    @IsString()
    @ApiProperty()
    @Column()
    description:string;

    @ManyToOne(() => Employee, employee => employee.workExperience)
    employee:Employee;
}