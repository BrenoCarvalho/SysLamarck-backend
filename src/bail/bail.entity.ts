import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Bail {
  @PrimaryColumn('int')
  bailCode: number;

  @Column({ length: 50 })
  type: string;

  @Column({ length: 50, nullable: true })
  escrowValue: string;

  @Column({ length: 50, nullable: true })
  militaryInsurance: string;

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
  city: string;

  @Column({ length: 100, nullable: true })
  district: string;

  @Column({ length: 100, nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  SpouseFullName: string;

  @Column({ type: 'date', nullable: true })
  SpouseBirthDate: Date;

  @Column({ length: 100, nullable: true })
  SpouseRg: string;

  @Column({ length: 100, nullable: true })
  SpouseCpf: string;

  @Column({ length: 100, nullable: true })
  SpouseNationality: string;

  @Column({ length: 100, nullable: true })
  SpouseProfession: string;

  @Column({ length: 100, nullable: true })
  SpouseContact1: string;

  @Column({ length: 100, nullable: true })
  BailPropertyCep: string;

  @Column({ length: 100, nullable: true })
  BailPropertyCity: string;

  @Column({ length: 100, nullable: true })
  BailPropertyDistrict: string;

  @Column({ length: 100, nullable: true })
  BailPropertyAddress: string;

  @Column({ length: 100, nullable: true })
  BailPropertyRegistrationNumber: string;

  @Column({ length: 100, nullable: true })
  G2fullName: string;

  @Column({ type: 'date', nullable: true })
  G2birthDate: Date;

  @Column({ length: 100, nullable: true })
  G2rg: string;

  @Column({ length: 100, nullable: true })
  G2cpf: string;

  @Column({ length: 100, nullable: true })
  G2nationality: string;

  @Column({ length: 100, nullable: true })
  G2maritalStatus: string;

  @Column({ length: 100, nullable: true })
  G2profession: string;

  @Column({ length: 100, nullable: true })
  G2email: string;

  @Column({ length: 100, nullable: true })
  G2contact1: string;

  @Column({ length: 100, nullable: true })
  G2contact2: string;

  @Column({ length: 100, nullable: true })
  G2cep: string;

  @Column({ length: 100, nullable: true })
  G2city: string;

  @Column({ length: 100, nullable: true })
  G2district: string;

  @Column({ length: 100, nullable: true })
  G2address: string;

  @Column({ length: 100, nullable: true })
  G2SpouseFullName: string;

  @Column({ type: 'date', nullable: true })
  G2SpouseBirthDate: Date;

  @Column({ length: 100, nullable: true })
  G2SpouseRg: string;

  @Column({ length: 100, nullable: true })
  G2SpouseCpf: string;

  @Column({ length: 100, nullable: true })
  G2SpouseNationality: string;

  @Column({ length: 100, nullable: true })
  G2SpouseProfession: string;

  @Column({ length: 100, nullable: true })
  G2SpouseContact1: string;

  @Column({ length: 100, nullable: true })
  G2BailPropertyCep: string;

  @Column({ length: 100, nullable: true })
  G2BailPropertyCity: string;

  @Column({ length: 100, nullable: true })
  G2BailPropertyDistrict: string;

  @Column({ length: 100, nullable: true })
  G2BailPropertyAddress: string;

  @Column({ length: 100, nullable: true })
  G2BailPropertyRegistrationNumber: string;

  @CreateDateColumn()
  createdAt: Date;
}
