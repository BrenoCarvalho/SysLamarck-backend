import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TransactionService } from './transaction.service';
import { transactionProviders } from './transaction.providers';
import { TransactionController } from './transaction.controller';
import { CashierModule } from '../cashier.module';
import { DataTemplateModule } from './dataTemplate/dataTemplate.module';

@Module({
  imports: [DatabaseModule, CashierModule, DataTemplateModule],
  controllers: [TransactionController],
  providers: [...transactionProviders, TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
