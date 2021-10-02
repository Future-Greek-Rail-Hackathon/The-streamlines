import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { TrainStop } from "./TrainStop";
import { User } from "./User";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @ManyToOne((type) => User, (user) => user.orders, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user?: User;

  @Column({ nullable: true, type: "timestamp" })
  pickupDate: Date;

  @Column({ nullable: true, type: "timestamp" })
  deliveryDate: Date;

  @Column({ nullable: true })
  pickedupAtLocation: TrainStop;

  @Column({ nullable: true })
  deliveredAtLocation: TrainStop;

  @Column({ type: "number", precision: 2, nullable: true })
  totalPrice: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
