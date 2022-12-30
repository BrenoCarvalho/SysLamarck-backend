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

  @CreateDateColumn()
  createdAt: Date;
}
