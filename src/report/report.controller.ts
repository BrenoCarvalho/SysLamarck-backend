import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
