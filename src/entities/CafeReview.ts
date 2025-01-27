import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "cafe_review" })
export class CafeReview {
  @PrimaryGeneratedColumn({ name: "cafe_review_id" })
  cafeReviewId!: number;

  @Column({ name: "user_id" })
  userId!: number;

  @Column({ name: "cafe_review_description", length: 500 })
  cafeReviewDescription!: string;

  @Column({ name: "cafe_review_rate", nullable: true })
  cafeReviewRate!: number;

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

  @ManyToOne(() => User, (user) => user.cafeReviews)
  @JoinColumn({ name: "user_id", referencedColumnName: "userId" })
  user!: User;
}
