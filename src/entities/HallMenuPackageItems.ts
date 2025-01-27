import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { HallMenuPackage } from "./HallMenuPackage";

@Entity({ name: "hall_menu_package_items" })
export class HallMenuPackageItems {
  @PrimaryGeneratedColumn({ name: "hall_menu_package_item_id" })
  hallMenuPackageItemId!: number;

  @Column({ name: "hall_menu_package_item_name" })
  hallMenuPackageItemName!: string;

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

  @Column({ name: "hall_menu_package_id" })
  hallMenuPackageId!: number;

  @ManyToOne(
    () => HallMenuPackage,
    (hallMenuPackage) => hallMenuPackage.hallMenuPackageItems
  )
  @JoinColumn({
    name: "hall_menu_package_id",
    referencedColumnName: "hallMenuPackageId",
  })
  hallMenuPackage!: HallMenuPackage;
}
