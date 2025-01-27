import { EntityRepository, Repository } from "typeorm";
import { Quotation } from "../entities/Quotation";

@EntityRepository(Quotation)
export class QuotationRepository extends Repository<Quotation> {
  // Add any custom repository methods here if needed
  // Example: Find quotations by supplier ID
  //   async findBySupplierId(supplierSupplierId: number): Promise<Quotation[]> {
  //     return this.find({ where: { supplierSupplierId } });
  //   }
  //   // Example: Find quotations by item ID
  //   async findByItemId(itemCafeItemId: number): Promise<Quotation[]> {
  //     return this.find({ where: { itemCafeItemId } });
  //   }
}
