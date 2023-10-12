import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Property } from 'src/property/property.entity';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/propertyForSale')
  async propertyForSale(): Promise<Property[]> {
    return this.reportService.propertyForSale();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/propertyVacant')
  async propertyVacant(): Promise<Property[]> {
    return this.reportService.propertyVacant();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/propertyByLocator/:locatorCode')
  async propertyByLocator(@Param() params): Promise<Property[]> {
    return this.reportService.propertyByLocator(params?.locatorCode);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/contractsByMonth')
  async readjustmentContracts(@Query() query): Promise<Property[]> {
    return this.reportService.contractsByMonth(query.month, query.type);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/contractsByPeriod')
  async contractsByPeriod(@Body() body): Promise<Property[]> {
    return this.reportService.contractsByPeriod(
      body?.startDate,
      body?.endDate,
      body?.mode,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/rgiEdp')
  async rgiEdp(): Promise<Property[]> {
    return this.reportService.rgiEdp();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/propertyTax')
  async propertyTax(): Promise<Property[]> {
    return this.reportService.propertyTax();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/registrationForm')
  async registrationForm(@Query() query): Promise<any> {
    return this.reportService.registrationForm(query.tenantCode);
  }
}
