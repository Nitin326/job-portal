import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class WorkExperienceDto {
    
    @IsString()
    @ApiProperty()
    workexpname: string;

    @IsString()
    @ApiProperty()
    role: string;

    @IsString()
    @ApiProperty()
    duration: string;

    @IsString()
    @ApiProperty()
    technology: string;

    @IsString()
    @ApiProperty()
    description: string;
}