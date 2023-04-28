import { Module } from '@nestjs/common';
import { MovimentationController } from './movimentation.controller';
import { movimentationProviders } from './movimentation.providers';
import { MovimentationService } from './movimentation.service';

@Module({
  controllers: [MovimentationController],
  providers: [...movimentationProviders, MovimentationService],
  exports: [MovimentationService],
})
export class MovimentationModule {}
