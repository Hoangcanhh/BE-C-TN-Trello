import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto, RegisterUserDto, UserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAllUser(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findUserById(id);
  }

  async createUser(user: User): Promise<User | undefined> {
    // Validate the user data here if needed
    const existingEmail = await this.userRepository.findByEmail(user.email);
    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }
    const existingUsername = await this.userRepository.findByUsername(
      user.username,
    );
    if (existingUsername) {
      throw new BadRequestException('Username already exists');
    }

    return this.userRepository.createUser(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findUserById(id);

    // Kiểm tra email nếu có cập nhật
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.userRepository.findByEmail(
        updateUserDto.email,
      );
      if (existingEmail) {
        throw new BadRequestException('Email already exists');
      }
    }
    // Cập nhật thông tin
    Object.assign(user, updateUserDto);
    return this.userRepository.updateUser(id, user);
  }

  async remove(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.userRepository.deleteUser(id);
  }

  async registerUser(registerUser: RegisterUserDto): Promise<User | undefined> {
    const existingUserByUsername = await this.userRepository.findByUsername(registerUser.username);
    if (existingUserByUsername) {
      throw new BadRequestException('Username already exists');
    }
    const existingUserByEmail = await this.userRepository.findByEmail(registerUser.email);
    if (existingUserByEmail) {
      throw new BadRequestException('Email already exists');
    }
    if (registerUser.password !== registerUser.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    // const hashedPassword = await bcrypt.hash(registerUser.password, 10);
    const registerUserDto: RegisterUserDto = {
      ...registerUser,
      // password: hashedPassword,
    };
    return this.userRepository.registerUser(registerUserDto);
  }

  async loginUser(loginUser: LoginUserDto): Promise<User | undefined> {
    const existingEmail = await this.userRepository.findByEmail(loginUser.email)
    if(!existingEmail) {
      throw new BadRequestException('Email not found')
    }
    const isPasswordValid = loginUser.password === existingEmail.password;
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid password');
  }
    
    return existingEmail;
  }
}

