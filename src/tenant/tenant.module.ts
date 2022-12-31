import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tenantProviders } from './tenant.providers';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { ContractModule } from 'src/contract/contract.module';
import { BailModule } from 'src/bail/bail.module';
import { ResidentModule } from 'src/resident/resident.module';

@Module({
  imports: [DatabaseModule, ContractModule, BailModule, ResidentModule],
  controllers: [TenantController],
  providers: [...tenantProviders, TenantService],
  exports: [TenantService],
})
export class TenantModule {}
