import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Train } from './Trains';

export enum WagonType {
  SINGLE_WAGON = 'single_wagon',
  CONTAINER = 'container',
}

@Entity({ name: 'wagons' })
export class Wagon {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @Column({ enum: WagonType, nullable: true })
  type: WagonType;

  @Column('numeric', { precision: 2, nullable: true })
  maxWeight: number;

  @Column('numeric', { precision: 2, nullable: true })
  maxVolume: number;

  @Column('numeric', { precision: 2, nullable: true })
  minWeightPerPackage: number;

  @Column('numeric', { precision: 2, nullable: true })
  currentWeight: number;

  @Column('numeric', { precision: 2, nullable: true })
  currentVolume: number;

  @Index()
  @ManyToOne((type) => Train, (train) => train.wagons, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  currentTrain?: Train;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
