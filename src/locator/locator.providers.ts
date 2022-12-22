import { DataSource } from 'typeorm';
import { Locator } from './locator.entity';

export const locatorProviders = [
  {
    provide: 'LOCATOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Locator),
    inject: ['DATA_SOURCE'],
  },
];
