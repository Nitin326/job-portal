import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";


@Entity()
export class Projects {

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
    duration:string;

    @IsString()
    @ApiProperty()
    @Column()
    description:string;

    @IsString()
    @ApiProperty()
    @Column()
    links:string;

    @IsString()
    @ApiProperty()
    @Column()
    technology:string;

    @ManyToOne(() => Employee, employee => employee.projects)
    employee:Employee;

}