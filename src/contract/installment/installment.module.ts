import { Module } from '@nestjs/common';
import { installmentProviders } from './installment.providers';
import { InstallmentService } from './installment.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...installmentProviders, InstallmentService],
  exports: [InstallmentService],
})
export class InstallmentModule {}
