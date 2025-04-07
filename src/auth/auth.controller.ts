import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'JWT generado correctamente' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  async login(@Body() loginObject: LoginUserDto) {
    return this.authService.login(loginObject);
  }
}
