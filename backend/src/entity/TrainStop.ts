import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Route } from './Routes';

export enum TrainStopType {
  TERMINAL = 'terminal',
  TRANSIT = 'transit',
}

@Unique('name', ['name'])
@Entity({ name: 'train_stops' })
export class TrainStop {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @Column({ enum: TrainStopType, nullable: true })
  type: TrainStopType;

  @Column({ length: 1024, nullable: true })
  plusCode?: string;

  @Column({ length: 1024, nullable: true })
  name?: string;

  @Column('numeric', { precision: 9, scale: 6, nullable: true })
  latitude?: number;

  @Column('numeric', { precision: 9, scale: 6, nullable: true })
  longitude?: number;

  @Column({ nullable: true })
  canLoad: boolean;

  @Column({ nullable: true })
  canUnLoad: boolean;

  @OneToMany((type) => Route, (route) => route.startLocation, {
    eager: true,
    cascade: true,
  })
  startHereRoutes: Route[];

  @OneToMany((type) => Route, (route) => route.endLocation, {
    eager: true,
    cascade: true,
  })
  endHereRoutes: Route[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
