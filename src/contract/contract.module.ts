import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { contractProviders } from './contract.providers';
import { ContractService } from './contract.service';
import { RentModule } from 'src/cashier/rent/rent.module';
import { ContractController } from './contract.controller';

@Module({
  controllers: [ContractController],
  imports: [DatabaseModule, forwardRef(() => RentModule)],
  providers: [...contractProviders, ContractService],
  exports: [ContractService],
})
export class ContractModule {}
