import { Module } from '@nestjs/common';
import { contractProviders } from './contract.providers';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { InstallmentModule } from './installment/installment.module';
import { DatabaseModule } from 'src/database/database.module';
import { BailModule } from './bail/bail.module';

@Module({
  controllers: [ContractController],
  imports: [DatabaseModule, InstallmentModule, BailModule],
  providers: [...contractProviders, ContractService],
  exports: [ContractService],
})
export class ContractModule {}
