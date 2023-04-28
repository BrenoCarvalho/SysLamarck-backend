import { Controller, Get } from '@nestjs/common';
import { MovimentationService } from './movimentation.service';

@Controller('movimentation')
export class MovimentationController {
  constructor(private readonly movimentationService: MovimentationService) {}

  @Get()
  async findAll(): Promise<any> {
    return 'hello';
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // async findAll(): Promise<Property[]> {
  //   return this.propertyService.findAll();
  // }

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
