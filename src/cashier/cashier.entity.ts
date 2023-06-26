import { Transaction } from 'src/cashier/transaction/transaction.entity';
import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class Cashier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: true })
  name: string;

  @Column({
    type: 'enum',
    enum: ['open', 'closed'],
  })
  status: 'open' | 'closed';

  @Column({
    type: 'datetime',
    nullable: true,
  })
  closedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.cashier)
  transaction: Transaction[];

  @CreateDateColumn()
  createdAt: Date;
}
