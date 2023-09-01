import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto): Promise<User | null> {
    const user = await this.authService.authenticate(authDto);
    if (!user) {
      throw new UnauthorizedException('Invalid Login Credentials');
    }
    // return User Information
    return user;
  }
}
