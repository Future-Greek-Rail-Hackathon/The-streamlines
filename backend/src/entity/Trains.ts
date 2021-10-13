import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Order } from './Order';
import { Route } from './Routes';
import { Wagon } from './Wagon';

export enum TrainType {
  FULL_TRAIN = 'full_train',
  NON_FULL_TRAIN = 'non_full_train',
}

export type GeoLocation = {
  latitude: number;
  longitude: number;
};

@Entity({ name: 'trains' })
export class Train {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @Column({ enum: TrainType, nullable: true })
  type: TrainType;

  @Column('numeric', { nullable: true })
  maxWeight: number;

  @Column({ default: false, nullable: true })
  canGoAboard: boolean;

  @Column('numeric', { precision: 9, scale: 6, nullable: true })
  latitude?: number;

  @Column('numeric', { precision: 9, scale: 6, nullable: true })
  longitude?: number;

  @Column({ default: false, nullable: true })
  isFull: boolean;

  @OneToMany((type) => Wagon, (wagon) => wagon.currentTrain, {
    eager: true,
  })
  wagons: Wagon[];

  @OneToMany((type) => Route, (route) => route.currentTrain, {
    eager: false,
  })
  currenRoute: Route;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
