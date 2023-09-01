import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // Import UserModule
import { User } from '../users/users.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])], // Include UserModule here
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Export AuthService if needed
})
export class AuthModule {}
