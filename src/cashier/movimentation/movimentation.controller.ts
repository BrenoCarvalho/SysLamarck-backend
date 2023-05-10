import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MovimentationService } from './movimentation.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MovimentationCreateDto } from './dto/movimentation.create.dto';
import { Movimentation } from './movimentation.entity';

@Controller('movimentation')
export class MovimentationController {
  constructor(private readonly movimentationService: MovimentationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: MovimentationCreateDto): Promise<string> {
    return this.movimentationService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Movimentation[]> {
    return this.movimentationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params): Promise<number> {
    return await this.movimentationService.delete(params.id);
  }
}
