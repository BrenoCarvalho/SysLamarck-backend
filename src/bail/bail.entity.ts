import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Bail {
  @PrimaryColumn('int')
  bailCode: number;

  @Column({ length: 50, nullable: true })
  type: string;

  @Column({ length: 50, nullable: true })
  escrowValue: string;

  @Column({ length: 50, nullable: true })
  militaryInsurance: string;

  @Column({ length: 100, nullable: true })
  fullNameG1: string;

  @Column({ type: 'date', nullable: true })
  birthDateG1: Date;

  @Column({ length: 100, nullable: true })
  rgG1: string;

  @Column({ length: 100, nullable: true })
  cpfG1: string;

  @Column({ length: 100, nullable: true })
  nationalityG1: string;

  @Column({ length: 100, nullable: true })
  maritalStatusG1: string;

  @Column({ length: 100, nullable: true })
  professionG1: string;

  @Column({ length: 100, nullable: true })
  emailG1: string;

  @Column({ length: 100, nullable: true })
  contact1G1: string;

  @Column({ length: 100, nullable: true })
  contact2G1: string;

  @Column({ length: 100, nullable: true })
  cepG1: string;

  @Column({ length: 100, nullable: true })
  cityG1: string;

  @Column({ length: 100, nullable: true })
  districtG1: string;

  @Column({ length: 100, nullable: true })
  addressG1: string;

  @Column({ length: 100, nullable: true })
  spouseFullNameG1: string;

  @Column({ type: 'date', nullable: true })
  spouseBirthDateG1: Date;

  @Column({ length: 100, nullable: true })
  spouseRgG1: string;

  @Column({ length: 100, nullable: true })
  spouseCpfG1: string;

  @Column({ length: 100, nullable: true })
  spouseNationalityG1: string;

  @Column({ length: 100, nullable: true })
  spouseProfessionG1: string;

  @Column({ length: 100, nullable: true })
  spouseContact1G1: string;

  @Column({ length: 100, nullable: true })
  bailPropertyCepG1: string;

  @Column({ length: 100, nullable: true })
  bailPropertyCityG1: string;

  @Column({ length: 100, nullable: true })
  bailPropertyDistrictG1: string;

  @Column({ length: 100, nullable: true })
  bailPropertyAddressG1: string;

  @Column({ length: 100, nullable: true })
  bailPropertyRegistrationNumberG1: string;

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
  spouseFullNameG2: string;

  @Column({ type: 'date', nullable: true })
  spouseBirthDateG2: Date;

  @Column({ length: 100, nullable: true })
  spouseRgG2: string;

  @Column({ length: 100, nullable: true })
  spouseCpfG2: string;

  @Column({ length: 100, nullable: true })
  spouseNationalityG2: string;

  @Column({ length: 100, nullable: true })
  spouseProfessionG2: string;

  @Column({ length: 100, nullable: true })
  spouseContact1G2: string;

  @Column({ length: 100, nullable: true })
  bailPropertyCepG2: string;

  @Column({ length: 100, nullable: true })
  bailPropertyCityG2: string;

  @Column({ length: 100, nullable: true })
  bailPropertyDistrictG2: string;

  @Column({ length: 100, nullable: true })
  bailPropertyAddressG2: string;

  @Column({ length: 100, nullable: true })
  bailPropertyRegistrationNumberG2: string;

  @CreateDateColumn()
  createdAt: Date;
}
