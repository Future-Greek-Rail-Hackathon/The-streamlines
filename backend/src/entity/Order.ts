import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Package } from './Package';
import { Route } from './Routes';
import { TrackRecord } from './trackRecord';

import { User } from './User';

export enum OrderState {
  NEW_ORDER = 'new_order',
  ACCEPTED = 'accepted',
  IN_TRANSIT = 'in_transit',
  ARRIVED = 'arrived',
  FINISHED = 'finished',
  SCANNED = 'scanned',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @ManyToOne((type) => User, (user) => user.orders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user?: User;

  @OneToMany((type) => Package, (pckg) => pckg.order, {
    eager: true,
    cascade: true,
  })
  packages: Package[];

  @OneToMany((type) => TrackRecord, (record) => record.order, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  records: TrackRecord[];

  @Index()
  @Column({ enum: OrderState, nullable: true })
  state: OrderState;

  @Column({ nullable: true, type: 'timestamp' })
  requestedPickupDate: Date;

  @Column({ nullable: true, type: 'timestamp' })
  pickupDate: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deliveryDate: Date;

  @Column({ nullable: true })
  pickedLocation?: number;

  @Column({ nullable: true })
  deliverLocation?: number;

  @Column({ type: 'timestamp', nullable: true })
  eta?: Date;

  @Index()
  @ManyToOne((type) => Route, (route) => route.currentOrders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  route?: Route;

  @Column('numeric', { precision: 2, nullable: true })
  totalPrice: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
