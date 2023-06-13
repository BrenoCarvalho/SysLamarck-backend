import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  async findAll(@Query() query): Promise<Locator[]> {
    return this.locatorService.findAll(!!Number(query?.showProperties));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() params, @Query() query): Promise<Locator> {
    return this.locatorService.findOne(
      params.id,
      !!Number(query?.showProperties),
    );
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
