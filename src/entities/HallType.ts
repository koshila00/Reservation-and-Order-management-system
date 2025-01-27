import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { HallBooking } from "./HallBooking";

@Entity({ name: "hall_type" })
export class HallType {
  @PrimaryGeneratedColumn({ name: "hall_type_id" })
  hallTypeId!: number;

  @Column({ name: "hall_type_name" })
  hallTypeName!: string;

  @Column({ name: "hall_type_capacity" })
  hallTypeCapacity!: number;

  @Column({ name: "hall_type_price" })
  hallTypePrice!: number;

  @Column({
    name: "createdDate",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate!: Date;

  @Column({
    name: "updatedDate",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedDate!: Date;

  @OneToMany(() => HallBooking, (hallBooking) => hallBooking.hallType)
  hallBookings!: HallBooking[];
}
