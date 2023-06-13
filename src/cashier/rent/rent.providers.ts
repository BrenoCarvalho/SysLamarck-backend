import { DataSource } from 'typeorm';
import { Rent } from './rent.entity';

export const rentProviders = [
  {
    provide: 'RENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Rent),
    inject: ['DATA_SOURCE'],
  },
];
