import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tenantProviders } from './tenant.providers';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { PropertyModule } from 'src/property/property.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [DatabaseModule, ContractModule, forwardRef(() => PropertyModule)],
  controllers: [TenantController],
  providers: [...tenantProviders, TenantService],
  exports: [TenantService],
})
export class TenantModule {}
