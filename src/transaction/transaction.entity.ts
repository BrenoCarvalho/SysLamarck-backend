import { Installment } from 'src/contract/installment/installment.entity';
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

  @Column({ length: 50 })
  category: 'rentInstallment' | 'generic';

  @Column({ length: 50 })
  type: 'credit' | 'debit';

  @Column('float')
  amount: number;

  @Column({ length: 50, nullable: true })
  formOfPayment: string;

  @Column({ length: 100, nullable: true })
  description: string;

  @Column({ length: 2048, nullable: true })
  data: string;

  @ManyToOne(() => Installment)
  @JoinColumn()
  installment: Installment;

  @CreateDateColumn()
  createdAt: Date;
}
