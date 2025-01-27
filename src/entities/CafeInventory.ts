import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CafeOrderItem } from "./CafeOrderItem";
import { Quotation } from "./Quotation";

@Entity({ name: "cafe_inventory" })
export class CafeInventory {
  @PrimaryGeneratedColumn({ name: "cafe_item_id" })
  cafeItemId!: number;

  @Column({ name: "cafe_item_name" })
  cafeItemName!: string;

  @Column({ name: "cafe_item_price" })
  cafeItemPrice!: number;

  @Column({ name: "cafe_item_qty" })
  cafeItemQty!: number;

  @Column({ name: "cafe_item_discription", nullable: true })
  cafeItemDescription?: string;

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

  @Column({ name: "cafe_item_image", nullable: true })
  cafeItemImage?: string;

  @Column({ name: "is_delete", type: "boolean", default: false })
  isDelete!: boolean;

  @OneToMany(
    () => CafeOrderItem,
    (cafeOrderItem) => cafeOrderItem.cafeInventory
  )
  cafeOrderItems!: CafeOrderItem[];

  @OneToMany(() => Quotation, (quotation) => quotation.cafeinventory)
  quotations!: Quotation[];
}
