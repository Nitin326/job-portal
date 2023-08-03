import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class JobDto {

    @IsString()
    @IsNotEmpty()
    @Exclude()
    name : string;

    @IsEmail()
    @IsNotEmpty()
    @Exclude()
    email : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    companyname : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    position : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    phone : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    yearofexp : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    technology : string;

}