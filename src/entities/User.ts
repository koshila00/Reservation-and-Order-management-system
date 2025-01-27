import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CafeReview } from "./CafeReview";
import { CafeOrder } from "./CafeOrder";

@Entity({ name: "user" })
export class User {
  email(email: any, subject: string, htmlBody: string) {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn({ name: "user_id" })
  userId!: number;

  @Column({ name: "user_name" })
  userName!: string;

  @Column({ name: "user_address" })
  userAddress!: string;

  @Column({ name: "user_phoneNumber" })
  userPhoneNumber!: string;

  @Column({ name: "user_email" })
  userEmail!: string;

  @Column({ name: "user_password" })
  userPassword!: string;

  @Column({ name: "user_role" })
  userRole!: string;

  @Column({
    name: "created_date",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate!: Date;

  @Column({
    name: "updated_date",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedDate!: Date;
  password: any;

  @OneToMany(() => CafeReview, (cafeReview) => cafeReview.user)
  cafeReviews!: CafeReview[];

  @OneToMany(() => CafeOrder, (cafeOrder) => cafeOrder.discount)
  cafeOrders!: CafeOrder[];
}
