import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TrainStop } from './TrainStop';

@Entity({ name: 'routes' })
export class Route {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @Column({ nullable: true })
  startLocation: TrainStop;

  @Index()
  @Column({ nullable: true })
  endLocation: TrainStop;

  @Column({ nullable: true, type: 'timestamp' })
  estimatedTime: Date;

  @Column({ nullable: true, type: 'timestamp' })
  startTime: Date;

  @Column({ nullable: true, type: 'timestamp' })
  endTime: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
