import { Module } from '@nestjs/common';
import { RentController } from './rent.controller';
import { rentProviders } from './rent.providers';
import { RentService } from './rent.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RentController],
  providers: [...rentProviders, RentService],
  exports: [RentService],
})
export class RentModule {}
