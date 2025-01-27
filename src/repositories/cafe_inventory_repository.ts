import { EntityRepository, Repository } from "typeorm";
import { CafeInventory } from "../entities/CafeInventory";

@EntityRepository(CafeInventory)
export class CafeInventoryRepository extends Repository<CafeInventory> {}
