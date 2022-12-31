import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Contract {
  @PrimaryColumn('int')
  contractCode: number;

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

  @Column({ length: 50, nullable: true })
  integralValue: string;

  @Column({ length: 50, nullable: true })
  leaseAmount: string;

  @Column({ length: 50, nullable: true })
  duration: string;

  @Column({ length: 50, nullable: true })
  payday: string;

  @Column({ type: 'date' })
  start: Date;

  @Column({ type: 'date' })
  end: Date;

  @CreateDateColumn()
  createdAt: Date;
}
