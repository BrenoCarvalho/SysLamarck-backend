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
  fullNameG2: string;

  @Column({ type: 'date', nullable: true })
  birthDateG2: Date;

  @Column({ length: 100, nullable: true })
  rgG2: string;

  @Column({ length: 100, nullable: true })
  cpfG2: string;

  @Column({ length: 100, nullable: true })
  nationalityG2: string;

  @Column({ length: 100, nullable: true })
  maritalStatusG2: string;

  @Column({ length: 100, nullable: true })
  professionG2: string;

  @Column({ length: 100, nullable: true })
  emailG2: string;

  @Column({ length: 100, nullable: true })
  contact1G2: string;

  @Column({ length: 100, nullable: true })
  contact2G2: string;

  @Column({ length: 100, nullable: true })
  cepG2: string;

  @Column({ length: 100, nullable: true })
  cityG2: string;

  @Column({ length: 100, nullable: true })
  districtG2: string;

  @Column({ length: 100, nullable: true })
  addressG2: string;

  @Column({ length: 100, nullable: true })
  SpouseFullNameG2: string;

  @Column({ type: 'date', nullable: true })
  SpouseBirthDateG2: Date;

  @Column({ length: 100, nullable: true })
  SpouseRgG2: string;

  @Column({ length: 100, nullable: true })
  SpouseCpfG2: string;

  @Column({ length: 100, nullable: true })
  SpouseNationalityG2: string;

  @Column({ length: 100, nullable: true })
  SpouseProfessionG2: string;

  @Column({ length: 100, nullable: true })
  SpouseContact1G2: string;

  @Column({ length: 100, nullable: true })
  BailPropertyCepG2: string;

  @Column({ length: 100, nullable: true })
  BailPropertyCityG2: string;

  @Column({ length: 100, nullable: true })
  BailPropertyDistrictG2: string;

  @Column({ length: 100, nullable: true })
  BailPropertyAddressG2: string;

  @Column({ length: 100, nullable: true })
  BailPropertyRegistrationNumberG2: string;

  @CreateDateColumn()
  createdAt: Date;
}
