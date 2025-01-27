import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Discount } from "./Discount";
import { CafeOrderItem } from "./CafeOrderItem";

@Entity({ name: "cafe_order" })
export class CafeOrder {
  @PrimaryGeneratedColumn({ name: "cafe_order_id" })
  cafeOrderId!: number;

  @Column({ name: "user_id" })
  userId!: number;

  @Column({ name: "cafe_order_total" })
  cafeOrderTotal!: number;

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

  @Column({ name: "cafe_order_delivery_status" })
  cafeOrderDeliveryStatus!: string;

  @Column({ name: "cafe_order_type" })
  cafeOrderType!: string;

  @Column({ name: "discount_id" })
  discountId!: number;

  @ManyToOne(() => User, (user) => user.cafeOrders)
  @JoinColumn({ name: "user_id", referencedColumnName: "userId" })
  user!: User;

  @ManyToOne(() => Discount, (discount) => discount.cafeOrders)
  @JoinColumn({ name: "discount_id", referencedColumnName: "discountId" })
  discount!: Discount;

  @OneToMany(() => CafeOrderItem, (cafeOrderItem) => cafeOrderItem.cafeOrder)
  cafeOrderItems!: CafeOrderItem[];
}
