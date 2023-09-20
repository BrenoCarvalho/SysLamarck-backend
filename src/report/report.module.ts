import { Module, forwardRef } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { PropertyModule } from 'src/property/property.module';
import { TenantModule } from 'src/tenant/tenant.module';
import { LocatorModule } from 'src/locator/locator.module';
import { ContractModule } from 'src/tenant/contract/contract.module';

@Module({
  imports: [],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
