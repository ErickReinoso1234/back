import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Formulario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  correo: string;

  @Column()
  cedula: string;
}
