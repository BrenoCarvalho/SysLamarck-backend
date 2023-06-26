import { Cashier } from 'src/cashier/cashier.entity';
import { Installment } from 'src/tenant/contract/installment/installment.entity';
import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['rent', 'generic'] })
  category: 'rent' | 'generic';

  @Column({ type: 'enum', enum: ['credit', 'debit'] })
  type: 'credit' | 'debit';

  @Column('float')
  amount: number;

  @Column({ length: 50, nullable: true })
  formOfPayment: string;

  @Column({ length: 100, nullable: true })
  description: string;

  @Column({ length: 2048, nullable: true })
  data: string;

  @ManyToOne(() => Installment, { onDelete: 'SET NULL' })
  @JoinColumn()
  installment: Installment;

  @ManyToOne(() => Cashier, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn()
  cashier: Cashier;

  @CreateDateColumn()
  createdAt: Date;
}
