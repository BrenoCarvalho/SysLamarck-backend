import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Locator {
  @PrimaryColumn('int')
  locatorCode: number;

  @Column({ length: 100 })
  provisionService: string;

  @Column({ length: 100 })
  fullName: string;

  @Column('date')
  birthDate: Date;

  @Column('bigint')
  rg: number;

  @Column('bigint')
  cpf: number;

  @Column({ length: 100 })
  nationality: string;

  @Column({ length: 100 })
  maritalStatus: string;

  @Column({ length: 100 })
  profession: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column('bigint')
  contact1: number;

  @Column({ type: 'bigint', nullable: true })
  contact2: number;

  @Column('bigint')
  cep: number;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  district: string;

  @Column({ length: 100 })
  bank: string;

  @Column({ length: 100 })
  accountType: string;

  @Column('int')
  agency: number;

  @Column('int')
  accountNumber: number;

  @Column({ length: 100 })
  paymentRemittance: string;

  @CreateDateColumn()
  createdAt: Date;
}
