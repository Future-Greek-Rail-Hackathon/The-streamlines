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
import { Train } from './Trains';
import { TrainStop } from './TrainStop';
import { User } from './User';

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

  @Column({ nullable: true, type: 'timestamp' })
  requestedPickupDate: Date;

  @Column({ nullable: true, type: 'timestamp' })
  pickupDate: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deliveryDate: Date;

  @Column({ nullable: true })
  pickedUpLocation: TrainStop;

  @Column({ nullable: true })
  deliveredAtLocation: TrainStop;

  @Column({ type: 'timestamp', nullable: true })
  eta?: Date;

  @Column({ nullable: true })
  assignToTrain: Train;

  @Column({ type: 'number', precision: 2, nullable: true })
  totalPrice: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
