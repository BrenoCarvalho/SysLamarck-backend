import { Module, forwardRef } from '@nestjs/common';
import { contractProviders } from './contract.providers';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { InstallmentModule } from './installment/installment.module';
import { DatabaseModule } from 'src/database/database.module';
import { BailModule } from './bail/bail.module';
import { TenantModule } from '../tenant.module';

@Module({
  controllers: [ContractController],
  imports: [
    DatabaseModule,
    forwardRef(() => TenantModule),
    InstallmentModule,
    BailModule,
  ],
  providers: [...contractProviders, ContractService],
  exports: [ContractService],
})
export class ContractModule {}
