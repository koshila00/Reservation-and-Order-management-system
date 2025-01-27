import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CafeOrder } from "./CafeOrder";
import { CafeInventory } from "./CafeInventory";

@Entity({ name: "cafe_order_items" })
export class CafeOrderItem {
  @PrimaryGeneratedColumn({ name: "cafe_order_items_id" })
  cafeOrderItemsId!: number;

  @Column({ name: "cafe_order_id" })
  cafeOrderId!: number;

  @Column({ name: "cafe_item_id" })
  cafeItemId!: number;

  @Column({ name: "cafe_order_item_qty" })
  cafeOrderItemQty!: number;

  @Column({
    name: "createdDate",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate!: Date;

  @Column({
    name: "updatedDate",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedDate!: Date;

  @ManyToOne(() => CafeOrder, (cafeOrder) => cafeOrder.cafeOrderItems)
  @JoinColumn({ name: "cafe_order_id", referencedColumnName: "cafeOrderId" })
  cafeOrder!: CafeOrder;

  @ManyToOne(() => CafeInventory,(cafeInventory) => cafeInventory.cafeOrderItems)
  @JoinColumn({ name: "cafe_item_id", referencedColumnName: "cafeItemId" })
  cafeInventory!: CafeInventory;
}
