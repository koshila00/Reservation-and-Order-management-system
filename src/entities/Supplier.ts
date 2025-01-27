import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Quotation } from "./Quotation";

@Entity({ name: "supplier" })
export class Supplier {
  @PrimaryGeneratedColumn({ name: "supplier_id" })
  supplierId!: number;

  @Column({ name: "supplier_name" })
  supplierName!: string;

  @Column({ name: "supplier_email" })
  supplierEmail!: string;

  @OneToMany(() => Quotation, (quotation) => quotation.supplier)
  quotations!: Quotation[];
}
