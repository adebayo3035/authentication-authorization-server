import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async authenticate(loginDetails: AuthDto): Promise<User | null> {
    const user = await this.usersService.findByUsername(loginDetails.username);

    if (!user) {
      return null;
    }
    try {
      const passwordMatch = await bcrypt.compare(
        loginDetails.password,
        user.password,
      );
      if (passwordMatch) {
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error during password comparison', error);
      return null;
    }
  }
}
