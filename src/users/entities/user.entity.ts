import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {

    @ApiProperty({
        example: 'cd6b4b7b-3b1b-4b3b-8b3b-3b1b4b3b1b4b',
        description: 'Identificador único del usuario',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ApiProperty({
        example: 'email@ejemplo.com',
        description: 'Correo electrónico del usuario',
        uniqueItems: true,
        required: true
    })
    @Column('text', { unique: true })
    email: string

    @ApiProperty(
        {
            example: 'Clave1234',
            description: 'Contraseña del usuario'
        }
    )
    @Column('text', {
        select: false
    })
    password: string

    @ApiProperty({
        example: 'David',
        description: 'Nombre del usuario',
        required: true
    })
    @Column({
        name: 'nombre',
        type: 'text',
    })
    nombre: string

    @ApiProperty({
        example: 'Delgado',
        description: 'Primer apellido del usuario',
        required: true
    })
    @Column({
        name: 'primer_apellido',
        type: 'text',
    })
    primerApellido: string

    @ApiProperty({
        example: 'Medina',
        description: 'Segundo apellido del usuario',
        required: false
    })
    @Column({
        name: 'segundo_apellido',
        type: 'text',
        nullable: true
    })
    segundoApellido?: string

    @ApiProperty({
        example: '3001234567',
        description: 'Número de teléfono del usuario',
        required: true
    })
    @Column('text')
    telefono: string

    @ApiProperty()
    @Column('bool', {
        default: true
    })
    isActive: boolean

    @ApiProperty()
    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createAt: Date

    @ApiProperty()
    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updateAt: Date

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.email = this.email.toLowerCase().trim();
    }
}
