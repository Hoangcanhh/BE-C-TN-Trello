import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginUserDto, RegisterUserDto, UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUsers() {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async createUser(user: UserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User | undefined> {
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(userId: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.delete(userId);
    return user;
  }

  async registerUser(RegisterUserDto: RegisterUserDto): Promise<User> {
    return await this.userRepository.save(RegisterUserDto);
  }

  async loginUser(LoginUserDto: LoginUserDto): Promise<User | undefined> {
    const { email, password } = LoginUserDto;
    return await this.userRepository.findOne({
      where: { email, password },
    });
  }
}
