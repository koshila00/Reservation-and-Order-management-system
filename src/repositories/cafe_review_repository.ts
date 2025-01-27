import { EntityRepository, Repository } from "typeorm";
import { CafeReview } from "../entities/CafeReview";

@EntityRepository(CafeReview)
export class CafeReviewRepository extends Repository<CafeReview> {}
