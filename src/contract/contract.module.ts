import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { contractProviders } from './contract.providers';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { InstallmentModule } from './installment/installment.module';

@Module({
  controllers: [ContractController],
  imports: [DatabaseModule, InstallmentModule],
  providers: [...contractProviders, ContractService],
  exports: [ContractService],
})
export class ContractModule {}
