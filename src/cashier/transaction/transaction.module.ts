import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TransactionService } from './transaction.service';
import { transactionProviders } from './transaction.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...transactionProviders, TransactionService],
})
export class TransactionModule {}
