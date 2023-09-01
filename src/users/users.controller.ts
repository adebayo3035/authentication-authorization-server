import {
  Controller,
  Post,
  Body,
  Get,
  //   Patch,
  Delete,
  Param,
  Put,
  BadRequestException,
  NotFoundException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './users.entity';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    // ... (rest of the code remains the same)
    const existingUsername = await this.usersService.findByUsername(
      createUserDto.username,
    );
    const existingPhoneNumber = await this.usersService.findByPhoneNumber(
      createUserDto.phoneNumber,
    );
    const existingEmail = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existingUsername || existingPhoneNumber || existingEmail) {
      throw new BadRequestException(
        'Username or phone number or Email already exists.',
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    return this.usersService.create(createUserDto);
  }

  //   READ OPERATIONS

  @Get('/')
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findById(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('/username/:username')
  async getUserByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('/phoneNumber/:phoneNumber')
  async getUserByPhoneNumber(
    @Param('phoneNumber') phoneNumber: string,
  ): Promise<User> {
    const user = await this.usersService.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // UPDATE OPERATIONS

  @Put('/update/email/:email')
  async updateByEmail(
    @Param('email') email: string,
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    // Retrieve the existing user from the database
    const existingUser = await this.usersService.findByEmail(email);
    if (!existingUser) {
      throw new NotFoundException(`User with E-mail '${email}' not found`);
    }
    // Block updates to email, username, and phoneNumber
    updateUserDto.email = existingUser.email;
    updateUserDto.username = existingUser.username;
    updateUserDto.phoneNumber = existingUser.phoneNumber;
    // If the password is included in the update request, hash it
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }
    // eslint-disable-next-line prettier/prettier
    res.status(HttpStatus.OK).json({ message: 'User Information has been successfully Updated' });
    return await this.usersService.updateByEmail(email, updateUserDto);
  }

  // UPDATE BY USERNAME
  @Put('/update/username/:username')
  async updateByUsername(
    @Param('username') username: string,
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    // Retrieve the existing user from the database
    const existingUser = await this.usersService.findByUsername(username);
    if (!existingUser) {
      throw new NotFoundException(`User with Username '${username}' not found`);
    }
    // Block updates to email, username, and phoneNumber
    updateUserDto.email = existingUser.email;
    updateUserDto.username = existingUser.username;
    updateUserDto.phoneNumber = existingUser.phoneNumber;
    // If the password is included in the update request, hash it
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }
    res
      .status(HttpStatus.OK)
      .json({ message: 'User Information has been successfully Updated' });
    return await this.usersService.updateByUsername(username, updateUserDto);
  }

  // UPDATE BY PHONE NUMBER
  @Put('/update/phone/:phoneNumber')
  async updateByPhoneNumber(
    @Param('phoneNumber') phoneNumber: string,
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    // Retrieve the existing user from the database
    const existingUser = await this.usersService.findByPhoneNumber(phoneNumber);
    if (!existingUser) {
      throw new NotFoundException(
        `User with Phone Number '${phoneNumber}' not found`,
      );
    }
    // Block updates to email, username, and phoneNumber
    updateUserDto.email = existingUser.email;
    updateUserDto.username = existingUser.username;
    updateUserDto.phoneNumber = existingUser.phoneNumber;
    // If the password is included in the update request, hash it
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }
    res
      .status(HttpStatus.OK)
      .json({ message: 'User Information has been successfully Updated' });
    return await this.usersService.updateByPhoneNumber(
      phoneNumber,
      updateUserDto,
    );
  }

  //   DELETE OPERATIONS
  // Delete By E-mail Address
  @Delete('/delete/email/:email')
  async deleteUserByEmail(
    @Param('email') email: string,
    @Res() res: Response,
  ): Promise<void> {
    const deletedUser = await this.usersService.deleteUserByEmail(email);

    if (!deletedUser) {
      throw new NotFoundException(
        `User with the email: '${email}' does not exist`,
      );
    }
    res
      .status(HttpStatus.OK)
      .json({ message: 'User Information has been successfully Deleted' });
  }
  // Delete By Username
  @Delete('/delete/username/:username')
  async deleteUserByUsername(
    @Param('username') username: string,
    @Res() res: Response,
  ): Promise<void> {
    const deletedUser = await this.usersService.deleteUserByUsername(username);
    if (!deletedUser) {
      throw new NotFoundException(
        `User with the Username: '${username}' does not exist`,
      );
    }
    res
      .status(HttpStatus.OK)
      .json({ message: 'User Information has been successfully Deleted' });
  }
  // Delete By Phone Number
  @Delete('/delete/phone/:phoneNumber')
  async deleteUserByPhoneNumber(
    @Param('phoneNumber') phoneNumber: string,
    @Res() res: Response,
  ): Promise<void> {
    const deletedUser =
      await this.usersService.deleteUserByPhoneNumber(phoneNumber);

    if (!deletedUser) {
      throw new NotFoundException(
        `User with the Phone Number: '${phoneNumber}' does not exist`,
      );
    }
    res
      .status(HttpStatus.OK)
      .json({ message: 'User Information has been successfully Deleted' });
  }
}
