import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty(
        {
            example: 'email@ejemplo.com',
            description: 'Correo electrónico del usuario',
            uniqueItems: true,
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
    @MinLength(7)
    @MaxLength(20)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
          'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número o un carácter especial',
      })
    password: string;


    @ApiProperty({
        example: 'David',
        description: 'Nombre del usuario',
        required: true,
        minLength: 3,
    })
    @IsString()
    @MinLength(3)
    nombre: string;

    @ApiProperty({
        example: 'Delgado',
        description: 'Primer apellido del usuario',
        required: true,
        minLength: 3
    })
    @IsString()
    @MinLength(3)
    primerApellido: string;

    @ApiProperty({
        example: 'Medina',
        description: 'Segundo apellido del usuario',
        required: false,
        minLength: 3
    })
    @IsOptional()
    @IsString()
    @MinLength(3)
    segundoApellido?: string;

    @ApiProperty({
        example: '3001234567',
        description: 'Número de teléfono del usuario',
        required: true
    })
    @IsString()
    @IsMobilePhone('es-CO')
    @MinLength(8)
    telefono: string;
}
