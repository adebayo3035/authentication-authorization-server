/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsDateString, IsString, Length, IsEnum } from 'class-validator';
import { Gender } from 'src/enums/gender.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  username: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Length(11,11, { message: 'phoneNumber must be exactly 11 characters' }) // Custom error message)
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20) //Minimum length of 6 and maximum length of 20 characters
  password: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;


}
