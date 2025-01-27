import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { HallType } from "./HallType";
import { HallMenuPackage } from "./HallMenuPackage";
import { Discount } from "./Discount";

@Entity({ name: "hall_booking" })
export class HallBooking {
  @PrimaryGeneratedColumn({ name: "hall_booking_id" })
  hallBookingId!: number;

  @Column({ name: "hall_type_id" })
  hallTypeId!: number;

  @Column({ name: "hall_booking_date", type: "datetime" })
  hallBookingDate!: Date;

  @Column({ name: "hall_booking_Total", type: "double" })
  hallBookingTotal!: number;

  @Column({ name: "hall_booking_guestCount" })
  hallBookingGuestCount!: number;

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

  @Column({ name: "hall_booking_menuPackage_id", nullable: true })
  hallBookingMenuPackageId?: number;

  @Column({ name: "discount_id", nullable: true })
  discountId?: number;

  @ManyToOne(() => HallType, (hallType) => hallType.hallBookings)
  @JoinColumn({ name: "hall_type_id", referencedColumnName: "hallTypeId" })
  hallType!: HallType;

  @ManyToOne(
    () => HallMenuPackage,
    (hallMenuPackage) => hallMenuPackage.hallBookings
  )
  @JoinColumn({
    name: "hall_booking_menuPackage_id",
    referencedColumnName: "hallMenuPackageId",
  })
  hallMenuPackage?: HallMenuPackage;

  @ManyToOne(() => Discount, (discount) => discount.hallBookings)
  @JoinColumn({ name: "discount_id", referencedColumnName: "discountId" })
  discount?: Discount;
}
