import { Transaction } from 'src/cashier/transaction/transaction.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Contract } from '../contract.entity';

@Entity()
export class Installment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contract, { onDelete: 'CASCADE', nullable: false })
  contract: Contract;

  @Column({ length: 20 })
  currentInstallment: string;

  @Column('date')
  dueDate: Date;

  @Column({ length: 20 })
  referenceMonth: string;

  @Column('float')
  amount: number;

  @Column({
    type: 'enum',
    enum: ['Pg', 'Dv', 'Ca'],
    default: 'Dv',
  })
  status: 'Pg' | 'Dv' | 'Ca';

  @OneToMany(() => Transaction, (transaction) => transaction.installment)
  transaction: Transaction[];

  @CreateDateColumn()
  createdAt: Date;
}
