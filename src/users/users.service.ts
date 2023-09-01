import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const existingUsername = await this.findByUsername(user.username);
    const existingPhoneNumber = await this.findByPhoneNumber(user.phoneNumber);
    const existingEmail = await this.findByEmail(user.email);
    if (existingUsername || existingPhoneNumber || existingEmail) {
      throw new BadRequestException(
        'Username or phone number or Email already exists.',
      );
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    const allUsersFromDb = await this.userRepository.find();
    return allUsersFromDb;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const existingUsername = this.userRepository.findOne({
      where: { username },
    });
    if (!existingUsername) {
      throw new NotFoundException('This Username does not exist');
    }
    return existingUsername;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    const existingPhoneNumber = this.userRepository.findOne({
      where: { phoneNumber },
    });
    if (!existingPhoneNumber) {
      throw new NotFoundException('This Phone Number does not exist.');
    }
    return existingPhoneNumber;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const existingEmail = this.userRepository.findOne({ where: { email } });
    if (!existingEmail) {
      throw new NotFoundException('This E-mail Address does not exist.');
    }
    return existingEmail;
  }

  async findById(id: number): Promise<User | undefined> {
    const existingId = this.userRepository.findOne({ where: { id } });
    if (!existingId) {
      throw new NotFoundException('This ID does not exist.');
    }
    return existingId;
  }

  // UPDATE SERVICES
  async updateById(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne(id);
  }

  async updateByEmail(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    await this.userRepository.update({ email }, updateUserDto);
    return this.userRepository.findOne({ where: { email } });
  }

  async updateByUsername(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    await this.userRepository.update({ username }, updateUserDto);
    return this.userRepository.findOne({ where: { username } });
  }

  async updateByPhoneNumber(
    phoneNumber: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    await this.userRepository.update({ phoneNumber }, updateUserDto);
    return this.userRepository.findOne({ where: { phoneNumber } });
  }

  // DELETE SERVICES

  async deleteUserByEmail(email: string): Promise<User | null> {
    // always add curly braces to parameter when deleting with a string { email }
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return await this.userRepository.delete({ email });
  }

  async deleteUserByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return null;
    }
    return await this.userRepository.delete({ username });
  }

  async deleteUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { phoneNumber } });
    if (!user) {
      return null;
    }
    return await this.userRepository.delete({ phoneNumber });
  }

  async deleteUserById(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
