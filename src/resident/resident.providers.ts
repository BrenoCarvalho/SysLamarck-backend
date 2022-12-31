import { DataSource } from 'typeorm';
import { Resident } from './resident.entity';

export const residentProviders = [
  {
    provide: 'RESIDENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Resident),
    inject: ['DATA_SOURCE'],
  },
];
