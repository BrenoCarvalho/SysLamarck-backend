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
import { TenantService } from './tenant.service';
import { Tenant } from './tenant.entity';
import { TenantCreateDto } from './dto/tenant.create.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Tenant[]> {
    return this.tenantService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() params): Promise<Tenant> {
    return this.tenantService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':tenantCode')
  async update(
    @Param() params,
    @Body() data: TenantCreateDto,
  ): Promise<string> {
    return this.tenantService.update(params.tenantCode, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: TenantCreateDto): Promise<Tenant> {
    return await this.tenantService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':tenantCode')
  async delete(@Param() params): Promise<number> {
    return await this.tenantService.delete(params.tenantCode);
  }
}
