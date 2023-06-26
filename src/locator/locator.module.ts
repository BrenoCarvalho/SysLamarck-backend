import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { locatorProviders } from './locator.providers';
import { LocatorService } from './locator.service';
import { LocatorController } from './locator.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [LocatorController],
  providers: [...locatorProviders, LocatorService],
  exports: [LocatorService],
})
export class LocatorModule {}
