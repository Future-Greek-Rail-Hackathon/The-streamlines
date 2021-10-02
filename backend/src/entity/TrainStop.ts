import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TrainStopType {
  TERMINAL = 'terminal',
  TRANSIT = 'transit',
}

@Entity({ name: 'train_stops' })
export class TrainStop {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @Column({ enum: TrainStopType, nullable: true })
  type: TrainStopType;

  @Column('numeric', { precision: 9, scale: 6, nullable: true })
  latitude?: number;

  @Column('numeric', { precision: 9, scale: 6, nullable: true })
  longitude?: number;

  @Column({ nullable: true })
  canLoad: boolean;

  @Column({ nullable: true })
  canUnLoad: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
