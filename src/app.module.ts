import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocatorModule } from './locator/locator.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [LocatorModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
