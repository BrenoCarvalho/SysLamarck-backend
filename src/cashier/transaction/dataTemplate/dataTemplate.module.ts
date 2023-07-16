import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DataTemplateController } from './dataTemplate.controller';
import { dataTemplateProviders } from './dataTemplate.providers';
import { DataTemplateService } from './dataTemplate.service';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => TenantModule)],
  controllers: [DataTemplateController],
  providers: [...dataTemplateProviders, DataTemplateService],
})
export class DataTemplateModule {}
