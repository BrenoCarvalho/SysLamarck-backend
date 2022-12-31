import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { contractProviders } from './contract.providers';
import { ContractService } from './contract.service';

@Module({
  imports: [DatabaseModule],
  providers: [...contractProviders, ContractService],
  exports: [ContractService],
})
export class ContractModule {}
