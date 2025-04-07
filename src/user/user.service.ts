import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { hash } from 'bcrypt';

import {
  userCompleteI,
  userI,
  userResponseI,
} from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createUser(CreateUserDto: CreateUserDto): Promise<userResponseI> {
    console.log('CreateUserDto', CreateUserDto);

    // Verificar si el usuario ya existe con la función findByEmail()
    const existingUser = await this.findByEmail(CreateUserDto.email);
    if (existingUser) {
      const userResponse: userResponseI = {
        message: 'user already exists',
        data: {
          email: CreateUserDto.email,
        },
      };

      return userResponse;
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword: string = await hash(CreateUserDto.password, 10);
    console.log('hashedPassword', hashedPassword);

    const user = this.userRepository.create({
      ...CreateUserDto,
      password: hashedPassword,
    });

    console.log('user antes de guardar:', user);

    try {
      const newUser = await this.userRepository.save(user);
      console.log('Usuario guardado en BD:', newUser);
      const userResponse: userResponseI = {
        message: 'user sussessfully created',
        data: {
          id: newUser.id,
          email: newUser.email,
          nombre: newUser.nombre,
          role: newUser.role,
        },
      };
      return userResponse;
    } catch (error) {
      console.error('❌ Error al guardar usuario en BD:', error);
      throw new InternalServerErrorException(
        'No se pudo registrar el usuario.',
      );
    }
  }

  async findByEmail(email: string): Promise<userI | undefined> {
    const user = this.userRepository
      .createQueryBuilder('u')
      .select(['u.id', 'u.email', 'u.nombre', 'u.role'])
      .where('u.email = :email', { email });
    const result: userI | undefined = await user.getRawOne();

    return result;
  }

  async findByEmailWithPassword(
    email: string,
  ): Promise<userCompleteI | undefined> {
    const user = this.userRepository
      .createQueryBuilder('u')
      .select(['u.id', 'id'])
      .addSelect('u.email', 'email')
      .addSelect('u.nombre', 'nombre')
      .addSelect('u.role', 'role')
      .addSelect('u.password', 'password')
      .where('u.email = :email', { email });
    const result: User | undefined = await user.getRawOne();

    return result;
  }
}
