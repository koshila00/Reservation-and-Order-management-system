import { EntityRepository, Repository } from "typeorm";
import { Discount } from "../entities/Discount";

@EntityRepository(Discount)
export class DiscountRepository extends Repository<Discount> {}
