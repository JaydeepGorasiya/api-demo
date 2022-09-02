import { IsString, IsEmail, IsEnum } from 'class-validator';

export class UserValidation{
    @IsString()
    name: string;
    
    @IsEmail()
    email 

    @IsEnum(['male', 'female', 'other'])
    gender

    @IsString()
    password: string;

}