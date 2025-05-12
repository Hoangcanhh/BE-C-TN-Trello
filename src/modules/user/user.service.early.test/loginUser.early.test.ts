import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';

jest.mock('../user.repository');
jest.mock('bcryptjs');

describe('UserService.loginUser() loginUser method', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedPassword',
    // add other required User properties as needed
  } as User;

  const loginUserDto: LoginUserDto = {
    email: 'test@example.com',
    password: 'plainPassword',
  };

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      loginUser: jest.fn(),
      // add other UserRepository methods if needed
    } as unknown as jest.Mocked<UserRepository>;
    userService = new UserService(userRepository);
    jest.clearAllMocks();
  });

  // Happy Paths
  describe('Happy paths', () => {
    it('should successfully login a user with correct email and password', async () => {
      // This test ensures that a user with valid credentials is logged in successfully.
      userRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      userRepository.loginUser.mockResolvedValue(mockUser);

      const result = await userService.loginUser(loginUserDto);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        loginUserDto.email,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginUserDto.password,
        mockUser.password,
      );
      expect(userRepository.loginUser).toHaveBeenCalledWith(loginUserDto);
      expect(result).toBe(mockUser);
    });

    it('should allow login for users with different valid emails and passwords', async () => {
      // This test checks that the method works for another valid user.
      const anotherUser: User = {
        id: 2,
        email: 'another@example.com',
        password: 'anotherHashedPassword',
        // add other required User properties as needed
      } as User;
      const anotherLoginDto: LoginUserDto = {
        email: 'another@example.com',
        password: 'anotherPlainPassword',
      };
      userRepository.findByEmail.mockResolvedValue(anotherUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      userRepository.loginUser.mockResolvedValue(anotherUser);

      const result = await userService.loginUser(anotherLoginDto);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        anotherLoginDto.email,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        anotherLoginDto.password,
        anotherUser.password,
      );
      expect(userRepository.loginUser).toHaveBeenCalledWith(anotherLoginDto);
      expect(result).toBe(anotherUser);
    });
  });

  // Edge Cases
  describe('Edge cases', () => {
    it('should throw BadRequestException if email is not found', async () => {
      // This test ensures that an error is thrown if the email does not exist in the database.
      userRepository.findByEmail.mockResolvedValue(undefined);

      await expect(userService.loginUser(loginUserDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        loginUserDto.email,
      );
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(userRepository.loginUser).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      // This test ensures that an error is thrown if the password is incorrect.
      userRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(userService.loginUser(loginUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        loginUserDto.email,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginUserDto.password,
        mockUser.password,
      );
      expect(userRepository.loginUser).not.toHaveBeenCalled();
    });

    it('should handle passwords with special characters', async () => {
      // This test checks that passwords with special characters are handled correctly.
      const specialCharLoginDto: LoginUserDto = {
        email: 'test@example.com',
        password: '!@#$$%^&*()_+',
      };
      userRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      userRepository.loginUser.mockResolvedValue(mockUser);

      const result = await userService.loginUser(specialCharLoginDto);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        specialCharLoginDto.email,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        specialCharLoginDto.password,
        mockUser.password,
      );
      expect(userRepository.loginUser).toHaveBeenCalledWith(
        specialCharLoginDto,
      );
      expect(result).toBe(mockUser);
    });

    it('should propagate errors thrown by userRepository.findByEmail', async () => {
      // This test ensures that unexpected errors from findByEmail are propagated.
      const error = new Error('Database error');
      userRepository.findByEmail.mockRejectedValue(error);

      await expect(userService.loginUser(loginUserDto)).rejects.toThrow(error);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        loginUserDto.email,
      );
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(userRepository.loginUser).not.toHaveBeenCalled();
    });

    it('should propagate errors thrown by bcrypt.compare', async () => {
      // This test ensures that unexpected errors from bcrypt.compare are propagated.
      userRepository.findByEmail.mockResolvedValue(mockUser);
      const error = new Error('bcrypt error');
      (bcrypt.compare as jest.Mock).mockRejectedValue(error);

      await expect(userService.loginUser(loginUserDto)).rejects.toThrow(error);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        loginUserDto.email,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginUserDto.password,
        mockUser.password,
      );
      expect(userRepository.loginUser).not.toHaveBeenCalled();
    });

    it('should propagate errors thrown by userRepository.loginUser', async () => {
      // This test ensures that unexpected errors from loginUser are propagated.
      userRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      const error = new Error('loginUser error');
      userRepository.loginUser.mockRejectedValue(error);

      await expect(userService.loginUser(loginUserDto)).rejects.toThrow(error);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        loginUserDto.email,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginUserDto.password,
        mockUser.password,
      );
      expect(userRepository.loginUser).toHaveBeenCalledWith(loginUserDto);
    });
  });
});
