import { Module } from '@nestjs/common';
import { MovimentationModule } from './movimentation/movimentation.module';

@Module({
  imports: [MovimentationModule],
})
export class CashierModule {}
