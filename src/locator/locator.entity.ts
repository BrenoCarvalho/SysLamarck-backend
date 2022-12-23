import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Locator {
  @PrimaryColumn('int')
  locatorCode: number;

  @Column({ length: 100, nullable: true })
  provisionService: string;

  @Column({ length: 100, nullable: true })
  fullName: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ type: 'bigint', nullable: true })
  rg: number;

  @Column({ type: 'bigint', nullable: true })
  cpf: number;

  @Column({ length: 100, nullable: true })
  nationality: string;

  @Column({ length: 100, nullable: true })
  maritalStatus: string;

  @Column({ length: 100, nullable: true })
  profession: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ type: 'bigint', nullable: true })
  contact1: number;

  @Column({ type: 'bigint', nullable: true })
  contact2: number;

  @Column({ type: 'bigint', nullable: true })
  cep: number;

  @Column({ length: 100, nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 100, nullable: true })
  district: string;

  @Column({ length: 100, nullable: true })
  bank: string;

  @Column({ length: 100, nullable: true })
  accountType: string;

  @Column({ type: 'int', nullable: true })
  agency: number;

  @Column({ type: 'int', nullable: true })
  accountNumber: number;

  @Column({ length: 100, nullable: true })
  paymentRemittance: string;

  @CreateDateColumn()
  createdAt: Date;
}
