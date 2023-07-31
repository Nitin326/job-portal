import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

}