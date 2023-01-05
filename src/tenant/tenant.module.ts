import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tenantProviders } from './tenant.providers';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { ContractModule } from 'src/contract/contract.module';
import { BailModule } from 'src/bail/bail.module';

@Module({
  imports: [DatabaseModule, ContractModule, BailModule],
  controllers: [TenantController],
  providers: [...tenantProviders, TenantService],
  exports: [TenantService],
})
export class TenantModule {}
