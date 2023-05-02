import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movimentation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('date')
  date: Date;

  @Column('float', { nullable: true })
  credit: number;

  @Column('float', { nullable: true })
  debit: number;

  @CreateDateColumn()
  createdAt: Date;
}
