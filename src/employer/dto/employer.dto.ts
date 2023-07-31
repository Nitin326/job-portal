import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class EmployerDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    companyname : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    jobrole : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    phone : string;

}