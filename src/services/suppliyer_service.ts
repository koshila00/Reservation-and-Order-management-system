import { EntityNotFoundError, Repository } from "typeorm";
import { Supplier } from "../entities/Supplier";
import {
  CreateSupplierDTO,
  UpdateSupplierDTO,
  SupplierDTO,
} from "../dtos/Supplier_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";

export class SupplierService {
  private supplierRepository: Repository<Supplier>;

  constructor(supplierRepository: Repository<Supplier>) {
    this.supplierRepository = supplierRepository;
  }

  async createSupplier(
    createSupplierDto: CreateSupplierDTO
  ): Promise<Supplier> {
    const newSupplier = new Supplier();
    newSupplier.supplierName = createSupplierDto.supplierName ?? "";
    newSupplier.supplierEmail = createSupplierDto.supplierEmail ?? "";

    return await this.supplierRepository.save(newSupplier);
  }

  async updateSupplier(
    supplierId: number,
    updateSupplierDto: UpdateSupplierDTO
  ): Promise<Supplier> {
    try {
      const supplier = await this.findSupplierById(supplierId);

      if (!supplier) {
        throw new NotFoundError(`Supplier with id ${supplierId} not found`);
      }

      Object.assign(supplier, updateSupplierDto);

      return await this.supplierRepository.save(supplier);
    } catch (error) {
      console.error("Error updating supplier:", error);
      throw error;
    }
  }

  async findSupplierById(supplierId: number): Promise<Supplier | null> {
    try {
      const supplier = await this.supplierRepository.findOne({
        where: { supplierId: supplierId },
      });
      return supplier;
    } catch (error) {
      console.error("Error finding supplier:", error);
      throw error;
    }
  }

  async deleteSupplier(supplierId: number): Promise<boolean> {
    const supplier = await this.findSupplierById(supplierId);

    if (!supplier) {
      return false;
    }

    await this.supplierRepository.remove(supplier);
    return true;
  }

  async getAllSuppliers(): Promise<SupplierDTO[]> {
    const suppliers = await this.supplierRepository.find();

    return suppliers.map((supplier) => ({
      supplierId: supplier.supplierId,
      supplierName: supplier.supplierName,
      supplierEmail: supplier.supplierEmail,
    }));
  }

  async getSupplierById(supplierId: number): Promise<Supplier | null> {
    const supplier = await this.findSupplierById(supplierId);
    return supplier || null;
  }
}
