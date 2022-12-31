import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { bailProviders } from './bail.providers';
import { BailService } from './bail.service';

@Module({
  imports: [DatabaseModule],
  providers: [...bailProviders, BailService],
  exports: [BailService],
})
export class BailModule {}
