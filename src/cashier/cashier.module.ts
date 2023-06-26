import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { cashierProviders } from './cashier.providers';
import { TransactionModule } from './transaction/transaction.module';
import { CashierController } from './cashier.controller';
import { CashierService } from './cashier.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => TransactionModule)],
  controllers: [CashierController],
  providers: [...cashierProviders, CashierService],
  exports: [CashierService],
})
export class CashierModule {}
