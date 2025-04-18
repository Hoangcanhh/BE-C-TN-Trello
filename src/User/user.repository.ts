import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUsers() {
    return this.userRepository.find();
  }

  async findUserById(user_id: number): Promise<UserDto | undefined> {
    return this.userRepository.findOne({ where: { user_id } });
  }

  async findUserByUsername(username: string): Promise<UserDto | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(user: User): Promise<UserDto> {
    const existingUser = await this.userRepository.findOne({
      where: { user_id: user.user_id },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }
    return this.userRepository.save(user);
  }
  //delete user
  async deleteUser(user: User): Promise<UserDto | undefined> {
    const existingUser = await this.userRepository.findOne({
      where: { user_id: user.user_id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.delete(existingUser);
    return user;
  }

  async updateUser(user: User): Promise<UserDto | undefined> {
    await this.userRepository.update({ user_id: user.user_id }, user);
    return this.userRepository.findOne({
      where: { user_id: user.user_id },
    });
  }
}