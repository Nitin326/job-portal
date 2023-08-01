import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";


@Entity()
export class Education {

    @IsString()
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @IsString()
    @ApiProperty()
    @Column()
    eduname: string;

    @ApiProperty()
    @Column()
    percentage:string;

    @IsString()
    @ApiProperty()
    @Column()
    course:string;

    @IsString()
    @ApiProperty()
    @Column()
    duration:string;

    @ManyToOne(() => Employee, employee => employee.education)
    employee:Employee;
}