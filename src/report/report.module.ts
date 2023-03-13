import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { PropertyModule } from 'src/property/property.module';
import { TenantModule } from 'src/tenant/tenant.module';
import { LocatorModule } from 'src/locator/locator.module';

@Module({
  imports: [PropertyModule, TenantModule, LocatorModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
