import { DataSource } from 'typeorm';
import { TransactionDataTemplate } from './dataTemplate.entity';

export const dataTemplateProviders = [
  {
    provide: 'TRANSACTIONDATATEMPLATE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TransactionDataTemplate),
    inject: ['DATA_SOURCE'],
  },
];
