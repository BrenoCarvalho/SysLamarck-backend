import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { cashierProviders } from './cashier.providers';
import { TransactionModule } from './transaction/transaction.module';
import { CashierController } from './cashier.controller';
import { CashierService } from './cashier.service';
import { ContractModule } from 'src/tenant/contract/contract.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => TransactionModule),
    forwardRef(() => ContractModule),
  ],
  controllers: [CashierController],
  providers: [...cashierProviders, CashierService],
  exports: [CashierService],
})
export class CashierModule {}
