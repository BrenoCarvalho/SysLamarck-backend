import { DataSource } from 'typeorm';
import { Installment } from './installment.entity';

export const installmentProviders = [
  {
    provide: 'INSTALLMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Installment),
    inject: ['DATA_SOURCE'],
  },
];
