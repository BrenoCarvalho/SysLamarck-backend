import { DataSource } from 'typeorm';
import { Bail } from './bail.entity';

export const bailProviders = [
  {
    provide: 'BAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Bail),
    inject: ['DATA_SOURCE'],
  },
];
