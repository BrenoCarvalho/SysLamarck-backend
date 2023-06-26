import { Module } from '@nestjs/common';
import { bailProviders } from './bail.providers';
import { BailService } from './bail.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...bailProviders, BailService],
  exports: [BailService],
})
export class BailModule {}
