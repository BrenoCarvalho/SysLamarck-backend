import { Property } from 'src/property/property.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Locator {
  @PrimaryColumn('int')
  id: number;

  @OneToMany(() => Property, (property) => property.locator)
  property: Property[];

  @Column({ length: 100, nullable: true })
  provisionService: string;

  @Column({ length: 100, nullable: true })
  fullName: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ length: 100, nullable: true })
  rg: string;

  @Column({ length: 100, nullable: true })
  cpf: string;

  @Column({ length: 100, nullable: true })
  nationality: string;

  @Column({ length: 100, nullable: true })
  maritalStatus: string;

  @Column({ length: 100, nullable: true })
  profession: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 100, nullable: true })
  contact1: string;

  @Column({ length: 100, nullable: true })
  contact2: string;

  @Column({ length: 100, nullable: true })
  cep: string;

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

  @Column({ length: 100, nullable: true })
  agency: string;

  @Column({ length: 100, nullable: true })
  accountNumber: string;

  @Column({ length: 100, nullable: true })
  paymentRemittance: string;

  @CreateDateColumn()
  createdAt: Date;
}
