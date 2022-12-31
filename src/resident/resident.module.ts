import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { residentProviders } from './resident.providers';
import { ResidentService } from './resident.service';

@Module({
  imports: [DatabaseModule],
  providers: [...residentProviders, ResidentService],
  exports: [ResidentService],
})
export class ResidentModule {}
