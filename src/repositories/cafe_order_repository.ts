import { EntityRepository, Repository } from "typeorm";
import { CafeOrder } from "../entities/CafeOrder";

@EntityRepository(CafeOrder)
export class CafeOrderRepository extends Repository<CafeOrder> {}
