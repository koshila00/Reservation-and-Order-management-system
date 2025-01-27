import { EntityRepository, Repository } from "typeorm";
import { HallInventory } from "../entities/HallInventory";

@EntityRepository(HallInventory)
export class HallInventoryRepository extends Repository<HallInventory> {}
