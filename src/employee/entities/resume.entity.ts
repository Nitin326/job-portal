import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";


@Entity()
export class Resume {

    @IsString()
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @IsEmail()
    @Column()
    email:string;

    @IsString()
    @Column()
    resume:string;

    @IsString()
    @Column()
    employeeId:string;

}