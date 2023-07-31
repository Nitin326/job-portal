import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeDto {

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    role: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    phone: string;

    @IsString()
    @ApiProperty()
    education: string;

    @IsString()
    @ApiProperty()
    workexp: string;

    @IsString()
    @ApiProperty()
    project: string;

    @IsBoolean()
    @ApiProperty()
    jobapplied: boolean;

    @IsString()
    @ApiProperty()
    location: string;
}

