import { DataSource } from 'typeorm';
import { Property } from './property.entity';

export const propertyProviders = [
  {
    provide: 'PROPERTY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Property),
    inject: ['DATA_SOURCE'],
  },
];
