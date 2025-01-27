import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { HallMenuPackageItems } from "./HallMenuPackageItems";
import { HallBooking } from "./HallBooking";

@Entity({ name: "hall_menu_package" })
export class HallMenuPackage {
  @PrimaryGeneratedColumn({ name: "hall_menu_package_id" })
  hallMenuPackageId!: number;

  @Column({ name: "hall_menu_package_name" })
  hallMenuPackageName!: string;

  @Column({ name: "hall_menu_package_price" })
  hallMenuPackagePrice!: string;

  @Column({ name: "hall_menu_package_image", nullable: true })
  hallMenuPackageImage?: string;

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

  @OneToMany(
    () => HallMenuPackageItems,
    (hallMenuPackageItems) => hallMenuPackageItems.hallMenuPackage
  )
  hallMenuPackageItems!: HallMenuPackageItems[];

  @OneToMany(() => HallBooking, (hallBooking) => hallBooking.hallMenuPackage)
  hallBookings!: HallBooking[];
}
