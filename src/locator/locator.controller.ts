import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LocatorService } from './locator.service';
import { Locator } from './locator.entity';
import { LocatorCreateDto } from './dto/locator.create.dto';

@Controller('locator')
export class LocatorController {
  constructor(private readonly locatorService: LocatorService) {}

  @Get()
  async findAll(): Promise<Locator[]> {
    return this.locatorService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Locator> {
    return this.locatorService.findOne(params.id);
  }

  @Put(':id')
  async update(
    @Param() params,
    @Body() data: LocatorCreateDto,
  ): Promise<string> {
    return this.locatorService.update(params.id, data);
  }

  @Post()
  async create(@Body() data: LocatorCreateDto): Promise<string> {
    return await this.locatorService.create(data);
  }

  @Delete(':id')
  async delete(@Param() params): Promise<number> {
    return await this.locatorService.delete(params.id);
  }
}
