import { EntityRepository, Repository } from "typeorm";
import { CafeOrderItem } from "../entities/CafeOrderItem";

@EntityRepository(CafeOrderItem)
export class CafeOrderItemRepository extends Repository<CafeOrderItem> {}
