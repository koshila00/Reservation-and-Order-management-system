import { EntityRepository, Repository } from "typeorm";
import { Supplier } from "../entities/Supplier";

@EntityRepository(Supplier)
export class SupplierRepository extends Repository<Supplier> {
  // You can add custom methods specific to Supplier if needed
}
