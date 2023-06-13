import { Rent } from 'src/cashier/rent/rent.entity';
import { Tenant } from 'src/tenant/tenant.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Tenant, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  tenant: Tenant;

  @Column()
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

  @Column()
  leaseAmount: number;

  @Column()
  duration: number;

  @Column()
  payday: number;

  @Column({ type: 'date', nullable: true })
  start: Date;

  @Column({ type: 'date', nullable: true })
  end: Date;

  @OneToMany(() => Rent, (rent) => rent.contract)
  rent: Rent[];

  @CreateDateColumn()
  createdAt: Date;
}
