import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Resident {
  @PrimaryGeneratedColumn()
  residentCode: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 100, nullable: true })
  rg: string;

  @Column({ length: 100, nullable: true })
  cpf: string;

  @Column({ length: 100, nullable: true })
  contact1: string;

  @CreateDateColumn()
  createdAt: Date;
}
