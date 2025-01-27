import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Quotation } from "./Quotation";


@Entity({ name: "hall_inventory" })
export class HallInventory {
  @PrimaryGeneratedColumn({ name: "hall_inventory_item_id" })
  hallInventoryItemId!: number;

  @Column({ name: "hall_inventory_item_name" })
  hallInventoryItemName!: string;

  @Column({ name: "hall_inventory_item_price", type: "double" })
  hallInventoryItemPrice!: number;

  @Column({ name: "hall_inventory_item_qty" })
  hallInventoryItemQty!: number;

  @Column({ name: "hall_inventory_item_description" })
  hallInventoryItemDescription!: string;

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

  @Column({ name: "is_delete", type: "boolean", default: false })
  isDelete!: boolean;

  @OneToMany(() => Quotation, (quotation) => quotation.hallinventory)
  quotations!: Quotation[];
}
