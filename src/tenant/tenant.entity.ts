import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Tenant {
  @PrimaryColumn('int')
  tenantCode: number;

  @Column('int')
  propertyId: number;

  @Column({ length: 10 })
  propertyCode: string;

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
  T2fullName: string;

  @Column({ type: 'date', nullable: true })
  T2birthDate: Date;

  @Column({ length: 100, nullable: true })
  T2rg: string;

  @Column({ length: 100, nullable: true })
  T2cpf: string;

  @Column({ length: 100, nullable: true })
  T2nationality: string;

  @Column({ length: 100, nullable: true })
  T2maritalStatus: string;

  @Column({ length: 100, nullable: true })
  T2profession: string;

  @Column({ length: 100, nullable: true })
  T2email: string;

  @Column({ length: 100, nullable: true })
  T2contact1: string;

  @Column({ length: 100, nullable: true })
  T2contact2: string;

  @Column('simple-array')
  residents: number[];

  @Column('int')
  contractCode: number;

  @Column('int')
  bailCode: number;

  @CreateDateColumn()
  createdAt: Date;
}
