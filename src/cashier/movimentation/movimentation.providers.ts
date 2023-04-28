import { DataSource } from 'typeorm';
import { Movimentation } from './movimentation.entity';

export const movimentationProviders = [
  {
    provide: 'MOVIMENTATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Movimentation),
    inject: ['DATA_SOURCE'],
  },
];
