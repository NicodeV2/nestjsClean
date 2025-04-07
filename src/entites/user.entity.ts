import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users', database: 'hermes' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único del usuario' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'user@example.com',
  })
  email: string;

  @Column()
  password: string;

  @Column()
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan Pérez' })
  nombre: string;

  @Column()
  @ApiProperty({
    description: 'Rol del usuario',
    example: 'admin',
  })
  role: string;
}
