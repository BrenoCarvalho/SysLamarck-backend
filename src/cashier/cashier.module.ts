import { Module } from '@nestjs/common';
import { RentModule } from './rent/rent.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [RentModule, TransactionModule],
})
export class CashierModule {}
