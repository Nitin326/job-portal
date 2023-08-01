import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ProjectsDto {

    @IsString()
    @ApiProperty()
    projectname:string;

    @IsString()
    @ApiProperty()
    duration:string;

    @IsString()
    @ApiProperty()
    description:string;

    @IsString()
    @ApiProperty()
    links:string;

    @IsString()
    @ApiProperty()
    technology:string;
}