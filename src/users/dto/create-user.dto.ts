import { IsEmail, IsMobilePhone, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string;
    

    @IsString()
    @MinLength(7)
    @MaxLength(20)
    password: string;


    @IsString()
    @MinLength(3)
    nombre: string;

    @IsString()
    @MinLength(3)
    primerApellido: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    segundoApellido?: string;

    @IsString()
    @IsMobilePhone('es-CO')
    @MinLength(8)
    telefono: string;
}
