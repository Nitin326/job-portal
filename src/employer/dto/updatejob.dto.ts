import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDto {

    @Exclude()
    email : string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    companyname : string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    position : string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description : string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    phone : string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    yearofexp : string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    technology : string;
    
}
