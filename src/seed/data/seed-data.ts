import { CreateUserDto } from "src/users/dto";
import * as bcrypt from 'bcrypt';


export const initialUsers: CreateUserDto[] = [
    {
        email: 'ejemplo1@gmail.com',
        password: bcrypt.hashSync('Clave123', 10),
        nombre: 'David',
        primerApellido: 'Delgado',
        segundoApellido: 'Medina',
        telefono: '3001234567',
    },
    {
        email: 'ejemplo2@gmail.com',
        password: bcrypt.hashSync('Clave456', 10),
        nombre: 'Juan',
        primerApellido: 'Perez',
        segundoApellido: 'Gomez',
        telefono: '3007654321',

    }
]