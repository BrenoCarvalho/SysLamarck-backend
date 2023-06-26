import { DataSource } from 'typeorm';
import { Cashier } from './cashier.entity';

export const cashierProviders = [
  {
    provide: 'CASHIER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cashier),
    inject: ['DATA_SOURCE'],
  },
];
