import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto, UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAllUser();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(+id);
  }
  @Post()
  create(@Body() user: User) {
    return this.userService.createUser(user);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Post('register')
  register(@Body() user: RegisterUserDto) {
    return this.userService.registerUser(user);
  }
  @Post('login')
  login(@Body() user: UserDto) {
    return this.userService.loginUser(user);
  }
}
