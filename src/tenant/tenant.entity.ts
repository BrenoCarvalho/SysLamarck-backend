import { Bail } from 'src/bail/bail.entity';
import { Contract } from 'src/contract/contract.entity';
import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Tenant {
  @PrimaryColumn('int')
  tenantCode: number;

  @Column({ length: 10 })
  propertyCode: string;

  @Column({ length: 100 })
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
  fullNameT2: string;

  @Column({ type: 'date', nullable: true })
  birthDateT2: Date;

  @Column({ length: 100, nullable: true })
  rgT2: string;

  @Column({ length: 100, nullable: true })
  cpfT2: string;

  @Column({ length: 100, nullable: true })
  nationalityT2: string;

  @Column({ length: 100, nullable: true })
  maritalStatusT2: string;

  @Column({ length: 100, nullable: true })
  professionT2: string;

  @Column({ length: 100, nullable: true })
  emailT2: string;

  @Column({ length: 100, nullable: true })
  contact1T2: string;

  @Column({ length: 100, nullable: true })
  contact2T2: string;

  @Column({ length: 2048 })
  residents: string;

  @Column({ type: 'int', nullable: true })
  contract: number | Contract;

  @Column({ type: 'int', nullable: true })
  bail: number | Bail;

  @CreateDateColumn()
  createdAt: Date;
}
