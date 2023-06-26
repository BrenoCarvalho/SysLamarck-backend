import { Module, forwardRef } from '@nestjs/common';
import { installmentProviders } from './installment.providers';
import { InstallmentService } from './installment.service';
import { DatabaseModule } from 'src/database/database.module';
import { InstallmentController } from './installment.controller';
import { TransactionModule } from 'src/cashier/transaction/transaction.module';
import { ContractModule } from '../contract.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => ContractModule),
    TransactionModule,
  ],
  providers: [...installmentProviders, InstallmentService],
  controllers: [InstallmentController],
  exports: [InstallmentService],
})
export class InstallmentModule {}
