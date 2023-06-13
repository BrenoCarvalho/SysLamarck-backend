import { Contract } from 'src/contract/contract.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contract, {
    onDelete: 'CASCADE',
  })
  contract: Contract;

  @Column()
  installmentNumber: number;

  @Column('date')
  dueDate: Date;

  @Column({ length: 20 })
  referenceMonth: string;

  @Column('float')
  amount: number;

  @Column({ length: 20 })
  status: string;

  @OneToMany(() => Transaction, (transaction) => transaction.rent)
  transaction: Transaction[];

  @CreateDateColumn()
  createdAt: Date;
}
