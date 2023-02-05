import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { PropertyModule } from 'src/property/property.module';

@Module({
  imports: [PropertyModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
