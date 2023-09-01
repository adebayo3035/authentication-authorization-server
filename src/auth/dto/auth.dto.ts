/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
