import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Property } from 'src/property/property.entity';
import { ReportService } from './report.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  @Post('/contractsCompletedByPeriod')
  async contractsCompletedByPeriod(@Body() body): Promise<Property[]> {
    return this.reportService.contractsCompletedByPeriod(
      body?.startDate,
      body?.endDate,
    );
  }
}
