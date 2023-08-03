import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class ResumeDto {

    @IsEmail()
    @Exclude()
    email:string;

    @IsString()
    @Exclude()
    resume:string;

    @IsString()
    @Exclude()
    employeeId:string;

}