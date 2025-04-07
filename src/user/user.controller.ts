/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { userI, userResponseI } from './interfaces/user.interface';
import { User } from 'src/entites/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Error en la creación del usuario' })
  async register(@Body() createUserDto: CreateUserDto): Promise<userResponseI> {
    try {
      console.log('createUserDto', createUserDto);
      const user: userResponseI =
        await this.userService.createUser(createUserDto);
      // Retornar solo los datos necesarios, excluyendo la contraseña
      return user;
    } catch (error) {
      throw new Error('No se pudo registrar el usuario');
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // 🔒 Swagger mostrará el candado
  @ApiOperation({ summary: 'Obtener información del usuario autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Datos del usuario autenticado',
    type: User,
  })
  async getUserProfile(@Request() req): Promise<userI | undefined> {
    const user: userI | undefined = await this.userService.findByEmail(
      req.user.email,
    );
    return user;
  }
}
