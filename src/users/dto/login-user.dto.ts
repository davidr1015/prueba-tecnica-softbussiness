import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    @ApiProperty(
        {
            example: 'correo@ejemplo.com',
            description: 'Correo electrónico del usuario',
            required: true
        }
    )
    @IsEmail()
    email: string;
    
    @ApiProperty(
        {
            example: 'Clave1234',
            description: 'Contraseña del usuario',
            minLength: 7,
            maxLength: 20,
        }
    )
    @IsString()
     @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message:
              'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número o un carácter especial',
          })
    @MinLength(7)
    @MaxLength(20)
    password: string;
}
