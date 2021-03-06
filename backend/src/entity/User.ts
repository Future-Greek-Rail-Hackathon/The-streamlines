import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Order } from './Order';

export enum UserType {
  CLIENT = 'client',
  ADMIN = 'admin',
}
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @Column({ enum: UserType, nullable: true })
  type: UserType;

  @Column({ length: 1024, nullable: true })
  name: string;

  @Column({ length: 1024, nullable: true })
  surname: string;

  @Index()
  @Column({ length: 1024, nullable: true })
  email: string;

  @Column({ length: 1024, nullable: true })
  password: string;

  @Column({ length: 1024, nullable: true })
  phone: string;

  @OneToMany((type) => Order, (order) => order.user, {
    eager: true,
    cascade: true,
  })
  orders: Order[];

  @Column({ length: 1024, nullable: true })
  workType: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
