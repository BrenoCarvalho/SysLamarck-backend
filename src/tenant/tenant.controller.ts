import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
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
  @Get('/:id/registrationForm')
  async registrationForm(@Param() params, @Res() res): Promise<void> {
    const buffer = await this.tenantService.registrationForm({
      tenantId: +params.id,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=registrationForm.pdf`,
      'Content-Length': buffer?.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    });

    res.end(buffer);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':tenantCode')
  async update(
    @Param() params: any,
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
  async delete(@Param() params: any): Promise<number> {
    return await this.tenantService.delete(params.tenantCode);
  }
}
