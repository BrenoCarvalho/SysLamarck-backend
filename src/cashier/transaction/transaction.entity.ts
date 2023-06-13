import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Rent } from '../rent/rent.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rent, (rent) => rent.transaction)
  rent: Rent;

  @Column({ length: 50 })
  category: 'rent' | 'generic';

  @Column({ length: 50 })
  type: 'credit' | 'debit';

  @Column('float')
  amount: number;

  @Column({ length: 50 })
  formOfPayment: string;

  @Column({ length: 100 })
  description: string;

  @Column({ length: 2048 })
  data: string;

  @CreateDateColumn()
  createdAt: Date;
}
