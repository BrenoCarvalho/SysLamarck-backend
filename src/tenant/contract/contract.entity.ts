import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Tenant } from 'src/tenant/tenant.entity';
import { Installment } from './installment/installment.entity';
import { Bail } from './bail/bail.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Tenant, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  tenant: Tenant;

  @Column({ nullable: true })
  applyDiscount: boolean;

  @Column({ nullable: true })
  withholdingTax: boolean;

  @Column({ length: 50, nullable: true })
  goal: string;

  @Column({ length: 50, nullable: true })
  IPTUPayment: string;

  @Column({ length: 50, nullable: true })
  index: string;

  @Column({ length: 50, nullable: true })
  reajust: string;

  @Column({ nullable: true })
  integralValue: number;

  @Column('int')
  leaseAmount: number;

  @Column('int')
  duration: number;

  @Column('int')
  payday: number;

  @Column('int', { nullable: true })
  gracePeriod: number;

  @Column({ type: 'date' })
  start: Date;

  @Column({ type: 'date' })
  end: Date;

  @OneToOne(() => Bail, (bail: Bail) => bail.contract)
  bail: Bail;

  @OneToMany(() => Installment, (installment) => installment.contract)
  installment: Installment[];

  @OneToOne(() => Installment, { onDelete: 'CASCADE' })
  @JoinColumn()
  currentInstallment: Installment;

  @CreateDateColumn()
  createdAt: Date;
}