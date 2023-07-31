import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDto {

    @IsEmail()
    @IsNotEmpty()
    @Exclude()
    email : string;

    @IsString()
    @ApiProperty()
    companyname : string;

    @IsString()
    @ApiProperty()
    position : string;

    @IsString()
    @ApiProperty()
    description : string;

    @IsString()
    @ApiProperty()
    phone : string;

    @IsString()
    @ApiProperty()
    yearofexp : string;

    @IsString()
    @ApiProperty()
    technology : string;
    
}
