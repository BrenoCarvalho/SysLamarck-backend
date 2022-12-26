import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LocatorService } from './locator.service';
import { Locator } from './locator.entity';
import { LocatorCreateDto } from './dto/locator.create.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('locator')
export class LocatorController {
  constructor(private readonly locatorService: LocatorService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Locator[]> {
    return this.locatorService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() params): Promise<Locator> {
    return this.locatorService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param() params,
    @Body() data: LocatorCreateDto,
  ): Promise<string> {
    return this.locatorService.update(params.id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: LocatorCreateDto): Promise<string> {
    return await this.locatorService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params): Promise<number> {
    return await this.locatorService.delete(params.id);
  }
}
