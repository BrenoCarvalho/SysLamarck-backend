import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Movimentation {
  @PrimaryColumn('int')
  id: number;

  @Column()
  movimentation: string;

  @Column('date')
  date: Date;

  @Column('float')
  credit: number;

  @Column('float')
  debit: number;

  @CreateDateColumn()
  createdAt: Date;
}
