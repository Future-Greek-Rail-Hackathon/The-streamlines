import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Order } from './Order';
import { Train } from './Trains';
import { TrainStop } from './TrainStop';

@Entity({ name: 'routes' })
export class Route {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne((type) => TrainStop, (trainStop) => trainStop.startHereRoutes)
  startLocation: TrainStop;

  @ManyToOne((type) => TrainStop, (trainStop) => trainStop.endHereRoutes)
  endLocation: TrainStop;

  @Column({ nullable: true, type: 'timestamp' })
  estimatedTime: Date;

  @Column({ nullable: true, type: 'timestamp' })
  startTime: Date;

  @Column({ nullable: true, type: 'timestamp' })
  endTime: Date;

  @ManyToOne((type) => Train, (train) => train.currenRoute, {})
  currentTrain: Train;

  @OneToMany((type) => Order, (order) => order.route, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  currentOrders?: Order[];

  @Column({ nullable: true })
  trainId: number;

  @Column({ default: false, nullable: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
