import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { GeoLocation } from "./Trains";

export enum TrainStopType {
  TERMINAL = "terminal",
  TRANSIT = "transit",
}

@Entity({ name: "train_stops" })
export class TrainStop {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @Column({ enum: TrainStopType, nullable: true })
  type: TrainStopType;

  @Index()
  @Column({ nullable: true })
  location: GeoLocation;

  @Column({ nullable: true })
  canLoad: boolean;

  @Column({ nullable: true })
  canUnLoad: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
