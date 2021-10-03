import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from './Order';

export enum PackageType {}

@Entity({ name: 'packages' })
export class Package {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @ManyToOne((type) => Order, (order) => order.packages, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  order?: Order;

  @Index()
  @Column({ enum: PackageType, nullable: true })
  type: PackageType;

  @Column('numeric', { precision: 2, nullable: true })
  volume: number;

  @Column('numeric', { precision: 2, nullable: true })
  weight: number;

  @Column('numeric', { precision: 2, nullable: true })
  price: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
