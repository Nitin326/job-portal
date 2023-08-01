import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class EducationDto {
    @IsString()
    @ApiProperty()
    eduname:string;

    @IsString()
    @ApiProperty()
    percentage:string;

    @IsString()
    @ApiProperty()
    course:string;

    @IsString()
    @ApiProperty()
    duration:string
}