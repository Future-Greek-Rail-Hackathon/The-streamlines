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

  @Column({ nullable: true })
  startLocationId: number;

  @Column({ nullable: true })
  endLocationId: number;

  @Column({ nullable: true, type: 'timestamp' })
  estimatedTime: Date;

  @Column({ nullable: true, type: 'timestamp' })
  startTime: Date;

  @Column({ nullable: true, type: 'timestamp' })
  endTime: Date;

  @OneToOne((type) => Train, (train) => train.currenRoute, {})
  currentTrain: Train;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
