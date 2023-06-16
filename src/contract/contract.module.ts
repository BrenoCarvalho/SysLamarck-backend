import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { contractProviders } from './contract.providers';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { InstallmentModule } from './installment/installment.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  controllers: [ContractController],
  imports: [DatabaseModule, InstallmentModule, TransactionModule],
  providers: [...contractProviders, ContractService],
  exports: [ContractService],
})
export class ContractModule {}
