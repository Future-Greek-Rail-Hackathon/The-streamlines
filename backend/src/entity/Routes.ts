import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Train } from './Trains';
import { TrainStop } from './TrainStop';

@Entity({ name: 'routes' })
export class Route {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @Column({ nullable: true })
  startLocationId: number;

  @Index()
  @Column({ nullable: true })
  endLocationId: number;

  @Column({ nullable: true, type: 'timestamp' })
  estimatedTime: Date;

  @Column({ nullable: true, type: 'timestamp' })
  startTime: Date;

  @Column({ nullable: true, type: 'timestamp' })
  endTime: Date;

  @OneToOne((type) => Train, (train) => train.currenRoute, {
    eager: true,
    cascade: true,
  })
  currentTrain: Train;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
