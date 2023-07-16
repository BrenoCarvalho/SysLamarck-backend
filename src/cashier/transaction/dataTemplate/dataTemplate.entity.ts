import { Tenant } from 'src/tenant/tenant.entity';
import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class TransactionDataTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn()
  tenant: Tenant;

  @Column({ type: 'enum', enum: ['credit', 'debit'] })
  type: 'credit' | 'debit';

  @Column({ length: 2048 })
  data: string;

  @CreateDateColumn()
  createdAt: Date;
}
