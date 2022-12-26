import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  fullName: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 512 })
  password: string;

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

  @CreateDateColumn()
  createdAt: Date;
}
