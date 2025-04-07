import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { userCompleteI, userI } from 'src/user/interfaces/user.interface';
import { LoginUserDto } from 'src/user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<userI | null> {
    const user: userCompleteI | undefined =
      await this.userService.findByEmailWithPassword(email);

    console.log('user', user);
    if (user && (await compare(password, user.password))) {
      return {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
      };
    }
    return null;
  }

  async login(loginAuth: LoginUserDto) {
    const { email, password } = loginAuth;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
