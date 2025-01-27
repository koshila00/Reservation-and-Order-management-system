import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CafeOrder } from "./CafeOrder";
import { HallBooking } from "./HallBooking";

@Entity({ name: "discount" })
export class Discount {
  @PrimaryGeneratedColumn({ name: "discount_id" })
  discountId!: number;

  @Column({ name: "discount_name" })
  discountName!: string;

  @Column({ name: "discount_percentage" })
  discountPercentage!: number;

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

  @OneToMany(() => CafeOrder, (cafeOrder) => cafeOrder.discount)
  cafeOrders!: CafeOrder[];

  @OneToMany(() => HallBooking, (hallBooking) => hallBooking.discount)
  hallBookings!: HallBooking[];
}
