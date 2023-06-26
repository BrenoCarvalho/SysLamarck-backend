import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocatorModule } from './locator/locator.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';
import { TenantModule } from './tenant/tenant.module';
import { ReportModule } from './report/report.module';
import { CashierModule } from './cashier/cashier.module';

@Module({
  imports: [
    UserModule,
    LocatorModule,
    PropertyModule,
    TenantModule,
    ConfigModule.forRoot(),
    AuthModule,
    ReportModule,
    CashierModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
