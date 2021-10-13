import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Order } from './Order';

export enum TrackRecordType {
  SCANNED_AT_START = 'scanned_at_start',
  SCANNED_AT_END = 'scanned_at_end',
  DELIVERED = 'delivered',
}

@Entity({ name: 'track_records' })
export class TrackRecord {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @ManyToOne((type) => Order, (order) => order.records, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  order?: Order;

  @Index()
  @Column({ enum: TrackRecordType, nullable: true })
  type: TrackRecordType;

  @Column({ nullable: true })
  location?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
