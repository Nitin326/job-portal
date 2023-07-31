import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupDto{

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    name:string;
  
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    role:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password:string;
}
