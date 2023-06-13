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
import { PropertyService } from './property.service';
import { Property } from './property.entity';
import { PropertyCreateDto } from './dto/property.create.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Property[]> {
    return this.propertyService.findAll({ relations: { locator: true } });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() params, @Query() query): Promise<Property> {
    return this.propertyService.findOne(
      params.id,
      !!Number(query?.showLocator),
      !!Number(query?.showTenant),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('findByPropertyCode/:propertyCode')
  async findByPropertyCode(@Param() params): Promise<Property> {
    return this.propertyService.findOneBy({
      propertyCode: params.propertyCode,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param() params,
    @Body() data: PropertyCreateDto,
  ): Promise<string> {
    return this.propertyService.update(params.id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: PropertyCreateDto): Promise<string> {
    return await this.propertyService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params): Promise<number> {
    return await this.propertyService.delete(params.id);
  }
}
