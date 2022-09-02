import { IsString, IsEmail, IsEnum } from 'class-validator';

export class UpdateUserValidation{
    @IsString()
    name: string;
    
    @IsEmail()
    email 

    @IsEnum(['male', 'female', 'other'])
    gender

}