import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { propertyProviders } from './property.providers';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { LocatorModule } from 'src/locator/locator.module';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  imports: [DatabaseModule, LocatorModule, TenantModule],
  controllers: [PropertyController],
  providers: [...propertyProviders, PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
