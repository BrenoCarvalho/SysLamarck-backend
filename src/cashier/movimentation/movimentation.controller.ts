import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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

  // @UseGuards(JwtAuthGuard)
  // @Get('findById/:id')
  // async findOne(@Param() params): Promise<Property> {
  //   return this.propertyService.findOne(params.id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('findByPropertyCode/:propertyCode')
  // async findByPropertyCode(@Param() params): Promise<Property> {
  //   return this.propertyService.findOneBy({
  //     propertyCode: params.propertyCode,
  //   });
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put(':id')
  // async update(
  //   @Param() params,
  //   @Body() data: PropertyCreateDto,
  // ): Promise<string> {
  //   return this.propertyService.update(params.id, data);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async create(@Body() data: PropertyCreateDto): Promise<string> {
  //   return await this.propertyService.create(data);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete(':id')
  // async delete(@Param() params): Promise<number> {
  //   return await this.propertyService.delete(params.id);
  // }
}
