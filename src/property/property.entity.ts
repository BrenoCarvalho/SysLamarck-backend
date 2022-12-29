import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryColumn('int')
  id: number;

  @Column({ length: 100 })
  propertyCode: string;

  @Column('int')
  locatorCode: number;

  @Column('int')
  property: number;

  @Column({ length: 100, nullable: true })
  locatorName: string;

  @Column({ length: 100, nullable: true })
  propertyType: string;

  @Column({ length: 100, nullable: true })
  cep: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 100, nullable: true })
  district: string;

  @Column({ length: 100, nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  propertyDescription: string;

  @Column({ length: 100, nullable: true })
  IPTUPayer: string;

  @Column({ nullable: true })
  DIMOBDeclaration: boolean;

  @Column({ length: 100, nullable: true })
  goalOfProperty: string;

  @Column({ length: 100, nullable: true })
  leaseFee: string;

  @Column({ length: 100, nullable: true })
  administrationTax: string;

  @Column({ length: 100, nullable: true })
  integralValue: string;

  @Column({ length: 100, nullable: true })
  leaseAmount: string;

  @Column({ length: 100, nullable: true })
  sellValue: string;

  @Column({ nullable: true })
  vacant: boolean;

  @Column({ length: 100, nullable: true })
  registrationValue: string;

  @Column({ length: 100, nullable: true })
  cityCode: string;

  @Column({ length: 100, nullable: true })
  IPTUNumber: string;

  @Column({ length: 100, nullable: true })
  IntegralIPTUValue: string;

  @Column({ length: 100, nullable: true })
  numberInstallments: string;

  @Column({ length: 100, nullable: true })
  installmentsIPTUValue: string;

  @Column({ length: 100, nullable: true })
  edpInstallation: string;

  @Column({ length: 100, nullable: true })
  rgi: string;

  @Column({ length: 100, nullable: true })
  supply: string;

  @CreateDateColumn()
  createdAt: Date;
}
