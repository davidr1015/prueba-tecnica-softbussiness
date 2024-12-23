import { IsOptional } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    email: string

    @Column('text', {
        select: false
    })
    password: string

    @Column({
        name: 'nombre',
        type: 'text',
    })
    nombre: string

    @Column({
        name: 'primer_apellido',
        type: 'text',
    })
    primerApellido: string


    @Column({
        name: 'segundo_apellido',
        type: 'text',
        nullable: true
    })
    segundoApellido?: string

    @Column('text')
    telefono: string

    @Column('bool', {
        default: true
    })
    isActive: boolean

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createAt: Date

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
