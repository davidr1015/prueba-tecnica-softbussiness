import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(7)
    @MaxLength(20)
    password: string;
}
