import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserCreateDto } from './dto/user.create.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findOne(@Param() params): Promise<User> {
    const data = await this.userService.findOne(params.username);

    if (data?.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = data;
      return user;
    }

    return data;
  }

  @Post()
  async create(@Body() data: UserCreateDto): Promise<string> {
    return await this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params): Promise<number> {
    return await this.userService.delete(params.id);
  }
}
