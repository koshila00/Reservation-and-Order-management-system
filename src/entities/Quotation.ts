import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Supplier } from "./Supplier";
import { CafeInventory } from "./CafeInventory";
import { HallInventory } from "./HallInventory";

@Entity({ name: "quotation" })
export class Quotation {
  @PrimaryGeneratedColumn({ name: "quotation_id" })
  quotationId!: number;

  @Column({ name: "qty", type: "int" })
  qty!: number;

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
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedDate!: Date;

  @Column({ name: "supplierSupplierId", type: "int", nullable: true })
  supplierSupplierId!: number;

  @Column({ name: "itemCafeItemId", type: "int", nullable: true })
  itemCafeItemId!: number;

  @Column({ name: "itemHallItemId", type: "int", nullable: true })
  itemHallItemId!: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.quotations, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({
    name: "supplierSupplierId",
    referencedColumnName: "supplierId",
  })
  supplier!: Supplier | null;

  @ManyToOne(() => CafeInventory, (cafeinventory) => cafeinventory.quotations, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: "itemCafeItemId", referencedColumnName: "cafeItemId" })
  cafeinventory!: CafeInventory | null;

  @ManyToOne(() => HallInventory, (hallinventory) => hallinventory.quotations, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: "itemHallItemId", referencedColumnName: "hallInventoryItemId" })
  hallinventory!: HallInventory | null;
}
