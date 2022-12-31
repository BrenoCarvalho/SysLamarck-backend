import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { locatorProviders } from './locator.providers';
import { LocatorService } from './locator.service';
import { LocatorController } from './locator.controller';
import { PropertyModule } from 'src/property/property.module';

@Module({
  imports: [DatabaseModule, PropertyModule],
  controllers: [LocatorController],
  providers: [...locatorProviders, LocatorService],
  exports: [LocatorService],
})
export class LocatorModule {}
