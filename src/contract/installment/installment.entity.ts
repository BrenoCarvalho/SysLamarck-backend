import { Transaction } from 'src/transaction/transaction.entity';
import { Contract } from 'src/contract/contract.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export type installmentStatusType = 'Pg' | 'Dv' | 'Ca';

@Entity()
export class Installment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
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
  status: installmentStatusType;

  @OneToMany(() => Transaction, (transaction) => transaction.installment)
  transaction: Transaction[];

  @CreateDateColumn()
  createdAt: Date;
}
