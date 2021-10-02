import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Route } from "./Routes";
import { TrainStop } from "./TrainStop";
import { Wagon } from "./Wagon";

export enum TrainType {
  FULL_TRAIN = "full_train",
  NON_FULL_TRAIN = "non_full_train",
}

export type GeoLocation = {
  latitude: number;
  longitude: number;
};

@Entity({ name: "trains" })
export class Train {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @Column({ enum: TrainType, nullable: true })
  type: TrainType;

  @Column({ precision: 2, nullable: true })
  maxWeight: number;

  @Column({ default: false, nullable: true })
  canGoAboard: boolean;

  @Column({ nullable: true })
  currentLocation: GeoLocation;

  @Column({ nullable: true })
  destination: TrainStop;

  @Column({ nullable: true })
  start: TrainStop;

  @Column({ default: false, nullable: true })
  isFull: boolean;

  @Column({ type: "timestamp", nullable: true })
  eta?: Date;

  @OneToMany((type) => Wagon, (wagon) => wagon.train, {
    eager: true,
    cascade: true,
  })
  wagons: Wagon[];

  @Column((type) => Route)
  currenRoute: Route;

  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}